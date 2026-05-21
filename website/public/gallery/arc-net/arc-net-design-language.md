# Design Language: Arc from The Browser Company

> Extracted from `https://arc.net` on May 21, 2026
> 450 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#2702c2` | rgb(39, 2, 194) | hsl(252, 98%, 38%) | 26 |
| Secondary | `#fffadd` | rgb(255, 250, 221) | hsl(51, 100%, 93%) | 54 |
| Accent | `#3139fb` | rgb(49, 57, 251) | hsl(238, 96%, 59%) | 296 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#000000` | hsl(0, 0%, 0%) | 299 |
| `#fffcec` | hsl(51, 100%, 96%) | 146 |
| `#ffffff` | hsl(0, 0%, 100%) | 72 |
| `#696969` | hsl(0, 0%, 41%) | 20 |

### Background Colors

Used on large-area elements: `#fffcec`, `#3139fb`, `#ffffff`

### Text Colors

Text color palette: `#000000`, `#ffffff`, `#fffadd`, `#fffcec`, `#2702c2`, `#3139fb`, `#696969`

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#000000` | text, border, background | 299 |
| `#3139fb` | background, text, border | 296 |
| `#fffcec` | background, text, border | 146 |
| `#ffffff` | text, border, background | 72 |
| `#fffadd` | text, border | 54 |
| `#2702c2` | text, border, background | 26 |
| `#696969` | text, border | 20 |

## Typography

### Font Families

