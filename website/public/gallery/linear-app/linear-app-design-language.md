# Design Language: Linear – The system for product development

> Extracted from `https://linear.app` on May 21, 2026
> 3943 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#e4f222` | rgb(228, 242, 34) | hsl(64, 89%, 54%) | 2 |
| Secondary | `#5e6ad2` | rgb(94, 106, 210) | hsl(234, 56%, 60%) | 3 |
| Accent | `#00ff05` | rgb(0, 255, 5) | hsl(121, 100%, 50%) | 19 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#f7f8f8` | hsl(180, 7%, 97%) | 6042 |
| `#62666d` | hsl(218, 5%, 41%) | 719 |
| `#d0d6e0` | hsl(218, 21%, 85%) | 368 |
| `#e2e4e7` | hsl(216, 9%, 90%) | 295 |
| `#8a8f98` | hsl(219, 6%, 57%) | 273 |
| `#08090a` | hsl(210, 11%, 4%) | 53 |
| `#23252a` | hsl(223, 9%, 15%) | 12 |
| `#383b3f` | hsl(214, 6%, 23%) | 6 |
| `#000000` | hsl(0, 0%, 0%) | 6 |
| `#121414` | hsl(180, 5%, 7%) | 3 |

### Background Colors

Used on large-area elements: `#08090a`, `#090a0b`, `#101112`, `#121314`, `#ffffff`, `#161718`, `#0f1011`, `#e4f222`

### Text Colors

Text color palette: `#f7f8f8`, `#ffffff`, `#8a8f98`, `#08090a`, `#d0d6e0`, `#62666d`, `#e2e4e6`, `#e2e4e7`, `#6d78d5`, `#f79ce0`

### Gradients

```css
background-image: linear-gradient(rgba(11, 11, 11, 0.8) 0px, oklab(0.149576 0.00000680983 0.00000298768 / 0.761905) 100%);
```

```css
background-image: radial-gradient(52.53% 57.5% at 50% 100%, rgba(8, 9, 10, 0) 0px, rgba(8, 9, 10, 0.5) 100%), linear-gradient(rgb(8, 9, 10) 10%, rgb(208, 214, 224) 100%);
```

```css
background-image: radial-gradient(50% 50%, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0) 90%);
```

```css
background-image: radial-gradient(50% 50%, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0) 100%);
```

```css
background-image: radial-gradient(50% 50%, rgb(255, 255, 255) 0px, rgba(255, 255, 255, 0) 90%);
```

```css
background-image: linear-gradient(90deg, color(srgb 0 0 0 / 0) 0px, color(srgb 0.6 0.231373 0.231373 / 0.2) 100%), none;
```

```css
background-image: linear-gradient(90deg, color(srgb 0 0 0 / 0) 0px, color(srgb 0.129412 0.701961 1 / 0.2) 100%), none;
```

```css
background-image: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0px, rgba(0, 0, 0, 0) 50%);
```

```css
background-image: radial-gradient(circle, rgba(255, 255, 255, 0.04) 0px, rgba(0, 0, 0, 0) 50%);
```

```css
background-image: repeating-linear-gradient(to right, rgb(35, 37, 42) 0px, rgb(35, 37, 42) 3px, rgba(0, 0, 0, 0) 3px, rgba(0, 0, 0, 0) 7px);
```

```css
background-image: repeating-linear-gradient(rgb(35, 37, 42) 0px, rgb(35, 37, 42) 3px, rgba(0, 0, 0, 0) 3px, rgba(0, 0, 0, 0) 7px);
```

```css
background-image: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0px, rgba(0, 0, 0, 0) 50%);
```

```css
background-image: linear-gradient(0deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%), linear-gradient(rgb(178, 213, 255) 0%, rgb(223, 209, 255) 100%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#f7f8f8` | text, border, background | 6042 |
| `#62666d` | text, border, background | 719 |
| `#d0d6e0` | text, border | 368 |
| `#e2e4e7` | background, border, text | 295 |
| `#8a8f98` | text, border | 273 |
| `#f79ce0` | text, border | 90 |
| `#08090a` | background, text, border | 53 |
| `#f7bf8b` | text, border | 44 |
| `#8fa6ff` | text, border | 32 |
| `#ffdf9f` | text, border | 20 |
| `#83dcdc` | text, border | 20 |
| `#00ff05` | background | 19 |
| `#23252a` | background, border | 12 |
| `#f34e52` | background, text, border | 12 |
| `#27a644` | background, text, border | 9 |
| `#383b3f` | border, background | 6 |
| `#000000` | background | 6 |
| `#ff0000` | background | 6 |
| `#6366f1` | background | 5 |
| `#02b8cc` | background | 4 |
| `#5e6ad2` | background | 3 |
| `#121414` | background | 3 |
| `#8b5cf6` | background | 3 |
| `#55ccff` | background | 3 |
| `#6d78d5` | text, border | 2 |
| `#e4f222` | background | 2 |
| `#10b981` | background | 1 |
| `#0f3338` | background | 1 |
| `#422222` | background | 1 |
| `#1c85e8` | background | 1 |

## Typography

### Font Families

