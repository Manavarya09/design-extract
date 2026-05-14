import { ImageResponse } from 'next/og';
import { getCachedByHash } from '../../../lib/cache';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'designlang — extracted design system';

function pickPalette(design) {
  const all = (design?.colors?.all || []).map((c) => c.hex).filter(Boolean);
  const seen = new Set();
  const out = [];
  for (const hex of all) {
    const k = String(hex).toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(hex);
    if (out.length >= 6) break;
  }
  return out.length > 0 ? out : ['#7f1d1d', '#dc2626', '#ff5757', '#ffffff', '#0a0a0a', '#161616'];
}

export default async function og({ params }) {
  const { hash } = await params;
  const cached = await getCachedByHash(hash).catch(() => null);
  const design = cached?.design || null;
  const url = design?.meta?.url || 'https://designlang.app';
  const host = (() => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'designlang.app'; } })();
  const title = design?.meta?.title || host;
  const palette = pickPalette(design);
  const tokens = design?.colors?.all?.length ?? '?';
  const grade = design?.score?.grade || '—';
  const fonts = design?.typography?.families?.[0]?.name || 'system';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #050505 0%, #1a0a0a 60%, #050505 100%)',
          padding: 64,
          fontFamily: 'sans-serif',
          color: '#fff',
        }}
      >
        {/* top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'monospace', fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#ff5757,#7f1d1d)', display: 'flex' }} />
            <span style={{ color: '#fff' }}>designlang</span>
            <span>v12.12</span>
          </div>
          <span>{host}</span>
        </div>

        {/* title */}
        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 14, fontFamily: 'monospace' }}>extracted design system</div>
          <div style={{ fontSize: 80, fontWeight: 600, lineHeight: 1.0, letterSpacing: -2, maxWidth: 1080, display: 'flex' }}>
            {String(title).slice(0, 56)}
          </div>
        </div>

        {/* palette strip */}
        <div style={{ marginTop: 64, display: 'flex', borderRadius: 16, overflow: 'hidden', height: 130, boxShadow: '0 20px 60px -10px rgba(0,0,0,0.6)' }}>
          {palette.map((hex, i) => (
            <div key={i} style={{ flex: 1, background: hex, display: 'flex', alignItems: 'flex-end', padding: 16, fontFamily: 'monospace', fontSize: 18, color: 'rgba(0,0,0,0.55)' }}>
              {hex}
            </div>
          ))}
        </div>

        {/* meta row */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: 36, fontFamily: 'monospace', fontSize: 26, color: 'rgba(255,255,255,0.7)' }}>
          <span>{tokens} tokens</span>
          <span>· {fonts}</span>
          <span>· grade {grade}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
