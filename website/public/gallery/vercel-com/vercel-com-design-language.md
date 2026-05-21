# Design Language: Vercel: Build and deploy the best web experiences with the AI Cloud

> Extracted from `https://vercel.com` on May 21, 2026
> 3117 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#0068d6` | rgb(0, 104, 214) | hsl(211, 100%, 42%) | 4 |
| Secondary | `#52aeff` | rgb(82, 174, 255) | hsl(208, 100%, 66%) | 4 |
| Accent | `#0070f3` | rgb(0, 112, 243) | hsl(212, 100%, 48%) | 3 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#171717` | hsl(0, 0%, 9%) | 3031 |
| `#ebebeb` | hsl(0, 0%, 92%) | 2416 |
| `#4d4d4d` | hsl(0, 0%, 30%) | 565 |
| `#ffffff` | hsl(0, 0%, 100%) | 124 |
| `#666666` | hsl(0, 0%, 40%) | 67 |
| `#000000` | hsl(0, 0%, 0%) | 49 |
| `#7d7d7d` | hsl(0, 0%, 49%) | 20 |
| `#a8a8a8` | hsl(0, 0%, 66%) | 13 |
| `#8f8f8f` | hsl(0, 0%, 56%) | 9 |
| `#ebf5ff` | hsl(210, 100%, 96%) | 2 |

### Background Colors

Used on large-area elements: `#fafafa`, `#ffffff`

### Text Colors

Text color palette: `#171717`, `#0072f5`, `#4d4d4d`, `#ffffff`, `#0068d6`, `#52aeff`, `#e5484d`, `#ffb224`, `#45dec5`, `#a8a8a8`

### Gradients

```css
background-image: conic-gradient(from 180deg at 50% 70%, rgba(250, 250, 250, 0) 0deg, rgb(238, 195, 45) 72deg, rgb(236, 75, 75) 144deg, rgb(112, 154, 185) 216deg, rgb(77, 255, 191) 288deg, rgba(250, 250, 250, 0) 360deg);
```

