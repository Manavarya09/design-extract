import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt =
  'designlang specimen card. A lowercase d built from a ring, a stem, and one extracted orange token, next to the wordmark designlang in Fraunces with a molten-orange period, and a five-swatch palette strip.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PAPER = '#F3F1EA';
const INK = '#0A0908';
const INK_2 = '#403C34';
const INK_3 = '#8B8778';
const ACCENT = '#FF4800';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: PAPER,
          color: INK,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 56,
          fontFamily: 'Georgia, serif',
          border: `2px solid ${INK}`,
        }}
      >
        {/* top caption strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 16,
            color: INK_2,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>SPECIMEN / 01</span>
            <span>EXTRACTED 2026</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right' }}>
            <span>v7.0</span>
            <span>W3C DTCG</span>
          </div>
        </div>

        {/* wordmark row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
          {/* mark */}
          <div
            style={{
              position: 'relative',
              width: 150,
              height: 180,
              display: 'flex',
            }}
          >
            {/* counter ring */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: 116,
                height: 116,
                border: `24px solid ${INK}`,
                borderRadius: '50%',
              }}
            />
            {/* stem */}
            <div
              style={{
                position: 'absolute',
                left: 92,
                top: 0,
                width: 26,
                height: 180,
                background: INK,
              }}
            />
            {/* extracted token */}
            <div
              style={{
                position: 'absolute',
                left: 122,
                top: 150,
                width: 30,
                height: 30,
                background: ACCENT,
              }}
            />
          </div>

          {/* word + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 128,
                lineHeight: 1,
                letterSpacing: -4,
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <span style={{ color: INK }}>designlang</span>
              <span style={{ color: ACCENT }}>.</span>
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 22,
                fontStyle: 'italic',
                color: INK_2,
                fontFamily: 'Helvetica, Arial, sans-serif',
              }}
            >
              reads a website the way a developer reads a stylesheet.
            </div>
          </div>
        </div>

        {/* bottom: palette + command */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 14 }}>
            {[INK, INK_2, INK_3, '#D8D3C5', ACCENT].map((c) => (
              <div key={c} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ width: 56, height: 56, background: c }} />
                <span
                  style={{
                    fontFamily: 'ui-monospace, Menlo, monospace',
                    fontSize: 12,
                    color: INK_2,
                    letterSpacing: 1,
                  }}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              textAlign: 'right',
              fontFamily: 'ui-monospace, Menlo, monospace',
              fontSize: 16,
              letterSpacing: 1.2,
              color: INK_2,
            }}
          >
            <span>$ npx designlang &lt;url&gt;</span>
            <span style={{ color: INK_3 }}>MIT · Node ≥ 20 · Playwright</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
