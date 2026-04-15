// Clone command — generate a working Next.js starter from extracted design

import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export function generateClone(design, outDir) {
  const projectDir = outDir;
  mkdirSync(join(projectDir, 'src/app'), { recursive: true });
  mkdirSync(join(projectDir, 'public'), { recursive: true });

  const { colors, typography, spacing, borders, shadows } = design;

  // Package.json
  writeFileSync(join(projectDir, 'package.json'), JSON.stringify({
    name: `${design.meta.title?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 40) || 'cloned-design'}-clone`,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
    },
    dependencies: {
      next: '^15.0.0',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
    },
    devDependencies: {
      tailwindcss: '^4.0.0',
      '@tailwindcss/postcss': '^4.0.0',
    },
  }, null, 2), 'utf-8');

  // Globals CSS with extracted design tokens
  const primaryHex = colors.primary?.hex || '#3b82f6';
  const secondaryHex = colors.secondary?.hex || '#8b5cf6';
  const accentHex = colors.accent?.hex || '#f59e0b';
  const bgColor = colors.backgrounds[0] || '#ffffff';
  const textColor = colors.text[0] || '#171717';
  const fontFamily = typography.families[0]?.name || 'Inter';
  const monoFont = typography.families.find(f => f.name.toLowerCase().includes('mono'))?.name || 'monospace';
  const radiusMd = borders.radii.find(r => r.label === 'md')?.value || 8;
  const shadowMd = shadows.values.find(s => s.label === 'md')?.raw || '0 4px 6px rgba(0,0,0,0.1)';

  const neutrals = colors.neutrals.slice(0, 5);

  writeFileSync(join(projectDir, 'src/app/globals.css'), `@import "tailwindcss";

:root {
  --color-primary: ${primaryHex};
  --color-secondary: ${secondaryHex};
  --color-accent: ${accentHex};
  --color-background: ${bgColor};
  --color-foreground: ${textColor};
${neutrals.map((n, i) => `  --color-neutral-${i + 1}: ${n.hex};`).join('\n')}
  --font-sans: '${fontFamily}', system-ui, sans-serif;
  --font-mono: '${monoFont}', monospace;
  --radius: ${radiusMd}px;
  --shadow: ${shadowMd};
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}
`, 'utf-8');

  // Layout
  writeFileSync(join(projectDir, 'src/app/layout.js'), `export const metadata = {
  title: '${(design.meta.title || 'Cloned Design').replace(/'/g, "\\'")}',
  description: 'Design cloned from ${design.meta.url}',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
`, 'utf-8');

  // Demo page showcasing the design system
  const headingScale = typography.headings.slice(0, 3);
  const bodySize = typography.body?.size || 16;
  const spacingVals = spacing.scale.slice(0, 8);

  writeFileSync(join(projectDir, 'src/app/page.js'), `import './globals.css';

export default function Home() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 style={{
          fontSize: '${headingScale[0]?.size || 48}px',
          fontWeight: ${headingScale[0]?.weight || 700},
          lineHeight: '${headingScale[0]?.lineHeight || '1.1'}',
          color: 'var(--color-foreground)',
          marginBottom: '16px',
        }}>
          Design System Clone
        </h1>
        <p style={{
          fontSize: '${bodySize + 4}px',
          color: 'var(--color-neutral-1)',
          maxWidth: '600px',
          margin: '0 auto 32px',
        }}>
          Extracted from <a href="${design.meta.url}" style={{ color: 'var(--color-primary)' }}>${design.meta.url}</a>
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button style={{
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 'var(--radius)',
            fontSize: '${bodySize}px',
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            Primary Button
          </button>
          <button style={{
            background: 'transparent',
            color: 'var(--color-foreground)',
            border: '1px solid var(--color-neutral-${Math.min(neutrals.length, 3)})',
            padding: '12px 24px',
            borderRadius: 'var(--radius)',
            fontSize: '${bodySize}px',
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            Secondary Button
          </button>
        </div>
      </section>

      {/* Color Palette */}
      <section style={{ padding: '48px 0' }}>
        <h2 style={{ fontSize: '${headingScale[1]?.size || 24}px', fontWeight: 600, marginBottom: '24px' }}>Color Palette</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius)', padding: '40px 16px 12px', color: '#fff', fontSize: '12px' }}>Primary<br/>${primaryHex}</div>
          <div style={{ background: 'var(--color-secondary)', borderRadius: 'var(--radius)', padding: '40px 16px 12px', color: '#fff', fontSize: '12px' }}>Secondary<br/>${secondaryHex}</div>
          <div style={{ background: 'var(--color-accent)', borderRadius: 'var(--radius)', padding: '40px 16px 12px', color: '#fff', fontSize: '12px' }}>Accent<br/>${accentHex}</div>
${neutrals.map((n, i) => `          <div style={{ background: '${n.hex}', borderRadius: 'var(--radius)', padding: '40px 16px 12px', color: '${n.hsl.l > 50 ? '#000' : '#fff'}', fontSize: '12px' }}>Neutral ${i + 1}<br/>${n.hex}</div>`).join('\n')}
        </div>
      </section>

      {/* Typography */}
      <section style={{ padding: '48px 0' }}>
        <h2 style={{ fontSize: '${headingScale[1]?.size || 24}px', fontWeight: 600, marginBottom: '24px' }}>Typography</h2>
${headingScale.map((h, i) => `        <p style={{ fontSize: '${h.size}px', fontWeight: ${h.weight}, lineHeight: '${h.lineHeight}', marginBottom: '16px' }}>Heading ${i + 1} — ${h.size}px / ${h.weight}</p>`).join('\n')}
        <p style={{ fontSize: '${bodySize}px', lineHeight: '1.6', color: 'var(--color-neutral-1)', marginTop: '24px' }}>
          Body text at ${bodySize}px. This is what most content on the site looks like.
          The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
        </p>
      </section>

      {/* Cards */}
      <section style={{ padding: '48px 0' }}>
        <h2 style={{ fontSize: '${headingScale[1]?.size || 24}px', fontWeight: 600, marginBottom: '24px' }}>Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              background: 'var(--color-background)',
              border: '1px solid var(--color-neutral-${Math.min(neutrals.length, 3)})',
              borderRadius: 'var(--radius)',
              padding: '24px',
              boxShadow: 'var(--shadow)',
            }}>
              <h3 style={{ fontSize: '${(headingScale[2]?.size || 18)}px', fontWeight: 600, marginBottom: '8px' }}>Card Title {i}</h3>
              <p style={{ fontSize: '${bodySize}px', color: 'var(--color-neutral-1)', lineHeight: '1.5' }}>
                This card uses the extracted border radius, shadow, and spacing values from the original site.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 0', borderTop: '1px solid var(--color-neutral-${Math.min(neutrals.length, 3)})', marginTop: '48px', textAlign: 'center' }}>
        <p style={{ fontSize: '${bodySize - 2}px', color: 'var(--color-neutral-1)' }}>
          Design extracted from ${design.meta.url} with <a href="https://github.com/Manavarya09/design-extract" style={{ color: 'var(--color-primary)' }}>designlang</a>
        </p>
      </footer>
    </main>
  );
}
`, 'utf-8');

  // Next config
  writeFileSync(join(projectDir, 'next.config.mjs'), `/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
`, 'utf-8');

  // PostCSS config for Tailwind v4
  writeFileSync(join(projectDir, 'postcss.config.mjs'), `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
`, 'utf-8');

  return {
    dir: projectDir,
    files: ['package.json', 'src/app/globals.css', 'src/app/layout.js', 'src/app/page.js', 'next.config.mjs', 'postcss.config.mjs'],
  };
}
