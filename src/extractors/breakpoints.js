export function extractBreakpoints(mediaQueries) {
  const bpSet = new Map(); // px value -> type

  for (const query of mediaQueries) {
    const minMatch = query.match(/min-width:\s*([\d.]+)(px|em|rem)/);
    if (minMatch) {
      let px = parseFloat(minMatch[1]);
      if (minMatch[2] === 'em' || minMatch[2] === 'rem') px *= 16;
      bpSet.set(Math.round(px), 'min-width');
    }
    const maxMatch = query.match(/max-width:\s*([\d.]+)(px|em|rem)/);
    if (maxMatch) {
      let px = parseFloat(maxMatch[1]);
      if (maxMatch[2] === 'em' || maxMatch[2] === 'rem') px *= 16;
      bpSet.set(Math.round(px), 'max-width');
    }
  }

  const sorted = [...bpSet.entries()].sort((a, b) => a[0] - b[0]);

  const labels = { 320: 'xs', 480: 'sm', 640: 'sm', 768: 'md', 1024: 'lg', 1280: 'xl', 1536: '2xl' };

  return sorted.map(([value, type]) => {
    // Find closest standard label
    let label = `${value}px`;
    let minDist = Infinity;
    for (const [std, name] of Object.entries(labels)) {
      const dist = Math.abs(value - parseInt(std));
      if (dist < minDist && dist <= 64) { minDist = dist; label = name; }
    }
    return { value, label, type };
  });
}
