# Design Language: Stripe | Financial Infrastructure to Grow Your Revenue

> Extracted from `https://stripe.com` on May 21, 2026
> 2408 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#533afd` | rgb(83, 58, 253) | hsl(248, 98%, 61%) | 899 |
| Secondary | `#e5edf5` | rgb(229, 237, 245) | hsl(210, 44%, 93%) | 57 |
| Accent | `#ffe0d1` | rgb(255, 224, 209) | hsl(20, 100%, 91%) | 2 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#000000` | hsl(0, 0%, 0%) | 2620 |
| `#50617a` | hsl(216, 21%, 40%) | 330 |
| `#ffffff` | hsl(0, 0%, 100%) | 181 |
| `#64748d` | hsl(217, 17%, 47%) | 172 |
| `#7d8ba4` | hsl(218, 18%, 57%) | 14 |
| `#101010` | hsl(0, 0%, 6%) | 6 |
| `#f2f7fe` | hsl(215, 86%, 97%) | 1 |

### Background Colors

Used on large-area elements: `#ffffff`, `#e5edf5`, `#f8fafd`, `#0d1738`, `#f2f7fe`

### Text Colors

Text color palette: `#000000`, `#533afd`, `#061b31`, `#ffffff`, `#64748d`, `#81b81a`, `#000eff`, `#2d2564`, `#1a2c44`, `#273951`

### Gradients

```css
background-image: radial-gradient(66.35% 66.35%, rgba(255, 255, 255, 0.9) 0px, rgba(255, 255, 255, 0) 100%), none;
```

```css
background-image: radial-gradient(circle, rgb(127, 125, 252), rgb(244, 75, 204) 33%, rgb(229, 237, 245) 66%);
```

```css
background-image: radial-gradient(50% 50%, rgba(83, 58, 253, 0.8) 62.5%, rgba(83, 58, 253, 0) 100%);
```

```css
background-image: radial-gradient(50% 50%, rgba(243, 99, 243, 0.8) 53.85%, rgba(243, 99, 243, 0) 100%);
```

```css
background-image: radial-gradient(50% 50%, rgb(255, 207, 94) 41.35%, rgba(255, 207, 94, 0) 100%);
```

```css
background-image: linear-gradient(rgb(255, 255, 255) 41.35%, rgba(255, 255, 255, 0));
```

```css
background-image: linear-gradient(90deg, rgb(114, 50, 241) 3.13%, rgb(251, 118, 250) 50%, rgb(255, 207, 94));
```

```css
background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0px, rgb(8, 16, 191) 50%, rgba(0, 0, 0, 0) 100%);
```

```css
background-image: radial-gradient(103.24% 102.63% at 50% 102.63%, rgb(72, 111, 253) 0px, rgb(127, 129, 243) 9.84%, rgb(196, 137, 255) 20.83%, rgb(218, 192, 255) 34.13%, rgb(234, 220, 255) 44.86%, rgb(249, 246, 255) 58.59%, rgb(248, 250, 253) 100%);
```

```css
background-image: radial-gradient(102.68% 99.11% at 50% 104.6%, rgb(203, 131, 255) 0px, rgb(255, 144, 185) 15.77%, rgb(255, 201, 119) 30.62%, rgb(255, 215, 155) 38.04%, rgb(255, 241, 220) 50.11%, rgb(255, 255, 255) 63.1%, rgb(252, 253, 254) 77.95%, rgb(248, 250, 253) 98.81%);
```

```css
background-image: radial-gradient(102.84% 104.98% at 50% 104.98%, rgb(0, 113, 193) 1.33%, rgb(96, 168, 226) 15.71%, rgb(180, 216, 255) 33.15%, rgb(217, 235, 255) 45%, rgb(248, 250, 253) 60%);
```

```css
background-image: radial-gradient(102.83% 103.24% at 49.98% 104.51%, rgb(255, 180, 81) 0px, rgb(239, 198, 128) 16.73%, rgb(180, 216, 255) 33.03%, rgb(210, 232, 255) 43.38%, rgb(250, 253, 255) 59.16%, rgb(253, 254, 255) 76.24%, rgb(248, 250, 253) 100%);
```

```css
background-image: radial-gradient(103.12% 100% at 50% 100%, rgb(255, 165, 119) 0px, rgb(255, 144, 161) 15.52%, rgb(221, 173, 255) 30.09%, rgb(236, 216, 255) 45.72%, rgb(245, 234, 255) 54.96%, rgb(248, 250, 253) 88.16%);
```

```css
background-image: radial-gradient(102.82% 106.44% at 50% 106.44%, rgb(252, 253, 254) 1.11%, rgb(103, 99, 228) 28.73%, rgb(69, 59, 179) 45.76%, rgb(41, 34, 125) 63.37%, rgb(30, 32, 100) 78.67%, rgb(20, 30, 75) 100%);
```

```css
background-image: radial-gradient(circle, rgb(247, 45, 243), rgb(83, 58, 253) 33%, rgb(229, 237, 245) 66%);
```

```css
background-image: radial-gradient(circle, rgb(255, 173, 0), rgb(255, 118, 0) 33%, rgb(229, 237, 245) 66%);
```

```css
background-image: linear-gradient(68deg, rgba(83, 58, 253, 0.08) 0.78%, rgba(255, 140, 108, 0.8) 30.61%, rgba(218, 75, 254, 0.8) 79.02%), none;
```

```css
background-image: linear-gradient(73.3deg, rgba(218, 75, 254, 0.8) 9.85%, rgba(113, 92, 255, 0.48) 61.94%), none;
```

```css
background-image: linear-gradient(74.71deg, rgba(83, 58, 253, 0.08) -215.1%, rgba(255, 140, 108, 0.8) -169.26%, rgba(218, 75, 254, 0.8) -12.8%, rgba(113, 92, 255, 0.8) 18.59%, rgba(83, 58, 253, 0.8) 39.04%), none;
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#000000` | text, border, background | 2620 |
| `#533afd` | text, border, background | 899 |
| `#50617a` | text, border | 330 |
| `#061b31` | text, border, background | 312 |
| `#ffffff` | background, text, border | 181 |
| `#64748d` | text, border | 172 |
| `#0000ee` | text, border | 90 |
| `#e5edf5` | background, border | 57 |
| `#7f7dfc` | text, border, background | 37 |
| `#3c4f69` | text, border | 36 |
| `#273951` | text, border | 32 |
| `#7389ff` | text, border | 30 |
| `#1a2c44` | text, border | 28 |
| `#ff6118` | text, border | 28 |
| `#b9b9f9` | border | 22 |
| `#7d8ba4` | text, border | 14 |
| `#d6d9fc` | border | 10 |
| `#839bc8` | text, border | 8 |
| `#101010` | text, border | 6 |
| `#a3b5d6` | text, border | 6 |
| `#81b81a` | text, border | 4 |
| `#000eff` | text, border | 4 |
| `#2d2564` | text, border | 2 |
| `#ffe0d1` | background | 2 |
| `#635bff` | text | 2 |
| `#00d66f` | background | 1 |
| `#4834db` | border | 1 |
| `#182659` | border | 1 |
| `#f2f7fe` | background | 1 |

## Typography

### Font Families

