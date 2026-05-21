# Design Language: Figma: The Collaborative Interface Design Tool

> Extracted from `https://figma.com` on May 21, 2026
> 1512 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#e4ff97` | rgb(228, 255, 151) | hsl(76, 100%, 80%) | 1 |
| Secondary | `#00b6ff` | rgb(0, 182, 255) | hsl(197, 100%, 50%) | 1 |
| Accent | `#c4baff` | rgb(196, 186, 255) | hsl(249, 100%, 86%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#000000` | hsl(0, 0%, 0%) | 2344 |
| `#ffffff` | hsl(0, 0%, 100%) | 667 |
| `#697485` | hsl(216, 12%, 47%) | 44 |
| `#e6e6e6` | hsl(0, 0%, 90%) | 2 |
| `#f3ffe3` | hsl(86, 100%, 95%) | 1 |

### Background Colors

Used on large-area elements: `#ffffff`, `#24cb71`, `#e6e6e6`, `#f3ffe3`, `#e2e2e2`, `#000000`, `#e4ff97`, `#00b6ff`, `#c4baff`, `#95b9ac`, `#ff7237`, `#cb9fd2`, `#ffc9c1`, `#721c1c`, `#c7f8fb`

### Text Colors

Text color palette: `#000000`, `#ffffff`, `#697485`, `#33dfdf`, `#b98e01`

### Gradients

```css
background-image: repeating-conic-gradient(rgb(51, 223, 223) 0deg, rgb(51, 223, 223) 18deg, rgba(0, 0, 0, 0) 18deg, rgba(0, 0, 0, 0) 30deg);
```

```css
background-image: repeating-conic-gradient(rgb(185, 142, 1) 0deg, rgb(185, 142, 1) 18deg, rgba(0, 0, 0, 0) 18deg, rgba(0, 0, 0, 0) 30deg);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#000000` | text, border, background | 2344 |
| `#ffffff` | background, text, border | 667 |
| `#697485` | text, border | 44 |
| `#33dfdf` | text, border | 6 |
| `#b98e01` | text, border | 6 |
| `#24cb71` | background | 2 |
| `#e6e6e6` | background | 2 |
| `#4d49fc` | background | 1 |
| `#f3ffe3` | background | 1 |
| `#e4ff97` | background | 1 |
| `#00b6ff` | background | 1 |
| `#c4baff` | background | 1 |
| `#95b9ac` | background | 1 |
| `#ff7237` | background | 1 |
| `#cb9fd2` | background | 1 |
| `#ffc9c1` | background | 1 |
| `#721c1c` | background | 1 |
| `#c7f8fb` | background | 1 |

## Typography

### Font Families

- **figmaSans** — used for all (1494 elements)
- **figmaMono** — used for all (18 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 64px | 4rem | 400 | 70.4px | -0.64px | h1, span |
| 44px | 2.75rem | 400 | 48.4px | -0.44px | span, h2, p |
| 24px | 1.5rem | 320 | 32.4px | -0.12px | p, a, span, h3 |
| 18px | 1.125rem | 330 | 25.2px | normal | p, span, ul, li |
| 16px | 1rem | 400 | 23.2px | normal | html, head, meta, link |
| 12px | 0.75rem | 400 | 12px | 0.6px | span |
| 0px | 0rem | 400 | 0px | normal | span, svg, path, div |

### Heading Scale

```css
h1 { font-size: 64px; font-weight: 400; line-height: 70.4px; }
h2 { font-size: 44px; font-weight: 400; line-height: 48.4px; }
h3 { font-size: 24px; font-weight: 320; line-height: 32.4px; }
h3 { font-size: 18px; font-weight: 330; line-height: 25.2px; }
h2 { font-size: 16px; font-weight: 400; line-height: 23.2px; }
```

### Body Text

```css
body { font-size: 18px; font-weight: 330; line-height: 25.2px; }
```

### Font Weights in Use

`400` (654x), `330` (627x), `320` (172x), `480` (19x), `540` (16x), `340` (15x), `450` (8x), `700` (1x)

## Spacing

**Base unit:** 4px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-16 | 16px | 1rem |
| spacing-24 | 24px | 1.5rem |
| spacing-27 | 27px | 1.6875rem |
| spacing-40 | 40px | 2.5rem |
| spacing-44 | 44px | 2.75rem |
| spacing-53 | 53px | 3.3125rem |
| spacing-60 | 60px | 3.75rem |
| spacing-64 | 64px | 4rem |
| spacing-80 | 80px | 5rem |
| spacing-107 | 107px | 6.6875rem |
| spacing-120 | 120px | 7.5rem |
| spacing-160 | 160px | 10rem |
| spacing-409 | 409px | 25.5625rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 2px | 15 |
| md | 8px | 11 |
| lg | 16px | 2 |
| full | 50px | 46 |

## Box Shadows

**sm (inset)** — blur: 0px
```css
box-shadow: rgb(0, 0, 0) 0px 0px 0px 1px inset;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px inset;
```

**xs** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 0px 0px;
```

**lg** — blur: 15px
```css
box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
```

**xl** — blur: 70px
```css
box-shadow: rgba(0, 0, 0, 0.1) 0px 24px 70px 0px;
```

## CSS Custom Properties

### Spacing

```css
--f-lego-block-padding: 5rem;
```

### Typography

```css
--f-font-whyte-variable: 'ABCWhytePlusVariable','ABCWhytePlusVariable Fallback',Whyte,sans-serif;
--f-font-sans: 'figmaSans','figmaSans Fallback',SF Pro Display,system-ui,helvetica,sans-serif;
--f-font-mono: 'figmaMono','figmaMono Fallback',SF Mono,menlo,monospace;
--f-cursor-text: text;
```

### Other

```css
--f-statsig-overlay: #FFFFFF;
--f-vh: 1vh;
--f-max-content-width: 1440px;
--f-columns: 1;
--f-gutter: 24px;
--f-col-width: calc(100vw - var(--f-gutter) * 2);
--f-cursor-default: default;
--f-cursor-pointer: pointer;
--f-cursor-grab: grab;
--f-cursor-grabbing: grabbing;
--scrollbar-width: 0rem;
```

### Dependencies

```css
--f-col-width: --f-gutter;
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
| 559px | 559px | max-width |
| 560px | 560px | min-width |
| md | 768px | min-width |
| lg | 960px | min-width |
| xl | 1280px | min-width |
| 1400px | 1400px | min-width |
| 1440px | 1440px | min-width |
| 1920px | 1920px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.16s`, `0.4s`, `0.25s`, `0.2s`, `0.1s`, `2s`, `0.8s`, `0.3s`, `0.5s`, `0.35s`, `0.15s`

### Common Transitions

```css
transition: all;
transition: border-radius 0.16s ease-out;
transition: translate 0.16s ease-out;
transition: opacity 0.16s ease-out;
transition: background 0.4s cubic-bezier(0.8, 0, 0.2, 1);
transition: transform 0.25s;
transition: transform 0.2s ease-out, opacity 0.1s ease-out;
transition: background 2s ease-in-out;
transition: opacity 0.8s ease-in-out;
transition: 0.3s;
```

### Keyframe Animations

**animation-6j0toc**
```css
@keyframes animation-6j0toc {
  0%, 100% { border-left-color: currentcolor; }
  50% { border-left-color: transparent; }
}
```

**animation-6j0toc**
```css
@keyframes animation-6j0toc {
  0%, 100% { border-left-color: currentcolor; }
  50% { border-left-color: transparent; }
}
```

**animation-jpvf7s**
```css
@keyframes animation-jpvf7s {
  0% { stroke-dashoffset: 106.814; }
  100% { stroke-dashoffset: 0; }
}
```

**animation-jpvf7s**
```css
@keyframes animation-jpvf7s {
  0% { stroke-dashoffset: 106.814; }
  100% { stroke-dashoffset: 0; }
}
```

**animation-zsk7zs**
```css
@keyframes animation-zsk7zs {
  0% { transform: translateX(0px); }
  100% { transform: translateX(-100%); }
}
```

**animation-zsk7zs**
```css
@keyframes animation-zsk7zs {
  0% { transform: translateX(0px); }
  100% { transform: translateX(-100%); }
}
```

**animation-yh21v4**
```css
@keyframes animation-yh21v4 {
  0% { rotate: 0deg; }
  100% { rotate: 360deg; }
}
```

**animation-yh21v4**
```css
@keyframes animation-yh21v4 {
  0% { rotate: 0deg; }
  100% { rotate: 360deg; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (24 instances)

```css
.button {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 400;
  padding-top: 8px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Cards (2 instances)

```css
.card {
  background-color: rgb(230, 230, 230);
  border-radius: 18px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 24px 70px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (189 instances)

```css
.link {
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 330;
}
```

### Navigation (65 instances)

```css
.navigatio {
  color: rgb(0, 0, 0);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: relative;
}
```

### Footer (1 instances)

```css
.foote {
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  padding-top: 120px;
  padding-bottom: 120px;
  font-size: 16px;
}
```

### Modals (1 instances)

```css
.modal {
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  padding-top: 46px;
  padding-right: 34px;
  max-width: 90%;
}
```

### Dropdowns (4 instances)

```css
.dropdown {
  border-radius: 0px;
  border-color: rgb(0, 0, 0);
  padding-top: 8px;
}
```

### Badges (3 instances)

```css
.badge {
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 330;
  padding-top: 8px;
  padding-right: 8px;
  border-radius: 0px;
}
```

### Tabs (8 instances)

```css
.tab {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 480;
  padding-top: 8px;
  padding-right: 18px;
  border-color: rgb(0, 0, 0);
  border-radius: 50px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 5 instances, 2 variants

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 4px 4px 4px 4px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (2 instances)

```css
  background: rgba(255, 255, 255, 0.16);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 8px 8px 8px 8px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 330;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 8 instances, 2 variants

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0.08);
  color: rgb(0, 0, 0);
  padding: 8px 18px 10px 18px;
  border-radius: 50px;
  border: 0px none rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 480;
```

**Variant 2** (7 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  padding: 8px 18px 10px 18px;
  border-radius: 50px;
  border: 0px none rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 480;
```

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 330;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 8px 8px 8px 8px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**23 grid containers** and **154 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 2200px | 0px |
| 1013.33px | 0px |
| 640px | 0px |
| 100% | 0px |
| 908px | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 3-column | 12x |
| 2-column | 4x |
| 4-column | 1x |
| 5-column | 1x |

### Grid Templates

```css
grid-template-columns: 560px 560px;
gap: 64px 53.3333px;
grid-template-columns: 346.656px 160px 160px 160px 160px;
gap: normal 53.3333px;
grid-template-columns: 480px 640px;
gap: 106.667px;
grid-template-columns: 275.328px 275.328px 275.328px 275.344px;
gap: 64px 24px;
grid-template-columns: 746.656px 320px;
gap: 106.667px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 97x |
| column/nowrap | 52x |
| row/wrap | 5x |

**Gap values:** `106.667px`, `12px`, `16px`, `16px 24px`, `24px`, `24px 32px`, `32px`, `48px 53.3333px`, `60px`, `64px 24px`, `64px 53.3333px`, `6px`, `8px`, `normal 53.3333px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 7 passing, 0 failing color pairs

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#000000` | `#ffffff` | 21:1 | AAA |

## Design System Score

**Overall: 88/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 92/100 |
| Typography Consistency | 85/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 8 font weights in use — consider standardizing to 3 (regular, medium, bold)
- 216 !important rules — prefer specificity over overrides
- 94% of CSS is unused — consider purging
- 41308 duplicate CSS declarations

## Gradients

**2 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| repeating-conic | — | 4 | bold |
| repeating-conic | — | 4 | bold |

```css
background: repeating-conic-gradient(rgb(51, 223, 223) 0deg, rgb(51, 223, 223) 18deg, rgba(0, 0, 0, 0) 18deg, rgba(0, 0, 0, 0) 30deg);
background: repeating-conic-gradient(rgb(185, 142, 1) 0deg, rgb(185, 142, 1) 18deg, rgba(0, 0, 0, 0) 18deg, rgba(0, 0, 0, 0) 30deg);
```

## Z-Index Map

**11 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| sticky | 10,40 | div.f.i.g.-.b.p.n.b.m.5, ul.f.i.g.-.c.6.z.2.l.l, div.a.n.n.o.u.n.c.e.m.e.n.t.-.b.a.n.n.e.r. .f.i.g.-.j.g.8.k.j.x |
| base | -999,2 | a.f.i.g.-.1.1.b.b.q.h.e, img.f.i.g.-.1.3.4.u.g.e.r, img.f.i.g.-.m.k.3.7.n.o |

## SVG Icons

**16 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| sm | 2 |
| md | 9 |
| lg | 2 |
| xl | 3 |

**Icon colors:** `currentColor`, `#24CB71`, `#FF7237`, `#00B6FF`, `#FF3737`, `#874FFF`, `#000`, `var(--f-text-color, #000000)`, `rgb(0, 0, 0)`, `#fff`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| figmaSans | self-hosted | 320 | normal |
| figmaMono | self-hosted | 400 | normal |
| ABCWhytePlusVariable | self-hosted | 400, normal | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 79 | objectFit: fill, borderRadius: 0px, shape: square |
| avatar | 19 | objectFit: fill, borderRadius: 50%, shape: circular |
| general | 9 | objectFit: fill, borderRadius: 0px, shape: square |
| gallery | 3 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (37x), 4:3 (13x), 16:9 (9x), 3.72:1 (5x), 3.23:1 (4x), 8.11:1 (4x), 5.11:1 (4x), 3.89:1 (4x)

## Motion Language

**Feel:** springy · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `160ms` | 160 |
| `md` | `300ms` | 300 |
| `lg` | `500ms` | 500 |
| `xl` | `800ms` | 800 |
| `xxl` | `2s` | 2000 |

### Easing Families

- **ease-in-out** (97 uses) — `ease`
- **custom** (1 uses) — `cubic-bezier(0.8, 0, 0.2, 1)`
- **spring** (6 uses) — `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Spring / Overshoot Easings

- `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `animation-jpvf7s` | custom | stroke-dashoffset | 1 |
| `animation-jpvf7s` | custom | stroke-dashoffset | 1 |
| `animation-zsk7zs` | slide-x | transform | 4 |
| `animation-zsk7zs` | slide-x | transform | 4 |
| `animation-yh21v4` | custom | rotate | 2 |
| `animation-yh21v4` | custom | rotate | 2 |

## Component Anatomy

### button — 22 instances

**Slots:** label, icon

## Brand Voice

**Tone:** friendly · **Pronoun:** you-only · **Headings:** Sentence case (tight)

### Top CTA Verbs

- **publish** (2)
- **products** (1)
- **solutions** (1)
- **community** (1)
- **resources** (1)
- **prompt** (1)
- **design** (1)
- **draw** (1)

### Button Copy Patterns

- "products" (1×)
- "solutions" (1×)
- "community" (1×)
- "resources" (1×)
- "prompt" (1×)
- "design" (1×)
- "draw" (1×)
- "build" (1×)
- "publish" (1×)
- "promote" (1×)

### Sample Headings

> Use cases
> Roles
> Organizations
> Get started
> Learn
> Use cases
> Roles
> Organizations
> Get started
> Learn

## Page Intent

**Type:** `landing` (confidence 0.29)
**Description:** Figma is the leading collaborative design platform for building meaningful products. Design, prototype, and build products faster—while gathering feedback all in one place.

Alternates: legal (0.4), blog-post (0.35)

## Section Roles

Reading order (top→bottom): cta → nav → nav → nav → nav → nav → nav → nav → testimonial → hero → content → hero → testimonial → content → content → testimonial → testimonial → content → pricing → content → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | cta | Use cases | 0.75 |
| 1 | nav | Use cases | 0.9 |
| 2 | nav | — | 0.9 |
| 3 | nav | Use cases | 0.9 |
| 4 | nav | — | 0.9 |
| 5 | nav | Get started | 0.9 |
| 6 | nav | — | 0.4 |
| 7 | nav | — | 0.9 |
| 8 | testimonial | Make anything possible, all in Figma | 0.8 |
| 9 | hero | Make anything possible, all in Figma | 0.85 |
| 10 | content | — | 0.3 |
| 11 | hero | Prompt, code, and design from first idea to final product | 0.4 |
| 12 | testimonial | — | 0.8 |
| 13 | content | Bring everyone together with systems that scale | 0.3 |
| 14 | content | Share libraries and design systems across teams. | 0.3 |
| 15 | testimonial | Ship products, any way you want | 0.8 |
| 16 | testimonial | — | 0.8 |
| 17 | content | Explore what people are making | 0.3 |
| 18 | pricing | — | 0.4 |
| 19 | content | Start with a template. Make just about anything. | 0.3 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.429 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 50px |
| backdrop-filter in use | no |
| Gradients | 2 |

## Imagery Style

**Label:** `mixed` (confidence 0)
**Counts:** total 110, svg 0, icon 35, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** soft

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `figmaSans` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
