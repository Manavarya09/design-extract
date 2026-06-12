# Design Language: Just a moment...

> Extracted from `https://openai.com` on June 12, 2026
> 33 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#8e8ea0` | hsl(240, 9%, 59%) | 42 |
| `#000000` | hsl(0, 0%, 0%) | 24 |

### Text Colors

Text color palette: `#000000`, `#8e8ea0`

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#8e8ea0` | text, border | 42 |
| `#000000` | text, border | 24 |

## Typography

### Font Families

- **Arial** — used for all (26 elements)
- **Times** — used for body (7 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 24px | 1.5rem | 700 | normal | normal | h2 |
| 16px | 1rem | 400 | normal | normal | html, head, style, meta |
| 13.3333px | 0.8333rem | 400 | normal | normal | input |

### Heading Scale

```css
h2 { font-size: 24px; font-weight: 700; line-height: normal; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: normal; }
```

### Font Weights in Use

`400` (32x), `700` (1x)

## Spacing

| Token | Value | Rem |
|-------|-------|-----|
| spacing-8 | 8px | 0.5rem |
| spacing-32 | 32px | 2rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 5px | 1 |

## CSS Custom Properties

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
| md | 768px | min-width |

## Transitions & Animations

### Common Transitions

```css
transition: all;
```

### Keyframe Animations

**enlarge-appear**
```css
@keyframes enlarge-appear {
  0% { opacity: 0; transform: scale(0.75) rotate(-90deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Inputs (1 instances)

```css
.input {
  color: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  border-radius: 0px;
  font-size: 13.3333px;
  padding-top: 0px;
  padding-right: 0px;
}
```

## Layout System

**1 grid containers** and **1 flex containers** detected.

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 1x |

### Grid Templates

```css
grid-template-columns: 300px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| column/nowrap | 1x |

**Gap values:** `32px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 0 passing, 0 failing color pairs

## Design System Score

**Overall: 84/100 (Grade: B)**

| Category | Score |
|----------|-------|
| Color Discipline | 85/100 |
| Typography Consistency | 100/100 |
| Spacing System | 55/100 |
| Shadow Consistency | 85/100 |
| Border Radius Consistency | 100/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 50/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Clean elevation system, Consistent border radii, Strong accessibility compliance

**Issues:**
- No clear primary brand color detected
- No consistent spacing base unit detected — values appear arbitrary

## SVG Icons

**1 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xl | 1 |

**Icon colors:** `currentColor`

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `enlarge-appear` | reveal | opacity, transform | 1 |

## Page Intent

**Type:** `landing` (confidence 0.45)

## Material Language

**Label:** `flat` (confidence 0.55)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.056 |
| Shadow profile | none |
| Avg shadow blur | 0px |
| Max radius | 5px |
| backdrop-filter in use | no |
| Gradients | 0 |

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Arial` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
