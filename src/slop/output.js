// Is a model's reply one complete HTML page? Used by the leaderboard and by
// Studio preview. An unclosed fence or a missing </html>/</body> means the
// reply was cut off.

export function classifyOutput(text) {
  const raw = String(text || '').trim();
  if (!raw) return { ok: false, failure: 'empty' };
  const fence = raw.match(/```(?:html)?\s*\n([\s\S]*?)```/i);
  // An unclosed fence means the reply was cut off; strip the opener and let
  // the completeness check below reject it.
  const html = (fence ? fence[1] : raw.replace(/^```(?:html)?\s*\n/i, '')).trim();
  if (!/<html[\s>]|<!doctype html|<body[\s>]/i.test(html)) return { ok: false, failure: 'not-html' };
  if (!/<\/(html|body)>\s*$/i.test(html)) return { ok: false, failure: 'not-html' };
  return { ok: true, html };
}
