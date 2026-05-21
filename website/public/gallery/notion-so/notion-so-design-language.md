# Design Language: The AI workspace that works for you. | Notion

> Extracted from `https://notion.so` on May 21, 2026
> 1572 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#455dd3` | rgb(69, 93, 211) | hsl(230, 62%, 55%) | 2 |
| Secondary | `#0075de` | rgb(0, 117, 222) | hsl(208, 100%, 44%) | 31 |
| Accent | `#213183` | rgb(33, 49, 131) | hsl(230, 60%, 32%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#000000` | hsl(0, 0%, 0%) | 2143 |
| `#f6f5f4` | hsl(30, 10%, 96%) | 388 |
| `#a39e98` | hsl(33, 6%, 62%) | 202 |
| `#ffffff` | hsl(0, 0%, 100%) | 171 |
| `#615d59` | hsl(30, 4%, 36%) | 48 |
| `#78736f` | hsl(27, 4%, 45%) | 14 |
| `#191918` | hsl(60, 2%, 10%) | 2 |
| `#c0c0c0` | hsl(0, 0%, 75%) | 1 |
| `#dddddd` | hsl(0, 0%, 87%) | 1 |

### Background Colors

Used on large-area elements: `#ffffff`, `#191918`, `#f6f5f4`, `#02093a`, `#ffc95e`, `#f77463`, `#62aef0`, `#2a9d99`, `#b18164`, `#f9f9f8`, `#f7f7f5`

### Text Colors

Text color palette: `#000000`, `#f6f5f4`, `#ffffff`, `#0075de`, `#a39e98`, `#9c7054`, `#ff6d00`, `#f64932`, `#9849e8`, `#097fe8`

### Gradients

```css
background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#000000` | text, border, background | 2143 |
| `#f6f5f4` | text, border, background | 388 |
| `#a39e98` | text, border | 202 |
| `#ffffff` | background, text, border | 171 |
| `#615d59` | text, border | 48 |
| `#0075de` | text, border, background | 31 |
| `#097fe8` | background, text, border | 25 |
| `#62aef0` | text, border, background | 25 |
| `#f64932` | text, border, background | 18 |
| `#9c7054` | text, border | 16 |
| `#ff6d00` | text, border | 16 |
| `#78736f` | text, border | 14 |
| `#9849e8` | text, border | 12 |
| `#ffb110` | text, border, background | 12 |
| `#27918d` | text, border | 8 |
| `#02093a` | background | 6 |
| `#2a9d99` | background | 3 |
| `#191918` | background | 2 |
| `#455dd3` | background | 2 |
| `#ffc95e` | background | 2 |
| `#f77463` | background | 2 |
| `#ad6ded` | background | 2 |
| `#ff8a33` | background | 2 |
| `#ff83dd` | background | 2 |
| `#b18164` | background | 2 |
| `#fff5e0` | background | 1 |
| `#213183` | background | 1 |
| `#1aae39` | background | 1 |
| `#c0c0c0` | border | 1 |
| `#dddddd` | border | 1 |

## Typography

### Font Families

- **NotionInter** — used for all (1565 elements)
- **Times** — used for body (5 elements)
- **Lyon Text** — used for body (2 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 64px | 4rem | 700 | 64px | -2.125px | h1 |
| 54px | 3.375rem | 700 | 56px | -1.875px | h2 |
| 48px | 3rem | 400 | 72px | normal | span, svg, path, img |
| 42px | 2.625rem | 700 | 48px | -1.5px | input, output |
| 40px | 2.5rem | 400 | 60px | normal | span, img |
| 32px | 2rem | 400 | 40px | normal | blockquote |
| 26px | 1.625rem | 700 | 32px | -0.625px | h3 |
| 24px | 1.5rem | 500 | 20px | normal | span, svg, path |
| 22px | 1.375rem | 700 | 28px | -0.25px | span, h2, div, svg |
| 20px | 1.25rem | 400 | 20px | normal | button, span, svg, path |
| 16px | 1rem | 400 | 24px | normal | html, head, meta, script |
| 15px | 0.9375rem | 400 | 20px | normal | span, svg, path |
| 14px | 0.875rem | 400 | 20px | normal | div, span, a, p |
| 12px | 0.75rem | 600 | 16px | 0.125px | span, div, a, h2 |
| 0px | 0rem | 400 | 0px | normal | div |

### Heading Scale

```css
h1 { font-size: 64px; font-weight: 700; line-height: 64px; }
h2 { font-size: 54px; font-weight: 700; line-height: 56px; }
h3 { font-size: 26px; font-weight: 700; line-height: 32px; }
h2 { font-size: 22px; font-weight: 700; line-height: 28px; }
h3 { font-size: 16px; font-weight: 400; line-height: 24px; }
h3 { font-size: 14px; font-weight: 400; line-height: 20px; }
h2 { font-size: 12px; font-weight: 600; line-height: 16px; }
```

### Body Text

```css
body { font-size: 14px; font-weight: 400; line-height: 20px; }
```

### Font Weights in Use

`400` (1262x), `500` (242x), `700` (43x), `600` (25x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-2 | 2px | 0.125rem |
| spacing-20 | 20px | 1.25rem |
| spacing-24 | 24px | 1.5rem |
| spacing-28 | 28px | 1.75rem |
| spacing-32 | 32px | 2rem |
| spacing-40 | 40px | 2.5rem |
| spacing-44 | 44px | 2.75rem |
| spacing-48 | 48px | 3rem |
| spacing-56 | 56px | 3.5rem |
| spacing-60 | 60px | 3.75rem |
| spacing-64 | 64px | 4rem |
| spacing-78 | 78px | 4.875rem |
| spacing-93 | 93px | 5.8125rem |
| spacing-125 | 125px | 7.8125rem |
| spacing-167 | 167px | 10.4375rem |
| spacing-177 | 177px | 11.0625rem |
| spacing-186 | 186px | 11.625rem |
| spacing-225 | 225px | 14.0625rem |
| spacing-316 | 316px | 19.75rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 4px | 34 |
| md | 8px | 93 |
| lg | 12px | 52 |
| lg | 16px | 4 |
| full | 50px | 2 |
| full | 100px | 7 |
| full | 9999px | 26 |

## Box Shadows

**xs** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 1px 0px 0px;
```

**xs** — blur: 1.041px
```css
box-shadow: rgba(0, 0, 0, 0.01) 0px 0.175px 1.041px 0px, rgba(0, 0, 0, 0.02) 0px 0.8px 2.925px 0px, rgba(0, 0, 0, 0.027) 0px 2.025px 7.847px 0px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px;
```

**xs** — blur: 1.462px
```css
box-shadow: rgba(0, 0, 0, 0.016) 0px 0.7px 1.462px 0px, rgba(0, 0, 0, 0.03) 0px 3px 9px 0px;
```

**sm** — blur: 3px
```css
box-shadow: rgba(0, 0, 0, 0.01) 0px 1px 3px 0px, rgba(0, 0, 0, 0.02) 0px 3px 7px 0px, rgba(0, 0, 0, 0.02) 0px 7px 15px 0px, rgba(0, 0, 0, 0.04) 0px 14px 28px 0px, rgba(0, 0, 0, 0.05) 0px 23px 52px 0px;
```

**sm** — blur: 3.502px
```css
box-shadow: rgba(0, 0, 0, 0.01) 0px 0.667px 3.502px 0px, rgba(0, 0, 0, 0.016) 0px 2.933px 7.252px 0px, rgba(0, 0, 0, 0.02) 0px 7.2px 14.462px 0px, rgba(0, 0, 0, 0.024) 0px 13.867px 28.348px 0px, rgba(0, 0, 0, 0.03) 0px 23.333px 52.123px 0px, rgba(0, 0, 0, 0.04) 0px 36px 89px 0px;
```

**lg** — blur: 20px
```css
box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 20px 5px;
```

**lg** — blur: 18px
```css
box-shadow: rgba(0, 0, 0, 0.04) 0px 4px 18px 0px, rgba(0, 0, 0, 0.027) 0px 2.025px 7.84688px 0px, rgba(0, 0, 0, 0.02) 0px 0.8px 2.925px 0px, rgba(0, 0, 0, 0.01) 0px 0.175px 1.04062px 0px;
```

## CSS Custom Properties

### Colors

```css
--border-color-regular: #00000014;
--text-color-extra-light: #0003;
--text-color-light: #0006;
--text-color-medium: #0009;
--text-color-dark: #111;
--text-color-regular: #040404;
--border-radius-0: 0;
--border-radius-200: 0.25rem;
--border-radius-300: 0.3125rem;
--border-radius-400: 0.375rem;
--border-radius-500: 0.5rem;
--border-radius-600: 0.625rem;
--border-radius-700: 0.75rem;
--border-radius-800: 0.875rem;
--border-radius-900: 1rem;
--border-radius-round: 624.9375rem;
--border-width-1: 0.0625rem;
--border-width-2: 0.125rem;
--border-width-4: 0.25rem;
--border-style-solid: solid;
--border-style-dashed: dashed;
--border-style-none: none;
--color-gray-100: #f9f9f8;
--color-gray-200: #f6f5f4;
--color-gray-300: #dfdcd9;
--color-gray-400: #a39e98;
--color-gray-500: #78736f;
--color-gray-600: #615d59;
--color-gray-700: #494744;
--color-gray-800: #31302e;
--color-gray-900: #191918;
--color-red-100: #fef3f1;
--color-red-200: #fdd3cd;
--color-red-300: #ff8b7c;
--color-red-400: #f77463;
--color-red-500: #f64932;
--color-red-600: #e32d14;
--color-red-700: #b01601;
--color-red-800: #6f0d00;
--color-red-900: #4f0900;
--color-orange-100: #fff5ed;
--color-orange-200: #ffdec4;
--color-orange-300: #ffad71;
--color-orange-400: #ff8a33;
--color-orange-500: #ff6d00;
--color-orange-600: #dd5b00;
--color-orange-700: #ab4a00;
--color-orange-800: #793400;
--color-orange-900: #532200;
--color-yellow-100: #fff5e0;
--color-yellow-200: #ffe4af;
--color-yellow-300: #ffd786;
--color-yellow-400: #ffc95e;
--color-yellow-500: #ffb110;
--color-yellow-600: #e89d01;
--color-yellow-700: #c78600;
--color-yellow-800: #a16c00;
--color-yellow-900: #704b00;
--color-teal-100: #f2fafa;
--color-teal-200: #bde6e4;
--color-teal-300: #83cbc9;
--color-teal-400: #2a9d99;
--color-teal-500: #27918d;
--color-teal-600: #0a7b77;
--color-teal-700: #126764;
--color-teal-800: #0a4d4b;
--color-teal-900: #042b29;
--color-blue-100: #f2f9ff;
--color-blue-200: #e6f3fe;
--color-blue-300: #93cdfe;
--color-blue-400: #62aef0;
--color-blue-500: #097fe8;
--color-blue-600: #0075de;
--color-blue-700: #005bab;
--color-blue-800: #00396b;
--color-blue-900: #002a4f;
--color-purple-100: #f8f5fc;
--color-purple-200: #eadbfa;
--color-purple-300: #d6b6f6;
--color-purple-400: #ad6ded;
--color-purple-500: #9849e8;
--color-purple-600: #7237ae;
--color-purple-700: #562983;
--color-purple-800: #391c57;
--color-purple-900: #1c0e2c;
--color-green-100: #f0faf2;
--color-green-200: #d0f4d8;
--color-green-300: #abe5b8;
--color-green-400: #68ce7e;
--color-green-500: #1aae39;
--color-green-600: #14832b;
--color-green-700: #0f6220;
--color-green-800: #0a4216;
--color-green-900: #05210b;
--color-pink-100: #fff5fc;
--color-pink-200: #ffcdf1;
--color-pink-300: #ffb5eb;
--color-pink-400: #ff83dd;
--color-pink-500: #ff64c8;
--color-pink-600: #d13f9d;
--color-pink-700: #9d2472;
--color-pink-800: #6c1b4f;
--color-pink-900: #481034;
--color-brown-100: #fcf8f5;
--color-brown-200: #ebd5c5;
--color-brown-300: #d9b79f;
--color-brown-400: #b18164;
--color-brown-500: #9c7054;
--color-brown-600: #885d3d;
--color-brown-700: #744d2d;
--color-brown-800: #654124;
--color-brown-900: #523410;
--color-black: #000;
--color-white: #fff;
--color-alpha-black-100: #0000000d;
--color-alpha-black-200: #0000001a;
--color-alpha-black-300: #0003;
--color-alpha-black-400: #0000004d;
--color-alpha-black-500: #0000008a;
--color-alpha-black-600: #00000096;
--color-alpha-black-700: #000000bf;
--color-alpha-black-800: #000000e5;
--color-alpha-black-900: #000000f2;
--color-alpha-white-100: #ffffff0d;
--color-alpha-white-200: #ffffff1a;
--color-alpha-white-300: #fff3;
--color-alpha-white-400: #ffffff4d;
--color-alpha-white-500: #ffffff80;
--color-alpha-white-600: #ffffffa8;
--color-alpha-white-700: #ffffffbf;
--color-alpha-white-800: #ffffffd9;
--color-alpha-white-900: #fffffff2;
--color-transparent: #fff0;
--color-campaigns-agents-launch-blue-300: #607df6;
--color-campaigns-agents-launch-blue-400: #455dd3;
--color-campaigns-agents-launch-blue-500: #394ea3;
--color-campaigns-agents-launch-blue-600: #213183;
--color-campaigns-agents-launch-blue-900: #02093a;
--color-campaigns-agents-launch-yellow: #fefcd5;
--color-campaigns-dev-platform-dos-blue: #1313ba;
--color-campaigns-dev-platform-dos-black: #0a0a5d;
--color-campaigns-dev-platform-dos-neon: #6666fd;
--color-campaigns-dev-platform-dos-slate: #7171a8;
--color-campaigns-dev-platform-dos-lavender: #cbcbef;
--color-campaigns-dev-platform-dos-gray: #f6f6fc;
--color-campaigns-dev-platform-dos-white: var(--color-white);
--color-campaigns-dev-platform-dos-alpha-blue: #1313baa8;
--color-campaigns-dev-platform-dos-alpha-white: var(--color-alpha-white-700);
--color-campaigns-dev-platform-dos-alpha-lavender: #cbcbef70;
--color-campaigns-dev-platform-dos-alpha-gray: #f6f6fc70;
--font-family-primary-sans: NotionInter;
--font-family-primary-serif: "Lyon Text";
--font-family-primary-serif-japanese: "Lyon Text";
--font-family-primary-serif-chinese-simplified: "Lyon Text";
--font-family-primary-serif-chinese-traditional: "Lyon Text";
--font-family-primary-sans-vietnamese: ui-sans-serif;
--font-family-primary-serif-vietnamese: ui-serif;
--font-family-primary-sans-arabic: "Noto Sans Arabic";
--font-family-primary-sans-hebrew: "Noto Sans Hebrew";
--font-family-primary-handwriting: "Permanent Marker";
--font-family-primary-mono: "iA Writer Mono";
--font-family-primary-emoji: "Apple Color Emoji";
--color-card-accent: #097fe8;
--color-button-tertiary-text: #000000f2;
--color-button-primary-background-active: #005bab;
--color-button-primary-border: #fff0;
--color-action-button-primary-background-focus: #f6f5f4;
--color-background-surface-neutral-focus: #dfdcd9;
--spacing-card-padding-inline-block: 2rem;
--color-code-comment: #0000008a;
--color-background-surface-accent-muted: #f2f9ff;
--color-terminal-text: #000000f2;
--color-icon-button-active: #615d59;
--color-interaction-indicator-active: #0000004d;
--color-action-button-primary-icon: #000000f2;
--color-link-secondary-text-focus: #000000bf;
--typography-card-context-feature-letter-spacing: 0;
--color-background-surface-accent-soft: #e6f3fe;
--campaign-nav-bg: rgba(0, 0, 0, 0);
--color-button-ghost-background: #fff0;
--color-border-base: #0000001a;
--color-link-secondary-text: #00000096;
--color-button-secondary-background-hover: #f2f9ff;
--color-background-surface-accent-muted-focus: #e6f3fe;
--border-menu-button-radius: 624.9375rem;
--color-action-button-alpha-background-active: #0000004d;
--color-icon-button: #a39e98;
--color-menu-button-background-selected: #f6f5f4;
--color-action-button-primary-background-active: #f6f5f4;
--color-text-warning: #ff6d00;
--color-button-ghost-background-hover: #f6f5f4;
--typography-card-title-block-font: 700 1.125rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--hero-nav-bg: rgba(0, 0, 0, 0);
--typography-card-title-block-letter-spacing: -0.0078125rem;
--typography-card-title-feature-letter-spacing: -0.0390625rem;
--color-accent-muted: #f2f9ff;
--color-background-surface-accent-soft-active: #93cdfe;
--color-card-background: #fff;
--color-background-surface-accent-soft-focus: #93cdfe;
--spacing-card-padding-inline-sm: 1.5rem;
--typography-card-body-summary-letter-spacing: 0;
--typography-card-context-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--color-badge-light-text: #097fe8;
--color-terminal-text-muted: #0000008a;
--spacing-card-padding-block-end-block: 1.75rem;
--color-action-button-alpha-background-hover: #0003;
--spacing-card-padding-block-end-sm: 1.5rem;
--color-icon-button-background-focus: #0000000d;
--color-code-keyword: #097fe8;
--color-menu-button-background-selected-hover: #f6f5f4;
--color-link-secondary-text-active: #000000bf;
--border-icon-button-radius: 0.25rem;
--color-background-base-active: #0000001a;
--spacing-card-padding-block-start: 1rem;
--spacing-card-padding-block-start-sm: 1.5rem;
--typography-card-body-font: 400 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--color-background-surface-accent-focus: #0075de;
--color-menu-button-border-active: #f9f9f8;
--color-interaction-indicator: #0000001a;
--color-background-surface-accent-hover: #097fe8;
--color-text-error: #f64932;
--color-action-button-alpha-background-focus: #0003;
--typography-card-title-feature-md-letter-spacing: -0.046875rem;
--color-icon-button-background-hover: #0000000d;
--color-action-button-primary-icon-disabled: #0000004d;
--color-link-primary-text-active: #00396b;
--color-action-button-primary-background: #fff;
--color-code-number: #f64932;
--color-text-disabled: #0000004d;
--color-link-primary-text-focus: #00396b;
--typography-card-context-letter-spacing: 0;
--border-button-radius-lg: 0.625rem;
--color-text-muted: #0000008a;
--spacing-card-padding-block-end: 1rem;
--color-menu-button-border-selected-hover: #0003;
--color-background-surface-accent-active: #005bab;
--color-badge-bold-text: #fff;
--color-badge-mono-text: #000;
--color-menu-button-border-selected: #0000001a;
--border-interaction-focus-ring-style: solid;
--color-card-border: #0000001a;
--color-code-literal: #0000008a;
--typography-card-title-feature-font: 700 1.625rem /2rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--color-background-surface-accent-soft-hover: #93cdfe;
--color-button-secondary-text: #005bab;
--color-action-button-alpha-background: #0000001a;
--color-card-body-block-text: #000000f2;
--color-button-ghost-indicator: #78736f;
--color-code-class: #f64932;
--color-background-surface-neutral-active: #dfdcd9;
--dev-platform-nav-bg: rgba(0, 0, 0, 0);
--color-text-normal: #000000e5;
--color-icon-button-focus: #615d59;
--color-code-operator: #ff6d00;
--border-popover-radius: 0.75rem;
--color-button-secondary-border: #fff0;
--color-icon-button-background-active: #0000000d;
--typography-card-quote-font: 400 1.25rem /1.75rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--color-accent: #62aef0;
--typography-card-title-feature-md-font: 700 2rem /2.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--color-action-button-alpha-icon-disabled: #0000004d;
--color-background-surface-accent-muted-active: #e6f3fe;
--color-link-primary-text: #0075de;
--color-terminal-background: #f9f9f8;
--color-card-body-text: #00000096;
--color-action-button-alpha-icon: #000000f2;
--color-interaction-focus-ring: #0075de;
--color-accent-strong: #097fe8;
--color-menu-button-background-selected-focus: #f6f5f4;
--color-background-base: #fff;
--color-menu-button-background-hover: #f6f5f4;
--color-background-surface-neutral: #f6f5f4;
--color-button-primary-background: #0075de;
--border-menu-list-item-radius: 0.5rem;
--border-block-media-radius: 0.75rem;
--color-card-title-text: #000;
--color-link-primary-text-hover: #00396b;
--color-button-primary-text: #fff;
--color-badge-mono-background: #f6f5f4;
--color-background-surface-accent: #62aef0;
--typography-card-title-letter-spacing: -0.015625rem;
--color-menu-button-background: #f9f9f8;
--color-background-surface-neutral-hover: #dfdcd9;
--color-background-base-focus: #0000000d;
--color-button-tertiary-background-hover: #f6f5f4;
--color-link-secondary-text-hover: #000000bf;
--color-button-tertiary-background-focus: #f6f5f4;
--color-button-ghost-background-active: #f6f5f4;
--color-code-string: #14832b;
--color-menu-button-background-selected-active: #f6f5f4;
--typography-card-body-letter-spacing: 0;
--color-banner: #ffffffd9;
--color-button-tertiary-border: #0000001a;
--border-badge-radius: 624.9375rem;
--border-radius-base: 0.25rem;
--color-badge-bold-background: #097fe8;
--color-code-foreground: #000000e5;
--typography-card-title-summary-font: 700 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--color-button-ghost-border: #fff0;
--color-code-selection-background: #e6f3fe;
--color-icon-button-hover: #615d59;
--color-badge-muted-text: #0000008a;
--color-button-tertiary-background-active: #f6f5f4;
--color-background-base-hover: #0000000d;
--color-menu-button-border-hover: #f9f9f8;
--typography-card-note-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--border-card-radius: 0.75rem;
--color-badge-light-background: #f2f9ff;
--typography-card-title-summary-letter-spacing: 0;
--color-menu-button-background-active: #f6f5f4;
--color-menu-button-border-selected-focus: #0003;
--color-button-primary-background-hover: #005bab;
--color-button-tertiary-background: #fff;
--color-menu-button-background-focus: #f6f5f4;
--typography-card-note-letter-spacing: 0;
--color-text-strong: #000000f2;
--spacing-card-padding-inline: 1rem;
--color-code-function: #f64932;
--spacing-card-padding-block-start-block: 1.75rem;
--border-button-radius: 0.5rem;
--color-menu-button-border-selected-active: #0003;
--color-action-button-primary-background-hover: #f6f5f4;
--typography-card-title-font: 700 1.375rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--color-text-success: #14832b;
--color-badge-muted-background: #f6f5f4;
--color-button-ghost-text: #000000f2;
--color-background-surface-accent-muted-hover: #e6f3fe;
--color-accent-soft: #e6f3fe;
--color-menu-button-border: #f9f9f8;
--typography-card-context-feature-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--dimension-interaction-focus-ring-outline-width: 0.125rem;
--color-button-secondary-background: #e6f3fe;
--typography-card-quote-letter-spacing: 0;
--dimension-interaction-focus-ring-outline-offset: 0.125rem;
--color-menu-button-text: #000000e5;
--color-button-secondary-background-focus: #f2f9ff;
--color-button-ghost-background-focus: #f6f5f4;
--typography-card-body-summary-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--color-code-variable: #ff6d00;
--color-card-supporting-text: #00000096;
--color-button-primary-background-focus: #005bab;
--color-button-secondary-background-active: #f2f9ff;
--color-menu-button-border-focus: #f9f9f8;
```

### Spacing

```css
--spacing-block-s: 20px;
--spacing-block-m: 24px;
--spacing-block-l: 32px;
--size-block-header-icon: 26px;
--base-padding: 20px;
--spacing-xs: 20px;
--spacing-s: 40px;
--spacing-m: 40px;
--spacing-l: 60px;
--spacing-xl: 60px;
--font-size-50: 0.75rem;
--font-size-100: 0.875rem;
--font-size-150: 0.9375rem;
--font-size-200: 1rem;
--font-size-300: 1.125rem;
--font-size-350: 1.25rem;
--font-size-400: 1.375rem;
--font-size-500: 1.625rem;
--font-size-600: 2rem;
--font-size-700: 2.625rem;
--font-size-800: 3.375rem;
--font-size-900: 4rem;
--font-size-1000: 4.75rem;
--font-letter-spacing-sans-50: 0.0078125rem;
--font-letter-spacing-sans-100: 0;
--font-letter-spacing-sans-150: 0;
--font-letter-spacing-sans-200: 0;
--font-letter-spacing-sans-300: -0.0078125rem;
--font-letter-spacing-sans-350: -0.0078125rem;
--font-letter-spacing-sans-400: -0.015625rem;
--font-letter-spacing-sans-500: -0.0390625rem;
--font-letter-spacing-sans-600-regular: -0.0625rem;
--font-letter-spacing-sans-600-semibold: -0.046875rem;
--font-letter-spacing-sans-600-bold: -0.046875rem;
--font-letter-spacing-sans-700-regular: -0.125rem;
--font-letter-spacing-sans-700-semibold: -0.09375rem;
--font-letter-spacing-sans-700-bold: -0.09375rem;
--font-letter-spacing-sans-800-regular: -0.21875rem;
--font-letter-spacing-sans-800-semibold: -0.1171875rem;
--font-letter-spacing-sans-800-bold: -0.1171875rem;
--font-letter-spacing-sans-900-regular: -0.171875rem;
--font-letter-spacing-sans-900-semibold: -0.1328125rem;
--font-letter-spacing-sans-900-bold: -0.1328125rem;
--font-letter-spacing-sans-1000-regular: -0.25rem;
--font-letter-spacing-sans-1000-bold: -0.15625rem;
--font-letter-spacing-serif-200: 0;
--font-letter-spacing-serif-300: 0;
--font-letter-spacing-serif-350: 0;
--font-letter-spacing-serif-400: 0;
--font-letter-spacing-serif-500: 0;
--font-letter-spacing-serif-600: 0;
--font-letter-spacing-serif-700: -0.09375rem;
--font-letter-spacing-serif-800: -0.125rem;
--font-letter-spacing-serif-900: -0.125rem;
--font-letter-spacing-mono-100: -0.0078125rem;
--spacing-0: 0;
--spacing-4: 0.25rem;
--spacing-8: 0.5rem;
--spacing-12: 0.75rem;
--spacing-16: 1rem;
--spacing-20: 1.25rem;
--spacing-24: 1.5rem;
--spacing-28: 1.75rem;
--spacing-30: 1.875rem;
--spacing-32: 2rem;
--spacing-40: 2.5rem;
--spacing-48: 3rem;
--spacing-56: 3.5rem;
--spacing-64: 4rem;
--spacing-72: 4.5rem;
--spacing-80: 5rem;
--spacing-96: 6rem;
--spacing-128: 8rem;
--spacing-160: 10rem;
--typography-sans-50-regular-letter-spacing: 0.0078125rem;
--typography-sans-50-medium-letter-spacing: 0.0078125rem;
--typography-sans-50-semibold-letter-spacing: 0.0078125rem;
--typography-sans-50-bold-letter-spacing: 0.0078125rem;
--typography-sans-100-regular-letter-spacing: 0;
--typography-sans-100-medium-letter-spacing: 0;
--typography-sans-100-semibold-letter-spacing: 0;
--typography-sans-100-bold-letter-spacing: 0;
--typography-sans-150-regular-letter-spacing: 0;
--typography-sans-150-medium-letter-spacing: 0;
--typography-sans-150-semibold-letter-spacing: 0;
--typography-sans-150-bold-letter-spacing: 0;
--typography-sans-200-regular-letter-spacing: 0;
--typography-sans-200-medium-letter-spacing: 0;
--typography-sans-200-semibold-letter-spacing: 0;
--typography-sans-200-bold-letter-spacing: 0;
--typography-sans-300-regular-letter-spacing: -0.0078125rem;
--typography-sans-300-medium-letter-spacing: -0.0078125rem;
--typography-sans-300-semibold-letter-spacing: -0.0078125rem;
--typography-sans-300-bold-letter-spacing: -0.0078125rem;
--typography-sans-350-regular-letter-spacing: -0.0078125rem;
--typography-sans-350-medium-letter-spacing: -0.0078125rem;
--typography-sans-350-semibold-letter-spacing: -0.0078125rem;
--typography-sans-350-bold-letter-spacing: -0.0078125rem;
--typography-sans-400-regular-letter-spacing: -0.015625rem;
--typography-sans-400-medium-letter-spacing: -0.015625rem;
--typography-sans-400-semibold-letter-spacing: -0.015625rem;
--typography-sans-400-bold-letter-spacing: -0.015625rem;
--typography-sans-500-medium-letter-spacing: -0.0390625rem;
--typography-sans-500-semibold-letter-spacing: -0.0390625rem;
--typography-sans-500-bold-letter-spacing: -0.0390625rem;
--typography-sans-600-regular-letter-spacing: -0.0625rem;
--typography-sans-600-semibold-letter-spacing: -0.046875rem;
--typography-sans-600-bold-letter-spacing: -0.046875rem;
--typography-sans-700-regular-letter-spacing: -0.125rem;
--typography-sans-700-semibold-letter-spacing: -0.09375rem;
--typography-sans-700-bold-letter-spacing: -0.09375rem;
--typography-sans-800-regular-letter-spacing: -0.21875rem;
--typography-sans-800-semibold-letter-spacing: -0.1171875rem;
--typography-sans-800-bold-letter-spacing: -0.1171875rem;
--typography-sans-900-regular-letter-spacing: -0.171875rem;
--typography-sans-900-semibold-letter-spacing: -0.1328125rem;
--typography-sans-900-bold-letter-spacing: -0.1328125rem;
--typography-sans-1000-regular-letter-spacing: -0.25rem;
--typography-sans-1000-bold-letter-spacing: -0.15625rem;
--typography-mono-100-regular-letter-spacing: -0.0078125rem;
--typography-mono-100-bold-letter-spacing: -0.0078125rem;
--typography-serif-200-regular-letter-spacing: 0;
--typography-serif-300-regular-letter-spacing: 0;
--typography-serif-350-regular-letter-spacing: 0;
--typography-serif-400-regular-letter-spacing: 0;
--typography-serif-500-regular-letter-spacing: 0;
--typography-serif-600-regular-letter-spacing: 0;
--typography-serif-700-regular-letter-spacing: -0.09375rem;
--typography-serif-800-regular-letter-spacing: -0.125rem;
--typography-serif-900-regular-letter-spacing: -0.125rem;
--typography-article-body-letter-spacing: 0;
--typography-global-title-subtle-letter-spacing: -0.09375rem;
--typography-global-body-serif-letter-spacing: 0;
--typography-article-meta-letter-spacing: 0.0078125rem;
--typography-article-deck-letter-spacing: -0.0078125rem;
--typography-article-body-lg-letter-spacing: -0.0078125rem;
--typography-interaction-menu-list-heading-letter-spacing: 0.0078125rem;
--typography-global-body-link-letter-spacing: 0;
--typography-global-context-letter-spacing: 0;
--typography-global-quote-letter-spacing: 0;
--spacing-section-inner: 2rem;
--typography-article-context-letter-spacing: 0;
--typography-article-statistics-letter-spacing: -0.09375rem;
--typography-article-body-editorial-lg-letter-spacing: 0;
--typography-interaction-menu-list-item-label-letter-spacing: 0;
--typography-interaction-button-medium-letter-spacing: 0;
--typography-article-subheading-lg-letter-spacing: -0.015625rem;
--typography-interaction-menu-list-item-label-emphasis-md-letter-spacing: -0.015625rem;
--typography-interaction-menu-button-letter-spacing: 0;
--typography-navigation-heading-letter-spacing: 0.0078125rem;
--typography-article-caption-letter-spacing: 0.0078125rem;
--typography-navigation-body-letter-spacing: 0;
--typography-global-stat-md-letter-spacing: -0.1328125rem;
--typography-article-quote-lg-letter-spacing: 0;
--typography-navigation-caption-subtle-letter-spacing: 0.0078125rem;
--typography-article-body-bold-lg-letter-spacing: -0.0078125rem;
--typography-interaction-form-label-letter-spacing: 0;
--typography-global-meta-letter-spacing: 0.0078125rem;
--typography-interaction-form-caption-letter-spacing: 0;
--typography-interaction-button-large-letter-spacing: 0;
--typography-article-deck-lg-letter-spacing: -0.015625rem;
--typography-global-caption-letter-spacing: 0;
--typography-global-heading-md-letter-spacing: -0.09375rem;
--typography-article-dropcap-letter-spacing: -0.0390625rem;
--typography-interaction-form-input-letter-spacing: 0;
--typography-global-title-sm-letter-spacing: -0.1171875rem;
--typography-article-navigation-letter-spacing: 0;
--typography-interaction-menu-list-item-label-emphasis-letter-spacing: 0;
--typography-global-eyebrow-letter-spacing: 0;
--typography-global-heading-lg-letter-spacing: -0.1171875rem;
--typography-article-heading-lg-letter-spacing: -0.0390625rem;
--typography-global-quote-md-letter-spacing: 0;
--typography-global-code-letter-spacing: -0.0078125rem;
--typography-navigation-link-letter-spacing: 0;
--typography-global-stat-sm-letter-spacing: -0.1171875rem;
--typography-article-body-editorial-letter-spacing: 0;
--typography-article-title-letter-spacing: -0.046875rem;
--typography-article-statistics-lg-letter-spacing: -0.1171875rem;
--typography-interaction-menu-list-item-caption-letter-spacing: 0.0078125rem;
--typography-global-body-letter-spacing: 0;
--typography-article-quote-letter-spacing: 0;
--typography-article-title-subtle-letter-spacing: -0.046875rem;
--spacing-section: 5rem;
--typography-article-subheading-letter-spacing: -0.0078125rem;
--typography-global-title-emphasis-md-letter-spacing: -0.1328125rem;
--typography-article-body-bold-letter-spacing: 0;
--typography-navigation-link-emphasis-letter-spacing: 0;
--typography-global-subheading-letter-spacing: -0.015625rem;
--typography-global-deck-sm-letter-spacing: -0.0078125rem;
--typography-global-title-letter-spacing: -0.09375rem;
--typography-global-title-emphasis-letter-spacing: -0.1171875rem;
--typography-global-heading-letter-spacing: -0.046875rem;
--typography-global-deck-letter-spacing: 0;
--typography-article-title-subtle-lg-letter-spacing: -0.09375rem;
--typography-global-title-md-letter-spacing: -0.1328125rem;
--typography-navigation-caption-letter-spacing: 0.0078125rem;
--typography-navigation-link-emphasis-md-letter-spacing: -0.015625rem;
--typography-article-heading-letter-spacing: -0.015625rem;
--typography-global-stat-letter-spacing: -0.09375rem;
--typography-global-quote-sm-letter-spacing: 0;
--typography-interaction-button-small-letter-spacing: 0;
--typography-article-title-lg-letter-spacing: -0.1171875rem;
```

### Typography

```css
--font-family-fallback-sans: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--font-family-fallback-serif: Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--font-family-fallback-serif-japanese: Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN",serif;
--font-family-fallback-serif-chinese-simplified: Georgia,"Songti TC",SimSun,serif;
--font-family-fallback-serif-chinese-traditional: Georgia,"Songti SC",SimSun,serif;
--font-family-fallback-sans-vietnamese: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--font-family-fallback-serif-vietnamese: "Times New Roman",serif;
--font-family-fallback-sans-arabic: NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--font-family-fallback-sans-hebrew: NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--font-family-fallback-handwriting: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--font-family-fallback-mono: Nitti,Menlo,Courier,monospace;
--font-family-fallback-emoji: "Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols;
--font-family-sans: var(--font-family-primary-sans),var(--font-family-fallback-sans);
--font-family-serif: var(--font-family-primary-serif),var(--font-family-fallback-serif);
--font-family-serif-japanese: var(--font-family-primary-serif-japanese),var(--font-family-fallback-serif-japanese);
--font-family-serif-chinese-simplified: var( --font-family-primary-serif-chinese-simplified ),var(--font-family-fallback-serif-chinese-simplified);
--font-family-serif-chinese-traditional: var( --font-family-primary-serif-chinese-traditional ),var(--font-family-fallback-serif-chinese-traditional);
--font-family-sans-vietnamese: var(--font-family-primary-sans-vietnamese),var(--font-family-fallback-sans-vietnamese);
--font-family-serif-vietnamese: var(--font-family-primary-serif-vietnamese),var(--font-family-fallback-serif-vietnamese);
--font-family-sans-arabic: var(--font-family-primary-sans-arabic),var(--font-family-fallback-sans-arabic);
--font-family-sans-hebrew: var(--font-family-primary-sans-hebrew),var(--font-family-fallback-sans-hebrew);
--font-family-handwriting: var(--font-family-primary-handwriting),var(--font-family-fallback-handwriting);
--font-family-mono: var(--font-family-primary-mono),var(--font-family-fallback-mono);
--font-family-emoji: var(--font-family-primary-emoji),var(--font-family-fallback-emoji);
--font-line-height-50: var(--spacing-16);
--font-line-height-100: var(--spacing-20);
--font-line-height-150: var(--spacing-20);
--font-line-height-200: var(--spacing-24);
--font-line-height-300: var(--spacing-28);
--font-line-height-350: var(--spacing-28);
--font-line-height-400: var(--spacing-28);
--font-line-height-450: var(--spacing-30);
--font-line-height-500: var(--spacing-32);
--font-line-height-600: var(--spacing-40);
--font-line-height-700: var(--spacing-48);
--font-line-height-800: var(--spacing-56);
--font-line-height-900: var(--spacing-64);
--font-line-height-1000: var(--spacing-80);
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-variable-regular: 420;
--font-weight-variable-medium: 520;
--font-weight-variable-semibold: 620;
--font-weight-variable-bold: 680;
--typography-sans-50-regular-font: var(--font-weight-regular) var(--font-size-50) /var(--font-line-height-50) var(--font-family-sans);
--typography-sans-50-medium-font: var(--font-weight-medium) var(--font-size-50) /var(--font-line-height-50) var(--font-family-sans);
--typography-sans-50-semibold-font: var(--font-weight-semibold) var(--font-size-50) /var(--font-line-height-50) var(--font-family-sans);
--typography-sans-50-bold-font: var(--font-weight-bold) var(--font-size-50) /var(--font-line-height-50) var(--font-family-sans);
--typography-sans-100-regular-font: var(--font-weight-regular) var(--font-size-100) /var(--font-line-height-100) var(--font-family-sans);
--typography-sans-100-medium-font: var(--font-weight-medium) var(--font-size-100) /var(--font-line-height-100) var(--font-family-sans);
--typography-sans-100-semibold-font: var(--font-weight-semibold) var(--font-size-100) /var(--font-line-height-100) var(--font-family-sans);
--typography-sans-100-bold-font: var(--font-weight-bold) var(--font-size-100) /var(--font-line-height-100) var(--font-family-sans);
--typography-sans-150-regular-font: var(--font-weight-regular) var(--font-size-150) /var(--font-line-height-150) var(--font-family-sans);
--typography-sans-150-medium-font: var(--font-weight-medium) var(--font-size-150) /var(--font-line-height-150) var(--font-family-sans);
--typography-sans-150-semibold-font: var(--font-weight-semibold) var(--font-size-150) /var(--font-line-height-150) var(--font-family-sans);
--typography-sans-150-bold-font: var(--font-weight-bold) var(--font-size-150) /var(--font-line-height-150) var(--font-family-sans);
--typography-sans-200-regular-font: var(--font-weight-regular) var(--font-size-200) /var(--font-line-height-200) var(--font-family-sans);
--typography-sans-200-medium-font: var(--font-weight-medium) var(--font-size-200) /var(--font-line-height-200) var(--font-family-sans);
--typography-sans-200-semibold-font: var(--font-weight-semibold) var(--font-size-200) /var(--font-line-height-200) var(--font-family-sans);
--typography-sans-200-bold-font: var(--font-weight-bold) var(--font-size-200) /var(--font-line-height-200) var(--font-family-sans);
--typography-sans-300-regular-font: var(--font-weight-regular) var(--font-size-300) /var(--font-line-height-300) var(--font-family-sans);
--typography-sans-300-medium-font: var(--font-weight-medium) var(--font-size-300) /var(--font-line-height-300) var(--font-family-sans);
--typography-sans-300-semibold-font: var(--font-weight-semibold) var(--font-size-300) /var(--font-line-height-300) var(--font-family-sans);
--typography-sans-300-bold-font: var(--font-weight-bold) var(--font-size-300) /var(--font-line-height-300) var(--font-family-sans);
--typography-sans-350-regular-font: var(--font-weight-regular) var(--font-size-350) /var(--font-line-height-350) var(--font-family-sans);
--typography-sans-350-medium-font: var(--font-weight-medium) var(--font-size-350) /var(--font-line-height-350) var(--font-family-sans);
--typography-sans-350-semibold-font: var(--font-weight-semibold) var(--font-size-350) /var(--font-line-height-350) var(--font-family-sans);
--typography-sans-350-bold-font: var(--font-weight-bold) var(--font-size-350) /var(--font-line-height-350) var(--font-family-sans);
--typography-sans-400-regular-font: var(--font-weight-regular) var(--font-size-400) /var(--font-line-height-400) var(--font-family-sans);
--typography-sans-400-medium-font: var(--font-weight-medium) var(--font-size-400) /var(--font-line-height-400) var(--font-family-sans);
--typography-sans-400-semibold-font: var(--font-weight-semibold) var(--font-size-400) /var(--font-line-height-400) var(--font-family-sans);
--typography-sans-400-bold-font: var(--font-weight-bold) var(--font-size-400) /var(--font-line-height-400) var(--font-family-sans);
--typography-sans-500-medium-font: var(--font-weight-medium) var(--font-size-500) /var(--font-line-height-500) var(--font-family-sans);
--typography-sans-500-semibold-font: var(--font-weight-semibold) var(--font-size-500) /var(--font-line-height-500) var(--font-family-sans);
--typography-sans-500-bold-font: var(--font-weight-bold) var(--font-size-500) /var(--font-line-height-500) var(--font-family-sans);
--typography-sans-600-regular-font: var(--font-weight-regular) var(--font-size-600) /var(--font-line-height-600) var(--font-family-sans);
--typography-sans-600-semibold-font: var(--font-weight-semibold) var(--font-size-600) /var(--font-line-height-600) var(--font-family-sans);
--typography-sans-600-bold-font: var(--font-weight-bold) var(--font-size-600) /var(--font-line-height-600) var(--font-family-sans);
--typography-sans-700-regular-font: var(--font-weight-regular) var(--font-size-700) /var(--font-line-height-700) var(--font-family-sans);
--typography-sans-700-semibold-font: var(--font-weight-semibold) var(--font-size-700) /var(--font-line-height-700) var(--font-family-sans);
--typography-sans-700-bold-font: var(--font-weight-bold) var(--font-size-700) /var(--font-line-height-700) var(--font-family-sans);
--typography-sans-800-regular-font: var(--font-weight-regular) var(--font-size-800) /var(--font-line-height-800) var(--font-family-sans);
--typography-sans-800-semibold-font: var(--font-weight-semibold) var(--font-size-800) /var(--font-line-height-800) var(--font-family-sans);
--typography-sans-800-bold-font: var(--font-weight-bold) var(--font-size-800) /var(--font-line-height-800) var(--font-family-sans);
--typography-sans-900-regular-font: var(--font-weight-regular) var(--font-size-900) /var(--font-line-height-900) var(--font-family-sans);
--typography-sans-900-semibold-font: var(--font-weight-semibold) var(--font-size-900) /var(--font-line-height-900) var(--font-family-sans);
--typography-sans-900-bold-font: var(--font-weight-bold) var(--font-size-900) /var(--font-line-height-900) var(--font-family-sans);
--typography-sans-1000-regular-font: var(--font-weight-regular) var(--font-size-1000) /var(--font-line-height-1000) var(--font-family-sans);
--typography-sans-1000-bold-font: var(--font-weight-bold) var(--font-size-1000) /var(--font-line-height-1000) var(--font-family-sans);
--typography-mono-100-regular-font: var(--font-weight-regular) var(--font-size-100) /var(--font-line-height-100) var(--font-family-mono);
--typography-mono-100-bold-font: var(--font-weight-bold) var(--font-size-100) /var(--font-line-height-100) var(--font-family-mono);
--typography-serif-200-regular-font: var(--font-weight-regular) var(--font-size-200) /var(--font-line-height-200) var(--font-family-serif);
--typography-serif-300-regular-font: var(--font-weight-regular) var(--font-size-300) /var(--font-line-height-300) var(--font-family-serif);
--typography-serif-350-regular-font: var(--font-weight-regular) var(--font-size-350) /var(--font-line-height-350) var(--font-family-serif);
--typography-serif-400-regular-font: var(--font-weight-regular) var(--font-size-400) /var(--font-line-height-400) var(--font-family-serif);
--typography-serif-500-regular-font: var(--font-weight-regular) var(--font-size-500) /var(--font-line-height-500) var(--font-family-serif);
--typography-serif-600-regular-font: var(--font-weight-regular) var(--font-size-600) /var(--font-line-height-600) var(--font-family-serif);
--typography-serif-700-regular-font: var(--font-weight-regular) var(--font-size-700) /var(--font-line-height-700) var(--font-family-serif);
--typography-serif-800-regular-font: var(--font-weight-regular) var(--font-size-800) /var(--font-line-height-800) var(--font-family-serif);
--typography-serif-900-regular-font: var(--font-weight-regular) var(--font-size-900) /var(--font-line-height-900) var(--font-family-serif);
--typography-article-title-subtle-font: 700 2rem /2.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-navigation-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-menu-list-heading-font: 500 0.75rem /1rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-body-font: 400 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-title-subtle-lg-font: 700 2.625rem /3rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-quote-font: 400 1.375rem /1.75rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--typography-article-body-editorial-font: 400 1rem /1.5rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--typography-article-body-font: 400 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-menu-button-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-deck-lg-font: 400 1.375rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-button-medium-font: 500 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-heading-lg-font: 700 1.625rem /2rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-form-caption-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-subheading-lg-font: 700 1.375rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-caption-font: 500 0.75rem /1rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-subheading-font: 700 1.375rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-quote-lg-font: 400 2rem /2.5rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--typography-article-statistics-font: 600 2.625rem /3rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-navigation-link-emphasis-font: 500 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-title-font: 700 2.625rem /3rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-heading-lg-font: 700 3.375rem /3.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-heading-font: 700 1.375rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-code-font: 400 0.875rem /1.25rem "iA Writer Mono",Nitti,Menlo,Courier,monospace;
--typography-global-stat-md-font: 700 4rem /4rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-body-link-font: 400 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-body-lg-font: 400 1.125rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-navigation-heading-font: 500 0.75rem /1rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-meta-font: 500 0.75rem /1rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-quote-font: 400 1.625rem /2rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--typography-interaction-button-small-font: 500 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-navigation-body-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-stat-sm-font: 700 3.375rem /3.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-body-serif-font: 400 1.25rem /1.75rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--typography-global-quote-md-font: 400 2rem /2.5rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--typography-navigation-caption-font: 500 0.75rem /1rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-deck-sm-font: 400 1.25rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-context-font: 400 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-form-input-font: 400 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-title-emphasis-font: 700 3.375rem /3.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-subheading-font: 700 1.125rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-navigation-link-emphasis-md-font: 700 1.375rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-menu-list-item-label-font: 500 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-heading-font: 700 2rem /2.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-quote-sm-font: 400 1.625rem /2rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--typography-article-deck-font: 400 1.25rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-button-large-font: 600 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-title-md-font: 700 4rem /4rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-meta-font: 400 0.75rem /1rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-body-bold-font: 600 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-form-label-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-title-lg-font: 700 3.375rem /3.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-body-bold-lg-font: 600 1.125rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-statistics-lg-font: 600 3.375rem /3.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-caption-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-dropcap-font: 700 1.625rem /2rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-body-editorial-lg-font: 400 1.25rem /1.75rem "Lyon Text",Georgia,YuMincho,"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro","Songti TC","Songti SC",SimSun,"Nanum Myeongjo",NanumMyeongjo,Batang,serif;
--typography-global-stat-font: 700 2.625rem /3rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-title-sm-font: 700 3.375rem /3.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-heading-md-font: 700 2.625rem /3rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-eyebrow-font: 400 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-title-emphasis-md-font: 700 4rem /4rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-menu-list-item-label-emphasis-md-font: 700 1.375rem /1.75rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-menu-list-item-caption-font: 500 0.75rem /1rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-article-title-font: 700 2rem /2.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-navigation-link-font: 500 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-navigation-caption-subtle-font: 500 0.75rem /1rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-deck-font: 400 1rem /1.5rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-title-subtle-font: 700 2.625rem /3rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-interaction-menu-list-item-label-emphasis-font: 500 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
--typography-global-context-font: 400 0.875rem /1.25rem NotionInter,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";
```

### Shadows

```css
--shadow-100: 0px 0.7px 1.462px rgba(0,0,0,.015),0px 3px 9px #00000008;
--shadow-200: 0px 0.175px 1.041px rgba(0,0,0,.013),0px 0.8px 2.925px #00000005,0px 2.025px 7.847px rgba(0,0,0,.027),0px 4px 18px #0000000a;
--shadow-300: 0px 0.667px 3.502px #00000003,0px 2.933px 7.252px rgba(0,0,0,.016),0px 7.2px 14.462px #00000005,0px 13.867px 28.348px rgba(0,0,0,.024),0px 23.333px 52.123px #00000008,0px 36px 89px #0000000a;
```

### Other

```css
--direction: 1;
--em-ratio-0-1: 0.1em;
--link-underline-offset: var(--em-ratio-0-1);
--grid-column-width: 1fr;
--grid-gutter: 28px;
--grid-sm-gutter: 12px;
--grid-columns: 12;
--global-navigation-height: 64px;
--header-height: 60px;
--decoration-link-underline-thickness: 0.0625rem;
--offset-0: 0;
--offset-1: 0.0625rem;
--offset-2: 0.125rem;
--thickness-1: 0.0625rem;
--thickness-2: 0.125rem;
--motion-timing-function-ease-in-out-quint: cubic-bezier(0.86,0,0.07,1);
--motion-timing-function-ease-in-out-quart: cubic-bezier(0.76,0,0.24,1);
--motion-timing-function-ease-in-out-quad: cubic-bezier(0.45,0,0.55,1);
--motion-timing-function-ease-in-out-cubic: cubic-bezier(0.645,0.045,0.355,1);
--motion-timing-function-ease-in-out-linear: cubic-bezier(0.5,0,0.5,1);
--motion-timing-function-ease-in: ease-in;
--motion-timing-function-ease-out: ease-out;
--motion-timing-function-linear: linear;
--motion-duration-100: 100ms;
--motion-duration-150: 150ms;
--motion-duration-200: 200ms;
--motion-duration-250: 250ms;
--motion-duration-300: 300ms;
--z-index-header: 100;
--z-index-banner: 90;
--z-index-mobile-nav: 200;
--z-index-popup: 500;
--z-index-lightbox: var(--z-index-popup);
--z-index-tooltip: var(--z-index-popup);
--notif-start: 1;
--motion-global-fade-out-duration: 200ms;
--notif-step: 0;
--motion-global-transform-timing-function: cubic-bezier(0.86,0,0.07,1);
--motion-global-fade-out-timing-function: ease-in;
--motion-global-fade-in-timing-function: ease-out;
--motion-global-transform-duration: 300ms;
--motion-global-fade-in-duration: 150ms;
```

### Dependencies

```css
--link-underline-offset: --em-ratio-0-1;
--color-campaigns-dev-platform-dos-white: --color-white;
--color-campaigns-dev-platform-dos-alpha-white: --color-alpha-white-700;
--font-family-sans: --font-family-primary-sans,--font-family-fallback-sans;
--font-family-serif: --font-family-primary-serif,--font-family-fallback-serif;
--font-family-serif-japanese: --font-family-primary-serif-japanese,--font-family-fallback-serif-japanese;
--font-family-serif-chinese-simplified: --font-family-fallback-serif-chinese-simplified;
--font-family-serif-chinese-traditional: --font-family-fallback-serif-chinese-traditional;
--font-family-sans-vietnamese: --font-family-primary-sans-vietnamese,--font-family-fallback-sans-vietnamese;
--font-family-serif-vietnamese: --font-family-primary-serif-vietnamese,--font-family-fallback-serif-vietnamese;
--font-family-sans-arabic: --font-family-primary-sans-arabic,--font-family-fallback-sans-arabic;
--font-family-sans-hebrew: --font-family-primary-sans-hebrew,--font-family-fallback-sans-hebrew;
--font-family-handwriting: --font-family-primary-handwriting,--font-family-fallback-handwriting;
--font-family-mono: --font-family-primary-mono,--font-family-fallback-mono;
--font-family-emoji: --font-family-primary-emoji,--font-family-fallback-emoji;
--font-line-height-50: --spacing-16;
--font-line-height-100: --spacing-20;
--font-line-height-150: --spacing-20;
--font-line-height-200: --spacing-24;
--font-line-height-300: --spacing-28;
--font-line-height-350: --spacing-28;
--font-line-height-400: --spacing-28;
--font-line-height-450: --spacing-30;
--font-line-height-500: --spacing-32;
--font-line-height-600: --spacing-40;
--font-line-height-700: --spacing-48;
--font-line-height-800: --spacing-56;
--font-line-height-900: --spacing-64;
--font-line-height-1000: --spacing-80;
--z-index-lightbox: --z-index-popup;
--z-index-tooltip: --z-index-popup;
--typography-sans-50-regular-font: --font-weight-regular,--font-size-50,--font-line-height-50,--font-family-sans;
--typography-sans-50-medium-font: --font-weight-medium,--font-size-50,--font-line-height-50,--font-family-sans;
--typography-sans-50-semibold-font: --font-weight-semibold,--font-size-50,--font-line-height-50,--font-family-sans;
--typography-sans-50-bold-font: --font-weight-bold,--font-size-50,--font-line-height-50,--font-family-sans;
--typography-sans-100-regular-font: --font-weight-regular,--font-size-100,--font-line-height-100,--font-family-sans;
--typography-sans-100-medium-font: --font-weight-medium,--font-size-100,--font-line-height-100,--font-family-sans;
--typography-sans-100-semibold-font: --font-weight-semibold,--font-size-100,--font-line-height-100,--font-family-sans;
--typography-sans-100-bold-font: --font-weight-bold,--font-size-100,--font-line-height-100,--font-family-sans;
--typography-sans-150-regular-font: --font-weight-regular,--font-size-150,--font-line-height-150,--font-family-sans;
--typography-sans-150-medium-font: --font-weight-medium,--font-size-150,--font-line-height-150,--font-family-sans;
--typography-sans-150-semibold-font: --font-weight-semibold,--font-size-150,--font-line-height-150,--font-family-sans;
--typography-sans-150-bold-font: --font-weight-bold,--font-size-150,--font-line-height-150,--font-family-sans;
--typography-sans-200-regular-font: --font-weight-regular,--font-size-200,--font-line-height-200,--font-family-sans;
--typography-sans-200-medium-font: --font-weight-medium,--font-size-200,--font-line-height-200,--font-family-sans;
--typography-sans-200-semibold-font: --font-weight-semibold,--font-size-200,--font-line-height-200,--font-family-sans;
--typography-sans-200-bold-font: --font-weight-bold,--font-size-200,--font-line-height-200,--font-family-sans;
--typography-sans-300-regular-font: --font-weight-regular,--font-size-300,--font-line-height-300,--font-family-sans;
--typography-sans-300-medium-font: --font-weight-medium,--font-size-300,--font-line-height-300,--font-family-sans;
--typography-sans-300-semibold-font: --font-weight-semibold,--font-size-300,--font-line-height-300,--font-family-sans;
--typography-sans-300-bold-font: --font-weight-bold,--font-size-300,--font-line-height-300,--font-family-sans;
--typography-sans-350-regular-font: --font-weight-regular,--font-size-350,--font-line-height-350,--font-family-sans;
--typography-sans-350-medium-font: --font-weight-medium,--font-size-350,--font-line-height-350,--font-family-sans;
--typography-sans-350-semibold-font: --font-weight-semibold,--font-size-350,--font-line-height-350,--font-family-sans;
--typography-sans-350-bold-font: --font-weight-bold,--font-size-350,--font-line-height-350,--font-family-sans;
--typography-sans-400-regular-font: --font-weight-regular,--font-size-400,--font-line-height-400,--font-family-sans;
--typography-sans-400-medium-font: --font-weight-medium,--font-size-400,--font-line-height-400,--font-family-sans;
--typography-sans-400-semibold-font: --font-weight-semibold,--font-size-400,--font-line-height-400,--font-family-sans;
--typography-sans-400-bold-font: --font-weight-bold,--font-size-400,--font-line-height-400,--font-family-sans;
--typography-sans-500-medium-font: --font-weight-medium,--font-size-500,--font-line-height-500,--font-family-sans;
--typography-sans-500-semibold-font: --font-weight-semibold,--font-size-500,--font-line-height-500,--font-family-sans;
--typography-sans-500-bold-font: --font-weight-bold,--font-size-500,--font-line-height-500,--font-family-sans;
--typography-sans-600-regular-font: --font-weight-regular,--font-size-600,--font-line-height-600,--font-family-sans;
--typography-sans-600-semibold-font: --font-weight-semibold,--font-size-600,--font-line-height-600,--font-family-sans;
--typography-sans-600-bold-font: --font-weight-bold,--font-size-600,--font-line-height-600,--font-family-sans;
--typography-sans-700-regular-font: --font-weight-regular,--font-size-700,--font-line-height-700,--font-family-sans;
--typography-sans-700-semibold-font: --font-weight-semibold,--font-size-700,--font-line-height-700,--font-family-sans;
--typography-sans-700-bold-font: --font-weight-bold,--font-size-700,--font-line-height-700,--font-family-sans;
--typography-sans-800-regular-font: --font-weight-regular,--font-size-800,--font-line-height-800,--font-family-sans;
--typography-sans-800-semibold-font: --font-weight-semibold,--font-size-800,--font-line-height-800,--font-family-sans;
--typography-sans-800-bold-font: --font-weight-bold,--font-size-800,--font-line-height-800,--font-family-sans;
--typography-sans-900-regular-font: --font-weight-regular,--font-size-900,--font-line-height-900,--font-family-sans;
--typography-sans-900-semibold-font: --font-weight-semibold,--font-size-900,--font-line-height-900,--font-family-sans;
--typography-sans-900-bold-font: --font-weight-bold,--font-size-900,--font-line-height-900,--font-family-sans;
--typography-sans-1000-regular-font: --font-weight-regular,--font-size-1000,--font-line-height-1000,--font-family-sans;
--typography-sans-1000-bold-font: --font-weight-bold,--font-size-1000,--font-line-height-1000,--font-family-sans;
--typography-mono-100-regular-font: --font-weight-regular,--font-size-100,--font-line-height-100,--font-family-mono;
--typography-mono-100-bold-font: --font-weight-bold,--font-size-100,--font-line-height-100,--font-family-mono;
--typography-serif-200-regular-font: --font-weight-regular,--font-size-200,--font-line-height-200,--font-family-serif;
--typography-serif-300-regular-font: --font-weight-regular,--font-size-300,--font-line-height-300,--font-family-serif;
--typography-serif-350-regular-font: --font-weight-regular,--font-size-350,--font-line-height-350,--font-family-serif;
--typography-serif-400-regular-font: --font-weight-regular,--font-size-400,--font-line-height-400,--font-family-serif;
--typography-serif-500-regular-font: --font-weight-regular,--font-size-500,--font-line-height-500,--font-family-serif;
--typography-serif-600-regular-font: --font-weight-regular,--font-size-600,--font-line-height-600,--font-family-serif;
--typography-serif-700-regular-font: --font-weight-regular,--font-size-700,--font-line-height-700,--font-family-serif;
--typography-serif-800-regular-font: --font-weight-regular,--font-size-800,--font-line-height-800,--font-family-serif;
--typography-serif-900-regular-font: --font-weight-regular,--font-size-900,--font-line-height-900,--font-family-serif;
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
| xs | 375px | min-width |
| 400px | 400px | min-width |
| sm | 440px | min-width |
| sm | 599px | max-width |
| sm | 600px | max-width |
| md | 712px | min-width |
| md | 768px | min-width |
| 839px | 839px | max-width |
| 840px | 840px | min-width |
| 908px | 908px | min-width |
| 919px | 919px | max-width |
| 942px | 942px | min-width |
| lg | 1032px | min-width |
| lg | 1080px | min-width |
| 1120px | 1120px | min-width |
| 1156px | 1156px | min-width |
| 1200px | 1200px | min-width |
| xl | 1280px | min-width |
| xl | 1300px | min-width |
| 1440px | 1440px | min-width |
| 1800px | 1800px | min-width |
| 1900px | 1900px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.2s`, `0.075s`, `0.15s`, `0.1s`

### Common Transitions

```css
transition: all;
transition: transform 0.2s ease-in;
transition: background 0.075s linear;
transition: box-shadow 0.2s ease-in;
transition: background-color 0.15s;
transition: background-color 0.2s ease-in;
transition: text-decoration-color 0.2s ease-in, -webkit-text-decoration-color 0.2s ease-in;
transition: opacity 0.15s ease-in-out;
transition: background-color 0.2s ease-in, color 0.2s ease-in;
transition: 0.2s;
```

### Keyframe Animations

**fadeIn**
```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**fadeOut**
```css
@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

**scaleIn**
```css
@keyframes scaleIn {
  0% { transform: scale(0.975); }
  100% { transform: scale(1); }
}
```

**scaleOut**
```css
@keyframes scaleOut {
  0% { transform: scale(1); }
  100% { transform: scale(0.975); }
}
```

**popIn**
```css
@keyframes popIn {
  0% { opacity: 0; transform: scale(0.75); }
  100% { opacity: 1; transform: scale(1); }
}
```

**rotate**
```css
@keyframes rotate {
  0% { transform: rotate(0deg) translateZ(0px); }
  100% { transform: rotate(1turn) translateZ(0px); }
}
```

**loadingDots_pulse__d8LYi**
```css
@keyframes loadingDots_pulse__d8LYi {
  0% { opacity: 0.2; }
  100% { opacity: 0.75; }
}
```

**globalNavigation_navShadowScrolled__pZKcg**
```css
@keyframes globalNavigation_navShadowScrolled__pZKcg {
  0% { box-shadow: rgba(0, 0, 0, 0) 0px 1px; }
  100% { box-shadow: 0 1px var(--color-border-base); }
}
```

**globalNavigation_fadeIn__BTvkx**
```css
@keyframes globalNavigation_fadeIn__BTvkx {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**globalNavigation_fadeOut__UET7A**
```css
@keyframes globalNavigation_fadeOut__UET7A {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (41 instances)

```css
.button {
  background-color: rgba(255, 255, 255, 0);
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
  padding-top: 12px;
  padding-right: 15px;
  border-radius: 8px;
}
```

### Cards (42 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0.175px 1.041px 0px, rgba(0, 0, 0, 0.02) 0px 0.8px 2.925px 0px, rgba(0, 0, 0, 0.027) 0px 2.025px 7.847px 0px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Inputs (13 instances)

```css
.input {
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.898);
  border-color: rgba(0, 0, 0, 0.898);
  border-radius: 0px;
  font-size: 16px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (135 instances)

```css
.link {
  color: rgba(0, 0, 0, 0.95);
  font-size: 16px;
  font-weight: 400;
}
```

### Navigation (230 instances)

```css
.navigatio {
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.898);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0.175px 1.041px 0px, rgba(0, 0, 0, 0.02) 0px 0.8px 2.925px 0px, rgba(0, 0, 0, 0.027) 0px 2.025px 7.847px 0px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px;
}
```

### Footer (25 instances)

```css
.foote {
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.898);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 16px;
}
```

### Modals (7 instances)

```css
.modal {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0.667px 3.502px 0px, rgba(0, 0, 0, 0.016) 0px 2.933px 7.252px 0px, rgba(0, 0, 0, 0.02) 0px 7.2px 14.462px 0px, rgba(0, 0, 0, 0.024) 0px 13.867px 28.348px 0px, rgba(0, 0, 0, 0.03) 0px 23.333px 52.123px 0px, rgba(0, 0, 0, 0.04) 0px 36px 89px 0px;
  padding-top: 0px;
  padding-right: 0px;
  max-width: 1280px;
}
```

### Dropdowns (123 instances)

```css
.dropdown {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 0.175px 1.041px 0px, rgba(0, 0, 0, 0.02) 0px 0.8px 2.925px 0px, rgba(0, 0, 0, 0.027) 0px 2.025px 7.847px 0px, rgba(0, 0, 0, 0.04) 0px 4px 18px 0px;
  border-color: rgba(0, 0, 0, 0.898);
  padding-top: 0px;
}
```

### Badges (69 instances)

```css
.badge {
  background-color: rgb(9, 127, 232);
  color: rgba(0, 0, 0, 0.898);
  font-size: 14px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Tabs (8 instances)

```css
.tab {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.898);
  font-size: 16px;
  font-weight: 400;
  padding-top: 12px;
  padding-right: 16px;
  border-color: rgba(0, 0, 0, 0.898);
  border-radius: 8px;
}
```

### Accordions (30 instances)

```css
.accordion {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.898);
  font-size: 16px;
  padding-top: 0px;
  padding-right: 0px;
  border-color: rgba(0, 0, 0, 0.898);
}
```

### ProgressBars (1 instances)

```css
.progressBar {
  color: rgba(0, 0, 0, 0.95);
  border-radius: 0px;
  font-size: 20px;
}
```

### Switches (1 instances)

```css
.switche {
  border-radius: 0px;
  border-color: rgba(0, 0, 0, 0.898);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 6 instances, 1 variant

**Variant 1** (6 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(163, 158, 152);
  padding: 12px 12px 12px 12px;
  border-radius: 0px;
  border: 0px none rgb(163, 158, 152);
  font-size: 20px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(69, 93, 211);
  color: rgb(255, 255, 255);
  padding: 4px 14px 4px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0);
  font-size: 16px;
  font-weight: 500;
```

### Button — 4 instances, 2 variants

**Variant 1** (2 instances)

```css
  background: rgb(69, 93, 211);
  color: rgb(255, 255, 255);
  padding: 6px 15px 6px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0);
  font-size: 16px;
  font-weight: 500;
```

**Variant 2** (2 instances)

```css
  background: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.95);
  padding: 4px 14px 4px 14px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: 500;
```

### Button — 9 instances, 1 variant

**Variant 1** (9 instances)

```css
  background: rgba(255, 255, 255, 0);
  color: rgb(255, 255, 255);
  padding: 6px 15px 6px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0);
  font-size: 16px;
  font-weight: 500;
