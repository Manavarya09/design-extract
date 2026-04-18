// Catalog of wide-gamut / modern color function usages from the crawler's
// scan of stylesheet cssText. Produces counts + sample raw values + converted
// sRGB hex for oklch/oklab values.

import { oklchLikeToHex } from '../utils/color-gamut.js';

export function extractWideGamut(modernColors) {
  const src = Array.isArray(modernColors) ? modernColors : [];
  const catalog = {
    oklch: { count: 0, samples: [] },
    oklab: { count: 0, samples: [] },
    colorMix: { count: 0, samples: [] },
    lightDark: { count: 0, samples: [] },
    displayP3: { count: 0, samples: [] },
    rec2020: { count: 0, samples: [] },
  };

  const bucket = {
    oklch: catalog.oklch,
    oklab: catalog.oklab,
    'color-mix': catalog.colorMix,
    'light-dark': catalog.lightDark,
    'display-p3': catalog.displayP3,
    rec2020: catalog.rec2020,
  };

  for (const entry of src) {
    const b = bucket[entry.type];
    if (!b) continue;
    b.count++;
    if (b.samples.length < 10) {
      const sample = {
        raw: entry.raw,
        property: entry.property || '',
        selector: entry.selector || '',
      };
      if (entry.type === 'oklch' || entry.type === 'oklab') {
        const hex = oklchLikeToHex(entry.raw);
        if (hex) sample.value = hex;
      }
      b.samples.push(sample);
    }
  }

  const totalCount = Object.values(catalog).reduce((n, c) => n + c.count, 0);
  return { ...catalog, totalCount };
}
