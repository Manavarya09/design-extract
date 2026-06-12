// Pixel-diff two PNG buffers and return a differing-pixel ratio + a heatmap.
//
// Sizes rarely match (a snapped-down padding makes the rebuild smaller), so we
// letterbox both onto a common canvas anchored top-left, padding with white.
// We never STRETCH — a stretched compare would smear the score into fiction.
// Padding asymmetry is real signal: if the rebuild is smaller, the uncovered
// margin shows up as loss, which is correct.

import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

function pad(png, width, height, fill = 255) {
  if (png.width === width && png.height === height) return png;
  const out = new PNG({ width, height });
  out.data.fill(fill); // opaque white canvas
  for (let i = 3; i < out.data.length; i += 4) out.data[i] = 255;
  PNG.bitblt(png, out, 0, 0, Math.min(png.width, width), Math.min(png.height, height), 0, 0);
  return out;
}

// aBuf/bBuf: PNG file buffers. Returns { ratio, width, height, diffPixels, heatmap }.
export function diffPngBuffers(aBuf, bBuf, { threshold = 0.1 } = {}) {
  const a = PNG.sync.read(aBuf);
  const b = PNG.sync.read(bBuf);
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);

  const pa = pad(a, width, height);
  const pb = pad(b, width, height);
  const out = new PNG({ width, height });

  const diffPixels = pixelmatch(pa.data, pb.data, out.data, width, height, {
    threshold,
    includeAA: false,
    alpha: 0.25,
    diffColor: [255, 0, 80],
  });

  const total = width * height;
  return {
    ratio: total ? diffPixels / total : 1,
    width,
    height,
    diffPixels,
    heatmap: PNG.sync.write(out),
  };
}

// Convenience: ratio → 0–100 fidelity, rounded.
export function ratioToFidelity(ratio) {
  return Math.max(0, Math.min(100, Math.round((1 - ratio) * 100)));
}