```

### Button — 8 instances, 1 variant

**Variant 1** (8 instances)

```css
  background: rgba(255, 255, 255, 0);
  color: rgb(246, 245, 244);
  padding: 6px 15px 6px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0);
  font-size: 16px;
  font-weight: 500;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.95);
  padding: 12px 16px 12px 16px;
  border-radius: 8px;
  border: 0px none rgba(0, 0, 0, 0.95);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.95);
  padding: 0px 0px 0px 0px;
  border-radius: 9999px;
  border: 0px none rgba(0, 0, 0, 0.95);
  font-size: 20px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.95);
  padding: 0px 0px 0px 0px;
  border-radius: 9999px;
  border: 0px none rgba(0, 0, 0, 0.95);
  font-size: 20px;
  font-weight: 400;
```

### Card — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.898);
  padding: 24px 24px 24px 24px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: 400;
```

### Link — 5 instances, 1 variant

**Variant 1** (5 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.95);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgba(0, 0, 0, 0.95);
  font-size: 16px;
  font-weight: 400;
```

### Card — 5 instances, 2 variants

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 700;
```

**Variant 2** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 700;
```

### Card — 5 instances, 2 variants

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 700;
```

**Variant 2** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 700;
```

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(2, 9, 58);
  color: rgba(0, 0, 0, 0.898);
  padding: 24px 24px 24px 24px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.898);
  padding: 0px 0px 0px 0px;
  border-radius: 12px;
  border: 0px none rgba(0, 0, 0, 0.898);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(0, 117, 222);
  color: rgb(255, 255, 255);
  padding: 4px 14px 4px 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0);
  font-size: 16px;
  font-weight: 500;
```