```css
background-image: linear-gradient(to right, rgb(235, 235, 235), rgb(235, 235, 235) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(235, 235, 235), rgb(235, 235, 235) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to right, rgb(212, 238, 247), rgb(212, 238, 247) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(212, 238, 247), rgb(212, 238, 247) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to right, rgb(255, 232, 224), rgb(255, 232, 224) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(255, 232, 224), rgb(255, 232, 224) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to right, rgb(199, 245, 226), rgb(199, 245, 226) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(199, 245, 226), rgb(199, 245, 226) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(to right, rgb(247, 234, 212), rgb(247, 234, 212) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

```css
background-image: linear-gradient(rgb(247, 234, 212), rgb(247, 234, 212) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#171717` | text, border, background | 3031 |
| `#ebebeb` | border, background | 2416 |
| `#4d4d4d` | text, border | 565 |
| `#ffffff` | background, text, border | 124 |
| `#666666` | text | 67 |
| `#000000` | border | 49 |
| `#7d7d7d` | text | 20 |
| `#a8a8a8` | border, text | 13 |
| `#8f8f8f` | background, text | 9 |
| `#0068d6` | text, background | 4 |
| `#52aeff` | background, text | 4 |
| `#0070f3` | text, background | 3 |
| `#e5484d` | background, text | 3 |
| `#45dec5` | background, text | 3 |
| `#bd2864` | text | 3 |
| `#ebf5ff` | background | 2 |
| `#ffb224` | text | 2 |
| `#297a3a` | text | 2 |
| `#7820bc` | text, background | 2 |
| `#cce6ff` | background | 1 |
| `#ea3e83` | background | 1 |
| `#067a6e` | background | 1 |
| `#ff990a` | background | 1 |
| `#bf89ec` | background | 1 |
| `#398e4a` | background | 1 |
| `#6cda75` | background | 1 |
| `#ffc96b` | background | 1 |

## Typography

### Font Families

- **Geist** — used for all (2877 elements)
- **Geist Mono** — used for all (240 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 48px | 3rem | 600 | 48px | -2.28px | h1, h3, span, div |
| 40px | 2.5rem | 600 | 48px | -2.4px | h2 |
| 32px | 2rem | 400 | 48px | -1.28px | span, img, h3, p |
| 24px | 1.5rem | 600 | 32px | -0.96px | h3, p, span, div |
| 20px | 1.25rem | 400 | 36px | normal | p |
| 18px | 1.125rem | 400 | 28px | normal | div, p, li, span |
| 16px | 1rem | 400 | 24px | normal | html, head, style, meta |
| 14px | 0.875rem | 400 | 14px | normal | button, span, svg, path |
| 13px | 0.8125rem | 500 | 20px | normal | div, ul, li, pre |
| 12px | 0.75rem | 400 | 16px | normal | p, span, li, svg |
| 9.5px | 0.5938rem | 400 | 14.25px | normal | span |
| 8px | 0.5rem | 600 | 8px | normal | span |
| 7.75px | 0.4844rem | 400 | 11.625px | normal | span |
| 7px | 0.4375rem | 700 | 7px | normal | span |
| 6px | 0.375rem | 400 | 9px | normal | span |

### Heading Scale

```css
h1 { font-size: 48px; font-weight: 600; line-height: 48px; }
h2 { font-size: 40px; font-weight: 600; line-height: 48px; }
h3 { font-size: 32px; font-weight: 400; line-height: 48px; }
h3 { font-size: 24px; font-weight: 600; line-height: 32px; }
h5 { font-size: 14px; font-weight: 400; line-height: 14px; }
h2 { font-size: 12px; font-weight: 400; line-height: 16px; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: 24px; }
```

### Font Weights in Use

`400` (2812x), `500` (245x), `600` (58x), `700` (2x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-24 | 24px | 1.5rem |
| spacing-32 | 32px | 2rem |
| spacing-36 | 36px | 2.25rem |
| spacing-40 | 40px | 2.5rem |
| spacing-44 | 44px | 2.75rem |
| spacing-48 | 48px | 3rem |
| spacing-85 | 85px | 5.3125rem |
| spacing-90 | 90px | 5.625rem |
| spacing-96 | 96px | 6rem |
| spacing-135 | 135px | 8.4375rem |
| spacing-144 | 144px | 9rem |
| spacing-161 | 161px | 10.0625rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 2px | 8 |
| sm | 5px | 1 |
| md | 8px | 14 |
| lg | 16px | 1 |
| full | 32px | 1 |
| full | 50px | 13 |
| full | 64px | 6 |
| full | 99px | 1 |
| full | 9999px | 12 |

## Box Shadows

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 114, 245) 0px 0px 0px 4px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(235, 235, 235) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(235, 235, 235) 0px 0px 0px 1px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px 0px, rgb(250, 250, 250) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px 0px, rgb(250, 250, 250) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgb(250, 250, 250) 0px 0px 0px 1px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(235, 235, 235) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgb(250, 250, 250) 0px 0px 0px 1px, rgb(255, 255, 255) 0px 0px 0px 1px;
```

**xs (inset)** — blur: 0px
```css
box-shadow: rgb(234, 234, 234) 0px -1px 0px 0px inset;
```

**xs** — blur: 2px
```css
box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 2px 0px;
```

**sm** — blur: 2px
```css
box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 2px 0px;
```

## CSS Custom Properties

### Colors

```css
--ds-shadow-border-large: 0 0 0 1px #00000014, 0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a, 0 0 0 1px hsla(0, 0%, 98%, 1);
--color-orange-600: lab(57.1026% 64.2584 89.8886);
--geist-console-text-color-default: #000;
--tw-inset-ring-shadow: 0 0 #0000;
--color-gray-300: hsla(0, 0%, 90%, 1);
--geist-secondary-lighter: #eaeaea;
--header-border-bottom: 0 1px 0 0 #0000001a;
--geist-secondary-dark: #333;
--ds-focus-ring: 0 0 0 2px hsla(0, 0%, 100%, 1), 0 0 0 4px hsla(212, 100%, 48%, 1);
--accents-3: #999;
--geist-selection-text-color: hsla(0, 0%, 95%, 1);
--accents-8: #111;
--color-zinc-900: lab(8.30603% .618205 -2.16572);
--accents-2: #eaeaea;
--color-gray-950: lab(1.90334% .278696 -5.48866);
--ds-shadow-border-small: 0 0 0 1px #00000014, 0px 2px 2px #0000000a, 0 0 0 1px hsla(0, 0%, 98%, 1);
--color-blue-50: lab(96.492% -1.14644 -5.11479);
--color-violet-50: lab(96.2416% 2.28849 -5.51657);
--tw-ring-shadow: 0 0 #0000;
--color-yellow-600: lab(62.7799% 22.4197 86.1544);
--ds-shadow-background-border: 0 0 0 1px hsla(0, 0%, 98%, 1);
--geist-foreground-rgb: 0, 0, 0;
--geist-console-text-color-blue: #0070f3;
--tw-ring-offset-width: 0px;
--accents-4: #888;
--color-violet-700: lab(35.2783% 67.9912 -88.793);
--tw-ring-offset-shadow: 0 0 #0000;
--geist-secondary-light: #999;
--ds-motion-popover-timing: cubic-bezier(.175, .885, .32, 1.1);
--color-background-100: hsla(0, 0%, 100%, 1);
--color-violet-100: lab(93.0838% 4.35197 -9.88284);
--ds-motion-popover-duration: .2s;
--ds-shadow-border-medium: 0 0 0 1px #00000014, 0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a, 0 0 0 1px hsla(0, 0%, 98%, 1);
--color-zinc-100: lab(96.1634% .0993311 -.364041);
--color-slate-500: lab(48.0876% -2.03595 -16.5814);
--accents-6: #444;
--color-slate-300: lab(84.7652% -1.94535 -7.93337);
--ds-shadow-border: 0 0 0 1px #00000014, 0 0 0 1px hsla(0, 0%, 98%, 1);
--color-neutral-700: lab(27.036% 0 0);
--geist-violet-background-secondary: #291c3a;
--ds-overlay-backdrop-color: hsla(0, 0%, 98%, 1);
--ds-shadow-border-base: 0 0 0 1px #00000014;
--color-gray-alpha-400: #00000014;
--ds-shadow-border-inset: inset 0 0 0 1px #00000014;
--color-zinc-600: lab(35.1166% 1.78212 -6.1173);
--tw-border-style: solid;
--animate-fadeOutPopover: fadeOut cubic-bezier(.175, .885, .32, 1.1) .2s;
--ds-focus-color: hsla(212, 100%, 48%, 1);
--accents-7: #333;
--color-gray-50: lab(98.2596% -.247031 -.706708);
--geist-console-text-color-purple: #7928ca;
--tw-ring-offset-color: #fff;
--geist-console-text-color-pink: #eb367f;
--accents-1: #fafafa;
--color-indigo-600: lab(38.4009% 52.6132 -92.3857);
--geist-secondary: #666;
--color-gray-800: hsla(0, 0%, 49%, 1);
--ds-focus-border: 0 0 0 1px #00000057, 0px 0px 0px 4px #00000029;
--accents-5: #666;
--geist-foreground: #000;
--color-red-50: lab(96.5005% 4.18508 1.52328);
--color-gray-200: hsla(0, 0%, 92%, 1);
--next-icon-border: #000;
--geist-link-color: hsla(212, 100%, 48%, 1);
--color-neutral-800: lab(15.204% 0 -.00000596046);
--color-amber-50: lab(98.6252% -.635922 8.42309);
```

### Spacing

```css
--geist-space-64x: 256px;
--geist-space-small-negative: -32px;
--tw-space-x-reverse: 0;
--spacing-fluid-24-40: clamp(1.5rem, -.2143rem + 2.8571vi, 2.5rem);
--geist-space-16x: 64px;
--geist-space-large-negative: -48px;
--geist-space-gap-half-negative: -12px;
--geist-gap-half: 12px;
--geist-space-24x: 96px;
--spacing-fluid-16-24: clamp(1rem, .1429rem + 1.4286vi, 1.5rem);
--geist-space-2x-negative: -8px;
--geist-space-gap-quarter-negative: -8px;
--geist-space-large: 48px;
--geist-gap-half-negative: -12px;
--geist-space-32x-negative: -128px;
--tw-space-y-reverse: 0;
--geist-space-8x-negative: -32px;
--geist-gap-quarter: 8px;
--geist-space-3x: 12px;
--geist-gap-quarter-negative: -8px;
--geist-space-small: 32px;
--geist-gap: 24px;
--geist-space-48x-negative: -192px;
--font-space-grotesk: Space Grotesk, "Geist", Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
--geist-space-negative: -4px;
--ds-page-width-with-margin: calc(1400px + calc(2 * 24px));
--geist-page-width-with-margin: calc(1200px + calc(2 * 24px));
--geist-gap-double: 48px;
--geist-space-16x-negative: -64px;
--geist-space-gap: 24px;
--geist-space-gap-negative: -24px;
--geist-space-4x: 16px;
--geist-space-medium: 40px;
--geist-space-gap-quarter: 8px;
--geist-space-24x-negative: -96px;
--geist-space-48x: 192px;
--geist-gap-section: 32px;
--spacing: .25rem;
--geist-space-gap-half: 12px;
--spacing-fluid-20-24: clamp(1.25rem, .8214rem + .7143vi, 1.5rem);
--geist-space: 4px;
--geist-gap-negative: -24px;
--geist-space-32x: 128px;
--geist-gap-double-negative: -48px;
--geist-page-margin: 24px;
--geist-space-6x: 24px;
--geist-space-8x: 32px;
--geist-space-4x-negative: -16px;
--geist-space-64x-negative: -256px;
--spacing-fluid-20-32: clamp(1.25rem, -.0357rem + 2.1429vi, 2rem);
--geist-space-10x: 40px;
--geist-space-medium-negative: -40px;
--geist-space-2x: 8px;
```

### Typography

```css
--font-sans: "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--font-mono: "Geist Mono", Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
--ship-text: #ff5b4f;
--text-base--line-height: calc(1.5 / 1);
--tracking-wider: .05em;
--text-fluid-24-32: clamp(1.5rem, .6429rem + 1.4286vi, 2rem);
--text-fluid-24-28: clamp(1.5rem, 1.0714rem + .7143vi, 1.75rem);
--text-fluid-16-28: clamp(1rem, -.2857rem + 2.1429vi, 1.75rem);
--text-sm: .875rem;
--geist-form-small-font: .875rem;
--font-weight-thin: 100;
--geist-form-large-font: 1rem;
--text-fluid-14-24: clamp(.875rem, -.1964rem + 1.7857vi, 1.5rem);
--text-lg: 1.125rem;
--geist-form-small-line-height: .875rem;
--text-fluid-18-24: clamp(1.125rem, .4821rem + 1.0714vi, 1.5rem);
--default-font-family: "Geist", Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
--tracking-tighter: -.05em;
--develop-text: #0a72ef;
--text-fluid-14-20: clamp(.875rem, .2321rem + 1.0714vi, 1.25rem);
--font-weight-extrabold: 800;
--text-sm--line-height: calc(1.25 / .875);
--text-3xl--line-height: calc(2.25 / 1.875);
--text-3xl: 1.875rem;
--text-xs: .75rem;
--font-weight-medium: 500;
--font-weight-normal: 400;
--font-sans-fallback: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--text-base: 1rem;
--default-mono-font-family: "Geist Mono", ui-monospace, SFMono-Regular, Roboto Mono, Menlo, Monaco, Liberation Mono, DejaVu Sans Mono, Courier New, monospace, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
--preview-text: #de1d8d;
--text-fluid-32-64: clamp(2rem, -1.4286rem + 5.7143vi, 4rem);
--geist-text-gradient: linear-gradient(180deg, #000c 0%, #000 100%);
--text-fluid-64-128: clamp(4rem, -2.8571rem + 11.4286vi, 8rem);
--text-fluid-20-28: clamp(1.25rem, .3929rem + 1.4286vi, 1.75rem);
--font-weight-bold: 700;
--text-xs--line-height: calc(1 / .75);
--text-fluid-20-32: clamp(1.25rem, -.0357rem + 2.1429vi, 2rem);
--text-xl: 1.25rem;
--leading-relaxed: 1.625;
--geist-form-line-height: 1.25rem;
--text-2xl--line-height: calc(2 / 1.5);
--text-xl--line-height: calc(1.75 / 1.25);
--font-mono-fallback: "Roboto Mono", Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
--geist-form-font: .875rem;
--leading-tight: 1.25;
--text-fluid-20-80: clamp(1.25rem, -5.1786rem + 10.7143vi, 5rem);
--geist-form-large-line-height: 1.5rem;
--text-fluid-14-16: clamp(.875rem, .6607rem + .3571vi, 1rem);
--text-4xl--line-height: calc(2.5 / 2.25);
--tracking-tight: -.025em;
--text-2xl: 1.5rem;
--text-fluid-16-20: clamp(1rem, .5714rem + .7143vi, 1.25rem);
--text-fluid-32-80: clamp(2rem, -3.1429rem + 8.5714vi, 5rem);
--text-5xl--line-height: 1;
--leading-normal: 1.5;
--text-lg--line-height: calc(1.75 / 1.125);
--font-weight-light: 300;
--font-weight-semibold: 600;
--font-pixel-square: ;
--text-4xl: 2.25rem;
--tracking-normal: 0em;
--text-5xl: 3rem;
```

### Shadows

```css
--tw-inset-shadow: 0 0 #0000;
--dropdown-box-shadow: 0 4px 4px 0 #00000005;
--tw-shadow-alpha: 100%;
--ds-shadow-large: 0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a;
--shadow-sticky: 0 12px 10px -10px #0000001f;
--tw-drop-shadow-alpha: 100%;
--shadow-large: 0 30px 60px #0000001f;
--ds-shadow-small: 0px 2px 2px #0000000a;
--shadow-medium: 0 8px 30px #0000001f;
--ds-shadow-xl: 0px 1px 1px #00000005, 0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f;
--ds-shadow-modal: 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f, 0 0 0 1px hsla(0, 0%, 98%, 1);
--ds-shadow-medium: 0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a;
--tw-shadow: 0 0 #0000;
--shadow-hover: 0 30px 60px #0000001f;
--tw-inset-shadow-alpha: 100%;
--ds-shadow-2xl: 0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f;
--drop-shadow-lg: 0 4px 4px #00000026;
--shadow-smallest: 0px 2px 4px #0000001a;
--ds-shadow-tooltip: 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 4px 8px #0000000a, 0 0 0 1px hsla(0, 0%, 98%, 1);
--ds-shadow-xs: 0px 1px 2px #0000000a;
--ds-shadow-2xs: 0px 1px 1px #0000000a;
--shadow-small: 0 5px 10px #0000001f;
--ds-shadow-fullscreen: 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 8px 16px -4px #0000000a, 0px 24px 32px -8px #0000000f, 0 0 0 1px hsla(0, 0%, 98%, 1);
--shadow-extra-small: 0px 4px 8px #0000001f;
--ds-shadow-menu: 0 0 0 1px #00000014, 0px 1px 1px #00000005, 0px 4px 8px -4px #0000000a, 0px 16px 24px -8px #0000000f, 0 0 0 1px hsla(0, 0%, 98%, 1);
```

### Radii

```css
--geist-radius: 6px;
--geist-marketing-radius: 8px;
--radius-3xl: 1.5rem;
```

### Other

```css
--banner-min-height: 64px;
--blur-lg: 16px;
--geist-cyan-lighter: #aaffec;
--ds-amber-700: hsla(39, 100%, 57%, 1);
--ds-pink-300-value: 340, 82%, 94%;
--ease-in: cubic-bezier(.4, 0, 1, 1);
--geist-error: #e00;
--ds-amber-900: hsla(30, 100%, 32%, 1);
--ds-green-200: hsla(120, 60%, 95%, 1);
--tw-enter-scale: 1;
--ds-red-800-value: 358, 70%, 52%;
--geist-violet-lighter: #d8ccf1;
--ds-green-1000: hsla(128, 29%, 15%, 1);
--ds-red-1000: hsla(355, 49%, 15%, 1);
--wv-orange: #ffa400;
--ds-amber-800-value: 35, 100%, 52%;
--ds-gray-alpha-600: #00000057;
--animate-cmdkScaleIn: cmdkScaleIn .3s cubic-bezier(.175, .885, .32, 1.1);
--ds-pink-300: hsla(340, 82%, 94%, 1);
--develop-start-gradient: #007cf0;
--geist-violet-background-tertiary: #eae5f4;
--ds-gray-alpha-100: #0000000d;
--ds-teal-700-value: 173, 80%, 36%;
--tw-exit-translate-y: 0;
--ds-blue-1000: hsla(211, 100%, 15%, 1);
--tw-gradient-to-position: 100%;
--ds-amber-600: hsla(36, 90%, 62%, 1);
--ds-white: lab(100% 0 0);
--animate-sandbox-left-reverse: sandbox-left-reverse .5s ease-in-out forwards;
--ds-background-200: hsla(0, 0%, 98%, 1);
--ds-red-500-value: 0, 82%, 85%;
--dropdown-triangle-stroke: #fff;
--ds-blue-400: hsla(209, 100%, 90%, 1);
--animate-flip-front: flip-front .5s cubic-bezier(.4, .04, .04, 1) forwards;
--ds-teal-700: hsla(173, 80%, 36%, 1);
--ds-green-800: hsla(132, 43%, 39%, 1);
--ds-red-200: hsla(0, 100%, 96%, 1);
--geist-highlight-magenta: #eb367f;
--ds-purple-1000: hsla(276, 100%, 15%, 1);
--vh100-offset: calc(64px + 0px);
--ds-green-100-value: 120, 60%, 96%;
--ds-gray-500: hsla(0, 0%, 79%, 1);
--scroller-start: #fff;
--vaul-overlay-background-end: #0006;
--ds-purple-800: hsla(272, 47%, 45%, 1);
--ds-purple-300: hsla(274, 78%, 95%, 1);
--ds-amber-500: hsla(38, 100%, 71%, 1);
--tw-scale-y: 1;
--animate-cmdkFadeIn: cmdkFadeIn .3s cubic-bezier(.175, .885, .32, 1.1);
--scroller-end: #fff0;
--ds-red-700-value: 358, 75%, 59%;
--geist-background-rgb: 255, 255, 255;
--tw-exit-translate-x: 0;
--ds-blue-1000-value: 211, 100%, 15%;
--ds-pink-500-value: 340, 75%, 84%;
--ds-blue-200-value: 210, 100%, 96%;
--header-zindex: 75;
--ds-gray-500-value: 0, 0%, 79%;
--animate-blue-glow: blue-glow 3s ease-in-out infinite;
--ds-blue-100: hsla(212, 100%, 97%, 1);
--ds-gray-700: hsla(0, 0%, 56%, 1);
--ds-teal-800-value: 173, 83%, 30%;
--animate-sandbox-left: sandbox-left .5s ease-in-out forwards;
--ds-teal-200-value: 167, 70%, 94%;
--ds-amber-700-value: 39, 100%, 57%;
--animate-dialogFadeIn: ;
--ds-purple-400-value: 276, 71%, 92%;
--ds-contrast-fg: #fff;
--tw-enter-blur: 0;
--animate-cmdkScaleOut: cmdkScaleOut .3s cubic-bezier(.175, .885, .32, 1.1);
--ds-amber-1000-value: 20, 79%, 17%;
--ds-red-700: hsla(358, 75%, 59%, 1);
--container-xl: 1200px;
--geist-highlight-purple: #f81ce5;
--ds-red-400-value: 0, 90%, 92%;
--ds-teal-500: hsla(170, 70%, 72%, 1);
--geist-code: #000;
--ds-gray-1000-value: 0, 0%, 9%;
--ds-teal-1000-value: 171, 80%, 13%;
--ds-blue-800-value: 212, 100%, 41%;
--geist-warning-lighter: #ffefcf;
--tw-animation-direction: normal;
--ds-blue-400-value: 209, 100%, 90%;
--ds-pink-900-value: 336, 65%, 45%;
--animate-feedbackFadeIn: feedbackFadeIn .1s cubic-bezier(.16, 1, .3, 1);
--geist-page-width: 1200px;
--ds-purple-100: hsla(276, 100%, 97%, 1);
--ds-gray-200-value: 0, 0%, 92%;
--ds-red-500: hsla(0, 82%, 85%, 1);
--tw-divide-x-reverse: 0;
--ds-blue-600-value: 208, 100%, 66%;
--animate-slide-in: slide-in 1.25s cubic-bezier(.4, .04, .04, 1) forwards;
--preview-end-gradient: #ff0080;
--tw-exit-rotate: 0;
--develop-end-gradient: #00dfd8;
--ds-purple-600-value: 273, 72%, 73%;
--ds-blue-700: hsla(212, 100%, 48%, 1);
--ds-purple-300-value: 274, 78%, 95%;
--ds-amber-600-value: 36, 90%, 62%;
--container-sm: 401px;
--ds-green-100: hsla(120, 60%, 96%, 1);
--animate-feedbackAppear: feedbackAppear .5s .1s ease forwards;
--ds-gray-alpha-800: #00000082;
--animate-loading-skeleton: loading-skeleton 1.5s ease-in-out infinite reverse;
--ds-gray-900-value: 0, 0%, 30%;
--header-sub-menu-height: 46px;
--ds-gray-200: hsla(0, 0%, 92%, 1);
--ds-overlay-backdrop-opacity: .8;
--ds-blue-500-value: 209, 100%, 80%;
--animate-flip-back: flip-back .5s cubic-bezier(.4, .04, .04, 1) forwards;
--ds-green-700: hsla(131, 41%, 46%, 1);
--ds-amber-100-value: 39, 100%, 95%;
--ds-pink-200: hsla(340, 90%, 96%, 1);
--tw-gradient-from-position: 0%;
--ds-pink-700: hsla(336, 80%, 58%, 1);
--ds-blue-300: hsla(210, 100%, 94%, 1);
--wv-green: #0cce6b;
--ds-gray-700-value: 0, 0%, 56%;
--ds-gray-alpha-700: #00000070;
--ds-gray-300-value: 0, 0%, 90%;
--ds-pink-1000: hsla(333, 74%, 15%, 1);
--ds-red-300-value: 0, 100%, 95%;
--ds-gray-alpha-400: #00000014;
--animate-thinking-loader-fast: thinking-loader .85s linear infinite;
--geist-console-purple: #7928ca;
--ds-purple-900-value: 274, 71%, 43%;
--ds-gray-400-value: 0, 0%, 92%;
--tw-animation-fill-mode: none;
--tw-exit-blur: 0;
--animate-feedbackFadeOut: feedbackFadeOut .2s cubic-bezier(.16, 1, .3, 1) forwards;
--ds-pink-500: hsla(340, 75%, 84%, 1);
--ds-red-900-value: 358, 66%, 48%;
--ds-pink-100-value: 330, 100%, 96%;
--geist-highlight-pink: #ff0080;
--geist-cyan-light: #79ffe1;
--ds-green-600: hsla(125, 60%, 64%, 1);
--ds-red-1000-value: 355, 49%, 15%;
--vaul-overlay-background-start: #0000;
--geist-cyan: #50e3c2;
--ds-green-900: hsla(133, 50%, 32%, 1);
--ds-pink-900: hsla(336, 65%, 45%, 1);
--tw-enter-translate-x: 0;
--container-4xl: 56rem;
--ds-purple-1000-value: 276, 100%, 15%;
--animate-fade-in: fade-in 1.25s cubic-bezier(.4, .04, .04, 1) forwards;
--ds-amber-800: hsla(35, 100%, 52%, 1);
--ds-green-700-value: 131, 41%, 46%;
--preview-line-end: #9a1fb8;
--ds-amber-400-value: 42, 100%, 78%;
--ds-gray-alpha-500: #00000036;
--ds-green-300: hsla(120, 60%, 91%, 1);
--animate-fadeInTooltipFaster: fadeInTooltip .1s ease-in .1s forwards;
--ds-green-300-value: 120, 60%, 91%;
--ds-blue-900: hsla(211, 100%, 42%, 1);
--ds-gray-600: hsla(0, 0%, 66%, 1);
--ds-purple-500: hsla(274, 70%, 82%, 1);
--ds-pink-800: hsla(336, 74%, 51%, 1);
--ds-green-400: hsla(122, 60%, 86%, 1);
--ds-blue-500: hsla(209, 100%, 80%, 1);
--ds-green-900-value: 133, 50%, 32%;
--ds-amber-300-value: 43, 96%, 90%;
--animate-blink: blink 1s infinite;
--ds-amber-400: hsla(42, 100%, 78%, 1);
--tw-enter-opacity: 1;
--ds-motion-overlay-scale: .96;
--geist-form-height: 40px;
--container-md: 601px;
--header-height: 64px;
--aspect-video: 16 / 9;
--ds-teal-100: hsla(169, 70%, 96%, 1);
--ds-green-1000-value: 128, 29%, 15%;
--develop-line-end: #019ae9;
--ds-blue-600: hsla(208, 100%, 66%, 1);
--animate-loading: loading 8s ease-in-out infinite;
--tw-animation-delay: 0s;
--animate-marquee: marquee 40s linear infinite;
--ds-green-800-value: 132, 43%, 39%;
--ds-amber-500-value: 38, 100%, 71%;
--geist-success-light: #3291ff;
--tw-outline-style: solid;
--geist-warning-light: #f7b955;
--geist-cyan-dark: #29bc9b;
--geist-success-dark: #0761d1;
--geist-form-small-height: 32px;
--header-import-flow-background: #fafafacc;
--ds-black: lab(0% 0 0);
--ds-pink-200-value: 340, 90%, 96%;
--ds-blue-200: hsla(210, 100%, 96%, 1);
--tw-gradient-from: rgba(0, 0, 0, 0);
--tw-gradient-to: rgba(0, 0, 0, 0);
--ds-pink-600: hsla(341, 75%, 73%, 1);
--ds-gray-800: hsla(0, 0%, 49%, 1);
--geist-violet-light: #8a63d2;
--ds-teal-1000: hsla(171, 80%, 13%, 1);
--ds-gray-300: hsla(0, 0%, 90%, 1);
--ds-purple-600: hsla(273, 72%, 73%, 1);
--tw-gradient-via-position: 50%;
--ds-amber-1000: hsla(20, 79%, 17%, 1);
--ds-amber-200: hsla(44, 100%, 92%, 1);
--ds-teal-300-value: 168, 70%, 90%;
--default-transition-duration: .15s;
--animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
--ds-pink-700-value: 336, 80%, 58%;
--container-xs: 20rem;
--ds-gray-1000: hsla(0, 0%, 9%, 1);
--ds-purple-200-value: 277, 87%, 97%;
--ds-teal-400-value: 170, 70%, 85%;
--ds-green-600-value: 125, 60%, 64%;
--banner-height: 0px;
--ds-red-200-value: 0, 100%, 96%;
--ds-blue-900-value: 211, 100%, 42%;
--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
--tw-animation-iteration-count: 1;
--tw-exit-opacity: 1;
--ds-teal-500-value: 170, 70%, 72%;
--ds-motion-overlay-timing: cubic-bezier(.175, .885, .32, 1.1);
--ds-pink-800-value: 336, 74%, 51%;
--tw-translate-z: 0;
--tw-gradient-via: rgba(0, 0, 0, 0);
--ds-pink-400: hsla(341, 76%, 91%, 1);
--geist-violet-dark: #4c2889;
--ai-chat-panel-width: 0px;
--container-3xl: 48rem;
--blur-xs: 4px;
--tw-translate-y: 0;
--ease-out: cubic-bezier(0, 0, .2, 1);
--ship-start-gradient: #ff4d4d;
--ds-gray-100: hsla(0, 0%, 95%, 1);
--ds-page-width: 1400px;
--tw-content: "";
--ds-teal-100-value: 169, 70%, 96%;
--animate-thinking-loader: thinking-loader 1.5s linear infinite;
--ds-purple-500-value: 274, 70%, 82%;
--ds-teal-300: hsla(168, 70%, 90%, 1);
--tw-translate-x: 0;
--tw-enter-rotate: 0;
--ds-gray-100-value: 0, 0%, 95%;
--ds-gray-alpha-1000: #000000e8;
--geist-error-lighter: #f7d4d6;
--animate-bounce: bounce 1s infinite;
--ds-red-300: hsla(0, 100%, 95%, 1);
--ds-purple-900: hsla(274, 71%, 43%, 1);
--ds-background-100: hsla(0, 0%, 100%, 1);
--ds-gray-alpha-300: #0000001a;
--animate-fadeInTooltip: fadeInTooltip .1s ease-in .4s forwards;
--ds-red-400: hsla(0, 90%, 92%, 1);
--geist-marketing-gray: #fafbfc;
--ds-red-600: hsla(359, 90%, 71%, 1);
--ds-blue-300-value: 210, 100%, 94%;
--ds-teal-900-value: 174, 91%, 25%;
--ds-motion-timing-swift: cubic-bezier(.175, .885, .32, 1.1);
--ds-pink-400-value: 341, 76%, 91%;
--ds-pink-1000-value: 333, 74%, 15%;
--ds-purple-400: hsla(276, 71%, 92%, 1);
--ds-blue-800: hsla(212, 100%, 41%, 1);
--ds-amber-900-value: 30, 100%, 32%;
--geist-form-large-height: 48px;
--animate-ping: ping 1s cubic-bezier(0, 0, .2, 1) infinite;
--geist-warning: #f5a623;
--geist-error-dark: #c50000;
--ds-motion-overlay-duration: .3s;
--ds-purple-800-value: 272, 47%, 45%;
--ds-gray-alpha-900: #000000b3;
--wv-red: #ff4e42;
--ds-gray-900: hsla(0, 0%, 30%, 1);
--geist-violet: #7928ca;
--ship-line-end: #f9cb28;
--geist-console-header: #efe7ed;
--blur-xl: 24px;
--geist-success-lighter: #d3e5ff;
--ds-red-100-value: 0, 100%, 97%;
--geist-error-light: #ff1a1a;
--animate-accordion-down: accordion-down .2s ease-out;
--ds-purple-100-value: 276, 100%, 97%;
--tw-scale-z: 1;
--ds-red-800: hsla(358, 70%, 52%, 1);
--ds-purple-700-value: 272, 51%, 54%;
--ds-amber-300: hsla(43, 96%, 90%, 1);
--tw-scroll-snap-strictness: proximity;
--ds-green-500: hsla(124, 60%, 75%, 1);
--ds-background-200-value: 0, 0%, 98%;
--container-lg: 961px;
--geist-highlight-yellow: #fff500;
--ds-green-400-value: 122, 60%, 86%;
--ds-blue-700-value: 212, 100%, 48%;
--ds-pink-100: hsla(330, 100%, 96%, 1);
--ds-teal-600: hsla(170, 70%, 57%, 1);
--geist-success: #0070f3;
--ds-gray-alpha-200: #00000014;
--ds-green-500-value: 124, 60%, 75%;
--ds-gray-400: hsla(0, 0%, 92%, 1);
--ease-in-out: cubic-bezier(.4, 0, .2, 1);
--animate-cmdkFadeOut: cmdkFadeOut .3s cubic-bezier(.175, .885, .32, 1.1);
--vaul-overlay-background: 255, 255, 255;
--ds-gray-600-value: 0, 0%, 66%;
--value: 0;
--animate-accordion-up: accordion-up .2s ease-out;
--animate-sandbox-right: sandbox-right .5s ease-in-out forwards;
--preview-start-gradient: #7928ca;
--animate-logo-carousel: logo-carousel ease-in-out infinite;
--ds-teal-900: hsla(174, 91%, 25%, 1);
--container-5xl: 64rem;
--ds-amber-100: hsla(39, 100%, 95%, 1);
--animate-sandbox-right-reverse: sandbox-right-reverse .5s ease-in-out forwards;
--ds-red-900: hsla(358, 66%, 48%, 1);
--footer-height: 79px;
--geist-background: #fff;
--perspective-distant: 1200px;
--ds-red-600-value: 359, 90%, 71%;
--ds-background-100-value: 0, 0%, 100%;
--geist-selection: hsla(0, 0%, 9%, 1);
--ds-teal-400: hsla(170, 70%, 85%, 1);
--ds-purple-700: hsla(272, 51%, 54%, 1);
--animate-spin: spin 1s linear infinite;
--geist-warning-dark: #ab570a;
--ds-gray-800-value: 0, 0%, 49%;
--ds-blue-100-value: 212, 100%, 97%;
--tw-divide-y-reverse: 0;
--ds-teal-200: hsla(167, 70%, 94%, 1);
--container-2xl: 1400px;
--tw-exit-scale: 1;
--ds-purple-200: hsla(277, 87%, 97%, 1);
--ds-amber-200-value: 44, 100%, 92%;
--tw-scale-x: 1;
--tw-enter-translate-y: 0;
--animate-dialogFadeOut: ;
--ds-teal-600-value: 170, 70%, 57%;
--ds-green-200-value: 120, 60%, 95%;
--ship-end-gradient: #f9cb28;
--ds-red-100: hsla(0, 100%, 97%, 1);
--geist-violet-background: #fff;
--ds-pink-600-value: 341, 75%, 73%;
--ds-teal-800: hsla(173, 83%, 30%, 1);
--blur-sm: 8px;
--animate-cmdkLoading: cmdkLoading 1.1s cubic-bezier(.455, .03, .515, .955) infinite;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 370px | max-width |
| xs | 374px | max-width |
| xs | 383px | max-width |
| 400px | 400px | max-width |
| 401px | 401px | min-width |
| sm | 427px | max-width |
| sm | 440px | max-width |
| sm | 450px | max-width |
| sm | 470px | min-width |
| sm | 480px | max-width |
| sm | 500px | max-width |
| sm | 600px | max-width |
| sm | 601px | max-width |
| sm | 610px | min-width |
| sm | 640px | max-width |
| sm | 650px | min-width |
| sm | 660px | max-width |
| sm | 670px | max-width |
| md | 750px | max-width |
| md | 768px | max-width |
| md | 769px | min-width |
| md | 800px | max-width |
| lg | 960px | max-width |
| lg | 961px | min-width |
| lg | 992px | min-width |
| lg | 1000px | max-width |
| lg | 1020px | max-width |
| lg | 1024px | max-width |
| lg | 1036px | min-width |
| lg | 1050px | max-width |
| lg | 1070px | max-width |
| lg | 1080px | max-width |
| 1100px | 1100px | max-width |
| 1108px | 1108px | max-width |
| 1120px | 1120px | max-width |
| 1150px | 1150px | max-width |
| 1151px | 1151px | min-width |
| 1200px | 1200px | min-width |
| xl | 1250px | max-width |
| 2300px | 2300px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.2s`, `0.09s`, `0.15s`, `0.3s`, `0.4s`, `0.16s`, `0.1s`, `0.25s`

### Common Transitions

```css
transition: all;
transition: box-shadow 0.2s, background-color 0.2s;
transition: color 0.09s, background 0.09s;
transition: rotate 0.2s;
transition: color 0.15s ease-in-out;
transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s;
transition: border-color 0.3s cubic-bezier(0.39, 0.18, 0.17, 0.99), background 0.3s cubic-bezier(0.39, 0.18, 0.17, 0.99), color 0.3s cubic-bezier(0.39, 0.18, 0.17, 0.99), transform 0.3s cubic-bezier(0.39, 0.18, 0.17, 0.99), box-shadow 0.3s cubic-bezier(0.39, 0.18, 0.17, 0.99), width 0.4s cubic-bezier(0.39, 0.18, 0.17, 0.99);
transition: cubic-bezier(0.14, 0.55, 0.3, 0.92);
transition: box-shadow 0.2s;
```

### Keyframe Animations

**soft-fade-in**
```css
@keyframes soft-fade-in {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}
```

**show**
```css
@keyframes show {
  0% { transform: translate3d(0, var(--translate-y-start), 0); opacity: 0; }
  100% { transform: translate3d(0, var(--translate-y-end), 0); opacity: 1; }
}
```

**hide**
```css
@keyframes hide {
  0% { transform: translate3d(0, var(--translate-y-end), 0); opacity: 1; }
  100% { transform: translate3d(0, var(--translate-y-start), 0); opacity: 0; }
}
```

**fade-in**
```css
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**fade-out**
```css
@keyframes fade-out {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

**spinner-opacity**
```css
@keyframes spinner-opacity {
  0% { opacity: 1; }
  100% { opacity: 0.15; }
}
```

**slide-in**
```css
@keyframes slide-in {
  0% { opacity: 0; transform: translateY(75%); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

**blue-glow**
```css
@keyframes blue-glow {
  0%, 100% { box-shadow: 0 0 10px var(--ds-blue-200), 0 0 20px var(--ds-blue-100); }
  50% { box-shadow: 0 0 30px var(--ds-blue-400), 0 0 60px var(--ds-blue-200); }
}
```

**thinking-loader**
```css
@keyframes thinking-loader {
  0% { background-position: 100% center; }
  100% { background-position: 0% center; }
}
```

**logo-carousel**
```css
@keyframes logo-carousel {
  0% { opacity: 0; }
  3% { opacity: 1; }
  22% { opacity: 1; }
  25% { opacity: 0; }
  100% { opacity: 0; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (37 instances)

```css
.button {
  background-color: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 6px;
  border-radius: 100px;
}
```

### Cards (18 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 2px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Inputs (6 instances)

```css
.input {
  color: rgb(23, 23, 23);
  border-color: rgb(23, 23, 23);
  border-radius: 0px;
  font-size: 14px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (134 instances)

```css
.link {
  color: rgb(102, 102, 102);
  font-size: 14px;
  font-weight: 400;
}
```

### Navigation (275 instances)

```css
.navigatio {
  color: rgb(77, 77, 77);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
}
```

### Footer (10 instances)

```css
.foote {
  color: rgb(23, 23, 23);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 14px;
}
```

### Dropdowns (273 instances)

```css
.dropdown {
  border-radius: 0px;
  border-color: rgb(235, 235, 235);
  padding-top: 0px;
}
```

### Badges (13 instances)

```css
.badge {
  background-color: rgb(235, 245, 255);
  color: rgb(77, 77, 77);
  font-size: 14px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Tabs (8 instances)

```css
.tab {
  color: rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 16px;
  border-color: rgb(23, 23, 23);
  border-radius: 64px;
}
```

### Tooltips (1 instances)

```css
.tooltip {
  background-color: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  font-size: 16px;
  border-radius: 6px;
  padding-top: 0px;
  padding-right: 0px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px 4px 8px 0px, rgb(250, 250, 250) 0px 0px 0px 1px, rgb(255, 255, 255) 0px 0px 0px 1px;
}
```

### Switches (12 instances)

```css
.switche {
  background-color: rgb(23, 23, 23);
  border-radius: 0px;
  border-color: rgb(235, 235, 235);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 5 instances, 3 variants

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(77, 77, 77);
  padding: 8px 12px 8px 12px;
  border-radius: 9999px;
  border: 0px none rgb(77, 77, 77);
  font-size: 14px;
  font-weight: 400;
```

**Variant 2** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  padding: 0px 6px 0px 6px;
  border-radius: 6px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 14px;
  font-weight: 500;
```

**Variant 3** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(77, 77, 77);
  padding: 0px 0px 0px 0px;
  border-radius: 6px;
  border: 0px none rgb(77, 77, 77);
  font-size: 14px;
  font-weight: 500;
```

### Button — 15 instances, 2 variants

**Variant 1** (10 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  padding: 0px 6px 0px 6px;
  border-radius: 6px;
  border: 0px none rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 500;
```

**Variant 2** (5 instances)

```css
  background: rgb(23, 23, 23);
  color: rgb(255, 255, 255);
  padding: 0px 6px 0px 6px;
  border-radius: 6px;
  border: 0px none rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
```

### Button — 9 instances, 2 variants

**Variant 1** (6 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 6px 0px 6px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 14px;
  font-weight: 500;
```

**Variant 2** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 6px 0px 6px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 14px;
  font-weight: 500;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 400;
```

### Button — 10 instances, 2 variants

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 6px 0px 6px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 14px;
  font-weight: 500;
```

**Variant 2** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 6px 0px 6px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 500;
```

### Button — 4 instances, 2 variants

**Variant 1** (2 instances)

```css
  background: rgb(23, 23, 23);
  color: rgb(255, 255, 255);
  padding: 0px 6px 0px 6px;
  border-radius: 100px;
  border: 0px none rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
```

**Variant 2** (2 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  padding: 0px 10px 0px 10px;
  border-radius: 100px;
  border: 0px none rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 500;
```

### Button — 4 instances, 2 variants

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 14px;
  font-weight: 500;
```

**Variant 2** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 14px;
  font-weight: 500;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 6px 0px 6px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 500;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 16px 0px 16px;
  border-radius: 64px;
  border: 0px none rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 16px 0px 16px;
  border-radius: 64px;
  border: 0px none rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 400;
```

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(23, 23, 23);
  padding: 14px 2px 14px 2px;
  border-radius: 0px;
  border: 0px 0px 2px none none solid rgb(23, 23, 23);
  font-size: 14px;
  font-weight: 400;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(77, 77, 77);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(235, 235, 235);
  font-size: 14px;
  font-weight: 500;
```

### Card — 6 instances, 1 variant

**Variant 1** (6 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(23, 23, 23);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 1px solid rgb(235, 235, 235);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**56 grid containers** and **500 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1280px | 0px |
| 1080px | 0px |
| 1448px | 24px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 45x |
| 3-column | 9x |
| 12-column | 1x |
| 6-column | 1x |

### Grid Templates

```css
grid-template-columns: 359.656px 359.656px 359.656px;
grid-template-columns: 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px 89.9062px;
grid-template-columns: 359.656px 359.656px 359.656px;
grid-template-columns: 359.656px 359.656px 359.656px;
grid-template-columns: 359.656px 359.656px 359.656px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 347x |
| column/nowrap | 147x |
| row/wrap | 5x |
| column-reverse/nowrap | 1x |

**Gap values:** `10px`, `12px`, `14px`, `16px`, `20px`, `24px`, `2px`, `32px`, `32px 8px`, `40px`, `4px`, `6px`, `8px`, `96px`

## Accessibility (WCAG 2.1)

**Overall Score: 67%** — 4 passing, 2 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#0072f5` | `#ffffff` | 4.44:1 | FAIL | a (1x) |
| `#0068d6` | `#cce6ff` | 4.13:1 | FAIL | span (1x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#4d4d4d` | `#ffffff` | 8.45:1 | AAA |
| `#4d4d4d` | `#fafafa` | 8.1:1 | AAA |

## Design System Score

**Overall: 78/100 (Grade: C)**

| Category | Score |
|----------|-------|
| Color Discipline | 80/100 |
| Typography Consistency | 82/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 78/100 |
| Border Radius Consistency | 80/100 |
| Accessibility | 67/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Well-defined spacing scale, Good CSS variable tokenization

**Issues:**
- 2 WCAG contrast failures
- 1267 !important rules — prefer specificity over overrides
- 12166 duplicate CSS declarations

## Gradients

**11 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| conic | from 180deg at 50% 70% | 6 | complex |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |
| linear | to right | 4 | bold |
| linear | — | 4 | bold |

```css
background: conic-gradient(from 180deg at 50% 70%, rgba(250, 250, 250, 0) 0deg, rgb(238, 195, 45) 72deg, rgb(236, 75, 75) 144deg, rgb(112, 154, 185) 216deg, rgb(77, 255, 191) 288deg, rgba(250, 250, 250, 0) 360deg);
background: linear-gradient(to right, rgb(235, 235, 235), rgb(235, 235, 235) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
background: linear-gradient(rgb(235, 235, 235), rgb(235, 235, 235) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
background: linear-gradient(to right, rgb(212, 238, 247), rgb(212, 238, 247) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
background: linear-gradient(rgb(212, 238, 247), rgb(212, 238, 247) 50%, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0));
```

## Z-Index Map

**14 unique z-index values** across 4 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 1000,999999999 | a.f.i.x.e.d. .-.m.-.p.x. .o.v.e.r.f.l.o.w.-.h.i.d.d.e.n. .w.h.i.t.e.s.p.a.c.e.-.n.o.w.r.a.p. .b.o.r.d.e.r.-.0. .t.o.p.-.1.6. .l.e.f.t.-.1.2. .z.-.[.1.0.0.0.]. .h.-.3.2. .f.l.e.x. .i.t.e.m.s.-.c.e.n.t.e.r. .o.u.t.l.i.n.e.-.n.o.n.e. .t.e.x.t.-.[.v.a.r.(.-.-.g.e.i.s.t.-.l.i.n.k.-.c.o.l.o.r.).]. .p.x.-.1.2. .p.y.-.0. .b.g.-.[.v.a.r.(.-.-.g.e.i.s.t.-.b.a.c.k.g.r.o.u.n.d.).]. .s.h.a.d.o.w.-.[.0._.0._.0._.2.p.x._.v.a.r.(.-.-.g.e.i.s.t.-.b.a.c.k.g.r.o.u.n.d.).,.0._.0._.0._.4.p.x._.v.a.r.(.-.-.g.e.i.s.t.-.l.i.n.k.-.c.o.l.o.r.).]. .r.o.u.n.d.e.d.-.[.v.a.r.(.-.-.g.e.i.s.t.-.r.a.d.i.u.s.).]. .o.p.a.c.i.t.y.-.0. .p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e. .f.o.c.u.s.:.o.p.a.c.i.t.y.-.1.0.0. .f.o.c.u.s.:.[.p.o.i.n.t.e.r.-.e.v.e.n.t.s.:._.a.l.l.], div.w.-.f.u.l.l. .h.-.f.u.l.l. .i.n.s.e.t.-.0. .f.i.x.e.d. .p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e. .z.-.[.1.0.0.0.0.0.], div.a.b.s.o.l.u.t.e. .b.g.-.b.a.c.k.g.r.o.u.n.d.-.1.0.0. .b.g.-.c.l.i.p.-.p.a.d.d.i.n.g. .r.o.u.n.d.e.d.-.[.6.p.x.]. .o.v.e.r.f.l.o.w.-.v.i.s.i.b.l.e. .p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e. .z.-.[.1.0.0.0.0.0.0.]. .s.h.a.d.o.w.-.[.v.a.r.(.-.-.d.s.-.s.h.a.d.o.w.-.t.o.o.l.t.i.p.).,.0._.0._.0._.1.p.x._.v.a.r.(.-.-.d.s.-.b.a.c.k.g.r.o.u.n.d.-.1.0.0.).]. .w.-.f.i.t. .[.-.-.c.o.n.t.e.x.t.-.c.a.r.d.-.t.i.p.-.s.t.r.o.k.e.:.#.D.B.D.B.D.B.]. .d.a.r.k.-.t.h.e.m.e.:.[.-.-.c.o.n.t.e.x.t.-.c.a.r.d.-.t.i.p.-.s.t.r.o.k.e.:.#.2.5.2.5.2.5.]. .!.t.r.a.n.s.i.t.i.o.n.-.n.o.n.e |
| dropdown | 100,100 | aside.s.h.r.i.n.k.-.0. .z.-.[.1.0.0.]. .s.t.i.c.k.y. .h.-.s.c.r.e.e.n. .t.o.p.-.0. .r.i.g.h.t.-.0. .t.r.a.n.s.i.t.i.o.n.-.t.r.a.n.s.f.o.r.m.a.t.i.o.n. .e.a.s.e.-.i.n.-.o.u.t. .t.r.a.n.s.i.t.i.o.n.-.[.w.i.d.t.h.]. .d.u.r.a.t.i.o.n.-.2.5.0. .w.-.0. .o.v.e.r.f.l.o.w.-.h.i.d.d.e.n |
| sticky | 10,80 | div.d.o.m.a.i.n.s.-.m.o.d.u.l.e._._.k.m.v.S.I.a._._.w.i.n.d.o.w, div.h.e.a.d.e.r.-.m.o.d.u.l.e._._.6.n.z.V.r.W._._.w.r.a.p.p.e.r. .h.e.a.d.e.r.-.m.o.d.u.l.e._._.6.n.z.V.r.W._._.s.t.i.c.k.y. .h.e.a.d.e.r.-.m.o.d.u.l.e._._.6.n.z.V.r.W._._.c.a.n.G.r.o.w. .h.e.a.d.e.r.-.m.o.d.u.l.e._._.6.n.z.V.r.W._._.t.r.a.n.s.p.a.r.e.n.t.U.n.t.i.l.S.c.r.o.l.l, div.m.o.b.i.l.e.-.m.e.n.u.-.m.o.d.u.l.e._._.A.r.r.J.Y.G._._.r.o.o.t |
| base | 0,9 | div.g.r.i.d.-.m.o.d.u.l.e._._.A.M.T.I.x.G._._.b.l.o.c.k. .h.e.r.o.-.m.o.d.u.l.e._._.p.X.b.8.l.W._._.g.r.a.d.i.e.n.t, div.g.r.i.d.-.m.o.d.u.l.e._._.A.M.T.I.x.G._._.g.u.i.d.e.s, div.g.r.i.d.-.m.o.d.u.l.e._._.A.M.T.I.x.G._._.g.u.i.d.e.s |

**Issues:**
- [object Object]

## SVG Icons

**89 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 7 |
| sm | 68 |
| lg | 9 |
| xl | 5 |

**Icon colors:** `currentColor`, `rgb(0, 0, 0)`, `white`, `black`, `var(--ds-gray-1000)`, `url(#paint0_linear_53_108_r_b_)`, `url(#paint1_linear_53_108_r_b_)`, `red`, `url(#paint0_linear_53_108_r_c_)`, `url(#paint1_linear_53_108_r_c_)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Space Mono | self-hosted | 400 | normal |
| Space Grotesk | cdn | 400, 500 | normal |
| Roboto Mono | cdn | 400, 500, 700 | normal |
| Geist Mono | self-hosted | 100 900 | normal |
| Geist | self-hosted | 100 900 | normal |
| KaTeX_AMS | self-hosted | 400 | normal |
| KaTeX_Caligraphic | self-hosted | 400, 700 | normal |
| KaTeX_Fraktur | self-hosted | 400, 700 | normal |
| KaTeX_Main | self-hosted | 400, 700 | normal, italic |
| KaTeX_Math | self-hosted | 400, 700 | italic |
| KaTeX_SansSerif | self-hosted | 400, 700 | normal, italic |
| KaTeX_Script | self-hosted | 400 | normal |
| KaTeX_Size1 | self-hosted | 400 | normal |
| KaTeX_Size2 | self-hosted | 400 | normal |
| KaTeX_Size3 | self-hosted | 400 | normal |
| KaTeX_Size4 | self-hosted | 400 | normal |
| KaTeX_Typewriter | self-hosted | 400 | normal |
| DSEG7 Classic | self-hosted | 700 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 8 | objectFit: fill, borderRadius: 0px, shape: square |
| gallery | 1 | objectFit: fill, borderRadius: 0px, shape: square |
| general | 1 | objectFit: fill, borderRadius: 8px, shape: rounded |

**Aspect ratios:** 2.79:1 (3x), 3:2 (1x), 1.16:1 (1x), 4.76:1 (1x), 9.34:1 (1x), 3.66:1 (1x), 3.99:1 (1x), 1:1 (1x)

## Motion Language

**Feel:** springy · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `90ms` | 90 |
| `sm` | `160ms` | 160 |
| `md` | `300ms` | 300 |

### Easing Families

- **ease-in-out** (38 uses) — `ease`
- **custom** (14 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`, `cubic-bezier(0.39, 0.18, 0.17, 0.99)`, `cubic-bezier(0.33, 0.12, 0.15, 1)`
- **ease-out** (2 uses) — `cubic-bezier(0.14, 0.55, 0.3, 0.92)`, `cubic-bezier(0.3, 0.57, 0.07, 0.95)`
- **spring** (2 uses) — `cubic-bezier(0.31, 0.05, 0.43, 1.02)`

### Spring / Overshoot Easings

- `cubic-bezier(0.31, 0.05, 0.43, 1.02)`

## Component Anatomy

### button — 64 instances

**Slots:** label, icon
**Variants:** outline · link · tertiary
**Sizes:** medium · md · xs

| variant | count | sample label |
|---|---|---|
| default | 59 | Products |
| link | 3 | Sign Up
Sign Up |
| outline | 1 | Ask AI |
| tertiary | 1 |  |

### card — 6 instances

**Slots:** media

## Brand Voice

**Tone:** neutral · **Pronoun:** you-only · **Headings:** Title Case (tight)

### Top CTA Verbs

- **get** (6)
- **sign** (5)
- **learn** (4)
- **start** (3)
- **log** (2)
- **ai** (2)
- **deploy** (2)
- **enterprise** (2)

### Button Copy Patterns

- "sign up" (4×)
- "log in" (2×)
- "get your ticket" (2×)
- "start deploying" (2×)
- "get a demo" (2×)
- "deploy ai apps in seconds" (2×)
- "enterprise" (2×)
- "security" (2×)
- "more about infrastructure" (2×)
- "learn about enterprise" (2×)

### Sample Headings

> Build and deploy on the AI Cloud.
> Build and deploy on the AI Cloud.
> Your product, delivered.
> Agents
> AI Apps
> Build and deploy on the AI Cloud.
> Build and deploy on the AI Cloud.
> Your product, delivered.
> Agents
> AI Apps

## Page Intent

**Type:** `landing` (confidence 0.61)
**Description:** Vercel gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized web.

Alternates: blog-post (0.35)

## Section Roles

Reading order (top→bottom): feature-grid → hero → sidebar → nav → feature-grid → hero → feature-grid → feature-grid → nav → nav → nav → nav → nav → feature-grid → feature-grid → feature-grid → cta → feature-grid → feature-grid → feature-grid → footer → nav

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | feature-grid | — | 0.8 |
| 1 | nav | — | 0.9 |
| 2 | feature-grid | Build and deploy on the AI Cloud. | 0.8 |
| 3 | hero | Build and deploy on the AI Cloud. | 0.85 |
| 4 | hero | Build and deploy on the AI Cloud. | 0.85 |
| 5 | feature-grid | — | 0.8 |
| 6 | feature-grid | Your product, delivered. | 0.8 |
| 7 | nav | Agents | 0.4 |
| 8 | nav | AI Apps | 0.4 |
| 9 | nav | Web Apps | 0.4 |
| 10 | nav | Composable Commerce | 0.4 |
| 11 | nav | Multi-tenant Platform | 0.4 |
| 12 | feature-grid | Framework-Defined Infrastructure | 0.8 |
| 13 | feature-grid | — | 0.8 |
| 14 | feature-grid | Deploy once, deliver everywhere. | 0.8 |
| 15 | cta | Fluid Compute | 0.75 |
| 16 | feature-grid | AI Gateway | 0.8 |
| 17 | feature-grid | Deploy your first app in seconds. | 0.8 |
| 18 | feature-grid | Start Deploying | 0.8 |
| 19 | footer | GET STARTED | 0.95 |

## Material Language

**Label:** `material-you` (confidence 0.45)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.453 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 9999px |
| backdrop-filter in use | no |
| Gradients | 11 |

## Imagery Style

**Label:** `gradient-mesh` (confidence 0.667)
**Counts:** total 10, svg 7, icon 2, screenshot-like 0, photo-like 0
**Dominant aspect:** ultra-wide
**Radius profile on images:** square

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Geist` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