- **sohne-var** — used for all (2408 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 56px | 3.5rem | 300 | 57.68px | -1.4px | h2 |
| 48px | 3rem | 300 | 55.2px | -0.96px | h1, em, span, p |
| 32px | 2rem | 300 | 35.2px | -0.64px | h2, p, h3, span |
| 26px | 1.625rem | 400 | normal | normal | div, h3, span, q |
| 22px | 1.375rem | 300 | 24.2px | -0.22px | h3, p |
| 20px | 1.25rem | 300 | 28px | -0.2px | p |
| 18px | 1.125rem | 300 | 25.2px | normal | p, div, span |
| 16px | 1rem | 400 | normal | normal | html, head, meta, link |
| 14px | 0.875rem | 400 | 14px | normal | button, svg, path, a |
| 12px | 0.75rem | 400 | normal | normal | div, span, p |
| 11px | 0.6875rem | 300 | 16px | normal | div, span |
| 10px | 0.625rem | 300 | 15px | 0.1px | div, span |
| 9px | 0.5625rem | 300 | normal | normal | div, svg, path, span |
| 8px | 0.5rem | 400 | 8.96px | normal | div |

### Heading Scale

```css
h2 { font-size: 56px; font-weight: 300; line-height: 57.68px; }
h1 { font-size: 48px; font-weight: 300; line-height: 55.2px; }
h2 { font-size: 32px; font-weight: 300; line-height: 35.2px; }
h3 { font-size: 26px; font-weight: 400; line-height: normal; }
h3 { font-size: 22px; font-weight: 300; line-height: 24.2px; }
h4 { font-size: 16px; font-weight: 400; line-height: normal; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: normal; }
```

### Font Weights in Use

`400` (2045x), `300` (361x), `500` (2x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-28 | 28px | 1.75rem |
| spacing-32 | 32px | 2rem |
| spacing-40 | 40px | 2.5rem |
| spacing-48 | 48px | 3rem |
| spacing-52 | 52px | 3.25rem |
| spacing-60 | 60px | 3.75rem |
| spacing-64 | 64px | 4rem |
| spacing-72 | 72px | 4.5rem |
| spacing-80 | 80px | 5rem |
| spacing-96 | 96px | 6rem |
| spacing-340 | 340px | 21.25rem |
| spacing-366 | 366px | 22.875rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 1px | 31 |
| sm | 4px | 71 |
| md | 8px | 5 |
| lg | 16px | 1 |
| full | 100px | 3 |

## Box Shadows

**md** — blur: 6px
```css
box-shadow: rgba(23, 23, 23, 0.06) 0px 3px 6px 0px;
```

**lg** — blur: 24px
```css
box-shadow: rgba(0, 0, 0, 0.06) 0px 4px 24px 0px, rgba(0, 0, 0, 0.03) 0px 1px 2px 0px;
```

**xl** — blur: 32px
```css
box-shadow: rgba(50, 50, 93, 0.12) 0px 16px 32px 0px;
```

**xl** — blur: 35px
```css
box-shadow: rgba(23, 23, 23, 0.08) 0px 15px 35px 0px;
```

**xl** — blur: 60px
```css
box-shadow: rgba(0, 0, 0, 0.1) 0px 30px 60px -50px, rgba(50, 50, 93, 0.25) 0px 30px 60px -10px;
```

## CSS Custom Properties

### Colors

```css
--hds-color-core-neutral-975: #0d253d;
--hds-color-accent-border-solid: #533afd;
--hds-color-accentColorMode-ruby-icon-solid: #ea2261;
--hds-color-util-brand-900: #1c1e54;
--hds-color-action-bg-subduedHover: #b9b9f9;
--hds-color-input-text-label: #273951;
--hds-color-accentColorMode-magenta-surface-subduedAlt: #ffe6f5;
--hds-color-input-text-selected: #273951;
--hds-color-input-text-popover: #273951;
--hds-color-shadow-sm-top: #00377014;
--hds-color-button-ui-iconHover: #2e2b8c;
--hds-color-input-text-placeholder: #7d8ba4;
--hds-color-core-brandDark-800A: #4b31d080;
--hds-color-core-lemon-500: #9b6829;
--hds-color-shadow-lg-top: #0037701a;
--hds-color-util-bg-min: #fff;
--hds-color-core-neutral-50A: #a8c3de4d;
--hds-color-util-neutral-50: #e5edf5;
--hds-color-accentColorMode-magenta-icon-gradientMiddle: #f96bee;
--hds-color-input-selector-text-range: #665efd;
--hds-color-accentColorMode-lemon-surface-subdued: #fff2d8;
--hds-color-core-neutralDark-25: #f2f7fe;
--hds-color-action-bg-translucent: #ffffffa6;
--hds-color-util-accent-magenta-100: #ffd7ef;
--hds-color-util-accent-orange-50: #ffe5da;
--hds-color-input-icon-solidAlternate: #533afd;
--hds-color-heading-subdued: #64748d;
--hds-color-heading-solid: #061b31;
--hds-color-accent-charm-bg: #533afd;
--hds-color-util-bg-quiet: #f8fafd;
--hds-color-button-secondary-textDisabled: #95a4ba;
--hds-color-core-neutralDark-700: #273f73;
--hds-color-action-text-onSolid: #fff;
--hds-color-core-neutralDark-990: #0d1738;
--hds-color-util-accent-lemon-200: #f9b900;
--hds-color-input-tile-text-selected: #533afd;
--hds-color-util-brand-200: #b9b9f9;
--hds-color-action-border-solidHover: #4032c8;
--hds-color-util-action-icon-soft: #665efd;
--hds-color-accentColorMode-ruby-icon-gradientEnd: #b51145;
--hds-color-input-bg-default: #ffffff40;
--hds-color-accentColorMode-magenta-icon-gradientStart: #f98bf9;
--hds-color-button-primary-bg: #533afd;
--hds-color-util-brand-25: #f5f5ff;
--hds-color-action-bg-subdued: #e2e4ff;
--hds-color-util-brand-800: #2e2b8c;
--hds-color-input-selector-icon-disabledOnSolid: #95a4ba;
--hds-color-util-text-soft: #50617a;
--hds-color-input-text-disabled: #95a4ba;
--hds-color-util-neutral-950: #11273e;
--hds-color-core-neutral-0: #fff;
--hds-color-accent-surface-solid: #533afd;
--hds-color-accentColorMode-magenta-surface-subdued: #ffe6f5;
--hds-color-icon-error: #d8351e;
--hds-color-util-action-bg-max: #2e2b8c;
--hds-color-util-neutral-800: #273951;
--hds-color-util-accent-orange-350: #ff6118;
--hds-color-util-action-bg-emphasized: #4032c8;
--hds-color-accentColorMode-default-icon-solidAlt: #533afd;
--hds-color-util-neutral-700: #3c4f69;
--hds-color-util-brand-300: #9a9afe;
--hds-color-icon-success: #00b261;
--hds-color-core-neutralDark-50: #e3ecf7;
--hds-color-core-brand-400: #7f7dfc;
--hds-space-input-border-default: 1.25px;
--hds-color-action-icon-onSubdued: #533afd;
--hds-color-core-lemon-200: #f9b900;
--hds-color-core-brandDark-200: #a8bfff;
--hds-color-accentColorMode-orange-icon-solid: #ff6118;
--hds-color-util-brand-600: #533afd;
--hds-color-accentColorMode-orange-icon-gradientMiddle: #fd6252;
--hds-color-core-ruby-500: #e2225f;
--hds-color-core-neutralDark-400: #839bc8;
--hds-color-button-primary-iconDisabled: #95a4ba;
--hds-space-button-border: 1px;
--hds-color-util-neutral-990: #061b31;
--hds-color-util-action-border-max: #2e2b8c;
--hds-color-util-accent-ruby-400: #ea2261;
--hds-color-input-popover-border: #ffffff00;
--hds-color-util-action-icon-solid: #533afd;
--hds-color-util-action-icon-subdued: #b9b9f9;
--hds-color-icon-surface: #bac8da;
--hds-color-shadow-xl-bottom: #003b890f;
--hds-color-accent-icon-solidAlt: #533afd;
--hds-color-action-text-onTransparent: #533afd;
--hds-color-accentColorMode-lemon-icon-gradientStart: #ffd552;
--hds-color-util-action-bg-soft: #665efd;
--hds-color-core-brandDark-925: #1c1b5a;
--hds-color-input-bg-accent: #533afd;
--hds-color-util-brand-975: #0f1137;
--hds-color-core-orange-100: #ffd8c6;
--hds-color-util-accent-orange-100: #ffd8c6;
--hds-color-input-text-error: #d8351e;
--hds-color-input-tile-border-pressed: #2e2b8c;
--hds-space-core-border-lg: 2px;
--hds-color-button-secondary-bg: #ffffff00;
--hds-color-input-border-error: #d8351e;
--hds-color-input-selector-bg-selected: #533afd;
--hds-color-core-brandDark-700: #362baa;
--hds-color-core-neutralDark-200: #c0cee6;
--hds-color-button-secondary-bgHover: #ffffff00;
--hds-color-core-neutralDark-900A: #23357a80;
--hds-color-core-neutral-700: #3c4f69;
--hds-color-accentColorMode-ruby-surface-subduedAlt: #fed9de;
--hds-color-accentColorMode-ruby-icon-solidAlt: #ea2261;
--hds-color-action-icon-navigation-soft: #50617a;
--hds-color-action-bg-transparent: #ffffff00;
--hds-color-action-border-disabled: #d4dee9;
--hds-color-button-ui-bgOnSubdued: #e2e4ff;
--hds-color-util-accent-lemon-500: #9b6829;
--hds-color-accent-charm-gradientMiddle: #533afd;
--hds-color-util-action-border-solid: #533afd;
--hds-color-action-text-solidHover: #2e2b8c;
--hds-color-util-text-solid: #061b31;
--hds-color-shadow-md-top: #0037701a;
--hds-color-util-neutral-300: #95a4ba;
--hds-color-action-bg-disabled: #e5edf5;
--hds-color-util-aura-h241Shadow: #1c1b5a;
--hds-color-util-action-border-quiet: #b9b9f9;
--hds-color-surface-border-quiet: #e5edf5;
--hds-color-util-brand-925: #1c1e54;
--hds-color-accentColorMode-magenta-icon-gradientEnd: #b262f9;
--hds-color-button-secondary-icon: #533afd;
--hds-color-core-brandDark-600: #533afd;
--hds-color-surface-bg-subduedAdaptive: #1658bc08;
--hds-color-util-text-quiet: #7d8ba4;
--hds-color-core-error-600: #a01400;
--hds-color-core-brand-950: #161741;
--hds-color-input-icon-onSolid: #fff;
--hds-color-core-brand-100A: #7680f54d;
--hds-color-action-icon-onTransparent: #533afd;
--hds-color-core-ruby-800: #5d1c3c;
--hds-color-core-neutral-400: #7d8ba4;
--hds-color-accentColorMode-lemon-icon-solidAlt: #e8a30b;
--hds-color-input-border-selected: #d4dee9bf;
--hds-color-core-brand-25A: #acacff1f;
--hds-color-util-neutral-0: #fff;
--hds-color-util-action-fg-solidAlternate: #533afd;
--hds-color-input-border-default: #d4dee9bf;
--hds-color-util-neutral-200: #bac8da;
--hds-color-core-brand-925: #1c1e54;
--hds-color-core-brandDark-100: #c3d3ff;
--hds-color-input-bg-quiet: #d4dee9;
--hds-color-button-primary-text: #fff;
--hds-color-util-text-inactive: #95a4ba;
--hds-color-core-success-600: #006f3a;
--hds-color-text-quiet: #7d8ba4;
--hds-color-action-text-solid: #533afd;
--hds-color-shadow-popoverBottom: #061b311f;
--hds-color-util-action-text-max: #2e2b8c;
--hds-color-util-border-subdued: #d4dee9;
--hds-color-util-action-fg-solidAlternateHover: #2e2b8c;
--hds-color-core-brand-25: #f5f5ff;
--hds-color-core-success-400: #00b261;
--hds-color-core-neutral-50: #e5edf5;
--hds-color-core-lemon-100: #ffe1a3;
--hds-color-util-accent-lemon-800: #483414;
--hds-color-action-border-quiet: #d6d9fc;
--hds-color-core-brandDark-50: #e4eaff;
--hds-color-shadow-sm-bottom: #003b890d;
--hds-color-util-success-100: #b6f2c7;
--hds-color-util-brand-500: #665efd;
--hds-color-core-neutral-300: #95a4ba;
--hds-color-core-brand-500: #665efd;
--hds-color-action-icon-onTranslucent: #533afd;
--hds-color-action-icon-solid: #533afd;
--hds-color-core-global-transparent: #ffffff00;
--hds-color-util-neutral-25: #f8fafd;
--hds-space-core-border-none: 0px;
--hds-color-surface-bg-subdued: #f8fafd;
--hds-color-accentColorMode-orange-icon-solidAlt: #ff6118;
--hds-color-util-accent-magenta-600: #a51d85;
--hds-color-action-bg-quietHover: #d6d9fc;
--hds-color-action-icon-onQuiet: #533afd;
--hds-space-core-border-md: 1.25px;
--hds-color-input-popover-divider: #d4dee9bf;
--hds-color-core-magenta-50: #ffe6f5;
--hds-color-core-magenta-800: #4f2055;
--hds-color-core-neutralDark-500: #6480b2;
--hds-color-accent-text-solid: #533afd;
--hds-color-core-brandDark-900: #222069;
--hds-color-action-icon-solidHover: #2e2b8c;
--hds-color-action-focus-outer: #533afd;
--hds-color-core-brand-600: #533afd;
--hds-color-input-selector-bg-range: #e8e9ff;
--hds-color-util-accent-magenta-800: #4f2055;
--hds-color-button-primary-textDisabled: #95a4ba;
--hds-color-util-brand-100: #d6d9fc;
--hds-color-button-secondary-borderDisabled: #d4dee9;
--hds-color-core-lemon-300: #e8a30b;
--hds-color-input-selector-text-disabled: #95a4ba;
--hds-color-core-ruby-600: #b51145;
--hds-color-accentColorMode-orange-surface-subdued: #ffe5da;
--hds-color-button-primary-icon: #fff;
--hds-color-action-focus-surface: #ffffff00;
--hds-color-util-action-fg-solidHover: #2e2b8c;
--hds-color-core-neutral-600: #50617a;
--hds-color-util-accent-magenta-500: #cf2cab;
--hds-color-util-accent-ruby-50: #fee8eb;
--hds-color-util-action-bg-subdued: #b9b9f999;
--hds-color-button-ui-bgOnSubduedHover: #b9b9f9;
--hds-color-util-action-icon-max: #2e2b8c;
--hds-color-util-action-fg-solid: #533afd;
--hds-color-input-bg-focus: #ffffff80;
--hds-color-input-icon-solid: #533afd;
--hds-color-core-brand-50A: #a3a7ff40;
--hds-color-util-accent-magenta-50: #ffe6f5;
--hds-color-action-text-onTranslucent: #533afd;
--hds-color-core-brand-300: #9a9afe;
--hds-color-core-magenta-350: #f44bcc;
--hds-color-core-neutralDark-800A: #2f458ba6;
--hds-color-util-action-bg-solid: #533afd;
--hds-color-accentColorMode-default-surface-subduedAlt: #e2e4ff;
--hds-color-core-brandDark-300: #92adff;
--hds-color-core-orange-600: #ab3500;
--hds-color-input-selector-bg-availableHover: #d6d9fc;
--hds-color-button-ui-borderDisabled: #d4dee9;
--hds-color-accentColorMode-orange-icon-gradientEnd: #fd5d7c;
--hds-color-core-ruby-400: #ea2261;
--hds-color-input-selector-text-available: #273951;
--hds-color-input-selector-text-selected: #fff;
--hds-color-util-error-100: #feb9ac;
--hds-color-core-brandDark-400: #7389ff;
--hds-color-util-brand-400: #7f7dfc;
--hds-color-core-orange-50: #ffe5da;
--hds-color-accentColorMode-default-icon-gradientEnd: #4032c8;
--hds-color-action-bg-solidHover: #4032c8;
--hds-color-core-neutral-100: #d4dee9;
--hds-color-accentColorMode-ruby-surface-subdued: #fed9de;
--hds-color-util-brand-700: #4032c8;
--hds-color-core-error-100: #feb9ac;
--hds-color-core-neutralDark-900: #182659;
--hds-color-input-bg-solid: #fff;
--hds-color-util-accent-lemon-300: #e8a30b;
--hds-color-util-border-solid: #273951;
--hds-color-util-action-fg-onSolid: #fff;
--hds-color-util-neutral-400: #7d8ba4;
--hds-color-action-text-solidAlternate: #533afd;
--hds-color-input-bg-popoverTransparent: #ffffff00;
--hds-color-action-text-onQuiet: #533afd;
--hds-color-accentColorMode-lemon-icon-solid: #e8a30b;
--hds-color-util-action-fg-onAlpha: #533afd;
--hds-color-core-brandDark-975: #171055;
--hds-color-button-primary-iconHover: #fff;
--hds-color-input-tile-bg-selected: #acacff1f;
--hds-color-core-ruby-100: #fed9de;
--hds-color-core-brand-50: #e8e9ff;
--hds-color-action-text-secondary: #061b31;
--hds-color-input-bg-popover: #fff;
--hds-color-util-black: #061b31;
--hds-color-input-selector-bg-available: #ffffff00;
--hds-size-input-popover-border-width: 0px;
--hds-color-accentColorMode-magenta-icon-solidAlt: #f44bcc;
--hds-color-util-accent-ruby-100: #fed9de;
--hds-color-input-bg-listboxIcon: #e5edf5;
--hds-color-input-border-accent: #533afd;
--hds-color-util-action-text-min: #fff;
--hds-color-accent-surface-subduedAlt: #e2e4ff;
--hds-color-core-magenta-100: #ffd7ef;
--hds-color-accentColorMode-orange-surface-subduedAlt: #ffe5da;
--hds-color-accentColorMode-orange-border-quiet: #ffd8c6;
--hds-color-util-brand-950: #161741;
--hds-color-shadow-md-bottom: #003b8905;
--hds-canary-dashed-border: 1px dashed #e5edf5;
--hds-color-input-bg-selectorActive: #7f7dfc;
--hds-color-input-border-focus: #d4dee9bf;
--hds-space-customerCard-logo-height: 60px;
--hds-color-input-tile-border-hover: #533afd;
--hds-color-shadow-lg-bottom: #003b890a;
--hds-color-core-brand-800: #2e2b8c;
--hds-color-shadow-xs-bottom: #003b890a;
--hds-color-action-border-solid: #533afd;
--hds-color-core-neutral-800: #273951;
--hds-color-core-ruby-50: #fee8eb;
--hds-color-util-action-border-emphasized: #4032c8;
--hds-color-util-accent-ruby-800: #5d1c3c;
--hds-color-action-bg-quiet: #e8e9ff;
--hds-color-core-neutralDark-600: #45639d;
--hds-color-util-brand-75: #e2e4ff;
--hds-color-util-success-400: #00b261;
--hds-color-button-primary-bgDisabled: #e5edf5;
--hds-color-core-brand-700: #4032c8;
--hds-color-accentColorMode-lemon-icon-gradientEnd: #ff9014;
--hds-color-util-neutral-975: #0d253d;
--hds-color-accentColorMode-lemon-border-quiet: #ffe1a3;
--hds-color-core-magenta-500: #cf2cab;
--hds-color-util-neutral-100: #d4dee9;
--hds-color-core-brand-75: #e2e4ff;
--hds-color-core-lemon-25: #fff2d8;
--hds-color-action-text-disabled: #95a4ba;
--hds-color-shadow-popoverTop: #27395114;
--hds-color-core-neutral-950: #11273e;
--hds-space-input-popover-width: 240px;
--hds-color-accentColorMode-ruby-icon-gradientStart: #fd7184;
--hds-color-util-accent-lemon-100: #ffe1a3;
--hds-color-core-brand-200: #b9b9f9;
--hds-color-core-brandDark-700A: #4834dbb2;
--hds-color-button-ui-icon: #533afd;
--hds-color-core-orange-800: #56281b;
--hds-color-core-neutralDark-950: #122054;
--hds-color-button-ui-bg: #e8e9ff;
--hds-color-util-accent-orange-500: #d04900;
--hds-color-util-action-bg-quiet: #b9b9f94d;
--accent-gradient-color-stop-1: #bdb4ff;
--hds-color-util-action-icon-quiet: #d6d9fc;
--hds-color-input-bg-inactive: #d4dee9bf;
--hds-color-input-selector-text-rangeDisabled: #b9b9f9;
--hds-color-action-text-solidAlternateHover: #2e2b8c;
--hds-color-icon-solid: #273951;
--hds-color-action-focus-inner-subdued: #f8fafd;
--hds-color-button-secondary-borderOnSubdued: #b9b9f9;
--hds-color-accent-border-quiet: #d6d9fc;
--hds-color-accent-charm-gradientStart: #7f7dfc;
--hds-color-util-border-emphasized: #061b31;
--hds-color-util-error-500: #d8351e;
--hds-color-core-neutral-200: #bac8da;
--hds-color-input-bg-hover: #f5f5ff;
--hds-color-surface-bg-quiet: #fff;
--hds-color-util-error-400: #f3432a;
--hds-color-action-text-onSubdued: #533afd;
--hds-space-core-border-sm: 1px;
--hds-color-util-neutral-600: #50617a;
--hds-color-input-icon-disabled: #d4dee9;
--hds-color-action-icon-solidAlternate: #533afd;
--hds-color-util-action-bg-min: #9a9afe1f;
--hds-color-input-selector-bg-selectedHover: #4032c8;
--hds-color-util-bg-subdued: #e5edf5;
--hds-color-core-neutral-900: #1a2c44;
--hds-color-button-secondary-text: #533afd;
--hds-color-core-neutral-990: #061b31;
--hds-color-text-soft: #50617a;
--hds-color-icon-subdued: #64748d;
--hds-color-util-bg-soft: #d4dee9;
--hds-canary-layout-content-maxWidth-borders: calc(1264px + 2px);
--hds-color-core-magenta-600: #a51d85;
--hds-color-core-neutral-200A: #7591b580;
--hds-color-util-action-icon-emphasized: #4032c8;
--hds-color-accentColorMode-lemon-icon-gradientMiddle: #ffaf2d;
--hds-color-core-neutral-25A: #1658bc08;
--hds-color-core-brandDark-25: #f6f7ff;
--hds-color-util-action-text-emphasized: #4032c8;
--hds-color-action-icon-onSolid: #fff;
--hds-color-util-text-subdued: #64748d;
--hds-color-accentColorMode-orange-icon-gradientStart: #fe8c2d;
--hds-color-core-orange-500: #d04900;
--hds-color-button-ui-iconDisabled: #95a4ba;
--hds-color-core-error-500: #d8351e;
--hds-color-util-action-text-soft: #665efd;
--hds-color-core-brandDark-925A: #582be233;
--hds-color-accent-charm-gradientEnd: #4032c8;
--hds-color-core-error-400: #f3432a;
--hds-color-input-selector-bg-disabled: #e5edf5;
--hds-color-accent-surface-subdued: #e2e4ff;
--hds-color-util-action-icon-min: #fff;
--hds-color-accentColorMode-default-icon-gradientMiddle: #533afd;
--hds-canary-color-border-focus: #635bff;
--hds-color-input-selector-text-rangeHover: #4032c8;
--hds-color-util-border-quiet: #e5edf5;
--hds-color-input-tile-border-selected: #7f7dfc;
--hds-color-util-neutral-900: #1a2c44;
--hds-color-core-brandDark-500: #5d64fe;
--hds-color-input-tile-text-hover: #533afd;
--hds-color-core-brand-100: #d6d9fc;
--hds-color-util-neutral-500: #64748d;
--hds-color-action-border-subdued: #b9b9f9;
--hds-color-input-tile-text-pressed: #2e2b8c;
--hds-color-util-action-border-subdued: #7f7dfc;
--hds-color-input-selector-text-availableHover: #4032c8;
--hds-color-input-border-disabled: #d4dee9;
--accent-gradient-color-stop-2: #643afd;
--hds-color-button-secondary-textHover: #2e2b8c;
--hds-color-core-neutralDark-800: #23356e;
--hds-color-button-secondary-border: #d6d9fc;
--accent-gradient-color-stop-3: #533afd;
--hds-color-util-white: #fff;
--hds-color-util-error-600: #a01400;
--hds-color-text-solid: #061b31;
--hds-color-core-brandDark-800: #2c2484;
--hds-color-core-brandDark-75: #ccdaff;
--hds-color-core-neutralDark-300: #a3b5d6;
--hds-color-button-primary-bgHover: #4032c8;
--hds-color-button-secondary-iconHover: #2e2b8c;
--hds-color-core-neutralDark-975: #101d4e;
--hds-color-core-neutralDark-100: #d4deef;
--hds-color-util-success-600: #006f3a;
--hds-color-core-neutralDark-950A: #17297080;
--hds-color-accentColorMode-ruby-border-quiet: #fed9de;
--hds-color-core-brand-900: #1c1e54;
--hds-color-input-text-solid: #273951;
--hds-color-accentColorMode-magenta-icon-solid: #f44bcc;
--hds-color-util-accent-orange-800: #56281b;
--hds-color-text-subdued: #64748d;
--hds-color-core-lemon-800: #483414;
--hds-color-core-brandDark-950: #191a51;
--hds-color-shadow-xl-top: #00377024;
--hds-color-core-success-100: #b6f2c7;
--hds-color-input-selector-text-current: #061b31;
--hds-color-accentColorMode-ruby-icon-gradientMiddle: #ea2261;
--hds-color-util-action-text-solid: #533afd;
--hds-color-core-neutral-500: #64748d;
--hds-color-action-icon-disabled: #95a4ba;
--hds-color-icon-emphasized: #061b31;
--hds-color-util-accent-magenta-350: #f44bcc;
--hds-color-button-ui-bgHover: #d6d9fc;
--hds-color-button-secondary-borderHover: #4032c8;
--hds-color-input-selector-text-selectedDisabled: #273951;
--hds-color-action-focus-inner-quiet: #fff;
--hds-color-util-brand-50: #e8e9ff;
--navigation-border-radius: 6px;
--hds-color-core-neutral-25: #f8fafd;
--hds-color-action-icon-solidAlternateHover: #2e2b8c;
--hds-color-util-accent-ruby-500: #e2225f;
--hds-color-util-accent-orange-600: #ab3500;
--hds-color-accentColorMode-magenta-border-quiet: #ffd7ef;
--hds-color-shadow-xs-top: #0037700f;
--hds-color-action-bg-solid: #533afd;
--hds-color-core-orange-350: #ff6118;
--hds-color-core-brand-975: #0f1137;
--hds-color-action-icon-navigation-solid: #061b31;
--hds-color-accentColorMode-default-icon-gradientStart: #7f7dfc;
--hds-color-util-accent-ruby-600: #b51145;
--hds-color-action-icon-navigation-subdued: #64748d;
--hds-color-input-bg-disabled: #e5edf5;
--hds-color-accentColorMode-lemon-surface-subduedAlt: #fff2d8;
--hds-color-util-border-soft: #50617a;
--hds-color-util-accent-lemon-50: #fff2d8;
--hds-color-accent-icon-solid: #533afd;
--hds-color-button-primary-textHover: #fff;
```

### Spacing

```css
--navigation-padding-outer: 8px;
--hds-space-core-1900: 152px;
--hds-space-core-300: 24px;
--hds-space-core-250: 20px;
--hds-space-core-2000: 160px;
--hds-font-heading-md-letterSpacing: -0.01em;
--hds-font-text-lg-letterSpacing: 0em;
--hds-space-input-text-paddingX-lg: 16px;
--hds-space-input-text-paddingY-sm: 8px;
--hds-space-core-radius-none: 0px;
--hds-space-core-550: 44px;
--hds-font-text-xxl-letterSpacing: -0.02em;
--hds-space-block-column-gap: 16px;
--hds-font-heading-xl-size: 3rem;
--hds-font-input-text-sm-size: 0.75rem;
--hds-space-core-2200: 176px;
--hds-space-input-text-paddingY-md: 10px;
--hds-font-text-sm-size: 0.875rem;
--hds-font-input-text-lg-letterSpacing: 0px;
--hds-space-layout-gap: 16px;
--hds-space-core-1000: 80px;
--hds-font-heading-hero-md-size: 2.25rem;
--hds-font-heading-lg-letterSpacing: -0.02em;
--hds-font-input-description-letterSpacing: 0px;
--hds-font-input-label-lg-size: 1rem;
--hds-space-input-layered-label-maxWidth: 196px;
--hds-space-core-radius-round: 99999px;
--hds-font-heading-xxs-letterSpacing: 0em;
--hds-font-heading-hero-md-letterSpacing: -0.02em;
--hds-space-core-1400: 112px;
--hds-space-core-400: 32px;
--hds-font-heading-lg-size: 2rem;
--hds-space-input-focus-shadowOuter: 4px;
--hds-space-block-stack-gap-lg: 48px;
--hds-space-input-gap-errorMessage: 4px;
--hds-space-layout-columns: 12;
--hds-space-core-1500: 120px;
--hds-space-input-layered-label-minWidth: 120px;
--hds-font-input-description-size: 0.875rem;
--hds-font-heading-hero-sm-letterSpacing: -0.02em;
--hds-font-heading-xs-size: 1rem;
--hds-space-core-radius-lg: 16px;
--hds-font-quote-md-letterSpacing: -0.01em;
--hds-space-block-stack-gap-md: 16px;
--hds-space-core-350: 28px;
--hds-font-heading-xxl-size: 3.5rem;
--hds-font-heading-xxs-size: 0.875rem;
--hds-space-core-1300: 104px;
--hds-font-heading-xxl-letterSpacing: -0.025em;
--hds-space-core-1800: 144px;
--hds-space-input-text-paddingY-listbox: 6px;
--hds-font-input-text-md-size: 0.875rem;
--hds-space-core-150: 12px;
--hds-font-input-label-sm-size: 0.75rem;
--hds-font-heading-md-size: 1.625rem;
--hds-space-layout-page-margin: 16px;
--hds-space-core-25: 2px;
--hds-space-core-700: 56px;
--hds-font-text-md-size: 1rem;
--hds-font-input-text-md-letterSpacing: 0px;
--hds-font-input-label-md-letterSpacing: 0px;
--hds-space-core-1100: 88px;
--hds-space-block-stack-gap-xl: 64px;
--hds-space-button-radius-sm: 2px;
--hds-space-core-1200: 96px;
--hds-space-input-layered-input-minWidth: 300px;
--hds-font-heading-hero-lg-size: 2.5rem;
--hds-space-core-radius-xs: 2px;
--hds-space-core-600: 48px;
--hds-space-input-text-paddingX-md: 13px;
--hds-font-text-xs-letterSpacing: 0em;
--hds-font-quoteAttribution-md-size: 1.125rem;
--hds-font-heading-xs-letterSpacing: 0em;
--hds-space-core-450: 36px;
--hds-font-text-xs-size: 0.875rem;
--hds-space-core-500: 40px;
--hds-space-core-50: 4px;
--hds-font-text-xxs-size: 0.75rem;
--hds-space-input-text-paddingX-sm: 10px;
--hds-font-text-md-letterSpacing: 0em;
--hds-font-input-text-lgTextarea-size: 1rem;
--hds-font-heading-hero-sm-size: 2rem;
--hds-font-input-groupHeading-size: 0.75rem;
--hds-space-core-2500: 200px;
--hds-font-text-xl-letterSpacing: -0.01em;
--hds-space-stat-content-padding-y: 36px;
--hds-space-core-radius-xl: 32px;
--hds-space-core-75: 6px;
--hds-space-input-text-paddingX-listbox: 10px;
--hds-font-heading-hero-lg-letterSpacing: -0.02em;
--hds-font-heading-xl-letterSpacing: -0.02em;
--hds-font-input-label-sm-letterSpacing: 0px;
--hds-font-heading-sm-size: 1.375rem;
--hds-space-core-2100: 168px;
--hds-font-input-label-md-size: 0.875rem;
--hds-space-core-1700: 136px;
--hds-font-text-sm-letterSpacing: 0em;
--hds-space-input-minHeight: 48px;
--hds-space-input-gap-labelVertical: 8px;
--hds-space-input-focus-shadowSingle: 2px;
--hds-space-core-1: 1px;
--hds-font-quoteAttribution-md-letterSpacing: 0em;
--hds-font-input-text-lgTextarea-letterSpacing: 0px;
--hds-font-input-label-lg-letterSpacing: 0px;
--hds-space-core-200: 16px;
--hds-space-core-900: 72px;
--hds-space-input-layered-input-maxWidth: 360px;
--hds-space-button-height: 48px;
--hds-space-core-100: 8px;
--hds-space-section-gap-top: 96px;
--hds-font-heading-sm-letterSpacing: -0.01em;
--hds-space-layout-content-margin: 16px;
--hds-space-input-focus-outline-offset: 1px;
--hds-font-text-xxl-size: 3rem;
--hds-font-input-text-lg-size: 1rem;
--hds-font-quote-md-size: 1.625rem;
--hds-font-text-lg-size: 1.125rem;
--hds-font-input-text-sm-letterSpacing: 0px;
--hds-space-core-radius-md: 6px;
--hds-space-core-800: 64px;
--hds-space-core-0: 0px;
--hds-space-layout-content-maxWidth: 1264px;
--hds-space-core-radius-sm: 4px;
--hds-space-core-2300: 184px;
--hds-space-core-1600: 128px;
--hds-space-button-radius-lg: 4px;
--hds-font-text-xl-size: 1.25rem;
--hds-space-section-gap-bottom: 96px;
--hds-space-core-2400: 192px;
--hds-space-input-text-paddingY-lg: 12px;
--hds-space-input-layered-gap: 24px;
--hds-font-text-xxs-letterSpacing: 0em;
--hds-font-input-groupHeading-letterSpacing: 0px;
```

### Typography

```css
--hds-font-input-text-md-lineHeight: 1.3;
--hds-font-heading-xs-lineHeight: 1.2;
--hds-font-quoteAttribution-md-weight: 300;
--hds-font-heading-xl-lineHeight: 1.03;
--hds-font-heading-md-weight: 300;
--hds-font-input-groupHeading-weight: 300;
--hds-font-text-lg-lineHeight: 1.4;
--hds-font-input-description-lineHeight: 1.3;
--hds-font-family: "sohne-var","SF Pro Display",sans-serif;
--hds-font-heading-sm-weight: 300;
--hds-font-heading-hero-lg-lineHeight: 1.2;
--hds-font-input-label-lg-weight: 400;
--hds-font-text-xxs-lineHeight: 1.45;
--hero-font-lang-large: 3rem;
--hds-font-text-xxl-weight: 300;
--hds-font-text-xs-weight: 300;
--hds-font-input-text-lgTextarea-lineHeight: 1.4;
--hds-font-heading-xxs-lineHeight: 1.2;
--hds-font-text-xxs-weight: 300;
--hds-font-heading-hero-md-weight: 300;
--hds-font-text-md-weight: 300;
--hds-font-text-lg-weight: 300;
--hero-font-lang-medium: 2.75rem;
--hds-font-heading-hero-lg-weight: 300;
--hds-font-input-text-sm-weight: 300;
--hds-font-input-text-lgTextarea-weight: 300;
--hds-font-text-xl-lineHeight: 1.4;
--hds-font-heading-xxl-lineHeight: 1.03;
--hds-font-input-label-md-lineHeight: 1.3;
--hds-font-heading-sm-lineHeight: 1.1;
--hds-font-heading-xxl-weight: 300;
--hds-font-heading-xxs-weight: 400;
--hds-font-text-sm-lineHeight: 1.4;
--hds-font-heading-lg-weight: 300;
--hds-font-input-label-sm-lineHeight: 1.35;
--hds-font-family-code: "SourceCodePro","SFMono-Regular",monospace;
--hds-font-text-xxl-lineHeight: 1;
--hds-font-quoteAttribution-md-lineHeight: 1.4;
--hds-font-input-text-md-weight: 300;
--hds-font-heading-hero-md-lineHeight: 1.05;
--hds-font-heading-hero-sm-weight: 300;
--hds-font-heading-xs-weight: 400;
--hds-font-weight-bold: 400;
--hero-font-lang-small: 2.5rem;
--hds-font-heading-hero-sm-lineHeight: 1.1;
--hds-font-input-groupHeading-lineHeight: 1.35;
--hero-font-lang-min: 2.125rem;
--hds-font-heading-lg-lineHeight: 1.1;
--hds-font-input-label-md-weight: 400;
--hds-font-input-text-lg-weight: 300;
--hds-font-text-xs-lineHeight: 1.4;
--hds-font-text-md-lineHeight: 1.4;
--hds-font-input-text-lg-lineHeight: 1;
--hds-font-input-text-sm-lineHeight: 1.35;
--hds-font-text-sm-weight: 300;
--hds-font-input-label-lg-lineHeight: 1.2;
--hds-font-text-xl-weight: 300;
--hds-font-weight-normal: 300;
--hds-font-quote-md-weight: 300;
--hds-font-quote-md-lineHeight: 1.12;
--hds-font-input-label-sm-weight: 400;
--hds-font-heading-xl-weight: 300;
--hds-font-heading-md-lineHeight: 1.12;
--hds-font-input-description-weight: 300;
```

### Shadows

```css
--hds-shadow-sm-top-offset-y: 5px;
--hds-shadow-sm-bottom-offset-y: 2px;
--hds-shadow-xs-top-blur: 10px;
--hds-shadow-xs-bottom-blur: 4px;
--hds-shadow-xs-top-offset-y: 2px;
--hds-shadow-sm-bottom-offset-x: 0px;
--hds-shadow-xl-bottom-offset-x: 0px;
--hds-shadow-xl-bottom-offset-y: 10px;
--hds-shadow-lg-bottom-blur: 20px;
--hds-shadow-xl-bottom-spread: -16px;
--hds-shadow-sm-bottom-spread: 0px;
--hds-shadow-md-top-blur: 22px;
--hds-shadow-md-bottom-blur: 8px;
--hds-shadow-lg-bottom-offset-x: 0px;
--hds-shadow-xl: 0px 20px 80px -16px #00377024,0px 10px 60px -16px #003b890f;
--hds-shadow-sm-top-offset-x: 0px;
--hds-shadow-md: 0px 6px 22px 0px #0037701a,0px 4px 8px 0px #003b8905;
--hds-shadow-lg-bottom-offset-y: 5px;
--hds-shadow-sm-top-spread: 0px;
--hds-shadow-md-bottom-spread: 0px;
--hds-shadow-xl-top-spread: -16px;
--hds-shadow-lg-bottom-spread: -2px;
--hds-shadow-xl-top-offset-x: 0px;
--hds-shadow-md-top-spread: 0px;
--hds-shadow-xl-top-offset-y: 20px;
--hds-shadow-xs-bottom-offset-x: 0px;
--hds-shadow-xl-bottom-blur: 60px;
--hds-shadow-xs-top-offset-x: 0px;
--hds-shadow-md-bottom-offset-y: 4px;
--hds-shadow-xl-top-blur: 80px;
--hds-shadow-md-top-offset-x: 0px;
--hds-shadow-sm-bottom-blur: 8px;
--hds-shadow-sm-top-blur: 14px;
--hds-shadow-lg-top-offset-y: 15px;
--hds-canary-ui-shadow: 0px 16px 32px rgba(50,50,93,.12);
--hds-shadow-xs-top-spread: 0px;
--hds-shadow-lg-top-spread: -2px;
--hds-shadow-md-top-offset-y: 6px;
--hds-shadow-lg: 0px 15px 40px -2px #0037701a,0px 5px 20px -2px #003b890a;
--hds-shadow-lg-top-offset-x: 0px;
--hds-shadow-xs: 0px 2px 10px 0px #0037700f,0px 1px 4px 0px #003b890a;
--hds-shadow-sm: 0px 5px 14px 0px #00377014,0px 2px 8px 0px #003b890d;
--hds-shadow-xs-bottom-spread: 0px;
--hds-shadow-md-bottom-offset-x: 0px;
--hds-shadow-xs-bottom-offset-y: 1px;
--hds-shadow-lg-top-blur: 40px;
```

### Other

```css
--navigation-inline-end: 16px;
--navigation-duration-slow: 300ms;
--navigation-duration: 240ms;
--hds-canary-ui-mini-stroke: #e5edf5;
--hds-canary-grid-span-quarter: span 3;
--navigation-easing: cubic-bezier(0.45,0.05,0.55,0.95);
--navigation-hamburger-duration: 0.25s;
--navigation-height: 76px;
--hover-progress: 0;
--hds-canary-grid-span-full: span 12;
--hds-canary-grid-span-half: span 6;
--hds-canary-ui-stroke: color-mix(in srgb,#e5edf5 50%,transparent);
--navigation-inline-start: 16px;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.24s`, `0.25s`, `0.3s`, `0.15s`, `0.1s`, `0.8s`, `0.6s`, `1s`, `0.5s`, `0.4s`, `1.2s`, `0s`, `0.12s`, `0.2s`

### Common Transitions

```css
transition: all;
transition: opacity 0.24s cubic-bezier(0.45, 0.05, 0.55, 0.95);
transition: fill 0.24s cubic-bezier(0.45, 0.05, 0.55, 0.95);
transition: opacity cubic-bezier(0.4, 0, 0.2, 1), transform cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.24s cubic-bezier(0.45, 0.05, 0.55, 0.95), background-color 0.24s cubic-bezier(0.45, 0.05, 0.55, 0.95), border-color 0.24s cubic-bezier(0.45, 0.05, 0.55, 0.95);
transition: transform 0.25s cubic-bezier(0.6, 0, 0.2, 0.5);
transition: background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s cubic-bezier(0.25, 1, 0.5, 1), border 0.3s cubic-bezier(0.25, 1, 0.5, 1);
transition: stroke 0.3s cubic-bezier(0.25, 1, 0.5, 1);
transition: opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1);
transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (73 instances)

```css
.button {
  background-color: rgba(255, 255, 255, 0);
  color: rgb(83, 58, 253);
  font-size: 16px;
  font-weight: 400;
  padding-top: 14.5px;
  padding-right: 24px;
  border-radius: 4px;
}
```

### Cards (245 instances)

```css
.card {
  background-color: rgb(229, 237, 245);
  border-radius: 0px;
  box-shadow: rgba(50, 50, 93, 0.12) 0px 16px 32px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (176 instances)

```css
.link {
  color: rgb(80, 97, 122);
  font-size: 16px;
  font-weight: 400;
}
```

### Navigation (86 instances)

```css
.navigatio {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 30px 60px -50px, rgba(50, 50, 93, 0.25) 0px 30px 60px -10px;
}
```

### Footer (124 instances)

```css
.foote {
  background-color: rgba(255, 255, 255, 0.8);
  color: rgb(80, 97, 122);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 16px;
}
```

### Modals (19 instances)

```css
.modal {
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Dropdowns (42 instances)

```css
.dropdown {
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 30px 60px -50px, rgba(50, 50, 93, 0.25) 0px 30px 60px -10px;
  border-color: rgb(0, 0, 0);
  padding-top: 0px;
}
```

### Badges (58 instances)

```css
.badge {
  color: rgb(80, 97, 122);
  font-size: 10px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### ProgressBars (2 instances)

```css
.progressBar {
  color: rgb(0, 0, 0);
  border-radius: 3px;
  font-size: 16px;
}
```

### Switches (2 instances)

```css
.switche {
  border-radius: 4px;
  border-color: rgb(83, 58, 253);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 8 instances, 3 variants

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(6, 27, 49);
  padding: 12px 0px 12px 0px;
  border-radius: 4px;
  border: 0px none rgb(6, 27, 49);
  font-size: 14px;
  font-weight: 400;
```

**Variant 2** (1 instance)

```css
  background: rgba(255, 255, 255, 0);
  color: rgba(16, 16, 16, 0.3);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 0px none rgba(16, 16, 16, 0.3);
  font-size: 16px;
  font-weight: 400;
```

**Variant 3** (3 instances)

```css
  background: rgb(232, 233, 255);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 3 instances, 3 variants

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(6, 27, 49);
  padding: 12px 0px 12px 0px;
  border-radius: 4px;
  border: 0px none rgb(6, 27, 49);
  font-size: 14px;
  font-weight: 400;
```

**Variant 2** (1 instance)

```css
  background: rgba(255, 255, 255, 0);
  color: rgb(255, 255, 255);
  padding: 14.5px 24px 15.5px 24px;
  border-radius: 4px;
  border: 1px solid rgba(72, 52, 219, 0.698);
  font-size: 16px;
  font-weight: 400;
```

**Variant 3** (1 instance)

```css
  background: rgba(255, 255, 255, 0);
  color: rgb(83, 58, 253);
  padding: 14.5px 24px 15.5px 24px;
  border-radius: 4px;
  border: 1px solid rgb(185, 185, 249);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(83, 58, 253);
  padding: 10.5px 20px 13.5px 20px;
  border-radius: 4px;
  border: 1px solid rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 400;
```

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(83, 58, 253);
  font-size: 14px;
  font-weight: 400;
```

### Button — 17 instances, 2 variants

**Variant 1** (7 instances)

```css
  background: rgb(83, 58, 253);
  color: rgb(255, 255, 255);
  padding: 15.5px 20px 16.5px 20px;
  border-radius: 4px;
  border: 0px none rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 400;
```

**Variant 2** (10 instances)

```css
  background: rgba(255, 255, 255, 0.65);
  color: rgb(83, 58, 253);
  padding: 14.5px 24px 15.5px 24px;
  border-radius: 4px;
  border: 1px solid rgb(185, 185, 249);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 6 instances, 1 variant

**Variant 1** (6 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Card — 55 instances, 5 variants

**Variant 1** (35 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (13 instances)

```css
  background: rgb(229, 237, 245);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 6px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 3** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(60, 79, 105);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(60, 79, 105);
  font-size: 10px;
  font-weight: 300;
```

**Variant 4** (2 instances)

```css
  background: rgb(229, 237, 245);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 238);
  font-size: 16px;
  font-weight: 400;
```

**Variant 5** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 238);
  font-size: 16px;
  font-weight: 400;
```

### Card — 14 instances, 2 variants

**Variant 1** (13 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (1 instance)

```css
  background: rgb(248, 250, 253);
  color: rgb(100, 116, 141);
  padding: 9px 7px 9px 7px;
  border-radius: 6px;
  border: 0px none rgb(100, 116, 141);
  font-size: 9px;
  font-weight: 300;
```

### Card — 6 instances, 1 variant

**Variant 1** (6 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 60px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 26px;
  font-weight: 400;
```

### Card — 6 instances, 1 variant

**Variant 1** (6 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(6, 27, 49);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(6, 27, 49);
  font-size: 26px;
  font-weight: 300;
```

### Card — 20 instances, 4 variants

**Variant 1** (10 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgb(248, 250, 253);
  color: rgb(100, 116, 141);
  padding: 9px 7px 9px 7px;
  border-radius: 6px;
  border: 0px none rgb(100, 116, 141);
  font-size: 9px;
  font-weight: 300;
```

**Variant 3** (6 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(80, 97, 122);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(80, 97, 122);
  font-size: 10px;
  font-weight: 300;
```

**Variant 4** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 238);
  font-size: 16px;
  font-weight: 400;
```

### Card — 14 instances, 3 variants

**Variant 1** (10 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgb(248, 250, 253);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 6px;
  border: 0px none rgb(0, 0, 238);
  font-size: 16px;
  font-weight: 400;
```

**Variant 3** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 238);
  padding: 32px 24px 32px 24px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 238);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 2 variants

**Variant 1** (2 instances)

```css
  background: rgb(255, 224, 209);
  color: rgb(255, 97, 24);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 0px none rgb(255, 97, 24);
  font-size: 10px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 97, 24);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 97, 24);
  font-size: 10px;
  font-weight: 400;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 97, 24);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 97, 24);
  font-size: 10px;
  font-weight: 400;
```

### Button — 5 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(83, 58, 253);
  font-size: 16px;
  font-weight: 400;
```

### Button — 7 instances, 3 variants

**Variant 1** (1 instance)

```css
  background: rgb(0, 214, 111);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (1 instance)

```css
  background: rgb(0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 3** (5 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(83, 58, 253);
  font-size: 16px;
  font-weight: 400;
```

### Card — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Card — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Card — 11 instances, 2 variants

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (7 instances)

```css
  background: rgb(229, 237, 245);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 6px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Card — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 16px 0px 16px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgba(255, 255, 255, 0);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 1px solid rgb(214, 217, 252);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (3 instances)

```css
  background: rgb(226, 228, 255);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 1px solid rgb(226, 228, 255);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(83, 58, 253);
  font-size: 16px;
  font-weight: 400;
```

### Other — 6 instances, 2 variants

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(83, 58, 253);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Link — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Card — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Card — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(6, 27, 49);
  padding: 0px 16px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(6, 27, 49);
  font-size: 16px;
  font-weight: 300;
```

### Card — 13 instances, 2 variants

**Variant 1** (9 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(83, 58, 253);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(6, 27, 49);
  padding: 0px 16px 0px 16px;
  border-radius: 0px;
  border: 0px none rgb(6, 27, 49);
  font-size: 18px;
  font-weight: 400;
```

### Other — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Other — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Card — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Link — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 238);
  font-size: 16px;
  font-weight: 400;
```

### Card — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 238);
  font-size: 16px;
  font-weight: 400;
```

### Card — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Card — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(100, 116, 141);
  padding: 0px 16px 0px 16px;
  border-radius: 0px;
  border: 0px none rgb(100, 116, 141);
  font-size: 26px;
  font-weight: 300;
```

### Card — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(80, 97, 122);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(80, 97, 122);
  font-size: 18px;
  font-weight: 300;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 32px 24px 32px 24px;
  border-radius: 4px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 238);
  padding: 2px 2px 2px 2px;
  border-radius: 4px;
  border: 1px solid rgb(229, 237, 245);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 2px;
  border: 0px none rgb(0, 0, 238);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(83, 58, 253);
  padding: 0px 0px 0px 0px;
  border-radius: 4px;
  border: 0px none rgb(83, 58, 253);
  font-size: 16px;
  font-weight: 400;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(99, 91, 255);
  padding: 10px 20px 10px 20px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  font-size: 14px;
  font-weight: 500;
```

## Layout System

**53 grid containers** and **374 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1266px | 16px |
| 958.642px | 0px |
| 816px | 0px |
| 280px | 0px |
| 100% | 0px |
| 516px | 0px |
| 400px | 0px |
| 1232px | 0px |
| 876.259px | 16px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 2-column | 16x |
| 3-column | 16x |
| 1-column | 9x |
| 12-column | 8x |
| 4-column | 3x |
| 8-column | 1x |

### Grid Templates

```css
grid-template-columns: 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px;
gap: normal 16px;
grid-template-columns: 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px 86.5px;
gap: normal 16px;
grid-template-columns: 1214px;
grid-template-columns: 279.609px 519.281px;
gap: normal 12px;
grid-template-columns: 394px 394px 394px;
gap: 32px 16px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 264x |
| row/wrap | 9x |
| column/nowrap | 101x |

**Gap values:** `10px`, `12px`, `13.824px`, `14px`, `16px`, `16px normal`, `24px`, `28px`, `3.2px`, `32px`, `32px 16px`, `32px normal`, `3px`, `40px`, `40px 16px`, `40px normal`, `48px`, `4px`, `4px normal`, `56px 16px`, `5px`, `64px`, `6px`, `80px`, `8px`, `8px 16px`, `96px`, `normal 12px`, `normal 16px`, `normal 24px`, `normal 8px`

## Accessibility (WCAG 2.1)

**Overall Score: 79%** — 11 passing, 3 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#ffffff` | `#e3ecf7` | 1.19:1 | FAIL | h4 (3x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#ffffff` | `#533afd` | 6.19:1 | AA |
| `#635bff` | `#ffffff` | 4.7:1 | AA |
| `#533afd` | `#ffffff` | 6.19:1 | AA |

## Design System Score

**Overall: 88/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 80/100 |
| Typography Consistency | 92/100 |
| Spacing System | 100/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 79/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Good CSS variable tokenization

**Issues:**
- 3 WCAG contrast failures
- 52% of CSS is unused — consider purging
- 6133 duplicate CSS declarations

## Gradients

**19 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| radial | — | 3 | bold |
| radial | circle | 3 | bold |
| radial | — | 3 | bold |
| radial | — | 3 | bold |
| radial | — | 3 | bold |
| linear | — | 2 | brand |
| linear | 90deg | 3 | bold |
| linear | 90deg | 3 | bold |
| radial | — | 8 | complex |
| radial | — | 9 | complex |
| radial | — | 6 | complex |
| radial | — | 8 | complex |
| radial | — | 7 | complex |
| radial | — | 7 | complex |
| radial | circle | 3 | bold |

```css
background: radial-gradient(66.35% 66.35%, rgba(255, 255, 255, 0.9) 0px, rgba(255, 255, 255, 0) 100%);
background: radial-gradient(circle, rgb(127, 125, 252), rgb(244, 75, 204) 33%, rgb(229, 237, 245) 66%);
background: radial-gradient(50% 50%, rgba(83, 58, 253, 0.8) 62.5%, rgba(83, 58, 253, 0) 100%);
background: radial-gradient(50% 50%, rgba(243, 99, 243, 0.8) 53.85%, rgba(243, 99, 243, 0) 100%);
background: radial-gradient(50% 50%, rgb(255, 207, 94) 41.35%, rgba(255, 207, 94, 0) 100%);
```

## Z-Index Map

**6 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 9999,9999 | div.N.o.t.i.f.i.c.a.t.i.o.n.s._.N.o.t.i.f.i.c.a.t.i.o.n.C.e.n.t.e.r._._.C.D.R.b.w |
| base | -1,3 | div.n.a.v.i.g.a.t.i.o.n.-.m.e.n.u._._.b.a.c.k.g.r.o.u.n.d, div.s.e.c.t.i.o.n.-.c.o.n.t.a.i.n.e.r. .h.e.r.o.-.l.o.g.o.-.s.e.c.t.i.o.n, div.s.e.c.t.i.o.n.-.b.a.c.k.g.r.o.u.n.d. .m.o.d.u.l.a.r.-.s.o.l.u.t.i.o.n.s.-.b.g |

## SVG Icons

**83 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 19 |
| sm | 11 |
| md | 4 |
| lg | 4 |
| xl | 45 |

**Icon colors:** `#031323`, `var(--hds-color-text-solid)`, `currentColor`, `white`, `black`, `var(--hds-color-surface-bg-quiet)`, `rgb(0, 0, 0)`, `#4285f4`, `#34a853`, `#fbbc04`

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 48 | objectFit: fill, borderRadius: 0px, shape: square |
| gallery | 10 | objectFit: fill, borderRadius: 0px, shape: square |
| general | 10 | objectFit: fill, borderRadius: 0px, shape: square |
| hero | 3 | objectFit: cover, borderRadius: 0px, shape: square |

**Aspect ratios:** 4.18:1 (36x), 3:4 (8x), 21:9 (8x), 1:1 (6x), 9:16 (4x), 4:3 (2x), 16:9 (2x), 3:2 (1x)

## Motion Language

**Feel:** responsive · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |
| `lg` | `500ms` | 500 |
| `xl` | `800ms` | 800 |

### Easing Families

- **custom** (53 uses) — `cubic-bezier(0.45, 0.05, 0.55, 0.95)`, `cubic-bezier(0.4, 0, 0.2, 1)`, `cubic-bezier(0.6, 0, 0.2, 0.5)`
- **ease-out** (549 uses) — `cubic-bezier(0.25, 1, 0.5, 1)`, `cubic-bezier(0.165, 0.84, 0.44, 1)`, `cubic-bezier(0.16, 1, 0.3, 1)`
- **ease-in-out** (9 uses) — `ease`
- **linear** (45 uses) — `linear`
- **steps** (10 uses) — `steps(1)`

## Component Anatomy

### card — 177 instances

**Slots:** media
**Variants:** link
**Sizes:** md

| variant | count | sample label |
|---|---|---|
| default | 168 | Accept and optimize payments globally—on |
| link | 9 | Read Lovable’s story |

### button — 91 instances

**Slots:** label, icon
**Variants:** secondary · primary · link

| variant | count | sample label |
|---|---|---|
| default | 62 | Products |
| secondary | 16 | Sign in
Sign in |
| primary | 12 | Contact sales |
| link | 1 |  |

### other — 11 instances


### link — 9 instances


## Brand Voice

**Tone:** neutral · **Pronoun:** you-only · **Headings:** Sentence case (balanced)

### Top CTA Verbs

- **read** (20)
- **stripe** (10)
- **continue** (6)
- **get** (5)
- **sign** (4)
- **view** (4)
- **watch** (3)
- **contact** (2)

### Button Copy Patterns

- "read the story" (12×)
- "continue
weiter
続行
continue" (6×)
- "contact sales" (2×)
- "stripe for enterprises" (2×)
- "stripe for startups" (2×)
- "stripe for platforms" (2×)
- "stripe press" (2×)
- "works in progress" (2×)
- "products" (1×)
- "solutions" (1×)

### Sample Headings

> Financial infrastructure to grow your revenue. Accept payments, offer financial services, and implement custom revenue models—from your first transaction to your billionth.
> Financial infrastructure to grow your revenue. Accept payments, offer financial services, and implement custom revenue models—from your first transaction to your billionth.
> Flexible solutions for every business model.
> Accept and optimize payments globally—online and in person
> Enable any billing model
> Financial infrastructure to grow your revenue. Accept payments, offer financial services, and implement custom revenue models—from your first transaction to your billionth.
> Financial infrastructure to grow your revenue. Accept payments, offer financial services, and implement custom revenue models—from your first transaction to your billionth.
> Flexible solutions for every business model.
> Accept and optimize payments globally—online and in person
> Enable any billing model

## Page Intent

**Type:** `landing` (confidence 0.75)
**Description:** Stripe is a financial services platform that helps all types of businesses accept payments, build flexible billing models, and manage money movement.

## Section Roles

Reading order (top→bottom): cta → nav → nav → nav → pricing-table → testimonial → pricing-table → content → stats → pricing-table → testimonial → testimonial → pricing-table → nav → gallery → testimonial → nav → testimonial → pricing-table → pricing-table → gallery → cta → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | cta | — | 0.75 |
| 1 | nav | — | 0.9 |
| 2 | nav | — | 0.9 |
| 3 | nav | — | 0.9 |
| 4 | pricing-table | Financial infrastructure to grow your revenue. Accept payments, offer financial  | 0.9 |
| 5 | testimonial | Financial infrastructure to grow your revenue. Accept payments, offer financial  | 0.8 |
| 6 | pricing-table | Flexible solutions for every business model. | 0.9 |
| 7 | content | — | 0.3 |
| 8 | stats | The backbone of global commerce | 0.85 |
| 9 | pricing-table | Powering businesses of all sizes. | 0.9 |
| 10 | testimonial | Transform your enterprise with agile financial infrastructure | 0.8 |
| 11 | testimonial | Transform your enterprise with agile financial infrastructure | 0.8 |
| 12 | pricing-table | Build a foundation for your startup that enables faster growth | 0.9 |
| 13 | nav | Build a foundation for your startup that enables faster growth | 0.4 |
| 14 | gallery | — | 0.7 |
| 15 | testimonial | Make your SaaS platform a complete financial operating system | 0.8 |
| 16 | nav | Make your SaaS platform a complete financial operating system | 0.4 |
| 17 | testimonial | Reliable, extensible infrastructure for every stack. | 0.8 |
| 18 | pricing-table | What’s happening | 0.9 |
| 19 | pricing-table | What’s happening | 0.9 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.481 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 100px |
| backdrop-filter in use | no |
| Gradients | 19 |

## Imagery Style

**Label:** `flat-illustration` (confidence 0.3)
**Counts:** total 71, svg 43, icon 1, screenshot-like 0, photo-like 2
**Dominant aspect:** ultra-wide
**Radius profile on images:** square

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `sohne-var` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
