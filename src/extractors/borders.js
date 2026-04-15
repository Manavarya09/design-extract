import { parseCSSValue, clusterValues } from '../utils.js';

export function extractBorders(computedStyles) {
  const radiiSet = new Map(); // value -> count

  for (const el of computedStyles) {
    if (el.borderRadius && el.borderRadius !== '0px') {
      const val = parseCSSValue(el.borderRadius.split(' ')[0]);
      if (val && val.value > 0) {
        const px = Math.round(val.value);
        radiiSet.set(px, (radiiSet.get(px) || 0) + 1);
      }
    }
  }

  const sorted = [...radiiSet.keys()].sort((a, b) => a - b);
  const clustered = clusterValues(sorted, 2);

  const radii = clustered.map(v => {
    let label;
    if (v <= 2) label = 'xs';
    else if (v <= 5) label = 'sm';
    else if (v <= 10) label = 'md';
    else if (v <= 16) label = 'lg';
    else if (v <= 24) label = 'xl';
    else label = 'full';
    return { value: v, label, count: radiiSet.get(v) || 0 };
  });

  return { radii };
}
