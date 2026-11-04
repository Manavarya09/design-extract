// Surface tells the Slop Score reads that no other extractor keeps: thick
// coloured accent bars on one side of a box, and how much of the page's text
// is centred.

function sides(value) {
  const parts = String(value || '').trim().split(/\s+/).map((v) => parseFloat(v) || 0);
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
  if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
  return parts.slice(0, 4);
}

function colorAt(value, index) {
  const colors = String(value || '').match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}/gi) || [];
  if (!colors.length) return null;
  if (colors.length === 1) return colors[0];
  if (colors.length === 2) return colors[index % 2];
  if (colors.length === 3) return colors[index === 3 ? 1 : index];
  return colors[index];
}

function isNeutral(color) {
  const m = String(color || '').match(/(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
  if (!m) return true;
  const [r, g, b] = m.slice(1, 4).map(Number);
  return Math.max(r, g, b) - Math.min(r, g, b) < 24;
}

export function extractSurface(styles = []) {
  const accents = [];
  let textArea = 0;
  let centredArea = 0;
  for (const s of styles) {
    const [top, right, bottom, left] = sides(s.borderWidth);
    const widest = Math.max(top, right, bottom, left);
    // One side at least 3px and the others hairline or none: an accent bar.
    if (widest >= 3 && String(s.borderStyle || '').includes('solid')) {
      const index = [top, right, bottom, left].indexOf(widest);
      const others = [top, right, bottom, left].filter((_, i) => i !== index);
      const color = colorAt(s.borderColor, index);
      if (others.every((w) => w <= 1) && !isNeutral(color) && (index === 3 || index === 1)) {
        accents.push({ tag: s.tag, className: (s.classList || []).join?.(' ') || String(s.classList || ''), side: index === 3 ? 'left' : 'right', width: widest, color });
      }
    }
    if (s.hasText && s.textAlign) {
      const area = (s.width || 0) * (s.height || 0);
      textArea += area;
      if (s.textAlign === 'center') centredArea += area;
    }
  }
  return {
    accents: accents.slice(0, 20),
    accentCount: accents.length,
    centredTextShare: textArea ? Math.round((centredArea / textArea) * 100) / 100 : null,
  };
}