- **Inter Variable** — used for all (3627 elements)
- **Berkeley Mono** — used for body (316 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 64px | 4rem | 510 | 64px | -1.408px | h1, span, br |
| 40px | 2.5rem | 510 | 44px | -0.88px | h2, strong |
| 32px | 2rem | 400 | 36px | -0.704px | p |
| 24px | 1.5rem | 400 | 31.92px | -0.288px | blockquote |
| 20px | 1.25rem | 590 | 26.6px | -0.24px | h3, p |
| 18px | 1.125rem | 400 | 28.8px | -0.165px | span |
| 17px | 1.0625rem | 590 | 27.2px | normal | span |
| 16px | 1rem | 400 | normal | normal | html, head, meta, link |
| 15px | 0.9375rem | 400 | 24px | -0.165px | p, span, div, strong |
| 14px | 0.875rem | 510 | 21px | normal | a, span, p, br |
| 13.3333px | 0.8333rem | 400 | normal | normal | button, span, svg, path |
| 13px | 0.8125rem | 400 | 19.5px | normal | button, a, svg, path |
| 12.25px | 0.7656rem | 400 | 15.925px | -0.182px | code |
| 12px | 0.75rem | 510 | 16.8px | normal | span, div, img, button |
| 11px | 0.6875rem | 510 | 15.4px | normal | span |

### Heading Scale

```css
h1 { font-size: 64px; font-weight: 510; line-height: 64px; }
h2 { font-size: 40px; font-weight: 510; line-height: 44px; }
h3 { font-size: 20px; font-weight: 590; line-height: 26.6px; }
h4 { font-size: 16px; font-weight: 400; line-height: normal; }
h3 { font-size: 13px; font-weight: 400; line-height: 19.5px; }
```

### Body Text

```css
body { font-size: 14px; font-weight: 510; line-height: 21px; }
```

### Font Weights in Use

`400` (3688x), `510` (233x), `590` (18x), `300` (4x)

## Spacing

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-39 | 39px | 2.4375rem |
| spacing-47 | 47px | 2.9375rem |
| spacing-51 | 51px | 3.1875rem |
| spacing-56 | 56px | 3.5rem |
| spacing-69 | 69px | 4.3125rem |
| spacing-79 | 79px | 4.9375rem |
| spacing-91 | 91px | 5.6875rem |
| spacing-95 | 95px | 5.9375rem |
| spacing-99 | 99px | 6.1875rem |
| spacing-111 | 111px | 6.9375rem |
| spacing-123 | 123px | 7.6875rem |
| spacing-127 | 127px | 7.9375rem |
| spacing-131 | 131px | 8.1875rem |
| spacing-135 | 135px | 8.4375rem |
| spacing-152 | 152px | 9.5rem |
| spacing-155 | 155px | 9.6875rem |
| spacing-159 | 159px | 9.9375rem |
| spacing-166 | 166px | 10.375rem |
| spacing-199 | 199px | 12.4375rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 1px | 1 |
| sm | 4px | 32 |
| md | 7px | 2 |
| lg | 12px | 23 |
| lg | 16px | 3 |
| xl | 20px | 2 |
| full | 50px | 38 |
| full | 400px | 1 |
| full | 9999px | 20 |

## Box Shadows

**sm** — blur: 0px
```css
box-shadow: rgba(94, 106, 210, 0.1) 0px 0px 0px 0.125074px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 2px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgb(35, 37, 42) 0px 0px 0px 1px inset;
```

**sm** — blur: 0px
```css
box-shadow: rgba(8, 9, 10, 0.1) 0px 0px 0px 1px, rgba(8, 9, 10, 0.4) 0px 0px 64px 0px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(255, 255, 255, 0.03) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.04) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 4px 0px;
```

**xs** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 0px 0px;
```

**xs (inset)** — blur: 0px
```css
box-shadow: rgb(35, 37, 42) 1px 0px 0px 0px inset;
```

**xs** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.03) 0px 1.2px 0px 0px;
```

**sm** — blur: 4px
```css
box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px 0px;
```

**md** — blur: 2px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px;
```

**md (inset)** — blur: 12px
```css
box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset;
```

**xl** — blur: 32px
```css
box-shadow: rgba(8, 9, 10, 0.6) 0px 4px 32px 0px;
```

## CSS Custom Properties

### Colors

```css
--color-text-tertiary: #8a8f98;
--color-white: #fff;
--dp-label-muted: initial;
--color-border-translucent: rgba(255,255,255,0.05);
--color-bg-level-3: #191a1b;
--editor-text-color: #e4e5e9;
--action-menu-item-bg-focus: ;
--color-border-secondary: #34343a;
--btn-highlight-bg: transparent;
--color-accent-hover: #828fff;
--color-border-tertiary: #3e3e44;
--color-button-invert-bg-hover: #fff;
--color-button-invert-bg: #e5e5e6;
--color-fg-quaternary: #62666d;
--color-overlay-primary: rgba(0,0,0,0.85);
--dp-control-primary: initial;
--btn-highlight-color: inherit;
--color-border-primary: #23252a;
--diff-view-comment-button-removed-bg-hover: ;
--color-link-primary: #828fff;
--color-line-tint: #141516;
--color-green: #27a644;
--color-text-primary: #f7f8f8;
--diff-view-removed-inline-bg: ;
--color-brand-bg: #5e6ad2;
--color-bg-marketing: #010102;
--color-bg-panel: #0f1011;
--color-linear-security: #7a7fad;
--modal-dp-control-primary-hover: initial;
--scrollbar-color-active: rgba(255,255,255,0.4);
--color-bg-tint: #141516;
--header-border: rgba(255,255,255,0.08);
--diff-view-focus-bg: ;
--focus-ring-width: 1px;
--border-hairline: 1px;
--color-bg-level-2: #141516;
--focus-ring-color: #5e69d1;
--color-indigo: #5e6ad2;
--color-border-translucent-strong: rgba(255,255,255,0.08);
--color-overlay-dim-rgb: 255,255,255;
--modal-dp-bg-selected: initial;
--color-text-secondary: #d0d6e0;
--diff-view-removed-bg: ;
--icon-replacement-color: ;
--color-line-tertiary: #18191a;
--color-accent: #7170ff;
--color-selection-bg: color-mix(in lch,#5e6ad2,black 10%);
--color-line-secondary: #202122;
--color-line-primary: #37393a;
--color-fg-primary: #f7f8f8;
--color-bg-quinary: #282828;
--color-text-quaternary: #62666d;
--color-alpha: 255;
--action-menu-control-primary: initial;
--layer-popover: 600;
--diff-view-blank-bg: ;
--diff-view-editor-foreground: ;
--color-accent-tint: #18182f;
--header-bg: rgba(11,11,11,0.8);
--color-line-quaternary: #141515;
--color-black: #000;
--scrollbar-color-hover: rgba(255,255,255,0.2);
--color-link-hover: #fff;
--dp-bg-border: initial;
--icon-default-color: initial;
--color-bg-level-1: #0f1011;
--color-brand-text: #fff;
--action-menu-bg-border-solid: initial;
--diff-view-comment-button-removed-bg: ;
--color-teal: #00b8cc;
--color-linear-plan: #68cc58;
--color-orange: #fc7840;
--color-selection-text: #fff;
--color-fg-secondary: #d0d6e0;
--color-bg-translucent: rgba(255,255,255,0.05);
--diff-view-inserted-inline-bg: ;
--color-red: #eb5757;
--diff-view-comment-button-added-bg: ;
--color-blue: #4ea7fc;
--color-selection-dim: color-mix(in lch,#5e6ad2,transparent 80%);
--color-bg-tertiary: #232326;
--diff-view-inserted-bg: ;
--diff-view-comment-button-added-bg-hover: ;
--dp-highlighted-color: initial;
--focus-ring-outline: 1px solid #5e69d1;
--color-bg-quaternary: #28282c;
--color-bg-primary: #08090a;
--focus-ring-offset: 2px;
--color-yellow: #f0bf00;
--color-fg-tertiary: #8a8f98;
--color-bg-level-0: #08090a;
--scrollbar-color: rgba(255,255,255,0.1);
--icon-color: initial;
--diff-view-comment-button-default-bg: ;
--color-linear-build: #d4b144;
--diff-view-comment-button-default-bg-hover: ;
--dp-control-primary-hover: initial;
--color-bg-secondary: #1c1c1f;
```

### Spacing

```css
--font-size-title1: 2.25rem;
--text-micro-size: 0.75rem;
--title-3-letter-spacing: -0.012em;
--editor-block-menu-size: 20px;
--diff-view-editor-font-size: ;
--scrollbar-size-active: 10px;
--text-regular-size: 0.9375rem;
--text-regular-letter-spacing: -0.011em;
--font-size-miniPlus: 0.75rem;
--editor-block-spacing-small: calc(0.375 * 1rem);
--font-size-microPlus: 0.6875rem;
--title-7-size: 3.5rem;
--text-small-size: 0.875rem;
--page-padding-block: 64px;
--text-micro-letter-spacing: 0;
--title-6-letter-spacing: -0.022em;
--title-9-letter-spacing: -0.022em;
--title-8-size: 4rem;
--font-size-largePlus: 1.125rem;
--font-size-smallPlus: 0.8125rem;
--title-7-letter-spacing: -0.022em;
--title-1-size: 1.0625rem;
--font-size-title3: 1.25rem;
--dp-font-size-small: 0.8125rem;
--editor-block-spacing: 1rem;
--text-tiny-size: 0.625rem;
--font-size-regular: 0.9375rem;
--font-size-mini: 0.75rem;
--editor-last-invisible-paragraph-spacing: 10px;
--text-mini-letter-spacing: -0.01em;
--text-tiny-letter-spacing: -0.015em;
--editor-font-size: 0.9375rem;
--title-2-letter-spacing: -0.012em;
--title-2-size: 1.25rem;
--title-4-size: 2rem;
--editor-letter-spacing: -0.00666667em;
--font-size-micro: 0.6875rem;
--font-size-title2: 1.5rem;
--homepage-outer-padding: 10px;
--title-5-letter-spacing: -0.022em;
--font-size-small: 0.8125rem;
--font-size-large: 1.125rem;
--font-size-regularPlus: 0.9375rem;
--page-padding-right: max(0px,24px);
--text-mini-size: 0.8125rem;
--page-padding-left: max(0px,24px);
--font-monospace: "Berkeley Mono",ui-monospace,"SF Mono","Menlo",monospace;
--title-6-size: 3rem;
--title-5-size: 2.5rem;
--title-1-letter-spacing: -0.012em;
--scrollbar-size: 6px;
--min-tap-size: 44px;
--text-large-size: 1.0625rem;
--page-padding-inline: 24px;
--text-large-letter-spacing: 0;
--title-8-letter-spacing: -0.022em;
--text-small-letter-spacing: -0.013em;
--title-9-size: 4.5rem;
--title-3-size: 1.5rem;
--scrollbar-gap: 4px;
--homepage-padding-inset: 32px;
--title-4-letter-spacing: -0.022em;
--editor-block-spacing-large: calc(1.375 * 1rem);
--page-padding-y: 48px;
```

### Typography

```css
--font-variations: "opsz" auto;
--title-1-line-height: 1.4;
--font-emoji: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","Twemoji Mozilla","Noto Color Emoji","Android Emoji";
--text-tiny: 0.625rem /1.5 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--text-small-line-height: calc(21 / 14);
--text-large: 1.0625rem /1.6 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--font-regular: "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--title-3-line-height: 1.33;
--text-micro-line-height: 1.4;
--text-tiny-line-height: 1.5;
--title-8-line-height: 1.06;
--text-regular-line-height: 1.6;
--text-small: 0.875rem /calc(21 / 14) "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--diff-view-editor-line-height: ;
--title-7-line-height: 1.1;
--title-5-line-height: 1.1;
--layer-context-menu: 1200;
--font-weight-medium: 510;
--font-weight-normal: 400;
--text-large-line-height: 1.6;
--font-settings: "cv01","ss03";
--title-9-line-height: 1;
--editor-line-height: 1.6;
--font-weight-bold: 680;
--dp-font-weight-medium: 500;
--text-micro: 0.75rem /1.4 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--title-2-line-height: 1.33;
--text-mini: 0.8125rem /1.5 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--title-4-line-height: 1.125;
--text-regular: 0.9375rem /1.6 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--title-6-line-height: 1;
--font-weight-light: 300;
--font-serif-display: "Tiempos Headline",ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;
--font-weight-semibold: 590;
--text-mini-line-height: 1.5;
```

### Shadows

```css
--btn-overlay-shadow-hover: none;
--shadow-low: 0px 2px 4px rgba(0,0,0,0.1);
--btn-overlay-shadow: none;
--shadow-medium: 0px 4px 24px rgba(0,0,0,0.2);
--shadow-stack-low: 0px 8px 2px 0px rgba(0,0,0,0),0px 5px 2px 0px rgba(0,0,0,0.01),0px 3px 2px 0px rgba(0,0,0,0.04),0px 1px 1px 0px rgba(0,0,0,0.07),0px 0px 1px 0px rgba(0,0,0,0.08);
--shadow-high: 0px 7px 32px rgba(0,0,0,0.35);
--shadow-tiny: 0px 0px 0px transparent;
--shadow-none: 0px 0px 0px transparent;
```

### Radii

```css
--radius-rounded: 9999px;
--radius-circle: 50%;
--radius-8: 8px;
--radius-12: 12px;
--rounded-full: 9999px;
--radius-24: 24px;
--radius-4: 4px;
--radius-6: 6px;
--radius-16: 16px;
--editor-block-radius: 6px;
--radius-32: 32px;
```

### Other

```css
--x1cxqmhc: ;
--x15hezws: transparent;
--zoom-in: default;
--xd1bcc1: ;
--sx-1ijrdvx: #ff8849;
--sx-1uv3w6h: #2c2d32;
--xn768d: 100%;
--speed-highlightFadeOut: 0.15s;
--xkthb5v: ;
--sx-138kmyo: #424449;
--xaxo4ug: ;
--sx-1mc3c6y: #1e2022;
--cursor-disabled: not-allowed;
--xq9soxx: inherit;
--x1fphd1n: ;
--layer-tooltip: 1100;
--ease-in-out-quart: cubic-bezier(0.77,0,0.175,1);
--x5igtf4: ;
--x7ide1: ;
--sx-vatjr0: #34353a;
--x1mc3c6y: ;
--x1ikf7kw: ;
--sx-tw6awd: #ffe7de;
--x1gm0lru: ;
--x1jffjrl: ;
--sx-kthb5v: #6c76e0;
--sx-183dfpr: #ff9958;
--x35jz1e: ;
--ease-in-out-circ: cubic-bezier(0.785,0.135,0.15,0.86);
--title-7: 590 3.5rem /1.1 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--x8gevfv: ;
--speed-quickTransition: 0.1s;
--sx-jw5zf4: #39b350;
--xkbzynh: transparent;
--sx-pqiwo2: #373a56;
--title-1: 590 1.0625rem /1.4 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--x13kjjc4: ;
--xds2y8i: 5px;
--x1ele6il: ;
--xw1p5jj: ;
--x1hz3utq: ;
--x1urpf9d: ;
--transparent: rgba(255,255,255,0);
--layer-2: 2;
--editor-bullet-disc-offset: 0.5em;
--sx-6zt3z6: 1px solid #323439;
--xcx2ark: ;
--sx-1fh23cp: #9c9da1;
--xohseg1: ;
--xtw6awd: ;
--xx7veac: transparent;
--sx-1vyp3gc: #ffeac6;
--xickszr: ;
--x1yxqotz: ;
--x1m4y240: ;
--x7jk47a: ;
--_number-flow-d: 0;
--sx-ay0skx: #fefeff;
--x16hn3q3: ;
--sx-or1tl7: #55ccff;
--sx-ys2i3t: #ffffff;
--x1gakdvt: ;
--sx-umgfby: 0 1px 1px inset #00000011, 0 1px 3px inset #00000011, 0 2px 5px inset #00000019;
--xjw5zf4: ;
--xbpgheo: ;
--sx-1rzu7x2: #626366;
--x1s7kw6p: transparent;
--x11lpf43: 0.8125rem;
--ease-out-circ: cubic-bezier(0.075,0.82,0.165,1);
--ease-out-quint: cubic-bezier(0.23,1,0.32,1);
--sx-1n1r1h9: #ffffff0d;
--title-5: 590 2.5rem /1.1 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--sx-1cxqmhc: #00e8ff;
--sx-5t1vcl: #00ceff;
--1fr: minmax(0,1fr);
--xirmyh9: ;
--sx-2icmlu: #08080826;
--sx-cx2ark: #37393e;
--title-6: 590 3rem /1 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--x1qdowq0: ;
--dvh: 1dvh;
--xykavoc: 5px;
--xn8xqcl: ;
--sx-1h56kua: #f0bf00;
--sx-1rsaf4u: #2a2d48;
--xkwfvdu: var(--x1o1lnwn);
--sx-35jz1e: #3c3f5c;
--100svh: calc(100 * 1svh);
--xy7jo44: inherit;
--sx-10lzhmx: 0px 4px 4px -1px #0000000a, 0px 1px 1px 0px #00000014;
--xot17o6: ;
--x1umwnkk: "Berkeley Mono","SFMono Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
--x1ps2i54: ;
--sx-k68kma: #37393e;
--x1rnpv0l: ;
--xciqj87: ;
--cursor-none: none;
--sx-ykavoc: 8px;
--sx-v3o8qy: #636467;
--x1edn6di: ;
--scrollbar-width: 12px;
--mask-visible: black;
--sx-d29rh7: #28292e;
--xx8afrf: 6px;
--x2icmlu: ;
--x1ltkoa: ;
--sx-13m9wh7: #007def;
--xumgfby: ;
--x105wzx7: ;
--sx-13kjjc4: #38393d;
--svh: 1svh;
--sx-1q6smeb: #ff6565;
--xnihqbq: ;
--ease-in-quint: cubic-bezier(0.755,0.05,0.855,0.06);
--sx-c3gk8m: 0 0 0 1px #5e69d1;
--sx-16hn3q3: #292a2e;
--x129bhjt: ;
--speed-highlightFadeIn: 0s;
--dp-label-title: initial;
--x1crf4sx: ;
--sx-1xaoi8i: #7a88ff;
--sx-d1bcc1: #08080826;
--homepage-max-width: calc(1344px + 10px * 2);
--mask-off: transparent;
--x1gxylln: ;
--sx-3zwjav: #e4e5e9;
--mask-on: black;
--x91u3ar: ;
--xgauayi: ;
--header-blur: 20px;
--sx-8gevfv: #43bc58;
--xpuww38: ;
--xvatjr0: ;
--x1h56kua: ;
--prose-max-width: 624px;
--sx-6od1kq: #dbffff;
--x10o0rs5: ;
--x1glqxor: ;
--x1gcjx5j: ;
--x74qs5: ;
--sx-ws85c5: #fcfaff;
--sx-1qdowq0: #00000066;
--sx-6ayg1n: #2c2e34;
--sx-15wwovl: #28292e;
--sx-ikq9iy: #322122;
--xas9fd0: ;
--xk68kma: ;
--xnnhj77: ;
--layer-max: 10000;
--dp-label-base: initial;
--ease-out-expo: cubic-bezier(0.19,1,0.22,1);
--xwsz0k3: ;
--sx-g52i5g: #1c1f24;
--x19k7np8: 1;
--_number-flow-d-width: 0;
--sx-9o00jb: #00c6d9;
--mask-invisible: transparent;
--xi20l48: ;
--layer-dialog: 700;
--xg52i5g: ;
--x10845vo: ;
--xhfmm6c: ;
--sx-1k7nh0l: #fffaa6;
--x1k7v50d: ;
--editor-block-menu-offset: 28px;
--speed-regularTransition: 0.25s;
--x1stx5uy: ;
--x133wec9: ;
--x6zt3z6: ;
--sx-142jeir: #323439;
--cursor-pointer: pointer;
--editor-safe-area: 16px;
--ease-in-out-quad: cubic-bezier(0.455,0.03,0.515,0.955);
--x1q6smeb: ;
--icon-grayscale-image-filter: grayscale(100%) brightness(400%);
--x1a798ef: 6px;
--sx-1yxqotz: #5e6ad2;
--xb9djef: transparent;
--diff-view-git-deleted-fg: ;
--xfeitbp: ;
--x1vqca58: ;
--ease-in-expo: cubic-bezier(0.95,0.05,0.795,0.035);
--ease-in-cubic: cubic-bezier(0.55,0.055,0.675,0.19);
--x1ijrdvx: ;
--x1em7oyp: ;
--title-4: 590 2rem /1.125 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--sx-17ckey5: #ff5d5e;
--diff-view-editor-background: ;
--x1ospiv4: ;
--sx-74qs5: #00000001;
--xc3gk8m: ;
--mask-ease: rgba(0,0,0,0.2);
--sx-14ggo8w: #1e2823;
--title-3: 590 1.5rem /1.33 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--x1ddj3ws: ;
--sx-7jk47a: #2c2d32;
--sx-1m4y240: #19191b;
--diff-view-editor-background-opaque: ;
--sx-ljw4h1: #303236;
--x629164: ;
--header-height: 72px;
--x14ggo8w: ;
--sx-18pfyxa: 6px 12px;
--editor-todolist-checkbox-width: 14px;
--x1g0wh59: transparent;
--sx-1urpf9d: #ffffff0d;
--xor1tl7: ;
--sx-1stx5uy: #74e3ff;
--sx-7ide1: #747ee9;
--x142jeir: ;
--x1uoekal: ;
--ease-out-quad: cubic-bezier(0.25,0.46,0.45,0.94);
--sx-138rywl: 13vh;
--x10lzhmx: ;
--sx-sfnrch: #f0bf00;
--sx-1ltkoa: #626467;
--xpi45vo: transparent;
--sx-1dcvabv: #332024;
--x193njt9: ;
--sx-91u3ar: #ffcc00;
--sx-18uyzu6: #008a2a;
--sx-ot17o6: #00cee2;
--sx-1gm0lru: #282a30;
--sx-34xdpc: #d9343f;
--sx-1gxylln: #242629;
--diff-view-git-modified-fg: ;
--ease-out-quart: cubic-bezier(0.165,0.84,0.44,1);
--sx-1ccqs4f: #3f4145;
--xugsh4: ;
--x3zwjav: ;
--sx-feitbp: #ffffff;
--layer-debug: 5100;
--sx-fwc8so: #cf4608;
--ease-in-circ: cubic-bezier(0.6,0.04,0.98,0.335);
--_number-flow-d-opacity: 0;
--sx-13sdql6: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","Twemoji Mozilla","Noto Color Emoji","Android Emoji";
--x1eapsa9: ;
--x1uv3w6h: ;
--sx-1vqca58: #69daff;
--xd29rh7: ;
--sx-1fphd1n: #232427;
--ease-in-quart: cubic-bezier(0.895,0.03,0.685,0.22);
--ease-in-out-cubic: cubic-bezier(0.645,0.045,0.355,1);
--sx-5igtf4: #ffffff1b;
--page-inset: 32px;
--x34xdpc: ;
--sx-as9fd0: #282a30;
--sx-ugsh4: #ffd500;
--ease-in-out-quint: cubic-bezier(0.86,0,0.07,1);
--editor-bullet-disc-width: 0.5em;
--x17ckey5: ;
--x19hxmp1: ;
--sx-1glqxor: #232535;
--sx-n8xqcl: #5e69d1;
--layer-command-menu: 650;
--sx-w1p5jj: #37393e;
--ease-in-out-expo: cubic-bezier(1,0,0,1);
--sx-1ospiv4: #ffffff22;
--command-menu-item-details-max-width: 100%;
--sx-1k7v50d: 0 4px 40px #00000019, 0 3px 20px #0000001f,0 3px 12px #0000001f, 0 2px 8px #0000001f, 0 1px 1px #0000001f;
--x138rywl: 13vh;
--x13m9wh7: ;
--layer-dialog-overlay: 699;
--xjupg42: ;
--xpqiwo2: ;
--x1jpq86z: transparent;
--modal-dp-label-base: ;
--layer-footer: 50;
--sx-1jffjrl: #6a76e3;
--dp-label-faint: initial;
--sx-cb0zzs: #33353b;
--sx-ch85qk: #5e69d1;
--sx-1ubxoo9: #1e2022;
--x1ccqs4f: ;
--x18uyzu6: ;
--sx-wsz0k3: #26a544;
--sx-1qlh175: #00889c;
--xch85qk: ;
--diff-view-line-number-fg: ;
--sx-193njt9: #ffffff22;
--x1dd5bcf: ;
--layer-scrollbar: 75;
--sx-1dhg814: 0 3px 8px #0000001f, 0 2px 5px #0000001f, 0 1px 1px #0000001f;
--sx-629164: #2c2d30;
--sx-1dd5bcf: #9c9da1;
--sx-1uoekal: #00b8cb;
--cursor-tooltip: help;
--sx-1uztw8p: #ffffff30;
--x1rsaf4u: ;
--x1k7nh0l: ;
--xv3o8qy: ;
--xys2i3t: ;
--pointer: default;
--x1rwcria: ;
--title-2: 590 1.25rem /1.33 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--sx-1ikf7kw: #ffffff22;
--x6ayg1n: ;
--_number-flow-dx: 0px;
--x1o1lnwn: ;
--sx-1gakdvt: #25283f;
--underline-offset: clamp(2px,0.225em,6px);
--x1fh23cp: ;
--x15wwovl: ;
--xmsgncm: ;
--page-max-width: 1024px;
--sx-129bhjt: #967000;
--action-menu-label-faint: initial;
--sx-1ipkkxf: "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue","Linear Thai",sans-serif;
--x1uztw8p: ;
--ease-in-quad: cubic-bezier(0.55,0.085,0.68,0.53);
--x1jmjcvw: ;
--title-9: 590 4.5rem /1 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--layer-overlay: 500;
--sx-180qi0f: #d5ffd6;
--xj1ai0m: ;
--sx-irmyh9: #ffffff13;
--sx-11lpf43: 0.8125rem;
--layer-header: 100;
--grid-columns: 12;
--x138kmyo: ;
--x13sdql6: "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","Twemoji Mozilla","Noto Color Emoji","Android Emoji";
--x1dcvabv: ;
--x180qi0f: ;
--sx-19hxmp1: #adbaff;
--sx-1bu05id: #ff8583;
--sx-1o1lnwn: #323439;
--layer-toasts: 800;
--sx-1gcjx5j: #2d2f37;
--x183dfpr: ;
--sx-1em7oyp: #1b263a;
--xcb0zzs: ;
--sx-11vg3qk: #ff7235;
--x1uu732i: 12px;
--x9o00jb: ;
--sx-i20l48: #f34e52;
--sx-1edn6di: #33353a;
--xkig6sr: ;
--sx-j1ai0m: #e4e5e9;
--x1qlh175: ;
--xhsrmg4: ;
--x1rzu7x2: ;
--xfwc8so: ;
--ximi5ey: ;
--diff-view-git-added-fg: ;
--dp-control-label: initial;
--xljw4h1: ;
--sx-ickszr: #fefeff;
--sx-1hz3utq: #ff8042;
--layer-3: 3;
--ease-out-cubic: cubic-bezier(0.215,0.61,0.355,1);
--title-8: 590 4rem /1.06 "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Open Sans","Helvetica Neue",sans-serif;
--dp-thin-pixel: 1px;
--x18pfyxa: 6px 12px;
--sx-10845vo: #c9ffff;
--sx-axo4ug: 0 0 0 0.5px #323439;
--xay0skx: ;
--sx-10o0rs5: #e4e5e9;
--x1ipkkxf: "Inter Variable","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue","Linear Thai",sans-serif;
--sx-1ps2i54: #1b282d;
--layer-skip-nav: 5000;
--x1ubxoo9: ;
--xikq9iy: ;
--sx-1umwnkk: "Berkeley Mono","SFMono Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
--x1n1r1h9: ;
--sx-1jmjcvw: #ffffff1b;
--x1xaoi8i: ;
--x1bu05id: ;
--sx-105wzx7: #edbf0a;
--x1dhg814: ;
--line-number-width: 50px;
--sx-1uu732i: 12px;
--sx-msgncm: #292521;
--sx-hfmm6c: #2d2e31;
--layer-1: 1;
--underline-thickness: from-font;
--radix-select-content-available-height: none;
--x1vyp3gc: ;
--sx-1eapsa9: #626366;
--xjrz3l0: transparent;
--editor-list-inset: 1.5rem;
--xsfnrch: ;
--sx-1ele6il: 1px;
--x6od1kq: ;
--xws85c5: ;
--100dvh: calc(100 * 1dvh);
--sx-x8afrf: 6px;
--x5t1vcl: ;
--x11vg3qk: ;
--radix-select-trigger-width: 0px;
--sx-ciqj87: #3de261;
--sx-bpgheo: #636fd7;
```

### Dependencies

```css
--xkwfvdu: --x1o1lnwn;
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
| 560px | 560px | max-width |
| sm | 600px | max-width |
| sm | 640px | max-width |
| sm | 641px | min-width |
| sm | 700px | max-width |
| md | 768px | max-width |
| md | 769px | min-width |
| 928px | 928px | max-width |
| lg | 1024px | max-width |
| lg | 1025px | min-width |
| 1140px | 1140px | max-width |
| xl | 1240px | max-width |
| xl | 1280px | max-width |
| xl | 1281px | min-width |
| 1420px | 1420px | max-width |
| 1440px | 1440px | max-width |
| 2xl | 1536px | min-width |
| 1601px | 1601px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`

**Durations:** `0.1s`, `0.16s`, `0.15s`, `0.2s`, `0.4s`

### Common Transitions

```css
transition: all;
transition: border-color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: border 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: filter 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: background 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: fill 0.15s;
transition: color;
transition: transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Keyframe Animations

**grid-dot-0-0-agent**
```css
@keyframes grid-dot-0-0-agent {
  0% { opacity: 1; }
  6.25% { opacity: 1; }
  6.25% { opacity: 1; }
  12.5% { opacity: 1; }
  12.5% { opacity: 1; }
  18.75% { opacity: 1; }
  18.75% { opacity: 1; }
  25% { opacity: 1; }
  25% { opacity: 1; }
  31.25% { opacity: 1; }
  31.25% { opacity: 1; }
  37.5% { opacity: 1; }
  37.5% { opacity: 1; }
  43.75% { opacity: 1; }
  43.75% { opacity: 1; }
  50% { opacity: 1; }
  50% { opacity: 1; }
  56.25% { opacity: 1; }
  56.25% { opacity: 1; }
  62.5% { opacity: 1; }
  62.5% { opacity: 1; }
  68.75% { opacity: 1; }
  68.75% { opacity: 1; }
  75% { opacity: 1; }
  75% { opacity: 1; }
  81.25% { opacity: 1; }
  81.25% { opacity: 1; }
  87.5% { opacity: 1; }
  87.5% { opacity: 1; }
  93.75% { opacity: 1; }
  93.75% { opacity: 1; }
  100% { opacity: 1; }
}
```

**grid-dot-0-1-agent**
```css
@keyframes grid-dot-0-1-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 1; }
  12.5% { opacity: 1; }
  12.5% { opacity: 1; }
  18.75% { opacity: 1; }
  18.75% { opacity: 1; }
  25% { opacity: 1; }
  25% { opacity: 1; }
  31.25% { opacity: 1; }
  31.25% { opacity: 1; }
  37.5% { opacity: 1; }
  37.5% { opacity: 1; }
  43.75% { opacity: 1; }
  43.75% { opacity: 1; }
  50% { opacity: 1; }
  50% { opacity: 1; }
  56.25% { opacity: 1; }
  56.25% { opacity: 1; }
  62.5% { opacity: 1; }
  62.5% { opacity: 1; }
  68.75% { opacity: 1; }
  68.75% { opacity: 1; }
  75% { opacity: 1; }
  75% { opacity: 1; }
  81.25% { opacity: 1; }
  81.25% { opacity: 1; }
  87.5% { opacity: 1; }
  87.5% { opacity: 1; }
  93.75% { opacity: 1; }
  93.75% { opacity: 1; }
  100% { opacity: 1; }
}
```

**grid-dot-0-2-agent**
```css
@keyframes grid-dot-0-2-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  12.5% { opacity: 1; }
  18.75% { opacity: 1; }
  18.75% { opacity: 1; }
  25% { opacity: 1; }
  25% { opacity: 1; }
  31.25% { opacity: 1; }
  31.25% { opacity: 1; }
  37.5% { opacity: 1; }
  37.5% { opacity: 1; }
  43.75% { opacity: 1; }
  43.75% { opacity: 1; }
  50% { opacity: 1; }
  50% { opacity: 1; }
  56.25% { opacity: 1; }
  56.25% { opacity: 1; }
  62.5% { opacity: 1; }
  62.5% { opacity: 1; }
  68.75% { opacity: 1; }
  68.75% { opacity: 1; }
  75% { opacity: 1; }
  75% { opacity: 1; }
  81.25% { opacity: 1; }
  81.25% { opacity: 1; }
  87.5% { opacity: 1; }
  87.5% { opacity: 1; }
  93.75% { opacity: 1; }
  93.75% { opacity: 1; }
  100% { opacity: 1; }
}
```

**grid-dot-0-3-agent**
```css
@keyframes grid-dot-0-3-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  25% { opacity: 0.3; }
  25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  37.5% { opacity: 0.3; }
  37.5% { opacity: 0.3; }
  43.75% { opacity: 0.3; }
  43.75% { opacity: 0.3; }
  50% { opacity: 0.3; }
  50% { opacity: 0.3; }
  56.25% { opacity: 0.3; }
  56.25% { opacity: 0.3; }
  62.5% { opacity: 0.3; }
  62.5% { opacity: 0.3; }
  68.75% { opacity: 0.3; }
  68.75% { opacity: 0.3; }
  75% { opacity: 0.3; }
  75% { opacity: 0.3; }
  81.25% { opacity: 0.3; }
  81.25% { opacity: 0.3; }
  87.5% { opacity: 0.3; }
  87.5% { opacity: 0.3; }
  93.75% { opacity: 0.3; }
  93.75% { opacity: 0.3; }
  100% { opacity: 0.3; }
}
```

**grid-dot-0-4-agent**
```css
@keyframes grid-dot-0-4-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  25% { opacity: 0.3; }
  25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  37.5% { opacity: 0.3; }
  37.5% { opacity: 0.3; }
  43.75% { opacity: 0.3; }
  43.75% { opacity: 0.3; }
  50% { opacity: 0.3; }
  50% { opacity: 0.3; }
  56.25% { opacity: 0.3; }
  56.25% { opacity: 0.3; }
  62.5% { opacity: 0.3; }
  62.5% { opacity: 0.3; }
  68.75% { opacity: 0.3; }
  68.75% { opacity: 0.3; }
  75% { opacity: 0.3; }
  75% { opacity: 0.3; }
  81.25% { opacity: 0.3; }
  81.25% { opacity: 0.3; }
  87.5% { opacity: 0.3; }
  87.5% { opacity: 0.3; }
  93.75% { opacity: 0.3; }
  93.75% { opacity: 0.3; }
  100% { opacity: 0.3; }
}
```

**grid-dot-1-0-agent**
```css
@keyframes grid-dot-1-0-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  18.75% { opacity: 1; }
  25% { opacity: 1; }
  25% { opacity: 1; }
  31.25% { opacity: 1; }
  31.25% { opacity: 1; }
  37.5% { opacity: 1; }
  37.5% { opacity: 1; }
  43.75% { opacity: 1; }
  43.75% { opacity: 1; }
  50% { opacity: 1; }
  50% { opacity: 1; }
  56.25% { opacity: 1; }
  56.25% { opacity: 1; }
  62.5% { opacity: 1; }
  62.5% { opacity: 1; }
  68.75% { opacity: 1; }
  68.75% { opacity: 1; }
  75% { opacity: 1; }
  75% { opacity: 1; }
  81.25% { opacity: 1; }
  81.25% { opacity: 1; }
  87.5% { opacity: 1; }
  87.5% { opacity: 1; }
  93.75% { opacity: 1; }
  93.75% { opacity: 1; }
  100% { opacity: 1; }
}
```

**grid-dot-1-1-agent**
```css
@keyframes grid-dot-1-1-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  25% { opacity: 0.3; }
  25% { opacity: 1; }
  31.25% { opacity: 1; }
  31.25% { opacity: 1; }
  37.5% { opacity: 1; }
  37.5% { opacity: 1; }
  43.75% { opacity: 1; }
  43.75% { opacity: 1; }
  50% { opacity: 1; }
  50% { opacity: 1; }
  56.25% { opacity: 1; }
  56.25% { opacity: 1; }
  62.5% { opacity: 1; }
  62.5% { opacity: 1; }
  68.75% { opacity: 1; }
  68.75% { opacity: 1; }
  75% { opacity: 1; }
  75% { opacity: 1; }
  81.25% { opacity: 1; }
  81.25% { opacity: 1; }
  87.5% { opacity: 1; }
  87.5% { opacity: 1; }
  93.75% { opacity: 1; }
  93.75% { opacity: 1; }
  100% { opacity: 1; }
}
```

**grid-dot-1-2-agent**
```css
@keyframes grid-dot-1-2-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  25% { opacity: 0.3; }
  25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  31.25% { opacity: 1; }
  37.5% { opacity: 1; }
  37.5% { opacity: 1; }
  43.75% { opacity: 1; }
  43.75% { opacity: 1; }
  50% { opacity: 1; }
  50% { opacity: 1; }
  56.25% { opacity: 1; }
  56.25% { opacity: 1; }
  62.5% { opacity: 1; }
  62.5% { opacity: 1; }
  68.75% { opacity: 1; }
  68.75% { opacity: 1; }
  75% { opacity: 1; }
  75% { opacity: 1; }
  81.25% { opacity: 1; }
  81.25% { opacity: 1; }
  87.5% { opacity: 1; }
  87.5% { opacity: 1; }
  93.75% { opacity: 1; }
  93.75% { opacity: 1; }
  100% { opacity: 1; }
}
```

**grid-dot-1-3-agent**
```css
@keyframes grid-dot-1-3-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  25% { opacity: 0.3; }
  25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  37.5% { opacity: 0.3; }
  37.5% { opacity: 1; }
  43.75% { opacity: 1; }
  43.75% { opacity: 1; }
  50% { opacity: 1; }
  50% { opacity: 1; }
  56.25% { opacity: 1; }
  56.25% { opacity: 1; }
  62.5% { opacity: 1; }
  62.5% { opacity: 1; }
  68.75% { opacity: 1; }
  68.75% { opacity: 1; }
  75% { opacity: 1; }
  75% { opacity: 1; }
  81.25% { opacity: 1; }
  81.25% { opacity: 1; }
  87.5% { opacity: 1; }
  87.5% { opacity: 1; }
  93.75% { opacity: 1; }
  93.75% { opacity: 1; }
  100% { opacity: 1; }
}
```

**grid-dot-1-4-agent**
```css
@keyframes grid-dot-1-4-agent {
  0% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  6.25% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  12.5% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  18.75% { opacity: 0.3; }
  25% { opacity: 0.3; }
  25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  31.25% { opacity: 0.3; }
  37.5% { opacity: 0.3; }
  37.5% { opacity: 0.3; }
  43.75% { opacity: 0.3; }
  43.75% { opacity: 0.3; }
  50% { opacity: 0.3; }
  50% { opacity: 0.3; }
  56.25% { opacity: 0.3; }
  56.25% { opacity: 0.3; }
  62.5% { opacity: 0.3; }
  62.5% { opacity: 0.3; }
  68.75% { opacity: 0.3; }
  68.75% { opacity: 0.3; }
  75% { opacity: 0.3; }
  75% { opacity: 0.3; }
  81.25% { opacity: 0.3; }
  81.25% { opacity: 0.3; }
  87.5% { opacity: 0.3; }
  87.5% { opacity: 0.3; }
  93.75% { opacity: 0.3; }
  93.75% { opacity: 0.3; }
  100% { opacity: 0.3; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (92 instances)

```css
.button {
  background-color: rgba(255, 255, 255, 0.05);
  color: rgb(98, 102, 109);
  font-size: 13.3333px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 2px;
}
```

### Cards (41 instances)

```css
.card {
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px 0px;
  padding-top: 8px;
  padding-right: 8px;
}
```

### Inputs (5 instances)

```css
.input {
  background-color: rgb(59, 59, 59);
  color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  border-radius: 0px;
  font-size: 13.3333px;
  padding-top: 0px;
  padding-right: 32px;
}
```

### Links (72 instances)

```css
.link {
  color: rgb(138, 143, 152);
  font-size: 13px;
  font-weight: 400;
}
```

### Navigation (81 instances)

```css
.navigatio {
  background-color: rgb(94, 106, 210);
  color: rgb(247, 248, 248);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 0px 0px;
}
```

### Footer (112 instances)

```css
.foote {
  background-color: rgb(8, 9, 10);
  color: rgb(247, 248, 248);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 13px;
}
```

### Dropdowns (4 instances)

```css
.dropdown {
  border-radius: 0px;
  border-color: rgb(247, 248, 248);
  padding-top: 0px;
}
```

### Badges (66 instances)

```css
.badge {
  background-color: rgba(255, 255, 255, 0.05);
  color: rgb(255, 255, 255);
  font-size: 13.3333px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Avatars (4 instances)

```css
.avatar {
  border-radius: 6px;
}
```

### Switches (4 instances)

```css
.switche {
  border-radius: 0px;
  border-color: rgb(247, 248, 248);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(138, 143, 152);
  padding: 0px 12px 0px 12px;
  border-radius: 9999px;
  border: 0px none rgb(138, 143, 152);
  font-size: 13px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(247, 248, 248);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(247, 248, 248);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(247, 248, 248);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(247, 248, 248);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(247, 248, 248);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(247, 248, 248);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 4px 0px 4px;
  border-radius: 4px;
  border: 0px none rgb(255, 255, 255);
  font-size: 13.3333px;
  font-weight: 400;
```

### Button — 49 instances, 4 variants

**Variant 1** (19 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(98, 102, 109);
  padding: 0px 0px 0px 0px;
  border-radius: 6px;
  border: 0px none rgb(98, 102, 109);
  font-size: 13.3333px;
  font-weight: 400;
```

**Variant 2** (19 instances)

```css
  background: rgba(255, 255, 255, 0.02);
  color: rgb(226, 228, 231);
  padding: 0px 0px 0px 0px;
  border-radius: 6px;
  border: 1px solid rgb(36, 40, 44);
  font-size: 13.3333px;
  font-weight: 400;
```

**Variant 3** (9 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 13.3333px;
  font-weight: 400;
```

**Variant 4** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(98, 102, 109);
  padding: 0px 10px 0px 10px;
  border-radius: 9999px;
  border: 0px none rgb(98, 102, 109);
  font-size: 12px;
  font-weight: 510;
```

### Button — 11 instances, 2 variants

**Variant 1** (10 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(208, 214, 224);
  padding: 0px 6px 0px 6px;
  border-radius: 6px;
  border: 0px none rgb(208, 214, 224);
  font-size: 13px;
  font-weight: 510;
```

**Variant 2** (1 instance)

```css
  background: rgba(255, 255, 255, 0.04);
  color: rgb(208, 214, 224);
  padding: 0px 6px 0px 6px;
  border-radius: 6px;
  border: 0px none rgb(208, 214, 224);
  font-size: 13px;
  font-weight: 510;
```

### Input — 2 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgba(255, 255, 255, 0.02);
  color: rgb(208, 214, 224);
  padding: 12px 14px 12px 14px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13.3333px;
  font-weight: 400;
```

**Variant 2** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0);
  padding: 0px 32px 0px 55.8px;
  border-radius: 0px;
  border: 0px none rgba(0, 0, 0, 0);
  font-size: 14px;
  font-weight: 400;
```

### Button — 4 instances, 2 variants

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(208, 214, 224);
  padding: 0px 10px 0px 5px;
  border-radius: 9999px;
  border: 1px solid rgb(35, 37, 42);
  font-size: 12px;
  font-weight: 510;
```

**Variant 2** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 13.3333px;
  font-weight: 400;
```

### Button — 16 instances, 1 variant

**Variant 1** (16 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 13.3333px;
  font-weight: 400;
```

### Input — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(247, 248, 248);
  padding: 1px 32px 1px 32px;
  border-radius: 0px;
  border: 0px 0px 1px none none solid rgb(247, 248, 248) rgb(247, 248, 248) rgba(255, 255, 255, 0.08);
  font-size: 16px;
  font-weight: 400;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(138, 143, 152);
  padding: 0px 12px 0px 12px;
  border-radius: 9999px;
  border: 0px none rgb(138, 143, 152);
  font-size: 13px;
  font-weight: 510;
```

## Layout System

**98 grid containers** and **495 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1364px | 10px |
| 100% | 0px |
| 1160px | 8px |
| calc(100% + 32px) | 15px |
| 1250px | 32px |
| 480px | 0px |
| 560px | 0px |
| 520px | 24px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 72x |
| 2-column | 17x |
| 3-column | 2x |
| 12-column | 1x |
| 6-column | 1x |

### Grid Templates

```css
grid-template-columns: 1280px;
grid-template-columns: 232px 952px;
grid-template-columns: 638px 638px;
gap: 16px;
grid-template-columns: 670px 280px;
grid-template-columns: 621px 621px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 390x |
| column/nowrap | 105x |

**Gap values:** `12px`, `15px`, `16px`, `20px`, `24px`, `2px`, `32px`, `3px`, `40px`, `4px`, `5px`, `64px`, `6px`, `8px`

## Accessibility (WCAG 2.1)

**Overall Score: 83%** — 5 passing, 1 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#6d78d5` | `#232534` | 3.82:1 | FAIL | span (1x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#08090a` | `#e5e5e6` | 15.83:1 | AAA |
| `#ffffff` | `#5e6ad2` | 4.7:1 | AA |

## Design System Score

**Overall: 76/100 (Grade: C)**

| Category | Score |
|----------|-------|
| Color Discipline | 80/100 |
| Typography Consistency | 82/100 |
| Spacing System | 70/100 |
| Shadow Consistency | 78/100 |
| Border Radius Consistency | 80/100 |
| Accessibility | 83/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Good CSS variable tokenization

**Issues:**
- 1 WCAG contrast failures
- 81 !important rules — prefer specificity over overrides
- 90% of CSS is unused — consider purging
- 16723 duplicate CSS declarations

## Gradients

**15 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | — | 2 | brand |
| radial | — | 3 | bold |
| linear | — | 2 | brand |
| radial | — | 3 | bold |
| radial | — | 3 | bold |
| radial | — | 3 | bold |
| linear | 90deg | 2 | brand |
| linear | 90deg | 2 | brand |
| radial | circle | 2 | brand |
| radial | circle | 2 | brand |
| repeating-linear | to right | 4 | bold |
| repeating-linear | — | 4 | bold |
| radial | circle | 2 | brand |
| linear | 0deg | 2 | brand |
| linear | — | 2 | brand |

```css
background: linear-gradient(rgba(11, 11, 11, 0.8) 0px, oklab(0.149576 0.00000680983 0.00000298768 / 0.761905) 100%);
background: radial-gradient(52.53% 57.5% at 50% 100%, rgba(8, 9, 10, 0) 0px, rgba(8, 9, 10, 0.5) 100%);
background: linear-gradient(rgb(8, 9, 10) 10%, rgb(208, 214, 224) 100%);
background: radial-gradient(50% 50%, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0) 90%);
background: radial-gradient(50% 50%, rgba(255, 255, 255, 0.04) 0px, rgba(255, 255, 255, 0) 100%);
```

## Z-Index Map

**6 unique z-index values** across 4 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 5000,10000 | a.S.k.i.p.N.a.v._.r.o.o.t._._.D.c.H.P.R, div.H.e.a.d.e.r._.v.i.e.w.p.o.r.t.P.o.s.i.t.i.o.n._._.R.u.L.s.y. .h.i.d.e.-.m.o.b.i.l.e |
| dropdown | 100,100 | header.H.e.a.d.e.r._.h.e.a.d.e.r._._.h.f.M.j.L |
| sticky | 50,50 | footer.F.o.o.t.e.r._.f.o.o.t.e.r._._.l.J.t.1.0 |
| base | 1,3 | div.I.s.s.u.e.V.i.e.w._.c.h.a.t.B.o.x._._.m.N.Y.g.F, header.B.u.i.l.d._.h.e.a.d.e.r._._.O.A.L.8.V, div.p.a.g.e._.g.l.o.w._._.3.L.j.5.a |

**Issues:**
- [object Object]

## SVG Icons

**88 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 29 |
| sm | 36 |
| md | 10 |
| xl | 13 |

**Icon colors:** `currentColor`, `#E2E4E6`, `var(--label-faint)`, `#9c9da1`, `var(--color-yellow)`, `rgb(98, 102, 109)`, `var(--color-text-tertiary)`, `var(--color-teal)`, `var(--color-red)`, `var(--color-text-quaternary)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Inter Variable | self-hosted | 100 900 | normal, italic |
| Berkeley Mono | self-hosted | 100 900 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 85 | objectFit: fill, borderRadius: 0px, shape: square |
| avatar | 20 | objectFit: cover, borderRadius: 50%, shape: circular |
| gallery | 4 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (106x), 16:9 (2x), 2.15:1 (1x)

## Motion Language

**Feel:** responsive · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `160ms` | 160 |
| `md` | `400ms` | 400 |

### Easing Families

- **ease-out** (79 uses) — `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- **ease-in-out** (25 uses) — `ease`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `grid-dot-0-0-agent` | fade | opacity | 4 |
| `grid-dot-0-1-agent` | fade | opacity | 4 |
| `grid-dot-0-2-agent` | fade | opacity | 4 |
| `grid-dot-0-3-agent` | fade | opacity | 4 |
| `grid-dot-0-4-agent` | fade | opacity | 4 |
| `grid-dot-1-0-agent` | fade | opacity | 4 |
| `grid-dot-1-1-agent` | fade | opacity | 4 |
| `grid-dot-1-2-agent` | fade | opacity | 4 |
| `grid-dot-1-3-agent` | fade | opacity | 4 |
| `grid-dot-1-4-agent` | fade | opacity | 4 |
| `grid-dot-2-0-agent` | fade | opacity | 4 |
| `grid-dot-2-1-agent` | fade | opacity | 4 |
| `grid-dot-2-2-agent` | fade | opacity | 4 |
| `grid-dot-2-3-agent` | fade | opacity | 4 |
| `grid-dot-2-4-agent` | fade | opacity | 4 |
| `grid-dot-3-0-agent` | fade | opacity | 4 |
| `grid-dot-3-1-agent` | fade | opacity | 4 |
| `grid-dot-3-2-agent` | fade | opacity | 4 |
| `grid-dot-3-3-agent` | fade | opacity | 4 |
| `grid-dot-3-4-agent` | fade | opacity | 4 |

## Component Anatomy

### button — 88 instances

**Slots:** label

### input — 3 instances


## Brand Voice

**Tone:** neutral · **Pronoun:** you-only · **Headings:** Sentence case (balanced)

### Top CTA Verbs

- **linear** (5)
- **sign** (2)
- **pulse** (2)
- **initiatives** (2)
- **projects** (2)
- **agents** (2)
- **product** (1)
- **resources** (1)

### Button Copy Patterns

- "linear" (2×)
- "product" (1×)
- "resources" (1×)
- "log in
sign up" (1×)
- "log in" (1×)
- "sign up" (1×)
- "inbox" (1×)
- "my issues" (1×)
- "reviews" (1×)
- "pulse" (1×)

### Sample Headings

> The product development
system for teams and agents
The product development system for teams and agents
> Faster app launch
> A new species of product tool. Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.
> Make product operations self-driving
> Define the product direction
> Make product operations self-driving
> Define the product direction
> Move work forward across teams and agents
> Review PRs and agent output
> Understand progress at scale

## Page Intent

**Type:** `landing` (confidence 0.31)
**Description:** Purpose-built for planning and building products with AI agents.

Alternates: blog-post (0.35)

## Section Roles

Reading order (top→bottom): content → logo-wall → nav → steps → nav → nav → nav → content → testimonials → nav → testimonials → nav → hero → nav → testimonial → hero → nav → nav → nav → testimonial → cta → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | content | — | 0.3 |
| 1 | logo-wall | — | 0.85 |
| 2 | nav | — | 0.9 |
| 3 | steps | The product development
system for teams and agents
The product development syst | 0.75 |
| 4 | nav | — | 0.9 |
| 5 | nav | — | 0.4 |
| 6 | nav | — | 0.4 |
| 7 | content | — | 0.3 |
| 8 | testimonials | Make product operations self-driving | 0.4 |
| 9 | nav | — | 0.4 |
| 10 | testimonials | Define the product direction | 0.4 |
| 11 | nav | — | 0.4 |
| 12 | hero | Move work forward across teams and agents | 0.4 |
| 13 | nav | — | 0.4 |
| 14 | testimonial | Review PRs and agent output | 0.8 |
| 15 | hero | Understand progress at scale | 0.4 |
| 16 | nav | — | 0.4 |
| 17 | nav | — | 0.4 |
| 18 | nav | — | 0.4 |
| 19 | testimonial | — | 0.8 |

## Material Language

**Label:** `material-you` (confidence 0.45)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.471 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 9999px |
| backdrop-filter in use | no |
| Gradients | 15 |

## Imagery Style

**Label:** `mixed` (confidence 0.018)
**Counts:** total 109, svg 82, icon 103, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** soft

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Inter Variable` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