### Button — 2 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.95);
  padding: 4px 14px 4px 14px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: 500;
```

**Variant 2** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.54);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgba(0, 0, 0, 0.54);
  font-size: 14px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgba(0, 0, 0, 0.95);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgba(0, 0, 0, 0.95);
  font-size: 16px;
  font-weight: 500;
```

## Layout System

**122 grid containers** and **258 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 826px | 16px |
| 100% | 0px |
| 1184px | 0px |
| 1252px | 0px |
| 500px | 24px |
| 1502px | 125px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 83x |
| 2-column | 23x |
| 3-column | 9x |
| 12-column | 2x |
| 14-column | 2x |
| 4-column | 1x |

### Grid Templates

```css
grid-template-columns: 67.2031px 960px 67.2031px;
gap: 40px normal;
grid-template-columns: 535.203px 535.203px;
gap: 24px;
grid-template-columns: 535.203px 535.203px;
gap: 24px;
grid-template-columns: 348.797px 348.797px 348.812px;
gap: 24px;
grid-template-columns: 65.5312px 65.5312px 65.5312px 65.5312px 65.5312px 65.5312px 65.5312px 65.5312px 65.5312px 65.5312px 65.5312px 65.5312px;
gap: 28px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 184x |
| column/nowrap | 64x |
| row/wrap | 10x |

**Gap values:** `0px 12px`, `0px 16px`, `0px 24px`, `0px 8px`, `10px`, `12px`, `16px`, `16px normal`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px normal`, `4px`, `64px`, `6px`, `80px`, `8px`, `96px`, `normal 0px`, `normal 24px`

