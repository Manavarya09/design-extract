// Pure reducer behind the Extraction Theatre UI.
//
// The component is a thin `useReducer` shell over this — keeping all the event
// folding here means the tricky parts (out-of-order frames, dropped frames, a
// terminal error mid-stream) are testable without React or a browser.

export const MAX_SWATCHES = 28;
export const MAX_DIMENSIONS = 12;

export const initialTheatreState = {
  status: 'idle', // idle | streaming | done | error
  cached: false,
  hash: null,
  stage: null,
  stagesSeen: [],
  frame: null, // { seq, data, w, h } — latest painted frame
  frameCount: 0, // frames received (for the progress read-out)
  swatches: [], // { path, hex }
  fontSample: null,
  dimensions: [], // { path, px, raw }
  summary: null,
  files: null,
  error: null,
};

export function theatreReducer(state, action) {
  switch (action.type) {
    case 'start':
      // Fresh run — clear everything but stay mounted.
      return { ...initialTheatreState, status: 'streaming' };

    case 'idle':
      // Autoplay found no recorded reel — settle back to idle, not stuck loading.
      return { ...state, status: 'idle' };

    case 'cache':
      return { ...state, cached: true };

    case 'permalink':
      return action.hash ? { ...state, hash: action.hash } : state;

    case 'stage':
      return {
        ...state,
        stage: action.name,
        stagesSeen: state.stagesSeen.includes(action.name)
          ? state.stagesSeen
          : [...state.stagesSeen, action.name],
      };

    case 'frame': {
      // Only advance the displayed frame forward — a late/out-of-order frame
      // never rewinds the picture. Still count it so the read-out is honest.
      const prevSeq = state.frame ? state.frame.seq : -1;
      const isNewer = action.seq == null || action.seq >= prevSeq;
      return {
        ...state,
        frame: isNewer
          ? { seq: action.seq ?? prevSeq + 1, data: action.data, w: action.w, h: action.h }
          : state.frame,
        frameCount: state.frameCount + 1,
      };
    }

    case 'token':
      return foldToken(state, action);

    case 'summary':
      return { ...state, summary: action.summary };

    case 'files':
      return { ...state, files: action.files, status: 'done' };

    case 'error':
      return { ...state, error: action.error || 'Extraction failed', status: 'error' };

    case 'end':
      // The response closed. Still streaming means it closed without files or
      // an error — the function was killed at its time limit.
      return state.status === 'streaming'
        ? { ...state, error: 'That site took too long to read. Try again, or run npx designlang locally.', status: 'error' }
        : state;

    default:
      return state;
  }
}

function foldToken(state, action) {
  const { $type, value, path } = action;
  if ($type === 'color' && typeof value === 'string' && value.startsWith('#')) {
    if (state.swatches.length >= MAX_SWATCHES) return state;
    if (state.swatches.some((s) => s.path === path)) return state;
    return { ...state, swatches: [...state.swatches, { path, hex: value }] };
  }
  if ($type === 'fontFamily' && typeof value === 'string' && !state.fontSample) {
    return { ...state, fontSample: value };
  }
  if ($type === 'dimension' && typeof value === 'string') {
    const px = parseFloat(value);
    if (Number.isNaN(px) || state.dimensions.length >= MAX_DIMENSIONS) return state;
    return { ...state, dimensions: [...state.dimensions, { path, px, raw: value }] };
  }
  return state;
}

/**
 * Reduce a whole event list in order — handy for tests and for replaying a
 * buffered timeline. `events` are raw NDJSON objects ({type, ...}).
 */
export function reduceEvents(events, from = initialTheatreState) {
  return events.reduce((s, ev) => theatreReducer(s, ev), from);
}