- **Marlin** — used for all (157 elements)
- **Marlin Soft SQ** — used for all (145 elements)
- **Times** — used for body (67 elements)
- **InterVariable** — used for body (46 elements)
- **ABC Favorit Mono** — used for body (10 elements)
- **ABC Oracle** — used for body (6 elements)
- **Exposure VAR** — used for body (1 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 45.51px | 2.8444rem | 700 | 42.25px | -1.8204px | h1, span |
| 40px | 2.5rem | 700 | 39px | -1.6px | p, span |
| 36px | 2.25rem | 700 | 36px | -0.72px | span |
| 32px | 2rem | 700 | 31.2px | -1.6px | h1, span |
| 28px | 1.75rem | 700 | 30px | -1.4px | div, em |
| 24px | 1.5rem | 400 | 28.8px | normal | a, img, span, svg |
| 20px | 1.25rem | 400 | 24px | normal | p |
| 17px | 1.0625rem | 500 | 25.5px | normal | div, strong, span, a |
| 16px | 1rem | 400 | normal | normal | html, head, meta, link |
| 14px | 0.875rem | 500 | normal | -0.28px | a, span, svg, g |
| 13.3333px | 0.8333rem | 400 | normal | normal | button, svg, path |
| 12px | 0.75rem | 400 | normal | 1.8px | div, br, svg, path |

### Heading Scale

```css
h1 { font-size: 45.51px; font-weight: 700; line-height: 42.25px; }
h1 { font-size: 32px; font-weight: 700; line-height: 31.2px; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: normal; }
```

### Font Weights in Use

`400` (229x), `700` (143x), `600` (53x), `500` (24x), `800` (1x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-2 | 2px | 0.125rem |
| spacing-32 | 32px | 2rem |
| spacing-37 | 37px | 2.3125rem |
| spacing-48 | 48px | 3rem |
| spacing-64 | 64px | 4rem |
| spacing-72 | 72px | 4.5rem |
| spacing-80 | 80px | 5rem |
| spacing-90 | 90px | 5.625rem |
| spacing-128 | 128px | 8rem |
| spacing-150 | 150px | 9.375rem |
| spacing-155 | 155px | 9.6875rem |
| spacing-160 | 160px | 10rem |
| spacing-383 | 383px | 23.9375rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 4px | 1 |
| md | 8px | 9 |
| xl | 22px | 1 |

## Box Shadows

**md** — blur: 8px
```css
box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 8px 0px;
```

**md** — blur: 5px
```css
box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px 0px;
```

## CSS Custom Properties

### Colors

```css
--colors-primary7: rgb(207, 56, 40);
--colors-focusOutline: #96C4FF;
--colors-highContrast: #000;
--colors-primary6: rgb(250, 69, 49);
--colors-students-light_grey-hover: rgb(215, 214, 196);
--colors-brandOffwhite: #FFFCEC;
--colors-secondary4: rgb(0, 130, 121);
--colors-brandDeepBlue: #2404AA;
--colors-secondary2: rgb(0, 201, 195);
--colors-lowContrast: #FFF;
--colors-students-light_green: rgb(211, 224, 129);
--colors-primary4: rgb(252, 130, 121);
--colors-primary12: rgb(9, 2, 1);
--colors-secondary7: rgb(0, 56, 40);
--colors-secondary11: rgb(0, 4, 2);
--colors-secondary5: rgb(0, 105, 88);
--colors-students-off_white: rgb(245, 244, 226);
--colors-primary11: rgb(26, 4, 2);
--colors-students-arc_pinkish: rgb(242, 94, 107);
--colors-students-dark_blue: rgb(39, 2, 194);
--colors-students-light_blue: rgb(205, 204, 223);
--colors-primary8: rgb(162, 43, 31);
--colors-secondary8: rgb(0, 43, 31);
--colors-secondary3: rgb(0, 163, 159);
--colors-students-deep_blue: rgb(36, 4, 170);
--colors-secondary10: rgb(0, 17, 12);
--colors-students-arc_blue: rgb(12, 80, 255);
--colors-secondary9: rgb(0, 30, 21);
--colors-brandDarkBlue: #000354;
--colors-primary5: rgb(253, 105, 88);
--colors-secondary6: rgb(0, 69, 49);
--colors-secondary1: rgb(0, 234, 231);
--colors-students-light_grey: rgb(225, 224, 206);
--colors-brandBlue: #3139FB;
--colors-students-text_dark: rgb(118, 110, 106);
--colors-primary9: rgb(116, 30, 21);
--colors-students-arc_blue_pale: rgb(69, 138, 255);
--colors-students-salmon: rgb(242, 194, 172);
--colors-secondary12: rgb(0, 2, 1);
--colors-students-text_light: rgb(151, 146, 143);
--colors-primary10: rgb(71, 17, 12);
--colors-primary3: rgb(252, 163, 159);
--colors-primary2: rgb(255, 201, 195);
--colors-primary1: rgb(255, 234, 231);
--colors-brandRed: #FB3A4D;
--colors-students-dark_grey: rgb(60, 59, 58);
```

### Spacing

```css
--padding: 32px;
--page-padding-left: max(env(safe-area-inset-left), var(--padding));
--page-padding-right: max(env(safe-area-inset-right), var(--padding));
--fontSizes-20: 20px;
--space-16: 16px;
--space-72: 72px;
--space-4: 4px;
--space-40: 40px;
--space-8: 8px;
--space-32: 32px;
--sizes-24: 24px;
--sizes-64: 64px;
--fontSizes-24: 24px;
--fontSizes-48: 48px;
--space-64: 64px;
--sizes-40: 40px;
--sizes-48: 48px;
--sizes-56: 56px;
--sizes-8: 8px;
--sizes-16: 16px;
--fontSizes-10: 10px;
--space-56: 56px;
--fontSizes-36: 36px;
--sizes-12: 12px;
--sizes-4: 4px;
--space-12: 12px;
--fontSizes-40: 40px;
--fontSizes-12: 12px;
--sizes-72: 72px;
--fontSizes-16: 16px;
--fontSizes-32: 32px;
--sizes-32: 32px;
--space-48: 48px;
--fontSizes-14: 14px;
--space-24: 24px;
```

### Typography

```css
--fonts-body: "InterVariable", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--fontWeights-700: 700;
--fonts-boostSans: -apple-system, BlinkMacSystemFont, sans-serif;
--fonts-sans: Marlin, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--fonts-exposure: "Exposure VAR", "Helvetica", sans-serif;
--fontWeights-500: 500;
--fonts-referralSans: -apple-system, BlinkMacSystemFont, sans-serif;
--fontWeights-800: 800;
--fonts-oracle: "ABC Oracle", "Helvetica", sans-serif;
--fontWeights-400: 400;
--fonts-boostsSoft: Marlin Soft Basic, -apple-system, BlinkMacSystemFont, sans-serif;
--fonts-cta: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--fonts-mono: ABC Favorit Mono, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
--fonts-referralCode: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--fonts-softSans: Marlin Soft SQ, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
--fontWeights-600: 600;
```

### Shadows

```css
--shadows-large: 0 30px 60px rgba(0, 0, 0, 0.12);
--shadows-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
--shadows-small: 0 5px 10px rgba(0, 0, 0, 0.12);
```

### Other

```css
--max-width: 1280px;
--navbar-height: 64px;
--mobile-cta-height: 56px;
--announcement-banner-height: 0px;
--announcement-banner-height-desktop: 0px;
--lineHeights-20: 20px;
--radii-12: 12px;
--lineHeights-48: 48px;
--radii-32: 32px;
--lineHeights-32: 32px;
--lineHeights-56: 56px;
--lineHeights-12: 12px;
--lineHeights-24: 24px;
--radii-4: 4px;
--radii-round: 9999px;
--radii-16: 16px;
--lineHeights-40: 40px;
--lineHeights-16: 16px;
--radii-8: 8px;
--radii-2: 2px;
```

### Dependencies

```css
--page-padding-left: --padding;
--page-padding-right: --padding;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Transitions & Animations

**Easing functions:** `[object Object]`

**Durations:** `0.15s`, `0.2s`, `0.1s`

### Common Transitions

```css
transition: all;
transition: transform 0.15s, background 0.15s;
transition: background 0.2s ease-in-out;
transition: transform 0.2s ease-in-out;
transition: transform 0.15s, box-shadow 0.15s ease-out;
transition: opacity 0.1s ease-out;
```

### Keyframe Animations

**scroll**
```css
@keyframes scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (7 instances)

```css
.button {
  background-color: rgb(255, 255, 255);
  color: rgb(39, 2, 194);
  font-size: 14px;
  font-weight: 600;
  padding-top: 8px;
  padding-right: 0px;
  border-radius: 10px;
}
```

### Links (49 instances)

```css
.link {
  color: rgb(255, 252, 236);
  font-size: 16px;
  font-weight: 700;
}
```

### Navigation (1 instances)

```css
.navigatio {
  color: rgb(0, 0, 0);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
}
```

### Footer (1 instances)

```css
.foote {
  background-color: rgb(49, 57, 251);
  color: rgb(255, 252, 236);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 16px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 3 instances, 2 variants

**Variant 1** (2 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(39, 2, 194);
  padding: 8px 0px 8px 0px;
  border-radius: 10px;
  border: 0px none rgb(39, 2, 194);
  font-size: 14px;
  font-weight: 600;
```

**Variant 2** (1 instance)

```css
  background: rgb(39, 2, 194);
  color: rgb(255, 255, 255);
  padding: 8px 0px 8px 0px;
  border-radius: 10px;
  border: 0px none rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 600;
```

## Layout System

**0 grid containers** and **62 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1344px | 32px |
| 1200px | 0px |
| 1400px | 0px |
| 1440px | 0px |

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 43x |
| column/nowrap | 19x |

**Gap values:** `10px`, `12px`, `16px`, `24px`, `32px`, `38.4px`, `6px`, `8px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 6 passing, 0 failing color pairs

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#2702c2` | `#ffffff` | 11.21:1 | AAA |
| `#ffffff` | `#2702c2` | 11.21:1 | AAA |

## Design System Score

**Overall: 87/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 50/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 7 font families — consider limiting to 2 (heading + body)
- 749 duplicate CSS declarations

## Z-Index Map

**5 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| dropdown | 100,100 | div.c.-.k.F.y.P.a.X. .c.-.k.F.y.P.a.X.-.i.h.Y.Z.i.F.n.-.c.s.s |
| sticky | 99,99 | div.c.-.k.F.y.P.a.X. .c.-.k.F.y.P.a.X.-.i.k.G.F.a.j.o.-.c.s.s |
| base | 0,3 | div.c.-.j.O.S.E.o.f, div.P.J.L.V. .P.J.L.V.-.i.h.S.F.y.g.h.-.c.s.s, div.P.J.L.V. .P.J.L.V.-.i.c.x.w.I.N.Z.-.c.s.s |

## SVG Icons

**16 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 2 |
| sm | 3 |
| md | 2 |
| lg | 2 |
| xl | 7 |

**Icon colors:** `#FFFCEA`, `#210784`, `#26069C`, `#2404AA`, `#F99`, `#FF5060`, `#0034FE`, `currentColor`, `white`, `rgb(39, 2, 194)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Marlin | self-hosted | 800 | normal |
| Marlin Soft Basic | self-hosted | 400 | normal, italic |
| Inter | self-hosted | 400, 500, 600, 700 | normal |
| InterVariable | self-hosted | 100 900 | normal |
| Sohne Breit | self-hosted | 400, 700 | normal |
| Space Mono | cdn | 400, 700 | normal |
| Sohne Breit Extrafett | self-hosted | 900 | normal |
| EB Garamond | self-hosted | 400 | normal |
| ABC Favorit Mono | self-hosted | 400, 500, 700 | italic, normal |
| Marlin Soft SQ | self-hosted | 400, 500, 700, 900 | normal, italic |
| ABC Oracle | self-hosted | 350, 400 | normal |
| Exposure VAR | self-hosted | 650, 700, 750 | normal |

**Google Fonts URL:** `https://fonts.googleapis.com/`

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| gallery | 2 | objectFit: contain, borderRadius: 0px, shape: square |
| thumbnail | 1 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 16:9 (2x), 1:1 (1x)

## Motion Language

**Feel:** smooth · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |

### Easing Families

- **ease-in-out** (9 uses) — `ease`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `scroll` | slide-x | transform | 2 |

## Component Anatomy

### button — 3 instances

**Slots:** label, icon
**Sizes:** large

## Brand Voice

**Tone:** friendly · **Pronoun:** you-only · **Headings:** Title Case (verbose)

### Top CTA Verbs

- **download** (3)

### Button Copy Patterns

- "download arc for mac" (2×)
- "download arc for windows" (1×)

### Sample Headings

> Arc is the Chrome  replacement I've been  waiting for.
> Arc is the Chrome replacement I've been waiting for.
> Arc is the Chrome  replacement I've been  waiting for.
> Arc is the Chrome replacement I've been waiting for.

## Page Intent

**Type:** `landing` (confidence 0.29)
**Description:** Experience a calmer, more personal internet in this browser designed for you. Let go of the clicks, the clutter, the distractions with the Arc browser.

Alternates: legal (0.4)

## Section Roles

Reading order (top→bottom): nav → testimonial → content → sidebar → testimonial → testimonial → content → content → footer → sidebar

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.9 |
| 1 | testimonial | Arc is the Chrome  replacement I've been  waiting for. | 0.8 |
| 2 | content | Arc is the Chrome  replacement I've been  waiting for. | 0.3 |
| 3 | sidebar | — | 0.4 |
| 4 | testimonial | — | 0.8 |
| 5 | testimonial | — | 0.8 |
| 6 | content | — | 0.3 |
| 7 | content | — | 0.3 |
| 8 | footer | — | 0.95 |
| 9 | sidebar | — | 0.4 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.286 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 22px |
| backdrop-filter in use | no |
| Gradients | 0 |

## Imagery Style

**Label:** `photography` (confidence 0.05)
**Counts:** total 3, svg 0, icon 0, screenshot-like 0, photo-like 0
**Dominant aspect:** landscape
**Radius profile on images:** square

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Marlin` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