## Accessibility (WCAG 2.1)

**Overall Score: 92%** — 12 passing, 1 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#ffffff` | `#097fe8` | 4.03:1 | FAIL | span (1x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#ffffff` | `#000000` | 21:1 | AAA |
| `#000000` | `#ffffff` | 21:1 | AAA |
| `#ffffff` | `#455dd3` | 5.59:1 | AA |
| `#ffffff` | `#213183` | 11.46:1 | AAA |
| `#ffffff` | `#0075de` | 4.57:1 | AA |

## Design System Score

**Overall: 84/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 80/100 |
| Typography Consistency | 80/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 90/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 92/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 1 WCAG contrast failures
- 9 !important rules — prefer specificity over overrides
- 7410 duplicate CSS declarations

## Gradients

**1 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | — | 2 | brand |

```css
background: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
```

## Z-Index Map

**9 unique z-index values** across 4 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 1000,2147483647 | ul.m.e.n.u._.m.e.n.u._._.r.k.u.L.N. .m.e.n.u._.p.l.a.c.e.m.e.n.t.B.o.t.t.o.m.E.n.d._._.i.5.m.b.B. .l.a.n.g.u.a.g.e.P.i.c.k.e.r._.l.a.n.g.u.a.g.e.P.i.c.k.e.r.M.e.n.u._._.o.5.H.7.H, div |
| dropdown | 100,100 | div.g.l.o.b.a.l.N.a.v.i.g.a.t.i.o.n._.g.l.o.b.a.l.N.a.v.i.g.a.t.i.o.n.W.r.a.p.p.e.r._._.d.U.h.M.e. .g.l.o.b.a.l.N.a.v.i.g.a.t.i.o.n._.s.t.i.c.k.y.W.r.a.p.p.e.r._._.S.Y.Z.f.y, nav.g.l.o.b.a.l.N.a.v.i.g.a.t.i.o.n._.g.l.o.b.a.l.N.a.v.i.g.a.t.i.o.n._._.7.c.1.Y.P, div |
| sticky | 90,90 | div.f.l.e.x. .j.u.s.t.i.f.y.-.s.t.a.r.t. .l.g.:.j.u.s.t.i.f.y.-.c.e.n.t.e.r. .p.t.-.1.2. .p.b.-.1.2. .p.s.-.1.6. .p.e.-.1.6. .s.u.r.f.a.c.e. .s.u.r.f.a.c.e.N.e.u.t.r.a.l. .s.u.r.f.a.c.e._.s.u.r.f.a.c.e.N.e.u.t.r.a.l._._.1.C.s.z.l. .b.a.n.n.e.r._.b.a.n.n.e.r._._.E.S.i.W.6 |
| base | -1,3 | div.g.l.o.b.a.l.N.a.v.i.g.a.t.i.o.n._.d.r.o.p.d.o.w.n._._.v.n.7.7.x, div.g.l.o.b.a.l.N.a.v.i.g.a.t.i.o.n._.d.r.o.p.d.o.w.n._._.v.n.7.7.x, div.g.l.o.b.a.l.N.a.v.i.g.a.t.i.o.n._.d.r.o.p.d.o.w.n._._.v.n.7.7.x |

