# Design Language: Apple

> Extracted from `https://apple.com` on May 21, 2026
> 1906 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#f5f5f7` | rgb(245, 245, 247) | hsl(240, 11%, 96%) | 96 |
| Secondary | `#0071e3` | rgb(0, 113, 227) | hsl(210, 100%, 45%) | 9 |
| Accent | `#ea33c0` | rgb(234, 51, 192) | hsl(314, 81%, 56%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#1d1d1f` | hsl(240, 3%, 12%) | 1153 |
| `#000000` | hsl(0, 0%, 0%) | 999 |
| `#e8e8ed` | hsl(240, 12%, 92%) | 478 |
| `#ffffff` | hsl(0, 0%, 100%) | 472 |
| `#86868b` | hsl(240, 2%, 54%) | 64 |
| `#6e6e73` | hsl(240, 2%, 44%) | 4 |
| `#333336` | hsl(240, 3%, 21%) | 2 |
| `#d2d2d7` | hsl(240, 6%, 83%) | 1 |
| `#41626a` | hsl(192, 24%, 34%) | 1 |

### Background Colors

Used on large-area elements: `#ffffff`, `#161617`, `#1d1d1f`, `#000000`, `#f5f5f7`, `#f4f8fb`, `#271a11`, `#ea33c0`, `#9fc6f4`, `#2b3a37`, `#41626a`, `#3397d4`, `#371410`

### Text Colors

Text color palette: `#000000`, `#1d1d1f`, `#ffffff`, `#86868b`, `#e8e8ed`, `#2997ff`, `#f5f5f7`, `#0066cc`, `#6e6e73`

### Gradients

```css
background-image: radial-gradient(100% 33% at 0% 100%, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0));
```

```css
background-image: linear-gradient(rgba(29, 29, 31, 0.4) 0%, rgba(29, 29, 31, 0) 70px, rgba(29, 29, 31, 0) calc(100% - 70px), rgba(29, 29, 31, 0.4) 100%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#1d1d1f` | text, border, background | 1153 |
| `#000000` | text, border, background | 999 |
| `#2997ff` | text, border | 526 |
| `#e8e8ed` | text, border | 478 |
| `#ffffff` | background, text, border | 472 |
| `#f5f5f7` | background, text, border | 96 |
| `#86868b` | text, border | 64 |
| `#0066cc` | text, border | 64 |
| `#0071e3` | background | 9 |
| `#6e6e73` | text, border | 4 |
| `#333336` | background | 2 |
| `#d2d2d7` | background | 1 |
| `#271a11` | background | 1 |
| `#ea33c0` | background | 1 |
| `#9fc6f4` | background | 1 |
| `#41626a` | background | 1 |
| `#3397d4` | background | 1 |
| `#371410` | background | 1 |

## Typography

### Font Families

- **SF Pro Text** — used for all (1708 elements)
- **SF Pro Display** — used for all (197 elements)
- **Arial** — used for all (1 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 56px | 3.5rem | 600 | 60px | -0.28px | h2 |
| 44px | 2.75rem | 400 | 44px | -0.12px | svg, path |
| 40px | 2.5rem | 600 | 44px | normal | h3, span, picture, source |
| 34px | 2.125rem | 600 | 50px | -0.374px | h1 |
| 28px | 1.75rem | 400 | 32px | 0.196px | p |
| 24px | 1.5rem | 300 | 36px | normal | span, li, a, input |
| 21px | 1.3125rem | 400 | 25px | 0.231px | p, sup, span |
| 18px | 1.125rem | 300 | 18px | normal | button, svg, polyline |
| 17px | 1.0625rem | 400 | normal | normal | html, head, meta, link |
| 14px | 0.875rem | 400 | 18.0008px | -0.224px | a, p, sup, div |
| 13.3333px | 0.8333rem | 400 | normal | normal | input |
| 12px | 0.75rem | 400 | 16.0005px | -0.12px | div, aside, ul, a |
| 10px | 0.625rem | 400 | 13px | -0.08px | span |

### Heading Scale

```css
h2 { font-size: 56px; font-weight: 600; line-height: 60px; }
h3 { font-size: 40px; font-weight: 600; line-height: 44px; }
h1 { font-size: 34px; font-weight: 600; line-height: 50px; }
h2 { font-size: 12px; font-weight: 400; line-height: 16.0005px; }
```

### Body Text

```css
body { font-size: 12px; font-weight: 400; line-height: 16.0005px; }
```

### Font Weights in Use

`400` (1311x), `600` (581x), `300` (8x), `700` (6x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-4 | 4px | 0.25rem |
| spacing-24 | 24px | 1.5rem |
| spacing-26 | 26px | 1.625rem |
| spacing-29 | 29px | 1.8125rem |
| spacing-32 | 32px | 2rem |
| spacing-34 | 34px | 2.125rem |
| spacing-37 | 37px | 2.3125rem |
| spacing-40 | 40px | 2.5rem |
| spacing-44 | 44px | 2.75rem |
| spacing-48 | 48px | 3rem |
| spacing-53 | 53px | 3.3125rem |
| spacing-56 | 56px | 3.5rem |
| spacing-59 | 59px | 3.6875rem |
| spacing-80 | 80px | 5rem |
| spacing-84 | 84px | 5.25rem |
| spacing-88 | 88px | 5.5rem |
| spacing-114 | 114px | 7.125rem |
| spacing-128 | 128px | 8rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 5px | 5 |
| md | 8px | 6 |
| lg | 11px | 2 |
| full | 50px | 1 |
| full | 980px | 31 |
| full | 999px | 1 |

## Box Shadows

**xl** — blur: 30px
```css
box-shadow: rgba(0, 0, 0, 0.22) 3px 5px 30px 0px;
```

## CSS Custom Properties

### Colors

```css
--sk-focus-color: #0071e3;
--sk-focus-color-alt: rgb(0, 0, 0);
--sk-body-text-color: rgb(29, 29, 31);
--sk-headline-text-color: rgb(29, 29, 31);
--sk-body-background-color: rgb(255, 255, 255);
--sk-body-link-color: rgb(0, 102, 204);
--sk-glyph-gray-secondary: rgb(110, 110, 115);
--sk-glyph-gray-secondary-alpha: rgba(0, 0, 0, 0.56);
--sk-glyph-gray-secondary-alt: rgb(66, 66, 69);
--sk-glyph-gray-secondary-alt-alpha: rgba(0, 0, 0, 0.72);
--sk-fill-secondary: rgb(250, 250, 252);
--sk-fill-gray-secondary: rgb(134, 134, 139);
--sk-fill-gray-secondary-alpha: rgba(0, 0, 0, 0.48);
--sk-fill-orange-secondary: rgb(255, 249, 244);
--sk-fill-green-secondary: rgb(245, 255, 246);
--sk-fill-red-secondary: rgb(255, 242, 244);
--sk-fill-yellow-secondary: rgb(255, 254, 242);
```

### Spacing

```css
--sk-default-stacked-margin: 0.4em;
--sk-paragraph-plus-element-margin: 0.8em;
--sk-headline-plus-first-element-margin: 0.8em;
--sk-headline-plus-headline-margin: 0.4em;
--sk-paragraph-plus-headline-margin: 1.6em;
--sk-footnote-font-size: 0.6em;
--sk-footnote-reduced-font-size: .45em;
--media-gallery-section-padding-bottom: var(--media-gallery-dotnav-gap);
--media-gallery-tile-gap: 13px;
--media-gallery-dotnav-gap: 12px;
--media-gallery-dotnav-iconcontrol-margin-top: unset;
--media-gallery-dotnav-iconcontrol-margin-right: calc(12px + env(safe-area-inset-right));
--media-gallery-genre-m-dot-padding: 0.25em;
--media-gallery-button-margin-top: 0;
--media-gallery-headline-margin-bottom: 26px;
--media-gallery-bottom-content-padding-left: 48px;
--media-gallery-bottom-content-padding-bottom: 40px;
--media-gallery-bottom-content-padding-right: 48px;
```

### Typography

```css
--r-localnav-text-zoom-factor: 1;
--sk-body-font-stack: text;
```

### Other

```css
--r-globalnav-background-opened: #fafafc;
--r-globalnav-background-opened-dark: #161617;
--sk-focus-offset: 1px;
--sk-focus-offset-container: 3px;
--r-localnav-height: calc(52px * var(--r-localnav-text-zoom-factor));
--r-localnav-stacked-height: calc(66px * var(--r-localnav-text-zoom-factor));
--r-localnav-gn-height: var(--r-globalnav-height, 44px);
--r-localnav-viewport-large-min-width: 1024px;
--r-localnav-viewport-large-query: min-width(1024px);
--r-localnav-viewport-medium-min-width: 834px;
--r-localnav-viewport-medium-max-width: 1023px;
--r-localnav-viewport-medium-query: min-width(834px);
--r-localnav-viewport-small-min-width: 320px;
--r-localnav-viewport-small-max-width: 833px;
--r-localnav-viewport-small-query: min-width(320px);
--sk-link-disabled-opacity: 0.42;
--sk-footnote-offset-top: -0.5em;
--sk-glyph: rgb(0, 0, 0);
--sk-glyph-gray: rgb(29, 29, 31);
--sk-glyph-gray-alpha: rgba(0, 0, 0, 0.88);
--sk-glyph-gray-tertiary: rgb(134, 134, 139);
--sk-glyph-gray-tertiary-alpha: rgba(0, 0, 0, 0.48);
--sk-glyph-blue: rgb(0, 102, 204);
--sk-glyph-orange: rgb(182, 68, 0);
--sk-glyph-green: rgb(0, 128, 9);
--sk-glyph-red: rgb(227, 0, 0);
--sk-fill: rgb(255, 255, 255);
--sk-fill-tertiary: rgb(245, 245, 247);
--sk-fill-gray: rgb(29, 29, 31);
--sk-fill-gray-alpha: rgba(0, 0, 0, 0.88);
--sk-fill-gray-tertiary: rgb(210, 210, 215);
--sk-fill-gray-tertiary-alpha: rgba(0, 0, 0, 0.16);
--sk-fill-gray-quaternary: rgb(232, 232, 237);
--sk-fill-gray-quaternary-alpha: rgba(0, 0, 0, 0.08);
--sk-fill-blue: rgb(0, 113, 227);
--sk-fill-orange: rgb(245, 99, 0);
--sk-fill-green: rgb(3, 161, 14);
--sk-fill-red: rgb(227, 0, 0);
--sk-fill-yellow: rgb(255, 224, 69);
--sk-productred: rgb(175, 30, 45);
--sk-enviro-green: rgb(0, 217, 89);
--sk-enviro-neutral: rgb(232, 232, 237);
--sk-footnote-reduced-offset-top: -.86em;
--globalnav-height: 44px;
--globalnav-collective-height: var(--globalnav-height);
--hero-content-height: 580px;
--promo-content-height: 580px;
--media-gallery-bottom-copy-duration: 600ms;
--media-gallery-slide-duration: 800ms;
--media-gallery-longnote-position-left: 18px;
--media-gallery-tile-width: 930px;
--media-gallery-tile-height: 523px;
--fam-gallery-tile-height: 234px;
--r-sk-safe-area-inset-start: 0px;
--r-localeswitcher-height: 70px;
--r-globalmessage-segment-height: 0px;
--r-globalnav-height: 44px;
--r-sk-start: left;
--r-sk-safe-area-inset-end: 0px;
--r-globalnav-segmentbar-height: 0px;
--r-sk-logical-factor: 1;
--r-sk-end: right;
```

### Dependencies

```css
--r-localnav-height: --r-localnav-text-zoom-factor;
--r-localnav-stacked-height: --r-localnav-text-zoom-factor;
--r-localnav-gn-height: --r-globalnav-height;
--globalnav-collective-height: --globalnav-height;
--media-gallery-section-padding-bottom: --media-gallery-dotnav-gap;
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
| sm | 419px | max-width |
| sm | 480px | max-width |
| sm | 640px | max-width |
| sm | 641px | min-width |
| md | 734px | max-width |
| md | 735px | min-width |
| md | 736px | min-width |
| 833px | 833px | max-width |
| 834px | 834px | min-width |
| lg | 1023px | max-width |
| lg | 1044px | max-width |
| lg | 1068px | max-width |
| lg | 1069px | min-width |
| lg | 1070px | min-width |
| 1440px | 1440px | max-width |
| 1441px | 1441px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.24s`, `0.32s`, `0.08s`, `0.22s`, `0.2s`, `0.18s`, `0.16s`, `0.14s`, `0.12s`, `0.1s`, `0.06s`, `0.04s`, `0.02s`, `0.3s`, `0.25s`, `1s`, `0.4s`

### Common Transitions

```css
transition: all;
transition: background-color 0.24s cubic-bezier(0.4, 0, 0.6, 1);
transition: background-color 0.24s cubic-bezier(0.4, 0, 0.6, 1), border-color 0.24s cubic-bezier(0.4, 0, 0.6, 1);
transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
transition: background 0.24s cubic-bezier(0.4, 0, 0.6, 1);
transition: visibility 0.24s steps(1);
transition: opacity 0.24s cubic-bezier(0.4, 0, 0.6, 1);
transition: opacity 0.32s 0.08s, transform 0.32s 0.08s;
transition: opacity 0.24s, transform 0.24s;
transition: opacity 0.22s, transform 0.22s;
```

### Keyframe Animations

**globalnav-chevron-slide-in-hover**
```css
@keyframes globalnav-chevron-slide-in-hover {
  0% { opacity: 0; transform: translate(-4px); }
  100% { opacity: 1; transform: translate(0px); }
}
```

**globalnav-chevron-hover-off**
```css
@keyframes globalnav-chevron-hover-off {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.8); }
}
```

**globalnav-flyout-slide-forward-next**
```css
@keyframes globalnav-flyout-slide-forward-next {
  0% { opacity: 0; transform: translate(8px); }
  100% { opacity: 1; transform: translate(0px); }
}
```

**globalnav-flyout-slide-forward-previous**
```css
@keyframes globalnav-flyout-slide-forward-previous {
  0% { opacity: 1; transform: translate(0px); }
  100% { opacity: 0; transform: translate(-8px); }
}
```

**globalnav-flyout-slide-back-previous**
```css
@keyframes globalnav-flyout-slide-back-previous {
  0% { opacity: 1; transform: translate(0px); }
  100% { opacity: 0; transform: translate(8px); }
}
```

**globalnav-flyout-slide-back-next**
```css
@keyframes globalnav-flyout-slide-back-next {
  0% { opacity: 0; transform: translate(-8px); }
  100% { opacity: 1; transform: translate(0px); }
}
```

**globalnav-scrim-height-change**
```css
@keyframes globalnav-scrim-height-change {
  0% { height: var(--r-globalnav-previous-flyout-height); }
  100% { height: var(--r-globalnav-next-flyout-height); }
}
```

**globalnav-fade-in**
```css
@keyframes globalnav-fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**globalnav-search-fade**
```css
@keyframes globalnav-search-fade {
  0% { opacity: 0; transform: translateY(0px); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

**globalnav-search-fade-and-slide**
```css
@keyframes globalnav-search-fade-and-slide {
  0% { opacity: 0; transform: translateY(calc(var(--r-globalnav-search-shift-vertical) * -1)); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (45 instances)

```css
.button {
  background-color: rgb(0, 113, 227);
  color: rgba(255, 255, 255, 0.8);
  font-size: 17px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Inputs (2 instances)

```css
.input {
  color: rgb(232, 232, 237);
  border-color: rgb(232, 232, 237);
  border-radius: 0px;
  font-size: 24px;
  padding-top: 1px;
  padding-right: 34px;
}
```

### Links (338 instances)

```css
.link {
  color: rgb(232, 232, 237);
  font-size: 12px;
  font-weight: 600;
}
```

### Navigation (754 instances)

```css
.navigatio {
  background-color: rgba(29, 29, 31, 0.8);
  color: rgb(29, 29, 31);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
}
```

### Footer (32 instances)

```css
.foote {
  background-color: rgb(245, 245, 247);
  color: rgba(0, 0, 0, 0.56);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 12px;
}
```

### Dropdowns (617 instances)

```css
.dropdown {
  background-color: rgba(29, 29, 31, 0.8);
  border-radius: 0px;
  border-color: rgb(29, 29, 31);
  padding-top: 0px;
}
```

### Tabs (9 instances)

```css
.tab {
  color: rgb(0, 102, 204);
  font-size: 17px;
  font-weight: 400;
  padding-top: 8px;
  padding-right: 8px;
  border-color: rgb(0, 102, 204);
  border-radius: 0px;
}
```

### ProgressBars (1 instances)

```css
.progressBar {
  color: rgb(0, 0, 0);
  border-radius: 0px;
  font-size: 17px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 14 instances, 3 variants

**Variant 1** (1 instance)

```css
  background: rgb(245, 245, 247);
  color: rgb(0, 0, 0);
  padding: 8px 15px 8px 15px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 14px;
  font-weight: 400;
```

**Variant 2** (9 instances)

```css
  background: rgb(0, 113, 227);
  color: rgb(255, 255, 255);
  padding: 11px 21px 11px 21px;
  border-radius: 980px;
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 17px;
  font-weight: 400;
```

**Variant 3** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 102, 204);
  padding: 11px 21px 11px 21px;
  border-radius: 980px;
  border: 1px solid rgb(0, 102, 204);
  font-size: 17px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(255, 255, 255, 0.8);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgba(255, 255, 255, 0.8);
  font-size: 18px;
  font-weight: 300;
```

### Button — 13 instances, 2 variants

**Variant 1** (11 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(255, 255, 255, 0.8);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgba(255, 255, 255, 0.8);
  font-size: 17px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(29, 29, 31);
  padding: 2px 0px 2px 0px;
  border-radius: 0px;
  border: 0px none rgb(29, 29, 31);
  font-size: 17px;
  font-weight: 400;
```

### Button — 11 instances, 1 variant

**Variant 1** (11 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(255, 255, 255, 0.8);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgba(255, 255, 255, 0.8);
  font-size: 17px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(255, 255, 255, 0.8);
  padding: 0px 8px 0px 8px;
  border-radius: 0px;
  border: 0px none rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(255, 255, 255, 0.8);
  padding: 0px 8px 0px 8px;
  border-radius: 0px;
  border: 0px none rgba(255, 255, 255, 0.8);
  font-size: 12px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(210, 210, 215, 0.64);
  color: rgba(0, 0, 0, 0.48);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 0px none rgba(0, 0, 0, 0.48);
  font-size: 17px;
  font-weight: 400;
```

### Button — 18 instances, 1 variant

**Variant 1** (18 instances)

```css
  background: rgb(245, 245, 247);
  color: rgb(0, 0, 0);
  padding: 11px 21px 11px 21px;
  border-radius: 980px;
  border: 1px solid rgba(0, 0, 0, 0);
  font-size: 17px;
  font-weight: 400;
```

## Layout System

**29 grid containers** and **208 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1024px | 22px |
| 50% | 0px |
| 2560px | 0px |
| 980px | 22px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 24x |
| 2-column | 5x |

### Grid Templates

```css
grid-template-columns: 1280px;
gap: 12px;
grid-template-columns: 622px 622px;
gap: 12px;
grid-template-columns: 930px;
grid-template-columns: 930px;
grid-template-columns: 930px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 176x |
| row/wrap | 1x |
| column/nowrap | 12x |
| row-reverse/nowrap | 19x |

**Gap values:** `12px`, `normal 0px`, `normal 14px`, `normal 17px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 10 passing, 0 failing color pairs

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#ffffff` | `#0071e3` | 4.7:1 | AA |
| `#000000` | `#f5f5f7` | 19.29:1 | AAA |

## Design System Score

**Overall: 86/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 92/100 |
| Typography Consistency | 80/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 26 !important rules — prefer specificity over overrides
- 87% of CSS is unused — consider purging
- 7458 duplicate CSS declarations

## Gradients

**2 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| radial | — | 3 | bold |
| linear | — | 4 | bold |

```css
background: radial-gradient(100% 33% at 0% 100%, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0));
background: linear-gradient(rgba(29, 29, 31, 0.4) 0%, rgba(29, 29, 31, 0) 70px, rgba(29, 29, 31, 0) calc(100% - 70px), rgba(29, 29, 31, 0.4) 100%);
```

## Z-Index Map

**9 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 9998,10000 | div.g.l.o.b.a.l.n.a.v.-.c.u.r.t.a.i.n, aside.g.l.o.b.a.l.m.e.s.s.a.g.e.-.s.e.g.m.e.n.t, nav.g.l.o.b.a.l.n.a.v. .j.s |
| base | -1,4 | span, span, div |

**Issues:**
- [object Object]

## SVG Icons

**23 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 2 |
| sm | 2 |
| md | 1 |
| lg | 1 |
| xl | 17 |

**Icon colors:** `currentColor`, `rgb(0, 0, 0)`, `rgba(255, 255, 255, 0.8)`, `rgb(134, 134, 139)`, `rgba(0, 0, 0, 0.48)`, `rgb(255, 255, 255)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Apple Legacy Chevron | self-hosted | 100, 200, 300, 400, 500, 600, 700, 800, 900 | normal |
| Apple Icons 100 | self-hosted | 400, normal | normal |
| Apple Icons 200 | self-hosted | 400, normal | normal |
| Apple Icons 300 | self-hosted | 400, normal | normal |
| Apple Icons 400 | self-hosted | 400, normal | normal |
| Apple Icons 500 | self-hosted | 400, normal | normal |
| Apple Icons 600 | self-hosted | 400, normal | normal |
| Apple Icons 700 | self-hosted | 400, normal | normal |
| Apple Icons 800 | self-hosted | 400, normal | normal |
| Apple Icons 900 | self-hosted | 400, normal | normal |
| SF Pro Display | self-hosted | 100, 200, 300, 400, 500, 600, 700, 800, 900 | normal, italic |
| SF Pro Display 100 | self-hosted | 400, normal | normal |
| SF Pro Display 200 | self-hosted | 400, normal | normal |
| SF Pro Display 300 | self-hosted | 400, normal | normal |
| SF Pro Display 500 | self-hosted | 400, normal | normal |
| SF Pro Display 600 | self-hosted | 400, normal | normal |
| SF Pro Display 700 | self-hosted | 400, normal | normal |
| SF Pro Display 800 | self-hosted | 400, normal | normal |
| SF Pro Display 900 | self-hosted | 400, normal | normal |
| SF Pro Text | self-hosted | 100, 200, 300, 400, 500, 600, 700, 800, 900 | normal, italic |
| SF Pro Text 100 | self-hosted | 400, normal | normal |
| SF Pro Text 200 | self-hosted | 400, normal | normal |
| SF Pro Text 300 | self-hosted | 400, normal | normal |
| SF Pro Text 500 | self-hosted | 400, normal | normal |
| SF Pro Text 600 | self-hosted | 400, normal | normal |
| SF Pro Text 700 | self-hosted | 400, normal | normal |
| SF Pro Text 800 | self-hosted | 400, normal | normal |
| SF Pro Text 900 | self-hosted | 400, normal | normal |
| SF Pro Icons | self-hosted | 100, 200, 300, 400, 500, 600, 700, 800, 900 | normal |
| SF Pro Icons 100 | self-hosted | 400, normal | normal |
| SF Pro Icons 200 | self-hosted | 400, normal | normal |
| SF Pro Icons 300 | self-hosted | 400, normal | normal |
| SF Pro Icons 500 | self-hosted | 400, normal | normal |
| SF Pro Icons 600 | self-hosted | 400, normal | normal |
| SF Pro Icons 700 | self-hosted | 400, normal | normal |
| SF Pro Icons 800 | self-hosted | 400, normal | normal |
| SF Pro Icons 900 | self-hosted | 400, normal | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| gallery | 15 | objectFit: fill, borderRadius: 0px, shape: square |
| hero | 9 | objectFit: cover, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (21x), 4.35:1 (3x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `instant` | `20ms` | 20 |
| `xs` | `100ms` | 100 |
| `sm` | `160ms` | 160 |
| `md` | `300ms` | 300 |
| `xl` | `1s` | 1000 |

### Easing Families

- **custom** (251 uses) — `cubic-bezier(0.4, 0, 0.6, 1)`, `cubic-bezier(0.25, 0.1, 0.3, 1)`
- **steps** (14 uses) — `steps(1)`, `steps(1, start)`
- **linear** (8 uses) — `linear`
- **ease-in-out** (2 uses) — `ease`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `globalnav-search-fade-and-slide` | slide-y | opacity, transform | 6 |

## Component Anatomy

### button — 60 instances

**Slots:** label
**Variants:** link · secondary

| variant | count | sample label |
|---|---|---|
| default | 54 | Continue |
| secondary | 4 | Shop iPhone |
| link | 2 | 0
+ |

## Brand Voice

**Tone:** friendly · **Pronoun:** you-only · **Headings:** Title Case (tight)

### Top CTA Verbs

- **learn** (8)
- **stream** (5)
- **buy** (3)
- **listen** (3)
- **play** (3)
- **watch** (3)
- **continue** (1)
- **shop** (1)

### Button Copy Patterns

- "learn more" (8×)
- "stream now" (5×)
- "buy" (3×)
- "listen now" (3×)
- "play now" (3×)
- "watch now" (3×)
- "continue" (1×)
- "0
+" (1×)
- "shop iphone" (1×)
- "get your estimate" (1×)

### Sample Headings

> Accessibility
> iPhone
> MacBook Neo
> WWDC 26
> Apple Card
> Accessibility
> iPhone
> MacBook Neo
> WWDC 26
> Apple Card

## Page Intent

**Type:** `landing` (confidence 0.51)
**Description:** Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment, and expert device support.

Alternates: pricing (0.6)

## Section Roles

Reading order (top→bottom): sidebar → sidebar → steps → nav → hero → cta → gallery → footer → pricing-table → nav → content

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | sidebar | — | 0.4 |
| 1 | sidebar | — | 0.4 |
| 2 | nav | — | 0.9 |
| 3 | steps | Accessibility | 0.75 |
| 4 | hero | Accessibility | 0.85 |
| 5 | cta | WWDC 26 | 0.75 |
| 6 | gallery | Endless entertainment. | 0.7 |
| 7 | footer | Apple Footer | 0.95 |
| 8 | pricing-table | — | 0.9 |
| 9 | nav | Shop and Learn | 0.9 |
| 10 | content | — | 0.3 |

## Material Language

**Label:** `material-you` (confidence 0.45)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.369 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 999px |
| backdrop-filter in use | no |
| Gradients | 2 |

## Imagery Style

**Label:** `photography` (confidence 0.542)
**Counts:** total 24, svg 0, icon 0, screenshot-like 0, photo-like 24
**Dominant aspect:** square-ish
**Radius profile on images:** square

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `SF Pro Text` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
