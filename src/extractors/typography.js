import { parseCSSValue } from '../utils.js';

export function extractTypography(computedStyles) {
  const familyCount = new Map();
  const sizeEntries = [];
  const weightCount = new Map();

  for (const el of computedStyles) {
    // Font families
    const family = el.fontFamily?.replace(/["']/g, '').split(',')[0]?.trim();
    if (family) familyCount.set(family, (familyCount.get(family) || 0) + 1);

    // Font sizes
    const sizeVal = parseCSSValue(el.fontSize);
    if (sizeVal) {
      sizeEntries.push({
        size: sizeVal.value,
        weight: el.fontWeight,
        lineHeight: el.lineHeight,
        letterSpacing: el.letterSpacing,
        tag: el.tag,
        family,
      });
    }

    // Weights
    if (el.fontWeight) weightCount.set(el.fontWeight, (weightCount.get(el.fontWeight) || 0) + 1);
  }

  // Unique font families sorted by usage
  const families = [...familyCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => {
      const usedOn = computedStyles
        .filter(el => el.fontFamily?.includes(name))
        .map(el => el.tag);
      const headingUse = usedOn.some(t => /^h[1-6]$/.test(t));
      const bodyUse = usedOn.some(t => ['p', 'span', 'li', 'div'].includes(t));
      return { name, count, usage: headingUse && bodyUse ? 'all' : headingUse ? 'headings' : 'body' };
    });

  // Build type scale from unique sizes
  const sizeMap = new Map();
  for (const entry of sizeEntries) {
    const key = entry.size;
    if (!sizeMap.has(key)) {
      sizeMap.set(key, { size: entry.size, weight: entry.weight, lineHeight: entry.lineHeight, letterSpacing: entry.letterSpacing, tags: new Set(), count: 0 });
    }
    const s = sizeMap.get(key);
    s.tags.add(entry.tag);
    s.count++;
  }

  const scale = [...sizeMap.values()]
    .sort((a, b) => b.size - a.size)
    .map(s => ({ ...s, tags: [...s.tags] }));

  // Identify heading sizes (from h1-h6 tags)
  const headings = scale.filter(s => s.tags.some(t => /^h[1-6]$/.test(t)));

  // Body text: most common size on p/span/li
  const bodyEntries = sizeEntries.filter(e => ['p', 'span', 'li'].includes(e.tag));
  const bodySizeCount = new Map();
  for (const e of bodyEntries) bodySizeCount.set(e.size, (bodySizeCount.get(e.size) || 0) + 1);
  const bodySize = [...bodySizeCount.entries()].sort((a, b) => b[1] - a[1])[0];
  const body = bodySize ? scale.find(s => s.size === bodySize[0]) : null;

  // Weights
  const weights = [...weightCount.entries()].sort((a, b) => b[1] - a[1]).map(([w, count]) => ({ weight: w, count }));

  return { families, scale, headings, body, weights };
}