**Issues:**
- [object Object]

## SVG Icons

**47 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 3 |
| sm | 6 |
| md | 27 |
| lg | 1 |
| xl | 10 |

**Icon colors:** `currentColor`, `rgb(163, 158, 152)`, `#fff`, `var(--notion-logo-fill, var(--color-black))`, `rgb(246, 245, 244)`, `#000`, `rgba(0, 0, 0, 0.54)`, `rgb(156, 112, 84)`, `rgb(255, 109, 0)`, `rgb(246, 73, 50)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| NotionInter | self-hosted | 400, 500, 600, 700 | normal, italic |
| Noto Sans Arabic | self-hosted | 100 900 | normal |
| Noto Sans Hebrew | self-hosted | 100 900 | normal |
| Lyon Text | self-hosted | 400, 600 | normal, italic |
| iA Writer Mono | self-hosted | 400, 600 | normal, italic |
| Permanent Marker | self-hosted | 400 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 52 | objectFit: fill, borderRadius: 0px, shape: square |
| general | 14 | objectFit: cover, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (29x), 4:3 (3x), 3:2 (3x), 2.75:1 (2x), 21:9 (2x), 3.88:1 (2x), 3:4 (2x), 3.13:1 (1x)

## Motion Language

**Feel:** smooth · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `instant` | `75ms` | 75 |
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |

### Easing Families

- **ease-in-out** (142 uses) — `ease`
- **linear** (1 uses) — `linear`
- **custom** (17 uses) — `cubic-bezier(0.45, 0, 0.55, 1)`, `cubic-bezier(0.645, 0.045, 0.355, 1)`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `Agent_agentEnter__D6zdB` | slide | translate, transform | 8 |
| `Agent_agentTaskEnter__ZpDY1` | slide | translate, transform | 8 |
| `Agent_agentMarkEnter__54wKq` | slide | translate, transform | 8 |
| `Illustrations_rotateEnter__XYlPM` | rotate | transform | 4 |
| `HomepageHeroAgents_fade-in__HBybG` | fade | opacity | 2 |
| `Marquee_marqueeFrames__WsEH6` | slide-x | transform | 1 |

## Component Anatomy

### button — 39 instances

**Slots:** label, icon

### card — 15 instances

**Slots:** heading, media
**Sizes:** lg

### link — 5 instances


## Brand Voice

**Tone:** friendly · **Pronoun:** you-only · **Headings:** Sentence case (balanced)

### Top CTA Verbs

- **download** (3)
- **get** (2)
- **english** (2)
- **product** (1)
- **ai** (1)
- **solutions** (1)
- **resources** (1)
- **request** (1)

### Button Copy Patterns

- "get notion free" (2×)
- "download" (2×)
- "english (us)" (2×)
- "product" (1×)
- "ai" (1×)
- "solutions" (1×)
- "resources" (1×)
- "request a demo" (1×)
- "pause" (1×)
- "q&a agents

answers questions instantly using knowledge you already have." (1×)

### Sample Headings

> Meet the night shift.
> Keep work moving 24/7.
> Automate repetitive work for your team.
> See what Custom Agents can do
> Triage product feedback→
> Meet the night shift.
> Keep work moving 24/7.
> Automate repetitive work for your team.
> Automate repetitive work for your team.
> Automate repetitive work for your team.

## Page Intent

**Type:** `landing` (confidence 0.61)
**Description:** Build Custom Agents, search across all your apps, and automate busywork. The AI workspace where teams get more done, faster.

Alternates: blog-post (0.35)

## Section Roles

Reading order (top→bottom): cta → nav → nav → steps → testimonial → bento → bento → bento → content → bento → bento → bento → bento → bento → bento → bento → bento → hero → testimonial → footer → nav

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | cta | — | 0.75 |
| 1 | nav | — | 0.9 |
| 2 | steps | Meet the night shift. | 0.75 |
| 3 | testimonial | Meet the night shift. | 0.8 |
| 4 | bento · features | Keep work moving 24/7. | 0.75 |
| 5 | bento · features | Automate repetitive work for your team. | 0.75 |
| 6 | bento · features | Automate repetitive work for your team. | 0.75 |
| 7 | content | See what Custom Agents can do | 0.3 |
| 8 | bento · features | Ask your on-demand assistants. | 0.75 |
| 9 | bento · features | You assign the tasks. Notion Agent does the work. | 0.75 |
| 10 | bento · features | One search for everything. | 0.75 |
| 11 | bento · features | Perfect notes, every time. | 0.75 |
| 12 | bento · features | Bring all your work together. | 0.75 |
| 13 | bento · features | Simple and powerful. | 0.75 |
| 14 | bento · features | One source of truth for teams and agents. | 0.75 |
| 15 | bento · features | Less tracking. More progress. | 0.75 |
| 16 | hero | Trusted by teams that ship. | 0.4 |
| 17 | nav | — | 0.4 |
| 18 | testimonial | Try for free. | 0.8 |
| 19 | footer | — | 0.95 |

## Material Language

**Label:** `material-you` (confidence 0.45)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.501 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 9999px |
| backdrop-filter in use | no |
| Gradients | 1 |

## Imagery Style

**Label:** `mixed` (confidence 0)
**Counts:** total 66, svg 25, icon 2, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** square

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `NotionInter` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
