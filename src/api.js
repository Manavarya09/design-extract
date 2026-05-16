// Public programmatic API for designlang.
//
// Stable surface other packages / scripts / agents can import. Anything
// not re-exported here is internal and may change without notice.
//
// Example:
//   import { extract, render, RENDERERS } from 'designlang/api';
//   const design = await extract('https://stripe.com');
//   const tailwind = render('tailwind', design);
//   const dts = render('ts-defs', design);

import { extractDesignLanguage } from './index.js';

// Formatters
import { formatMarkdown }        from './formatters/markdown.js';
import { formatDesignMd }        from './formatters/design-md.js';
import { formatTokens }          from './formatters/tokens.js';
import { formatDtcgTokens }      from './formatters/dtcg-tokens.js';
import { formatTailwind }        from './formatters/tailwind.js';
import { formatTailwindV4 }      from './formatters/tailwind-v4.js';
import { formatTsDefs }          from './formatters/ts-defs.js';
import { formatCssVars }         from './formatters/css-vars.js';
import { formatCssReset }        from './formatters/css-reset.js';
import { formatPreview }         from './formatters/preview.js';
import { formatFigma }           from './formatters/figma.js';
import { formatReactTheme,
         formatShadcnTheme }     from './formatters/theme.js';
import { formatVueTheme }        from './formatters/vue-theme.js';
import { formatSvelteTheme }     from './formatters/svelte-theme.js';
import { formatIosSwiftUI }      from './formatters/ios-swiftui.js';
import { formatAndroidCompose }  from './formatters/android-compose.js';
import { formatFlutterDart }     from './formatters/flutter-dart.js';
import { formatWordPress,
         formatWordPressTheme }  from './formatters/wordpress.js';
import { formatBrandBook }       from './formatters/brand-book.js';
import { formatGradientsCss,
         formatGradientsJson }   from './formatters/gradients.js';
import { formatAgentRules }      from './formatters/agent-rules.js';

// Utils
import { compressPalette }       from './utils/palette-compress.js';
import { diffDesigns,
         formatDiffMarkdown }    from './diff.js';

// ─── Stable surface ───────────────────────────────────────────────

/**
 * Run the full extraction pipeline against a URL. Returns the live
 * `design` object — every downstream renderer takes this shape.
 *
 * @param {string} url
 * @param {object} [opts]
 * @returns {Promise<object>}
 */
export async function extract(url, opts = {}) {
  const design = await extractDesignLanguage(url, opts);
  delete design._raw; // never leak internals over the public API
  if (opts.palette && opts.palette > 0 && Array.isArray(design?.colors?.all)) {
    design.colors.all = compressPalette(design.colors.all, opts.palette);
  }
  return design;
}

/**
 * Map of every available renderer id → renderer function. Each function
 * takes a `design` object and returns a string (for text formats) or
 * an object (for multi-file payloads).
 */
export const RENDERERS = Object.freeze({
  // markdown
  'design-md':           (d) => formatDesignMd(d),
  'design-language-md':  (d) => formatMarkdown(d),

  // tokens
  'tokens':              (d) => formatTokens(d),
  'dtcg':                (d) => JSON.stringify(formatDtcgTokens(d), null, 2),

  // web emitters
  'tailwind':            (d) => formatTailwind(d),
  'tailwind-v4':         (d) => formatTailwindV4(d),
  'css-vars':            (d) => formatCssVars(d),
  'css-reset':           (d) => formatCssReset(d),
  'ts-defs':             (d) => formatTsDefs(d),
  'figma':               (d) => formatFigma(d),
  'preview-html':        (d) => formatPreview(d),
  'brand-book-html':     (d) => formatBrandBook(d),
  'gradients-css':       (d) => formatGradientsCss(d),
  'gradients-json':      (d) => formatGradientsJson(d),

  // frameworks
  'react-theme':         (d) => formatReactTheme(d),
  'shadcn-theme':        (d) => formatShadcnTheme(d),
  'vue-theme':           (d) => formatVueTheme(d),
  'svelte-theme':        (d) => formatSvelteTheme(d),

  // native
  'ios-swiftui':         (d) => formatIosSwiftUI(formatDtcgTokens(d)),
  'android-compose':     (d) => formatAndroidCompose(formatDtcgTokens(d)),
  'flutter-dart':        (d) => formatFlutterDart(formatDtcgTokens(d)),

  // WordPress
  'wordpress':           (d) => formatWordPress(d),
  'wordpress-theme':     (d) => formatWordPressTheme(formatDtcgTokens(d), d),

  // Agent rules (returns a multi-file object)
  'agent-rules':         (d) => formatAgentRules({ design: d, tokens: formatDtcgTokens(d), url: d?.meta?.url || '' }),
});

/**
 * Render a single emitter by id.
 *
 * @param {keyof typeof RENDERERS} id
 * @param {object} design
 * @returns {string|object}
 */
export function render(id, design) {
  const fn = RENDERERS[id];
  if (!fn) {
    throw new Error(`Unknown renderer "${id}". Known: ${Object.keys(RENDERERS).join(', ')}.`);
  }
  return fn(design);
}

/**
 * Render every emitter and return a `{ filename: contents }` map.
 *
 * @param {object} design
 * @param {object} [opts]
 * @param {string} [opts.prefix] file-name prefix (default: derived from URL or 'design')
 * @returns {Record<string, string>}
 */
export function renderAll(design, opts = {}) {
  const prefix = opts.prefix || (design?.meta?.url ? new URL(design.meta.url).hostname.replace(/\./g, '-').replace(/^www-/, '') : 'design');
  const out = {};
  const ext = {
    'design-md':          'DESIGN.md',
    'design-language-md': 'design-language.md',
    'tokens':             'tokens.legacy.json',
    'dtcg':               'design-tokens.json',
    'tailwind':           'tailwind.config.js',
    'tailwind-v4':        'tailwind-v4.css',
    'css-vars':           'variables.css',
    'css-reset':          'reset.css',
    'ts-defs':            'tokens.d.ts',
    'figma':              'figma-variables.json',
    'preview-html':       'preview.html',
    'brand-book-html':    'brand.html',
    'gradients-css':      'gradients.css',
    'gradients-json':     'gradients.json',
    'react-theme':        'theme.js',
    'shadcn-theme':       'shadcn-theme.css',
    'vue-theme':          'theme.vue.js',
    'svelte-theme':       'theme.svelte.js',
    'wordpress':          'wordpress.json',
  };
  for (const [id, suffix] of Object.entries(ext)) {
    try {
      const body = RENDERERS[id]?.(design);
      if (typeof body === 'string' && body.length > 0) out[`${prefix}-${suffix}`] = body;
    } catch { /* skip emitter on error */ }
  }
  return out;
}

// Re-exports for advanced consumers
export {
  extractDesignLanguage,
  compressPalette,
  diffDesigns,
  formatDiffMarkdown,
};
