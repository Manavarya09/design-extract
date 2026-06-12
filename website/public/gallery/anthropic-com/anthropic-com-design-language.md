# Design Language: Home \ Anthropic

> Extracted from `https://anthropic.com` on June 12, 2026
> 1186 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#d97757` | rgb(217, 119, 87) | hsl(15, 63%, 60%) | 3 |
| Secondary | `#faf9f5` | rgb(250, 249, 245) | hsl(48, 33%, 97%) | 444 |
| Accent | `#f5e3c7` | rgb(245, 227, 199) | hsl(37, 70%, 87%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#141413` | hsl(60, 3%, 8%) | 1264 |
| `#b0aea5` | hsl(49, 7%, 67%) | 395 |
| `#000000` | hsl(0, 0%, 0%) | 132 |
| `#87867f` | hsl(53, 3%, 51%) | 100 |
| `#f0eee6` | hsl(48, 25%, 92%) | 19 |
| `#3d3d3a` | hsl(60, 3%, 23%) | 3 |
| `#e8e6dc` | hsl(50, 21%, 89%) | 2 |
| `#a1a0a0` | hsl(0, 1%, 63%) | 2 |

### Background Colors

Used on large-area elements: `#faf9f5`, `#f0eee6`, `#f5e3c7`, `#e3dacc`, `#141413`

### Text Colors

Text color palette: `#000000`, `#141413`, `#87867f`, `#faf9f5`, `#b0aea5`, `#ffffff`, `#e8e6dc`, `#a1a0a0`, `#f0eee6`

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#141413` | text, border, background | 1264 |
| `#faf9f5` | background, text, border | 444 |
| `#b0aea5` | border, text | 395 |
| `#000000` | text, border | 132 |
| `#87867f` | text, border, background | 100 |
| `#f0eee6` | background, border, text | 19 |
| `#e3dacc` | background | 3 |
| `#d97757` | background | 3 |
| `#3d3d3a` | background | 3 |
| `#c6613f` | background | 2 |
| `#e8e6dc` | text, border | 2 |
| `#a1a0a0` | text, border | 2 |
| `#f5e3c7` | background | 1 |

## Typography

### Font Families

- **Anthropic Sans** — used for all (584 elements)
- **Anthropic Serif** — used for all (553 elements)
- **Anthropic Mono** — used for body (6 elements)
- **Times** — used for body (1 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 64.6857px | 4.0429rem | 400 | 71.1543px | normal | h2 |
| 57.7306px | 3.6082rem | 700 | 63.5037px | normal | h1, span, a |
| 24px | 1.5rem | 400 | 33.6px | normal | div, p, h2, h3 |
| 20px | 1.25rem | 400 | 28px | normal | body, div, main, style |
| 18px | 1.125rem | 600 | 25.2px | normal | a, div, p, br |
| 16px | 1rem | 400 | normal | normal | html, head, style, meta |
| 15px | 0.9375rem | 400 | 21px | -0.0375px | div |
| 14px | 0.875rem | 500 | 18.2px | normal | div, p, a |
| 12px | 0.75rem | 400 | 16.8px | normal | footer, h2, div, nav |

### Heading Scale

```css
h2 { font-size: 64.6857px; font-weight: 400; line-height: 71.1543px; }
h1 { font-size: 57.7306px; font-weight: 700; line-height: 63.5037px; }
h2 { font-size: 24px; font-weight: 400; line-height: 33.6px; }
h3 { font-size: 20px; font-weight: 400; line-height: 28px; }
h3 { font-size: 16px; font-weight: 400; line-height: normal; }
h2 { font-size: 12px; font-weight: 400; line-height: 16.8px; }
```

### Body Text

```css
body { font-size: 12px; font-weight: 400; line-height: 16.8px; }
```

### Font Weights in Use

`400` (1074x), `500` (62x), `700` (26x), `600` (24x)

## Spacing

| Token | Value | Rem |
|-------|-------|-----|
| spacing-2 | 2px | 0.125rem |
| spacing-21 | 21px | 1.3125rem |
| spacing-31 | 31px | 1.9375rem |
| spacing-45 | 45px | 2.8125rem |
| spacing-53 | 53px | 3.3125rem |
| spacing-58 | 58px | 3.625rem |
| spacing-67 | 67px | 4.1875rem |
| spacing-84 | 84px | 5.25rem |
| spacing-100 | 100px | 6.25rem |
| spacing-142 | 142px | 8.875rem |
| spacing-149 | 149px | 9.3125rem |
| spacing-165 | 165px | 10.3125rem |
| spacing-214 | 214px | 13.375rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| md | 8px | 49 |
| lg | 12px | 4 |
| lg | 16px | 6 |
| xl | 24px | 9 |
| full | 1600px | 3 |

## Box Shadows

**sm** — blur: 2px
```css
box-shadow: rgba(0, 0, 0, 0.01) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 4px 0px, rgba(0, 0, 0, 0.04) 0px 16px 24px 0px;
```

## CSS Custom Properties

### Colors

```css
--_color-theme---background: var(--swatch--ivory-light);
--_color-theme---text: var(--swatch--slate-dark);
--border-width--main: .0625rem;
--_color-theme---link--text-hover: var(--swatch--slate-light);
--_color-theme---border: var(--swatch--slate-faded-10);
--_color-theme---background-secondary: var(--swatch--ivory-medium);
--_color-theme---text-agate: var(--swatch--cloud-medium);
--_button-style---border: var(--_color-theme---button-primary--border);
--_button-style---border-hover: var(--_color-theme---button-primary--border-hover);
--_color-theme---background-secondary-hover: var(--swatch--ivory-dark);
--swatch--accent: #c6613f;
--_color-theme---button-primary--text: var(--swatch--ivory-light);
--_color-theme---button-primary--border: var(--swatch--slate-dark);
--_color-theme---card: var(--swatch--white);
--_color-theme---card-faded: var(--swatch--slate-faded-10);
--_color-theme---card-faded-hover: var(--swatch--slate-faded-20);
--_color-theme---link--text: var(--swatch--slate-dark);
--_color-theme---border-hover: var(--swatch--slate-faded-20);
--_color-theme---link--text-active: var(--swatch--slate-dark);
--_color-theme---button-primary--background: var(--swatch--slate-dark);
--_color-theme---button-primary--background-hover: var(--swatch--slate-medium);
--_color-theme---button-primary--border-hover: var(--swatch--slate-medium);
--_color-theme---button-primary--text-hover: var(--swatch--ivory-light);
--_color-theme---button-secondary--background: var(--swatch--transparent);
--_color-theme---button-secondary--border: var(--swatch--slate-dark);
--_color-theme---button-secondary--text: var(--swatch--slate-dark);
--_color-theme---button-secondary--background-hover: var(--swatch--slate-dark);
--_color-theme---button-secondary--border-hover: var(--swatch--slate-dark);
--_color-theme---button-secondary--text-hover: var(--swatch--ivory-light);
--_color-theme---button-tertiary--background: var(--swatch--transparent);
--_color-theme---button-tertiary--border: var(--_color-theme---border);
--_color-theme---button-tertiary--text: var(--_color-theme---text);
--_color-theme---button-tertiary--background-hover: var(--swatch--transparent);
--_color-theme---button-tertiary--border-hover: var(--_color-theme---text);
--_color-theme---button-tertiary--text-hover: var(--_color-theme---text);
```

### Spacing

```css
--_text-style---font-size: var(--_typography---font-size--paragraph-m);
--_text-style---letter-spacing: var(--_typography---letter-spacing--0em);
--_text-style---margin-bottom: var(--_spacing---space--4);
--_text-style---margin-top: var(--_spacing---space--4);
--_spacing---space--6: var(--size--2rem);
--size--1-5rem: 1.5rem;
--size--0-5rem: .5rem;
--size--1rem: 1rem;
--size--2rem: clamp(1.75rem, 1.6734693877551021rem + 0.326530612244898vw, 2rem);
--_spacing---space--8: var(--size--3rem);
--_spacing---space--4: var(--size--1rem);
--_spacing---gap--gap-xl: var(--_spacing---space--9);
--size--0rem: 0rem;
--_spacing---space--5: var(--size--1-5rem);
--_spacing---space--1: var(--size--0-25rem);
--_spacing---space--2: var(--size--0-5rem);
--_spacing---space--3: var(--size--0-75rem);
--_spacing---space--7: var(--size--2-5rem);
--size--7-5rem: clamp(4.25rem, 3.2551020408163267rem + 4.244897959183674vw, 7.5rem);
--size--0-25rem: .25rem;
--_spacing---space--9: var(--size--4rem);
--size--1-25rem: 1.25rem;
--_spacing---gap--gap-xs: var(--_spacing---space--2);
--size--0-375rem: .375rem;
--size--0-75rem: .75rem;
--_typography---letter-spacing--0-005em: -.005em;
--_typography---font-size--paragraph-m: var(--size--1-25rem);
--_typography---font-size--paragraph-s: var(--size--1-125rem);
--size--3rem: clamp(2.25rem, 2.020408163265306rem + 0.9795918367346939vw, 3rem);
--site--margin: clamp(2rem, 1.0816326530612246rem + 3.9183673469387754vw, 5rem);
--_spacing---space--11: var(--size--6rem);
--size--10rem: clamp(5.5rem, 4.122448979591836rem + 5.877551020408163vw, 10rem);
--_typography---font-size--detail-m: var(--size--1rem);
--size--0-125rem: .125rem;
--_spacing---section-space--none: var(--size--0rem);
--_spacing---section-space--small: var(--size--4rem);
--_spacing---section-space--main: var(--size--10rem);
--_spacing---section-space--large: var(--size--14rem);
--_spacing---section-space--page-top: var(--size--12rem);
--_spacing---section-space--extra-small: var(--size--2rem);
--size--6rem: clamp(3.5rem, 2.7346938775510203rem + 3.2653061224489797vw, 6rem);
--_spacing---gap--gap-m: var(--_spacing---space--5);
--_typography---font-size--paragraph-xs: var(--size--1rem);
--_spacing---gap--gap-s: var(--_spacing---space--4);
--_typography---font-size--display-s: var(--size--1-5rem);
--_spacing---space--10: var(--size--5rem);
--_typography---font-size--detail-s: var(--size--0-875rem);
--_typography---font-size--detail-xs: var(--size--0-75rem);
--_typography---font-size--detail-xl: var(--size--1-25rem);
--_typography---font-size--detail-l: var(--size--1-125rem);
--_spacing---gap--gap-l: var(--_spacing---space--8);
--_spacing---gap--gap-l<deleted|variable-bb2d43fb-349e-c28e-e594-6daad1d2702c>: var(--_spacing---space--8);
--size--2-5rem: clamp(2rem, 1.846938775510204rem + 0.653061224489796vw, 2.5rem);
--_spacing---gap--gap-s<deleted|variable-9c57745c-53fa-fe77-7b3e-da81e97c1c35>: var(--_spacing---space--4);
--column-margin--1: calc(var(--column-width--plus-gutter) * 1);
--column-margin--0: 0px;
--size--4rem: clamp(2.5rem, 2.0408163265306123rem + 1.9591836734693877vw, 4rem);
--size--8rem: clamp(4.5rem, 3.4285714285714284rem + 4.571428571428571vw, 8rem);
--size--16rem: 16rem;
--size--0-875rem: .875rem;
--column-margin--12: calc(var(--column-width--plus-gutter) * 12);
--_spacing---section-space--medium: var(--size--6rem);
--_spacing---space--12: var(--size--10rem);
--size--1-125rem: 1.125rem;
--size--3-5rem: clamp(2.375rem, 2.0306122448979593rem + 1.4693877551020407vw, 3.5rem);
--size--4-5rem: clamp(2.75rem, 2.2142857142857144rem + 2.2857142857142856vw, 4.5rem);
--size--5rem: clamp(3rem, 2.3877551020408165rem + 2.612244897959184vw, 5rem);
--size--5-5rem: clamp(3.25rem, 2.561224489795918rem + 2.9387755102040813vw, 5.5rem);
--size--6-5rem: clamp(3.75rem, 2.9081632653061225rem + 3.5918367346938775vw, 6.5rem);
--size--7rem: clamp(4rem, 3.0816326530612246rem + 3.9183673469387754vw, 7rem);
--size--8-5rem: clamp(4.75rem, 3.6020408163265305rem + 4.8979591836734695vw, 8.5rem);
--size--9rem: clamp(5rem, 3.7755102040816326rem + 5.224489795918368vw, 9rem);
--size--9-5rem: clamp(5.25rem, 3.9489795918367347rem + 5.551020408163265vw, 9.5rem);
--size--11rem: clamp(5.75rem, 4.142857142857143rem + 6.857142857142858vw, 11rem);
--size--12rem: clamp(6rem, 4.163265306122449rem + 7.836734693877551vw, 12rem);
--size--13rem: clamp(6.5rem, 4.510204081632653rem + 8.489795918367347vw, 13rem);
--size--14rem: clamp(7rem, 4.857142857142857rem + 9.142857142857142vw, 14rem);
--size--15rem: clamp(7.5rem, 5.204081632653061rem + 9.795918367346939vw, 15rem);
--_typography---letter-spacing--0-02em: -.02em;
--_typography---letter-spacing--0em: 0em;
--_typography---font-size--display-xs: var(--size--1-25rem);
--_typography---font-size--display-m: var(--size--2rem);
--_typography---font-size--display-l: var(--size--3rem);
--_typography---font-size--display-xl: var(--size--4rem);
--_typography---font-size--display-xxl: var(--size--4-5rem);
--_typography---font-size--display-xxxl: var(--size--6rem);
--_typography---font-size--paragraph-l: var(--size--1-5rem);
--_typography---font-size--monospace: var(--size--1-125rem);
--column-margin--2: calc(var(--column-width--plus-gutter) * 2);
--column-margin--3: calc(var(--column-width--plus-gutter) * 3);
--column-margin--4: calc(var(--column-width--plus-gutter) * 4);
--column-margin--5: calc(var(--column-width--plus-gutter) * 5);
--column-margin--6: calc(var(--column-width--plus-gutter) * 6);
--column-margin--7: calc(var(--column-width--plus-gutter) * 7);
--column-margin--8: calc(var(--column-width--plus-gutter) * 8);
--column-margin--9: calc(var(--column-width--plus-gutter) * 9);
--column-margin--10: calc(var(--column-width--plus-gutter) * 10);
--column-margin--11: calc(var(--column-width--plus-gutter) * 11);
---font-size--display-xs: clamp(1.125rem, 1.086734693877551rem + 0.163265306122449vw, 1.25rem);
---font-size--display-s: clamp(1.25rem, 1.1734693877551021rem + 0.326530612244898vw, 1.5rem);
---font-size--display-m: clamp(1.75rem, 1.6734693877551021rem + 0.326530612244898vw, 2rem);
---font-size--display-l: clamp(2rem, 1.6938775510204083rem + 1.306122448979592vw, 3rem);
---font-size--display-xl: clamp(2.5rem, 2.0408163265306123rem + 1.9591836734693877vw, 4rem);
---font-size--display-xxl: clamp(3rem, 2.3877551020408165rem + 2.612244897959184vw, 5rem);
---font-size--paragraph-s: clamp(1rem, 0.9617346938775511rem + 0.163265306122449vw, 1.125rem);
---font-size--paragraph-m: clamp(1.125rem, 1.086734693877551rem + 0.163265306122449vw, 1.25rem);
---font-size--paragraph-l: clamp(1.375rem, 1.336734693877551rem + 0.163265306122449vw, 1.5rem);
---font-size--detail-xs: clamp(1.375rem, 1.336734693877551rem + 0.163265306122449vw, 1.5rem);
---font-size--monospace: clamp(0.875rem, 0.5306122448979592rem + 1.4693877551020407vw, 2rem);
--nav--hamburger-gap: 0.4rem;
```

### Typography

```css
--_text-style---font-family: var(--_typography---font--paragraph-text);
--_text-style---line-height: var(--_typography---line-height--1-4);
--_text-style---font-weight: var(--_typography---font--paragraph-regular);
--_typography---font--paragraph-medium: 500;
--_typography---font--display-serif-family: "Anthropic Serif",Georgia,sans-serif;
--_typography---font--display-sans: "Anthropic Sans",Arial,sans-serif;
--_typography---font--display-sans-medium: 500;
--_typography---font--display-sans-semibold: 600;
--_typography---font--display-serif-semibold: 600;
--_typography---font--detail: "Anthropic Sans",Arial,sans-serif;
--_typography---font--display-sans-bold: 700;
--_button-style---text: var(--_color-theme---button-primary--text);
--_button-style---text-hover: var(--_color-theme---button-primary--text-hover);
--_typography---font--mono-medium: 500;
--swatch--brand-text: var(--swatch--slate-dark);
--_typography---font--detail-regular: 400;
--_typography---font--detail-medium: 500;
--_typography---font--paragraph-text: "Anthropic Serif",Georgia,sans-serif;
--_typography---font--mono: "Anthropic Mono",Arial,sans-serif;
--_typography---line-height--1: 1;
--_typography---font--display-serif-regular: 400;
--_text-style---text-transform: var(--_typography---text-transform--none);
--_text-style---trim-top: var(--_typography---font--paragraph-trim-top);
--_text-style---trim-bottom: var(--_typography---font--paragraph-trim-bottom);
--_alignment---text: var(--align--text-left);
--_typography---font--display-sans-trim-top: .34em;
--_typography---font--display-sans-trim-bottom: .4em;
--_typography---font--display-serif-trim-top: .48em;
--_typography---font--display-serif-trim-bottom: .3em;
--_typography---font--detail-trim-top: .34em;
--_typography---font--detail-trim-bottom: .4em;
--_typography---font--paragraph-trim-top: .44em;
--_typography---font--paragraph-trim-bottom: .27em;
--_typography---font--paragraph-regular: 400;
--_typography---font--mono-trim-top: .19em;
--_typography---font--mono-trim-bottom: .33em;
--_typography---font--mono-regular: 400;
--_typography---line-height--1-05: 1.05;
--_typography---line-height--1-1: 1.1;
--_typography---line-height--1-3: 1.3;
--_typography---line-height--1-4: 1.4;
--_typography---line-height--1-5: 1.5;
--align--text-left: left;
--align--text-center: center;
--align--text-right: right;
--_typography---text-transform--none: none;
--_typography---text-transform--uppercase: uppercase;
--_typography---text-transform--capitalize: 0px;
--_typography---text-transform--lowercase: lowercase;
--_typography---text-transform--captialize: capitalize;
```

### Radii

```css
--radius--large: var(--size--1rem);
--radius--main: var(--size--0-5rem);
--radius--small: var(--size--0-25rem);
--radius--round: 100vw;
```

### Other

```css
--container--main: calc(var(--site--max-width) - var(--site--margin) * 2);
--container--small: calc(var(--column-width--plus-gutter) * (var(--site--column-count) - 4) - var(--site--gutter));
--container--full: calc(100% - 4rem);
--site--gutter: var(--_spacing---space--6);
--swatch--clay: #d97757;
--swatch--slate-dark: #141413;
--swatch--white: white;
--column-width--4: calc(var(--column-width--plus-gutter) * 4 - var(--site--gutter));
--column-width--8: calc(var(--column-width--plus-gutter) * 8 - var(--site--gutter));
--column-width--12: calc(var(--column-width--plus-gutter) * 12 - var(--site--gutter));
--swatch--transparent: transparent;
--_button-style---background: var(--_color-theme---button-primary--background);
--_button-style---background-hover: var(--_color-theme---button-primary--background-hover);
--swatch--ivory-dark: #e8e6dc;
--swatch--slate-faded-10: #1414131a;
--swatch--ivory-medium: #f0eee6;
--swatch--olive: #788c5d;
--focus--offset-inner: -.125rem;
--swatch--ivory-light: #faf9f5;
--swatch--slate-light: #5e5d59;
--swatch--oat: #e3dacc;
--swatch--cactus: #bcd1ca;
--swatch--sky: #6a9bcc;
--swatch--heather: #cbcadb;
--swatch--fig: #c46686;
--swatch--coral: #ebcece;
--column-width--3: calc(var(--column-width--plus-gutter) * 3 - var(--site--gutter));
--swatch--slate-medium: #3d3d3a;
--swatch--cloud-medium: #b0aea5;
--swatch--cloud-light: #d1cfc5;
--swatch--cloud-dark: #87867f;
--swatch--manilla: #ebdbbc;
--swatch--kraft: #d4a27f;
--column-width--6: calc(var(--column-width--plus-gutter) * 6 - var(--site--gutter));
--column-width--10: calc(var(--column-width--plus-gutter) * 10 - var(--site--gutter));
--swatch--slate-faded-20: #14141333;
--column-width--11: calc(var(--column-width--plus-gutter) * 11 - var(--site--gutter));
--_alignment---flex: var(--align--flex-start);
--site--width: 89.5rem;
--site--column-count: 12;
--focus--width: .125rem;
--focus--offset-outer: .25rem;
--swatch--ivory-faded-10: #faf9f51a;
--swatch--ivory-faded-20: #faf9f533;
--column-width--1: calc((var(--container--main) - var(--site--gutter-total)) / var(--site--column-count));
--column-width--2: calc(var(--column-width--plus-gutter) * 2 - var(--site--gutter));
--column-width--5: calc(var(--column-width--plus-gutter) * 5 - var(--site--gutter));
--column-width--7: calc(var(--column-width--plus-gutter) * 7 - var(--site--gutter));
--column-width--9: calc(var(--column-width--plus-gutter) * 9 - var(--site--gutter));
--align--flex-start: flex-start;
--align--flex-center: center;
--align--flex-end: flex-end;
--site--max-width: min(var(--site--width), 100vw);
--site--gutter-total: calc(var(--site--gutter) * (var(--site--column-count) - 1));
--column-width--plus-gutter: calc(var(--column-width--1) + var(--site--gutter));
--breakout-start: [full-start] minmax(0, 1fr) [content-start];
--breakout-end: [content-end] minmax(0, 1fr) [full-end];
--grid-breakout-single: var(--breakout-start) minmax(0, var(--container--main)) var(--breakout-end);
--grid-breakout: var(--breakout-start) repeat(var(--site--column-count), minmax(0, var(--column-width--1))) var(--breakout-end);
--grid-main: repeat(var(--site--column-count), minmax(0, 1fr));
--grid-1: repeat(1, minmax(0, 1fr));
--grid-2: repeat(2, minmax(0, 1fr));
--grid-3: repeat(3, minmax(0, 1fr));
--grid-4: repeat(4, minmax(0, 1fr));
--grid-5: repeat(5, minmax(0, 1fr));
--grid-6: repeat(6, minmax(0, 1fr));
--grid-7: repeat(7, minmax(0, 1fr));
--grid-8: repeat(8, minmax(0, 1fr));
--grid-9: repeat(9, minmax(0, 1fr));
--grid-10: repeat(10, minmax(0, 1fr));
--grid-11: repeat(11, minmax(0, 1fr));
--grid-12: repeat(12, minmax(0, 1fr));
--nav--height: 4.25rem;
--nav--banner-height: 2.75rem;
--nav--height-total: var(--nav--height);
--nav--icon-thickness: var(--border-width--main);
--nav--hamburger-thickness: var(--nav--icon-thickness);
--nav--hamburger-rotate: 45;
--nav--menu-open-duration: 400ms;
--nav--menu-close-duration: 400ms;
--nav--dropdown-duration: 200ms;
--nav--dropdown-open-duration: 200ms;
--nav--dropdown-delay: 0ms;
```

### Dependencies

```css
--_color-theme---background: --swatch--ivory-light;
--_text-style---font-family: --_typography---font--paragraph-text;
--_color-theme---text: --swatch--slate-dark;
--_text-style---font-size: --_typography---font-size--paragraph-m;
--_text-style---line-height: --_typography---line-height--1-4;
--_text-style---font-weight: --_typography---font--paragraph-regular;
--_text-style---letter-spacing: --_typography---letter-spacing--0em;
--_color-theme---link--text-hover: --swatch--slate-light;
--_text-style---margin-bottom: --_spacing---space--4;
--_text-style---margin-top: --_spacing---space--4;
--_spacing---space--6: --size--2rem;
--_spacing---space--8: --size--3rem;
--radius--large: --size--1rem;
--radius--main: --size--0-5rem;
--container--main: --site--max-width,--site--margin;
--container--small: --column-width--plus-gutter,--site--column-count,--site--gutter;
--radius--small: --size--0-25rem;
--_spacing---space--4: --size--1rem;
--site--gutter: --_spacing---space--6;
--_spacing---gap--gap-xl: --_spacing---space--9;
--_spacing---space--5: --size--1-5rem;
--_spacing---space--1: --size--0-25rem;
--_spacing---space--2: --size--0-5rem;
--_spacing---space--3: --size--0-75rem;
--_spacing---space--7: --size--2-5rem;
--_color-theme---border: --swatch--slate-faded-10;
--_spacing---space--9: --size--4rem;
--_color-theme---background-secondary: --swatch--ivory-medium;
--_spacing---gap--gap-xs: --_spacing---space--2;
--_color-theme---text-agate: --swatch--cloud-medium;
--column-width--4: --column-width--plus-gutter,--site--gutter;
--column-width--8: --column-width--plus-gutter,--site--gutter;
--column-width--12: --column-width--plus-gutter,--site--gutter;
--_button-style---border: --_color-theme---button-primary--border;
--_button-style---background: --_color-theme---button-primary--background;
--_button-style---text: --_color-theme---button-primary--text;
--_button-style---border-hover: --_color-theme---button-primary--border-hover;
--_button-style---background-hover: --_color-theme---button-primary--background-hover;
--_button-style---text-hover: --_color-theme---button-primary--text-hover;
--_color-theme---background-secondary-hover: --swatch--ivory-dark;
--swatch--brand-text: --swatch--slate-dark;
--_typography---font-size--paragraph-m: --size--1-25rem;
--_color-theme---button-primary--text: --swatch--ivory-light;
--_typography---font-size--paragraph-s: --size--1-125rem;
--_spacing---space--11: --size--6rem;
--_typography---font-size--detail-m: --size--1rem;
--_spacing---section-space--none: --size--0rem;
--_spacing---section-space--small: --size--4rem;
--_spacing---section-space--main: --size--10rem;
--_spacing---section-space--large: --size--14rem;
--_spacing---section-space--page-top: --size--12rem;
--_spacing---section-space--extra-small: --size--2rem;
--_spacing---gap--gap-m: --_spacing---space--5;
--_typography---font-size--paragraph-xs: --size--1rem;
--_spacing---gap--gap-s: --_spacing---space--4;
--_typography---font-size--display-s: --size--1-5rem;
--_spacing---space--10: --size--5rem;
--_typography---font-size--detail-s: --size--0-875rem;
--_color-theme---button-primary--border: --swatch--slate-dark;
--_typography---font-size--detail-xs: --size--0-75rem;
--_typography---font-size--detail-xl: --size--1-25rem;
--_typography---font-size--detail-l: --size--1-125rem;
--_color-theme---card: --swatch--white;
--_color-theme---card-faded: --swatch--slate-faded-10;
--_color-theme---card-faded-hover: --swatch--slate-faded-20;
--_color-theme---link--text: --swatch--slate-dark;
--_spacing---gap--gap-l: --_spacing---space--8;
--_spacing---gap--gap-l<deleted|variable-bb2d43fb-349e-c28e-e594-6daad1d2702c>: --_spacing---space--8;
--column-width--3: --column-width--plus-gutter,--site--gutter;
--_spacing---gap--gap-s<deleted|variable-9c57745c-53fa-fe77-7b3e-da81e97c1c35>: --_spacing---space--4;
--_color-theme---border-hover: --swatch--slate-faded-20;
--column-margin--1: --column-width--plus-gutter;
--column-width--6: --column-width--plus-gutter,--site--gutter;
--column-width--10: --column-width--plus-gutter,--site--gutter;
--column-margin--12: --column-width--plus-gutter;
--column-width--11: --column-width--plus-gutter,--site--gutter;
--_spacing---section-space--medium: --size--6rem;
--_text-style---text-transform: --_typography---text-transform--none;
--_text-style---trim-top: --_typography---font--paragraph-trim-top;
--_text-style---trim-bottom: --_typography---font--paragraph-trim-bottom;
--_alignment---flex: --align--flex-start;
--_alignment---text: --align--text-left;
--_color-theme---link--text-active: --swatch--slate-dark;
--_color-theme---button-primary--background: --swatch--slate-dark;
--_color-theme---button-primary--background-hover: --swatch--slate-medium;
--_color-theme---button-primary--border-hover: --swatch--slate-medium;
--_color-theme---button-primary--text-hover: --swatch--ivory-light;
--_color-theme---button-secondary--background: --swatch--transparent;
--_color-theme---button-secondary--border: --swatch--slate-dark;
--_color-theme---button-secondary--text: --swatch--slate-dark;
--_color-theme---button-secondary--background-hover: --swatch--slate-dark;
--_color-theme---button-secondary--border-hover: --swatch--slate-dark;
--_color-theme---button-secondary--text-hover: --swatch--ivory-light;
--_color-theme---button-tertiary--background: --swatch--transparent;
--_color-theme---button-tertiary--border: --_color-theme---border;
--_color-theme---button-tertiary--text: --_color-theme---text;
--_color-theme---button-tertiary--background-hover: --swatch--transparent;
--_color-theme---button-tertiary--border-hover: --_color-theme---text;
--_color-theme---button-tertiary--text-hover: --_color-theme---text;
--_spacing---space--12: --size--10rem;
--_typography---font-size--display-xs: --size--1-25rem;
--_typography---font-size--display-m: --size--2rem;
--_typography---font-size--display-l: --size--3rem;
--_typography---font-size--display-xl: --size--4rem;
--_typography---font-size--display-xxl: --size--4-5rem;
--_typography---font-size--display-xxxl: --size--6rem;
--_typography---font-size--paragraph-l: --size--1-5rem;
--_typography---font-size--monospace: --size--1-125rem;
--column-width--1: --container--main,--site--gutter-total,--site--column-count;
--column-width--2: --column-width--plus-gutter,--site--gutter;
--column-width--5: --column-width--plus-gutter,--site--gutter;
--column-width--7: --column-width--plus-gutter,--site--gutter;
--column-width--9: --column-width--plus-gutter,--site--gutter;
--column-margin--2: --column-width--plus-gutter;
--column-margin--3: --column-width--plus-gutter;
--column-margin--4: --column-width--plus-gutter;
--column-margin--5: --column-width--plus-gutter;
--column-margin--6: --column-width--plus-gutter;
--column-margin--7: --column-width--plus-gutter;
--column-margin--8: --column-width--plus-gutter;
--column-margin--9: --column-width--plus-gutter;
--column-margin--10: --column-width--plus-gutter;
--column-margin--11: --column-width--plus-gutter;
--site--max-width: --site--width;
--site--gutter-total: --site--gutter,--site--column-count;
--column-width--plus-gutter: --column-width--1,--site--gutter;
--grid-breakout-single: --breakout-start,--container--main,--breakout-end;
--grid-breakout: --breakout-start,--site--column-count,--column-width--1,--breakout-end;
--grid-main: --site--column-count;
--nav--height-total: --nav--height;
--nav--icon-thickness: --border-width--main;
--nav--hamburger-thickness: --nav--icon-thickness;
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
| sm | 479px | max-width |
| sm | 501px | max-width |
| md | 767px | max-width |
| md | 768px | min-width |
| lg | 991px | max-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.2s`, `0.4s`, `0.1s`, `0.8s`, `0.289479s`, `0.335674s`, `0.152467s`, `0.317476s`, `0.15209s`, `0.255898s`, `0.122426s`, `0.383064s`, `0.198601s`, `0.282028s`, `0.3s`

### Common Transitions

```css
transition: all;
transition: transform 0.2s, color 0.2s;
transition: color 0.2s;
transition: text-decoration-color 0.2s;
transition: transform 0.2s;
transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1);
transition: opacity 0.1s;
transition: color 0.1s;
transition: border-color 0.2s, color 0.2s, background-color 0.2s;
transition: 0.2s;
```

### Keyframe Animations

**spin**
```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**marquee**
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
```

**marquee**
```css
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
```

**fadein**
```css
@keyframes fadein {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**menuOpen**
```css
@keyframes menuOpen {
  0% { clip-path: polygon(0px 0px, 100% 0px, 100% 0px, 0px 0px); }
  100% { clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%); }
}
```

**menuClose**
```css
@keyframes menuClose {
  0% { clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%); }
  100% { clip-path: polygon(0px 0px, 100% 0px, 100% 0px, 0px 0px); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (25 instances)

```css
.button {
  background-color: rgb(217, 119, 87);
  color: rgb(20, 20, 19);
  font-size: 16px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Cards (3 instances)

```css
.card {
  background-color: rgb(250, 249, 245);
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 4px 0px, rgba(0, 0, 0, 0.04) 0px 16px 24px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Inputs (3 instances)

```css
.input {
  color: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  border-radius: 0px;
  font-size: 12px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (176 instances)

```css
.link {
  color: rgb(176, 174, 165);
  font-size: 12px;
  font-weight: 400;
}
```

### Navigation (346 instances)

```css
.navigatio {
  background-color: rgb(250, 249, 245);
  color: rgb(20, 20, 19);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 4px 0px, rgba(0, 0, 0, 0.04) 0px 16px 24px 0px;
}
```

### Footer (298 instances)

```css
.foote {
  background-color: rgb(20, 20, 19);
  color: rgb(176, 174, 165);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 12px;
}
```

### Modals (4 instances)

```css
.modal {
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
  max-width: 456px;
}
```

### Dropdowns (251 instances)

```css
.dropdown {
  background-color: rgb(250, 249, 245);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 4px 0px, rgba(0, 0, 0, 0.04) 0px 16px 24px 0px;
  border-color: rgb(20, 20, 19);
  padding-top: 0px;
}
```

### Badges (5 instances)

```css
.badge {
  color: rgb(20, 20, 19);
  font-size: 16px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Switches (14 instances)

```css
.switche {
  background-color: rgb(135, 134, 127);
  border-radius: 0px;
  border-color: rgb(20, 20, 19);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(176, 174, 165);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(176, 174, 165);
  font-size: 12px;
  font-weight: 400;
```

## Layout System

**13 grid containers** and **274 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1145.08px | 0px |
| 1145px | 0px |
| 100% | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 2-column | 6x |
| 1-column | 3x |
| 12-column | 3x |
| 4-column | 1x |

### Grid Templates

```css
grid-template-columns: 189.547px 189.547px 189.547px 189.562px;
gap: 30.9551px;
grid-template-columns: 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px;
gap: 30.9551px;
grid-template-columns: 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px;
gap: 30.9551px;
grid-template-columns: 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px 67.0469px;
gap: 30.9551px;
grid-template-columns: 252px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| column/nowrap | 44x |
| row/nowrap | 221x |
| row/wrap | 9x |

**Gap values:** `0px 28px`, `12px`, `16px`, `24px`, `30.9551px`, `44.8653px`, `6.4px normal`, `8px`, `normal 12px`, `normal 8px`

## Accessibility (WCAG 2.1)

**Overall Score: 0%** — 0 passing, 2 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#ffffff` | `#d97757` | 3.12:1 | FAIL | button (2x) |

## Design System Score

**Overall: 63/100 (Grade: D)**

| Category | Score |
|----------|-------|
| Color Discipline | 92/100 |
| Typography Consistency | 50/100 |
| Spacing System | 70/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 0/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Clean elevation system, Consistent border radii, Good CSS variable tokenization

**Issues:**
- 4 font families — consider limiting to 2 (heading + body)
- 2 WCAG contrast failures
- 91 !important rules — prefer specificity over overrides
- 81% of CSS is unused — consider purging
- 5073 duplicate CSS declarations

## Z-Index Map

**5 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 1000,1000 | div.n.a.v._.c.o.m.p.o.n.e.n.t. .i.s.-.d.e.s.k.t.o.p |
| dropdown | 101,101 | dialog |
| base | 1,3 | div.n.a.v._.w.r.a.p. .w.-.v.a.r.i.a.n.t.-.b.c.a.a.6.c.c.7.-.f.d.9.c.-.d.f.6.e.-.9.8.a.1.-.c.c.c.1.b.4.0.d.7.6.0.4. .i.s.-.d.e.s.k.t.o.p, nav.n.a.v._.d.e.s.k.t.o.p._.l.a.y.o.u.t, div.n.a.v._.w.r.a.p. .w.-.v.a.r.i.a.n.t.-.b.c.a.a.6.c.c.7.-.f.d.9.c.-.d.f.6.e.-.9.8.a.1.-.c.c.c.1.b.4.0.d.7.6.0.4. .i.s.-.m.o.b.i.l.e. .w.-.n.a.v |

## SVG Icons

**8 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 1 |
| sm | 1 |
| md | 4 |
| xl | 2 |

**Icon colors:** `rgb(0,0,0)`, `rgb(249,249,247)`, `rgb(24,24,24)`, `rgb(0, 0, 0)`, `currentColor`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| webflow-icons | self-hosted | 400 | normal |
| Jetbrains Mono | self-hosted | 400 | normal |
| Anthropic Sans | self-hosted | 300 800 | normal, italic |
| Anthropic Serif | self-hosted | 300 800 | normal, italic |
| Anthropic Mono | self-hosted | 300 800 | normal, italic |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 3 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 9:16 (3x)

## Motion Language

**Feel:** responsive · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |
| `xl` | `800ms` | 800 |
| `xxl` | `15209s` | 15209000 |

### Easing Families

- **custom** (8 uses) — `cubic-bezier(0.77, 0, 0.175, 1)`
- **ease-out** (10 uses) — `cubic-bezier(0.16, 1, 0.3, 1)`
- **ease-in-out** (1 uses) — `ease`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `menuClose` | custom | clip-path | 1 |

## Brand Voice

**Tone:** friendly · **Pronoun:** we-only · **Headings:** Sentence case (tight)

### Top CTA Verbs

- **privacy** (1)

### Button Copy Patterns

- "privacy choices" (1×)

### Sample Headings

> AI research and products that put safety at the frontier
AI research and products that put safety at the frontier
> Announcing Fable 5
> Latest releases
> Expanding Project Glasswing
> Claude Opus 4.8
> AI research and products that put safety at the frontier
AI research and products that put safety at the frontier
> Announcing Fable 5
> At Anthropic, we build AI to serve humanity’s long-term well-being.
> ‍
> Core views on AI safety

## Page Intent

**Type:** `landing` (confidence 0.59)
**Description:** Anthropic is an AI safety and research company that's working to build reliable, interpretable, and steerable AI systems.

Alternates: legal (0.4), blog-post (0.35)

## Section Roles

Reading order (top→bottom): feature-grid → nav → nav → nav → nav → nav → nav → nav → nav → nav → nav → nav → nav → hero → hero → content → footer → nav → pricing → pricing → testimonials → content

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | feature-grid | AI research and products that put safety at the frontier
AI research and product | 0.8 |
| 1 | nav | — | 0.9 |
| 2 | nav | — | 0.9 |
| 3 | nav | — | 0.9 |
| 4 | nav | — | 0.9 |
| 5 | nav | — | 0.9 |
| 6 | nav | — | 0.9 |
| 7 | nav | — | 0.9 |
| 8 | nav | — | 0.9 |
| 9 | nav | — | 0.9 |
| 10 | nav | — | 0.9 |
| 11 | nav | — | 0.9 |
| 12 | nav | — | 0.9 |
| 13 | hero | AI research and products that put safety at the frontier
AI research and product | 0.85 |
| 14 | hero | Announcing Fable 5 | 0.4 |
| 15 | content | At Anthropic, we build AI to serve humanity’s long-term well-being. | 0.3 |
| 16 | footer | Footer | 0.95 |
| 17 | nav | Products | 0.9 |
| 18 | pricing | Products | 0.4 |
| 19 | pricing | Solutions | 0.4 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.147 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 1600px |
| backdrop-filter in use | no |
| Gradients | 0 |

## Imagery Style

**Label:** `mixed` (confidence 0.6)
**Counts:** total 3, svg 3, icon 3, screenshot-like 0, photo-like 0
**Dominant aspect:** tall
**Radius profile on images:** square

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Anthropic Sans` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
