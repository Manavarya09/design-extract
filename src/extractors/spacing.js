import { parseCSSValue, clusterValues, detectScale } from '../utils.js';

export function extractSpacing(computedStyles) {
  const allValues = new Set();

  for (const el of computedStyles) {
    for (const prop of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'gap']) {
      const val = parseCSSValue(el[prop]);
      if (val && val.value > 0 && val.value < 500) {
        allValues.add(Math.round(val.value));
      }
    }
  }

  const sorted = [...allValues].sort((a, b) => a - b);
  const clustered = clusterValues(sorted, 2);
  const { base, scale } = detectScale(clustered);

  // Build named tokens
  const tokens = {};
  if (base) {
    for (const v of scale) {
      const step = v / base;
      if (Number.isInteger(step)) {
        tokens[String(step)] = `${v}px`;
      } else {
        tokens[`${v}px`] = `${v}px`;
      }
    }
  } else {
    for (let i = 0; i < scale.length; i++) {
      tokens[String(i)] = `${scale[i]}px`;
    }
  }

  return { base, scale, tokens, raw: sorted };
}
