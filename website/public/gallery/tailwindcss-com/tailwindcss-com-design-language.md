# Design Language: Tailwind CSS - Rapidly build modern websites without ever leaving your HTML.

> Extracted from `https://tailwindcss.com` on June 12, 2026
> 2568 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#ec0853` | rgb(236, 8, 83) | hsl(340, 93%, 48%) | 1 |
| Secondary | `#0080ff` | rgb(0, 128, 255) | hsl(210, 100%, 50%) | 1 |
| Accent | `#2ca8ff` | rgb(44, 168, 255) | hsl(205, 100%, 59%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#000000` | hsl(0, 0%, 0%) | 855 |
| `#ffffff` | hsl(0, 0%, 100%) | 182 |

### Background Colors

Used on large-area elements: `#ffffff`, `#000102`, `#000000`, `#ec0853`

### Text Colors

Text color palette: `#000000`, `#ffffff`, `#000102`

### Gradients

```css
background-image: repeating-linear-gradient(315deg, oklab(0 0 0 / 0.05) 0px, oklab(0 0 0 / 0.05) 1px, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 50%);
```

```css
background-image: radial-gradient(oklab(0.129999 -0.00404751 -0.027702 / 0.05) 1px, rgba(0, 0, 0, 0) 0px);
```

```css
background-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, lab(1.90334 0.278696 -5.48866) 100%);
```

```css
background-image: linear-gradient(to right, lab(66.9756 -58.27 19.5419) 0%, lab(70.687 -23.6078 -45.9483) 100%);
```

```css
background-image: linear-gradient(to right, lab(49.5493 79.8381 2.31768) 0%, lab(86.4156 6.13147 78.3961) 100%);
```

```css
background-image: linear-gradient(to right, lab(43.0295 75.21 -86.5669) 0%, lab(76.6045 -40.9406 -29.6231) 100%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#000000` | text, border, background | 855 |
| `#ffffff` | background, text, border | 182 |
| `#0080ff` | background | 1 |
| `#2ca8ff` | border | 1 |
| `#ec0853` | background | 1 |

## Typography

### Font Families

- **inter** — used for all (1959 elements)
- **plexMono** — used for body (609 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 96px | 6rem | 400 | 96px | -4.8px | h1 |
| 40px | 2.5rem | 500 | 40px | -2px | h2 |
| 36px | 2.25rem | 600 | 48px | normal | h3 |
| 30px | 1.875rem | 600 | 36px | normal | span |
| 24px | 1.5rem | 500 | 40px | normal | span |
| 20px | 1.25rem | 600 | 24px | normal | span |
| 18px | 1.125rem | 500 | 28px | normal | p |
| 17px | 1.0625rem | 500 | 28px | normal | span |
| 16px | 1rem | 400 | 24px | normal | html, head, meta, link |
| 14px | 0.875rem | 400 | 24px | normal | a, span, svg, path |
| 13px | 0.8125rem | 400 | 24px | normal | div, pre, code, span |
| 12px | 0.75rem | 500 | 20px | normal | button, svg, path, kbd |

### Heading Scale

```css
h1 { font-size: 96px; font-weight: 400; line-height: 96px; }
h2 { font-size: 40px; font-weight: 500; line-height: 40px; }
h3 { font-size: 36px; font-weight: 600; line-height: 48px; }
h3 { font-size: 16px; font-weight: 400; line-height: 24px; }
h3 { font-size: 14px; font-weight: 400; line-height: 24px; }
```

### Body Text

```css
body { font-size: 13px; font-weight: 400; line-height: 24px; }
```

### Font Weights in Use

`400` (2437x), `500` (91x), `600` (37x), `700` (3x)

## Spacing

**Base unit:** 4px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-57 | 57px | 3.5625rem |
| spacing-64 | 64px | 4rem |
| spacing-72 | 72px | 4.5rem |
| spacing-96 | 96px | 6rem |
| spacing-160 | 160px | 10rem |
| spacing-336 | 336px | 21rem |
| spacing-400 | 400px | 25rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| sm | 4px | 5 |
| md | 8px | 42 |
| lg | 12px | 12 |
| lg | 16px | 22 |
| xl | 24px | 1 |
| full | 32px | 5 |

## Box Shadows

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.08) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.745991 -0.0970495 -0.127188 / 0.5) 0px 10px 15px -3px, oklab(0.745991 -0.0970495 -0.127188 / 0.5) 0px 4px 6px -4px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.713996 0.117875 -0.165232 / 0.5) 0px 10px 15px -3px, oklab(0.713996 0.117875 -0.165232 / 0.5) 0px 4px 6px -4px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.718004 0.198758 -0.035884 / 0.5) 0px 10px 15px -3px, oklab(0.718004 0.198758 -0.035884 / 0.5) 0px 4px 6px -4px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.672993 0.0219624 -0.180645 / 0.5) 0px 10px 15px -3px, oklab(0.672993 0.0219624 -0.180645 / 0.5) 0px 4px 6px -4px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 2px 4px 0px inset;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.05) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

## CSS Custom Properties

### Colors

```css
--color-purple-200: lab(87.8405% 13.4282 -18.7159);
--color-purple-300: lab(78.3298% 26.2195 -34.9499);
--color-mauve-800: lab(14.1786% 6.35938 -5.68258);
--color-zinc-100: lab(96.1634% .0993311 -.364041);
--color-zinc-200: lab(90.6853% .399232 -1.45452);
--color-rose-200: lab(86.806% 19.1909 4.07754);
--color-slate-200: lab(91.7353% -.998765 -4.76968);
--tw-mask-bottom-to-color: transparent;
--color-sky-500: lab(63.3038% -18.433 -51.0407);
--color-pink-500: lab(56.9303% 76.8162 -8.07021);
--color-violet-600: lab(41.088% 68.9966 -91.995);
--color-orange-600: lab(57.1026% 64.2584 89.8886);
--color-red-900: lab(28.5139% 44.5539 29.0463);
--color-orange-800: lab(37.1566% 46.6433 50.5562);
--color-mauve-600: lab(34.0653% 7.82093 -6.65653);
--color-neutral-600: lab(34.924% 0 0);
--tw-mask-bottom-from-color: black;
--color-teal-400: lab(76.0109% -53.3483 -2.27906);
--color-pink-950: lab(15.6116% 35.2166 3.53979);
--color-blue-700: lab(36.9089% 35.0961 -85.6872);
--color-olive-50: lab(98.6338% -.297457 1.09334);
--color-neutral-300: lab(84.92% 0 -.0000119209);
--color-slate-500: lab(48.0876% -2.03595 -16.5814);
--color-taupe-600: lab(34.6954% 4.49754 4.2051);
--color-purple-800: lab(30.6017% 56.7637 -64.4751);
--color-orange-900: lab(30.2951% 36.0434 37.671);
--color-mauve-50: lab(98.26% 0 0);
--tw-inset-ring-shadow: 0 0 #0000;
--color-orange-50: lab(97.7008% 1.53735 5.90649);
--color-blue-300: lab(77.5052% -6.4629 -36.42);
--color-neutral-200: lab(90.952% 0 -.0000119209);
--color-cyan-700: lab(44.7267% -21.5987 -26.118);
--color-gray-300: lab(85.1236% -.612259 -3.7138);
--color-yellow-400: lab(83.2664% 8.65132 106.895);
--color-slate-300: lab(84.7652% -1.94535 -7.93337);
--color-mist-600: lab(36.3261% -4.71437 -3.54635);
--color-taupe-400: lab(66.7386% 3.56972 3.57119);
--color-amber-300: lab(86.4156% 6.13147 78.3961);
--color-gray-500: lab(47.7841% -.393182 -10.0268);
--color-cyan-200: lab(91.0821% -24.0435 -12.8306);
--color-olive-100: lab(96.0988% -.493258 1.82395);
--color-zinc-50: lab(98.26% 0 0);
--color-green-500: lab(70.5521% -66.5147 45.8073);
--color-white: #fff;
--color-sky-600: lab(51.7754% -11.4712 -49.8349);
--color-gray-400: lab(65.9269% -.832707 -8.17473);
--color-blue-400: lab(65.0361% -1.42065 -56.9802);
--color-pink-50: lab(96.4459% 4.53997 -1.49434);
--color-stone-900: lab(9.03835% 1.15298 1.92955);
--color-slate-400: lab(65.5349% -2.25151 -14.5072);
--color-taupe-700: lab(26.4543% 4.4374 3.65548);
--color-yellow-300: lab(89.7033% -.480294 84.4917);
--color-zinc-950: lab(2.51107% .242703 -.886115);
--color-gray-100: lab(96.1596% -.0823438 -1.13575);
--color-taupe-300: lab(84.6434% 1.81875 1.71728);
--color-teal-950: lab(16.6371% -15.3183 -3.81732);
--color-emerald-200: lab(90.2247% -31.039 9.47084);
--color-purple-600: lab(43.0295% 75.21 -86.5669);
--tw-mask-left-from-color: black;
--color-teal-900: lab(29.506% -21.4706 -3.59886);
--color-violet-800: lab(29.3188% 57.7986 -76.1493);
--color-mist-300: lab(85.1957% -1.8006 -1.71063);
--color-zinc-700: lab(26.8019% 1.35387 -4.68303);
--color-neutral-700: lab(27.036% 0 0);
--color-violet-500: lab(49.9355% 55.1776 -81.8963);
--color-fuchsia-600: lab(47.5131% 83.4271 -63.0363);
--color-sky-50: lab(97.3623% -2.33802 -4.13098);
--color-lime-200: lab(94.0718% -22.5338 42.5238);
--color-fuchsia-200: lab(87.7108% 19.9958 -18.2054);
--color-green-900: lab(30.797% -29.6927 17.382);
--color-taupe-950: lab(2.86039% .454858 .569314);
--color-rose-950: lab(14.2323% 34.0086 9.80922);
--color-blue-800: lab(30.2514% 27.7853 -70.2699);
--color-pink-100: lab(93.5864% 9.01193 -3.15079);
--color-neutral-900: lab(7.78201% -.0000149012 0);
--color-cyan-50: lab(98.3304% -5.97432 -2.62108);
--color-neutral-100: lab(96.52% -.0000298023 .0000119209);
--color-blue-100: lab(92.0301% -2.24757 -11.6453);
--color-green-600: lab(59.0978% -58.6621 41.2579);
--color-green-950: lab(15.6845% -20.4225 11.7249);
--color-taupe-500: lab(47.3292% 5.2588 5.60027);
--color-yellow-950: lab(16.8146% 15.7422 23.1133);
--color-violet-950: lab(14.0706% 33.3353 -46.7553);
--color-violet-300: lab(76.7419% 18.3911 -37.0706);
--color-zinc-900: lab(8.30603% .618205 -2.16572);
--color-red-300: lab(76.5514% 36.422 15.5335);
--color-sky-300: lab(80.3307% -20.2945 -31.385);
--color-cyan-500: lab(67.805% -35.3952 -30.2018);
--color-orange-500: lab(64.272% 57.1788 90.3583);
--color-slate-800: lab(16.132% -.318035 -14.6672);
--color-olive-300: lab(86.1731% -1.073 4.02397);
--color-lime-800: lab(37.7655% -25.1694 43.0683);
--color-emerald-900: lab(28.8637% -26.9249 5.45986);
--color-sky-400: lab(70.687% -23.6078 -45.9483);
--color-mist-800: lab(15.9728% -2.89693 -2.50866);
--tw-mask-right-from-color: black;
--color-slate-600: lab(35.5623% -1.74978 -15.4316);
--color-taupe-50: lab(98.3763% .249773 .707853);
--color-pink-600: lab(49.5493% 79.8381 2.31768);
--color-pink-200: lab(87.4504% 19.6 -6.46662);
--color-stone-600: lab(35.5168% 1.08604 4.07829);
--color-olive-950: lab(3.26204% -.309289 1.13377);
--color-mauve-500: lab(46.4092% 9.24578 -7.68465);
--color-rose-900: lab(29.7104% 51.514 12.6253);
--color-green-400: lab(78.503% -64.9265 39.7492);
--color-emerald-500: lab(66.9756% -58.27 19.5419);
--color-yellow-50: lab(98.6846% -1.79055 9.7766);
--color-mauve-300: lab(84.1787% 3.38054 -2.53499);
--color-gray-950: lab(1.90334% .278696 -5.48866);
--color-rose-700: lab(41.1651% 71.6251 30.3087);
--color-amber-700: lab(47.2709% 42.9082 69.2966);
--color-amber-900: lab(31.2288% 30.2627 40.0378);
--color-emerald-50: lab(97.8462% -6.94966 1.85487);
--color-mauve-100: lab(95.3199% .844389 -.636518);
--color-zinc-600: lab(35.1166% 1.78212 -6.1173);
--color-indigo-500: lab(48.295% 38.3129 -81.9673);
--color-violet-200: lab(87.0888% 8.53688 -19.4189);
--color-orange-100: lab(94.7127% 3.58394 14.3151);
--color-purple-400: lab(63.6946% 47.6127 -59.2066);
--color-yellow-200: lab(94.3433% -5.00429 52.9663);
--tw-mask-top-to-color: transparent;
--color-blue-600: lab(44.0605% 29.0279 -86.0352);
--color-green-200: lab(92.4222% -26.4702 12.9427);
--tw-border-style: solid;
--color-gray-600: lab(35.6337% -1.58697 -10.8425);
--color-cyan-900: lab(30.372% -13.1853 -18.7887);
--color-red-600: lab(48.4493% 77.4328 61.5452);
--color-blue-50: lab(96.492% -1.14644 -5.11479);
--color-stone-700: lab(27.3812% 1.32917 3.57789);
--color-indigo-700: lab(32.4486% 49.2217 -84.6695);
--color-neutral-950: lab(2.75381% 0 0);
--color-black: #000;
--color-neutral-400: lab(66.128% -.0000298023 .0000119209);
--tw-mask-right-to-color: transparent;
--tw-border-spacing-y: 0px;
--color-fuchsia-300: lab(78.5378% 39.3533 -32.9615);
--color-amber-100: lab(95.916% -1.21653 23.111);
--color-mist-400: lab(67.9697% -3.85058 -3.02824);
--color-stone-800: lab(15.0353% 1.96067 1.53427);
--color-mist-100: lab(95.7289% -.644743 -.229919);
--color-mauve-900: lab(8.33002% 5.15411 -4.30998);
--color-indigo-100: lab(91.6577% 1.04591 -12.7199);
--color-emerald-800: lab(35.3675% -33.1188 8.04002);
--color-taupe-800: lab(15.0089% 3.01889 2.55873);
--color-teal-100: lab(95.1845% -17.4212 -.425422);
--color-violet-50: lab(96.2416% 2.28849 -5.51657);
--color-indigo-300: lab(74.0235% 8.54138 -41.6075);
--color-cyan-300: lab(85.3886% -36.7636 -21.5716);
--color-amber-400: lab(80.1641% 16.6016 99.2089);
--tw-ring-shadow: 0 0 #0000;
--color-indigo-400: lab(59.866% 22.4834 -64.4485);
--color-orange-200: lab(88.4871% 9.94918 28.8378);
--color-purple-500: lab(52.0183% 66.11 -78.2316);
--color-cyan-400: lab(76.6045% -40.9406 -29.6231);
--tw-mask-radial-from-color: black;
--color-emerald-300: lab(83.9203% -48.7124 13.8849);
--color-yellow-600: lab(62.7799% 22.4197 86.1544);
--color-lime-950: lab(16.5113% -15.1841 22.0145);
--color-slate-700: lab(26.9569% -1.47016 -15.6993);
--color-pink-300: lab(77.8308% 38.525 -10.5394);
--color-neutral-500: lab(48.496% 0 0);
--color-amber-600: lab(60.3514% 40.5624 87.1228);
--color-yellow-800: lab(38.7484% 23.5833 51.4916);
--color-pink-400: lab(64.5597% 64.3615 -12.7988);
--tw-mask-linear-to-color: transparent;
--color-slate-900: lab(7.78673% 1.82345 -15.0537);
--tw-mask-linear-from-color: black;
--color-stone-400: lab(66.2166% 1.88044 3.20326);
--color-green-100: lab(96.1861% -13.8464 6.52365);
--color-emerald-700: lab(44.4871% -41.0396 11.0361);
--tw-border-spacing-x: 0px;
--color-teal-50: lab(98.3189% -4.74921 -.111711);
--color-red-200: lab(86.017% 19.8815 7.75869);
--color-indigo-800: lab(26.6645% 37.9804 -68.6402);
--color-purple-900: lab(24.9401% 45.2703 -51.2728);
--color-violet-900: lab(24.3783% 45.7525 -61.4902);
--color-sky-800: lab(35.164% -9.57692 -34.4068);
--color-pink-800: lab(34.9559% 60.2885 5.99639);
--color-teal-800: lab(35.5975% -26.6648 -4.34487);
--color-stone-950: lab(2.86037% .455312 .568903);
--color-taupe-100: lab(95.3391% .644386 .231409);
--color-emerald-600: lab(55.0481% -49.9246 15.93);
--color-gray-50: lab(98.2596% -.247031 -.706708);
--color-violet-400: lab(62.8239% 34.9159 -60.0512);
--color-lime-600: lab(61.1055% -41.0235 73.1483);
--color-pink-900: lab(29.4367% 49.3962 3.35757);
--tw-ring-offset-color: #fff;
--color-red-400: lab(63.7053% 60.745 31.3109);
--color-purple-100: lab(93.3333% 6.97437 -9.83434);
--color-fuchsia-50: lab(97.1083% 4.46233 -4.09334);
--color-indigo-50: lab(95.4818% .411302 -6.78529);
--color-lime-300: lab(89.9218% -35.6546 68.5254);
--color-teal-600: lab(55.0223% -41.0774 -3.90277);
--color-mist-200: lab(91.3368% -1.38441 -1.08377);
--color-rose-100: lab(92.8221% 9.86832 2.60075);
--color-fuchsia-800: lab(32.904% 60.2883 -43.6569);
--color-olive-400: lab(69.6658% -2.009 7.72947);
--color-emerald-100: lab(94.9004% -17.0769 5.63836);
--color-red-800: lab(33.7174% 55.8993 41.0293);
--color-red-500: lab(55.4814% 75.0732 48.8528);
--color-rose-400: lab(64.4125% 63.0291 19.2068);
--tw-ring-offset-width: 0px;
--color-olive-200: lab(91.9397% -.686854 2.55626);
--color-purple-950: lab(14.8253% 38.9005 -44.5861);
--color-zinc-300: lab(84.9837% .601262 -2.17986);
--color-mauve-200: lab(90.8851% 1.40759 -1.05978);
--color-rose-800: lab(34.6481% 60.802 20.1957);
--color-indigo-600: lab(38.4009% 52.6132 -92.3857);
--color-amber-800: lab(37.8822% 37.1699 52.2718);
--color-fuchsia-500: lab(56.4256% 83.132 -64.639);
--color-neutral-50: lab(98.26% 0 0);
--color-lime-500: lab(75.3197% -46.6547 86.1778);
--color-sky-700: lab(41.6013% -9.10804 -42.5647);
--tw-mask-top-from-color: black;
--color-cyan-800: lab(36.5114% -17.1989 -21.6292);
--color-slate-50: lab(98.1434% -.369519 -1.05966);
--color-orange-300: lab(80.8059% 21.7313 50.4455);
--color-yellow-100: lab(97.3564% -4.51407 27.344);
--color-violet-700: lab(35.2783% 67.9912 -88.793);
--tw-ring-offset-shadow: 0 0 #0000;
--color-olive-700: lab(29.8862% -2.11598 8.58277);
--color-mist-900: lab(9.32863% -1.87989 -2.1017);
--color-taupe-200: lab(90.9149% 1.38998 1.08777);
--color-gray-800: lab(16.1051% -1.18239 -11.7533);
--color-zinc-500: lab(47.8878% 1.65477 -5.77283);
--color-stone-100: lab(96.5286% -.0991821 .364268);
--tw-mask-radial-to-color: transparent;
--color-orange-700: lab(46.4615% 57.7275 70.8507);
--color-green-50: lab(98.1563% -5.60117 2.75915);
--color-teal-700: lab(44.4134% -33.1436 -4.22149);
--color-lime-700: lab(47.246% -32.2589 55.8249);
--color-mist-700: lab(27.9503% -4.0026 -3.35106);
--color-indigo-950: lab(12.4853% 14.9672 -31.3418);
--color-zinc-800: lab(15.7305% .613764 -2.16959);
--color-lime-900: lab(31.9931% -20.7654 33.7379);
--color-stone-500: lab(48.1164% 2.35701 4.26852);
--color-sky-100: lab(94.3709% -4.56053 -8.23453);
--color-lime-50: lab(98.7039% -5.32573 10.2149);
--color-rose-50: lab(96.2369% 4.94155 1.28011);
--color-orange-950: lab(14.1747% 23.4515 19.4461);
--color-emerald-950: lab(15.0582% -17.9507 2.38369);
--color-amber-500: lab(72.7183% 31.8672 97.9407);
--color-sky-900: lab(29.1959% -8.34689 -28.2453);
--color-orange-400: lab(70.0429% 42.5156 75.8207);
--color-mauve-400: lab(66.2215% 5.18823 -4.27421);
--color-cyan-100: lab(95.3146% -13.8285 -6.84732);
--color-yellow-700: lab(47.8202% 25.2426 66.5015);
--color-violet-100: lab(93.0838% 4.35197 -9.88284);
--color-rose-300: lab(76.6339% 38.3549 9.68835);
--color-slate-950: lab(1.76974% 1.32743 -9.28855);
--color-green-800: lab(37.4616% -36.7971 22.9692);
--color-olive-500: lab(51.5272% -2.86695 11.5408);
--color-mist-50: lab(98.5129% -.644743 -.229931);
--color-rose-500: lab(56.101% 79.4328 31.4532);
--color-mauve-950: lab(2.70037% 1.13126 -.853461);
--color-red-700: lab(40.4273% 67.2623 53.7441);
--color-slate-100: lab(96.286% -.852436 -2.46847);
--color-rose-600: lab(49.1882% 81.577 36.0311);
--color-fuchsia-950: lab(15.7348% 39.0235 -27.4073);
--color-indigo-200: lab(84.4329% 3.18977 -23.9688);
--color-blue-500: lab(54.1736% 13.3369 -74.6839);
--color-gray-900: lab(8.11897% .811279 -12.254);
--color-pink-700: lab(42.1737% 71.8009 7.42233);
--color-blue-900: lab(26.1542% 15.7545 -51.5504);
--color-sky-950: lab(17.8299% -5.31271 -21.1584);
--color-zinc-400: lab(65.6464% 1.53497 -5.42429);
--color-olive-600: lab(38.2553% -2.31101 9.30823);
--tw-mask-left-to-color: transparent;
--color-lime-100: lab(96.8662% -11.7133 22.0854);
--color-yellow-900: lab(32.3865% 21.1273 38.5959);
--color-gray-700: lab(27.1134% -.956401 -12.3224);
--color-cyan-600: lab(55.1767% -26.7496 -30.5139);
--color-purple-50: lab(97.1627% 2.99937 -4.13398);
--color-red-100: lab(92.243% 10.2865 3.83865);
--color-teal-300: lab(84.8977% -48.1516 -1.3321);
--color-amber-950: lab(15.8111% 20.9107 23.3752);
--color-stone-200: lab(91.055% .663072 .865579);
--color-olive-800: lab(17.3033% -1.48043 5.96187);
--color-red-50: lab(96.5005% 4.18508 1.52328);
--color-blue-200: lab(86.15% -4.04379 -21.0797);
--color-lime-400: lab(83.7876% -45.0447 88.4738);
--color-gray-200: lab(91.6229% -.159115 -2.26791);
--color-green-300: lab(86.9953% -47.2691 25.0054);
--color-taupe-900: lab(8.7711% 2.25864 2.3765);
--tw-mask-conic-from-color: black;
--color-red-950: lab(13.003% 29.04 16.7519);
--color-emerald-400: lab(75.0771% -60.7313 19.4147);
--color-teal-200: lab(90.7612% -33.1343 -.542295);
--color-fuchsia-900: lab(27.755% 48.6174 -34.3553);
--color-olive-900: lab(10.5512% -1.19986 4.84231);
--color-fuchsia-100: lab(93.9419% 9.57647 -9.08735);
--color-indigo-900: lab(23.3911% 24.6978 -50.4718);
--color-fuchsia-400: lab(66.1178% 66.0652 -52.4733);
--color-purple-700: lab(36.1758% 69.8525 -80.0381);
--color-mauve-700: lab(25.8245% 8.01928 -6.32546);
--color-neutral-800: lab(15.204% 0 -.00000596046);
--color-teal-500: lab(67.3859% -49.0983 -2.63511);
--color-cyan-950: lab(19.1528% -9.68757 -15.5267);
--color-green-700: lab(47.0329% -47.0239 31.4788);
--color-yellow-500: lab(76.3898% 14.5258 98.4589);
--color-sky-200: lab(88.6983% -11.3978 -16.8488);
--color-mist-950: lab(2.93655% -.435196 -.608262);
--tw-mask-conic-to-color: transparent;
--color-amber-50: lab(98.6252% -.635922 8.42309);
--color-stone-300: lab(84.7909% .928015 1.59738);
--color-stone-50: lab(98.2686% -.0991821 .364304);
--color-blue-950: lab(15.6723% 8.86232 -32.2945);
--color-mist-500: lab(49.1145% -5.80183 -4.41525);
--color-amber-200: lab(91.7203% -.505269 49.9084);
--color-fuchsia-700: lab(39.787% 72.2653 -53.1244);
```

### Spacing

```css
--tw-space-x-reverse: 0;
--spacing: .25rem;
--tw-space-y-reverse: 0;
--tw-mask-radial-size: farthest-corner;
```

### Typography

```css
--default-font-feature-settings: "cv02", "cv03", "cv04", "cv11";
--text-base--line-height: calc(1.5 / 1);
--font-mono: "plexMono", "plexMono Fallback", monospace;
--tracking-wider: .05em;
--text-9xl--line-height: 1;
--font-weight-bold: 700;
--font-weight-extralight: 200;
--text-xs--line-height: calc(1 / .75);
--text-xl: 1.25rem;
--leading-relaxed: 1.625;
--leading-snug: 1.375;
--text-9xl: 8rem;
--text-2xl--line-height: calc(2 / 1.5);
--text-shadow-xs: 0px 1px 1px #0003;
--text-8xl: 6rem;
--text-xl--line-height: calc(1.75 / 1.25);
--text-sm: .875rem;
--leading-tight: 1.25;
--font-weight-thin: 100;
--text-4xl--line-height: calc(2.5 / 2.25);
--tw-text-shadow-alpha: 100%;
--tracking-tight: -.025em;
--text-2xl: 1.5rem;
--text-7xl: 4.5rem;
--text-lg: 1.125rem;
--text-8xl--line-height: 1;
--text-shadow-md: 0px 1px 1px #0000001a, 0px 1px 2px #0000001a, 0px 2px 4px #0000001a;
--text-5xl--line-height: 1;
--leading-normal: 1.5;
--text-lg--line-height: calc(1.75 / 1.125);
--font-sans: "inter", "inter Fallback", system-ui;
--text-6xl: 3.75rem;
--default-font-family: "inter", "inter Fallback", system-ui;
--font-weight-light: 300;
--font-ubuntu-mono: "ubuntuMono", "ubuntuMono Fallback";
--font-inter: "inter", "inter Fallback";
--text-shadow-2xs: 0px 1px 0px #00000026;
--text-7xl--line-height: 1;
--font-plex-mono: "plexMono", "plexMono Fallback";
--tracking-tighter: -.05em;
--font-weight-black: 900;
--tracking-wide: .025em;
--font-weight-semibold: 600;
--font-source-sans-pro: "source", "source Fallback";
--font-weight-extrabold: 800;
--text-4xl: 2.25rem;
--tracking-normal: 0em;
--text-sm--line-height: calc(1.25 / .875);
--text-shadow-lg: 0px 1px 2px #0000001a, 0px 3px 2px #0000001a, 0px 4px 8px #0000001a;
--text-3xl--line-height: calc(2.25 / 1.875);
--text-5xl: 3rem;
--text-shadow-sm: 0px 1px 0px #00000013, 0px 1px 1px #00000013, 0px 2px 2px #00000013;
--text-3xl: 1.875rem;
--text-xs: .75rem;
--tracking-widest: .1em;
--font-weight-medium: 500;
--font-weight-normal: 400;
--font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
--default-mono-font-feature-settings: "ss02", "zero";
--text-6xl--line-height: 1;
--leading-loose: 2;
--text-base: 1rem;
--default-mono-font-family: "plexMono", "plexMono Fallback", monospace;
```

### Shadows

```css
--tw-inset-shadow-alpha: 100%;
--shadow-xs: 0 1px 2px 0 #0000000d;
--tw-inset-shadow: 0 0 #0000;
--tw-shadow-alpha: 100%;
--drop-shadow-lg: 0 4px 4px #00000026;
--shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
--drop-shadow-sm: 0 1px 2px #00000026;
--drop-shadow-xl: 0 9px 7px #0000001a;
--inset-shadow-xs: inset 0 1px 1px #0000000d;
--inset-shadow-2xs: inset 0 1px #0000000d;
--tw-drop-shadow-alpha: 100%;
--shadow-md: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;
--inset-shadow-sm: inset 0 2px 4px #0000000d;
--drop-shadow-2xl: 0 25px 25px #00000026;
--shadow-sm: 0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a;
--shadow-lg: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;
--shadow-2xl: 0 25px 50px -12px #00000040;
--drop-shadow-md: 0 3px 3px #0000001f;
--drop-shadow-xs: 0 1px 1px #0000000d;
--tw-shadow: 0 0 #0000;
--shadow-2xs: 0 1px #0000000d;
```

### Radii

```css
--radius-4xl: 2rem;
--radius-sm: .25rem;
--radius-2xl: 1rem;
--radius-md: .375rem;
--radius-lg: .5rem;
--radius-3xl: 1.5rem;
--radius-xs: .125rem;
--radius-xl: .75rem;
```

### Other

```css
--lightningcss-light: initial;
--lightningcss-dark: ;
--container-md: 28rem;
--tw-mask-left-to-position: 100%;
--aspect-video: 16 / 9;
--blur-lg: 16px;
--tw-mask-conic: linear-gradient(#fff, #fff);
--tw-outline-style: solid;
--ease-in: cubic-bezier(.4, 0, 1, 1);
--tw-mask-conic-from-position: 0%;
--tw-mask-top-to-position: 100%;
--tw-gradient-from: rgba(0, 0, 0, 0);
--tw-gradient-to: rgba(0, 0, 0, 0);
--perspective-normal: 500px;
--blur-2xl: 40px;
--tw-mask-linear-from-position: 0%;
--tw-gradient-via-position: 50%;
--tw-mask-right: linear-gradient(#fff, #fff);
--tw-gradient-to-position: 100%;
--default-transition-duration: .15s;
--animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
--container-xs: 20rem;
--default-transition-timing-function: cubic-bezier(.4, 0, .2, 1);
--perspective-dramatic: 100px;
--tw-translate-z: 0;
--tw-gradient-via: rgba(0, 0, 0, 0);
--tw-scale-y: 1;
--tw-mask-radial: linear-gradient(#fff, #fff);
--container-6xl: 72rem;
--breakpoint-lg: 64rem;
--container-3xl: 48rem;
--blur-xs: 4px;
--tw-translate-y: 0;
--ease-out: cubic-bezier(0, 0, .2, 1);
--tw-mask-top: linear-gradient(#fff, #fff);
--tw-content: "";
--tw-mask-linear-position: 0deg;
--tw-translate-x: 0;
--animate-flash-code: flash-code 2s forwards;
--container-3xs: 16rem;
--tw-mask-right-from-position: 0%;
--animate-bounce: bounce 1s infinite;
--tw-mask-radial-shape: ellipse;
--container-xl: 36rem;
--tw-mask-linear: linear-gradient(#fff, #fff);
--tw-scrollbar-track: rgba(0, 0, 0, 0);
--breakpoint-xl: 80rem;
--animate-ping: ping 1s cubic-bezier(0, 0, .2, 1) infinite;
--tw-mask-left-from-position: 0%;
--blur-xl: 24px;
--tw-divide-x-reverse: 0;
--breakpoint-2xl: 96rem;
--tw-mask-bottom-to-position: 100%;
--tw-mask-conic-position: 0deg;
--blur-3xl: 64px;
--tw-scale-z: 1;
--container-sm: 24rem;
--tw-scroll-snap-strictness: proximity;
--container-lg: 32rem;
--perspective-midrange: 800px;
--tw-gradient-from-position: 0%;
--ease-in-out: cubic-bezier(.4, 0, .2, 1);
--tw-mask-radial-from-position: 0%;
--tw-mask-linear-to-position: 100%;
--tw-mask-radial-position: center;
--tw-mask-right-to-position: 100%;
--container-5xl: 64rem;
--perspective-distant: 1200px;
--blur-md: 12px;
--tw-mask-radial-to-position: 100%;
--container-2xs: 18rem;
--animate-spin: spin 1s linear infinite;
--container-4xl: 56rem;
--tw-mask-left: linear-gradient(#fff, #fff);
--perspective-near: 300px;
--tw-mask-bottom-from-position: 0%;
--tw-divide-y-reverse: 0;
--breakpoint-md: 48rem;
--container-2xl: 42rem;
--tw-mask-conic-to-position: 100%;
--tw-mask-top-from-position: 0%;
--tw-scrollbar-thumb: rgba(0, 0, 0, 0);
--tw-scale-x: 1;
--tw-mask-bottom: linear-gradient(#fff, #fff);
--breakpoint-sm: 40rem;
--container-7xl: 80rem;
--blur-sm: 8px;
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
| sm | 640px | max-width |
| md | 768px | min-width |
| lg | 1024px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`

**Durations:** `0.35s`, `0.15s`, `0.3s`

### Common Transitions

```css
transition: all;
transition: border-radius 0.35s cubic-bezier(0.4, 0, 0.2, 1);
transition: font-size 0.35s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.35s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.35s cubic-bezier(0.4, 0, 0.2, 1), fill 0.35s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.35s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.35s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.35s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.35s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.15s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), fill 0.3s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.3s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.3s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), translate 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), -webkit-backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1), display 0.3s cubic-bezier(0.4, 0, 0.2, 1), content-visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1), overlay 0.3s cubic-bezier(0.4, 0, 0.2, 1), pointer-events 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), translate 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1), rotate 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframe Animations

**spin**
```css
@keyframes spin {
  100% { transform: rotate(360deg); }
}
```

**ping**
```css
@keyframes ping {
  75%, 100% { opacity: 0; transform: scale(2); }
}
```

**pulse**
```css
@keyframes pulse {
  50% { opacity: 0.5; }
}
```

**bounce**
```css
@keyframes bounce {
  0%, 100% { animation-timing-function: cubic-bezier(0.8, 0, 1, 1); transform: translateY(-25%); }
  50% { animation-timing-function: cubic-bezier(0, 0, 0.2, 1); transform: none; }
}
```

**flash-code**
```css
@keyframes flash-code {
  0% { background-color: lab(63.3038 -18.433 -51.0407 / 0.1); }
  100% { background-color: lab(63.3038 -18.433 -51.0407 / 0); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (15 instances)

```css
.button {
  background-color: oklab(0.999994 0.0000455678 0.0000200868 / 0.1);
  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 400;
  padding-top: 4px;
  padding-right: 8px;
  border-radius: 4px;
}
```

### Cards (27 instances)

```css
.card {
  background-color: oklab(0.129999 -0.00404751 -0.027702 / 0.9);
  border-radius: 3.35544e+07px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  padding-top: 2px;
  padding-right: 8px;
}
```

### Inputs (1 instances)

```css
.input {
  color: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  border-radius: 0px;
  font-size: 16px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (95 instances)

```css
.link {
  color: lab(1.90334 0.278696 -5.48866);
  font-size: 16px;
  font-weight: 400;
}
```

### Footer (1 instances)

```css
.foote {
  background-color: rgb(255, 255, 255);
  color: lab(1.90334 0.278696 -5.48866);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 14px;
}
```

### Tabs (3 instances)

```css
.tab {
  background-color: oklab(0.656006 0.239783 -0.0238809 / 0.05);
  color: lab(1.90334 0.278696 -5.48866);
  font-size: 14px;
  font-weight: 400;
  padding-top: 24px;
  padding-right: 24px;
  border-color: oklab(0.129999 -0.00404751 -0.027702 / 0.1);
  border-radius: 0px;
}
```

### Tooltips (188 instances)

```css
.tooltip {
  background-color: oklab(0.129999 -0.00404751 -0.027702 / 0.9);
  color: lab(1.90334 0.278696 -5.48866);
  font-size: 16px;
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: oklab(0.129999 -0.00404751 -0.027702 / 0.05);
  color: lab(1.90334 0.278696 -5.48866);
  padding: 2px 6px 2px 10px;
  border-radius: 16px;
  border: 0px solid lab(1.90334 0.278696 -5.48866);
  font-size: 12px;
  font-weight: 500;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: oklab(0.129999 -0.00404751 -0.027702 / 0.02);
  color: rgb(0, 0, 0);
  padding: 4px 8px 4px 8px;
  border-radius: 3.35544e+07px;
  border: 0px solid rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 6 instances, 1 variant

**Variant 1** (6 instances)

```css
  background: lab(56.9303 76.8162 -8.07021);
  color: rgb(255, 255, 255);
  padding: 8px 12px 8px 12px;
  border-radius: 8px;
  border: 0px solid rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 700;
```

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: oklab(0.656006 0.239783 -0.0238809 / 0.05);
  color: lab(49.5493 79.8381 2.31768);
  padding: 24px 24px 24px 24px;
  border-radius: 0px;
  border: 0px 1px 0px 0px solid oklab(0.129999 -0.00404751 -0.027702 / 0.1);
  font-size: 14px;
  font-weight: 400;
```

### Input — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**78 grid containers** and **157 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1280px | 0px |
| 100% | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 47x |
| 3-column | 11x |
| 2-column | 8x |
| 4-column | 4x |
| 30-column | 1x |
| 18-column | 1x |

### Grid Templates

```css
grid-template-columns: 40px 1200px 40px;
grid-template-columns: 1200px;
gap: 160px;
grid-template-columns: 506.656px 506.672px 506.656px;
grid-template-columns: 31.7188px 31.7188px 31.7188px 31.7188px 31.7188px 31.7188px 31.7188px 31.7188px 31.7188px 31.7188px 31.7344px 31.7344px 31.7344px 31.7344px 31.7344px 31.7188px 31.7188px 31.7188px 31.7188px 31.7188px 31.7344px 31.7344px 31.7344px 31.7344px 31.7344px 31.7344px 31.7344px 31.7344px 31.7344px 31.7344px;
gap: 8px;
grid-template-columns: 270px 270px 270px 270px;
gap: 40px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 102x |
| column/nowrap | 55x |

**Gap values:** `10px`, `160px`, `16px`, `24px`, `24px 32px`, `2px`, `32px`, `40px`, `44px`, `4px`, `6px`, `8px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 4 passing, 0 failing color pairs

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#ffffff` | `#000000` | 21:1 | AAA |

## Design System Score

**Overall: 90/100 (Grade: A)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 90/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 78/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 36 !important rules — prefer specificity over overrides
- 6757 duplicate CSS declarations

## Gradients

**6 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| repeating-linear | 315deg | 4 | bold |
| radial | — | 2 | brand |
| linear | — | 3 | bold |
| linear | to right | 2 | brand |
| linear | to right | 2 | brand |
| linear | to right | 2 | brand |

```css
background: repeating-linear-gradient(315deg, oklab(0 0 0 / 0.05) 0px, oklab(0 0 0 / 0.05) 1px, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 50%);
background: radial-gradient(oklab(0.129999 -0.00404751 -0.027702 / 0.05) 1px, rgba(0, 0, 0, 0) 0px);
background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, lab(1.90334 0.278696 -5.48866) 100%);
background: linear-gradient(to right, lab(66.9756 -58.27 19.5419) 0%, lab(70.687 -23.6078 -45.9483) 100%);
background: linear-gradient(to right, lab(49.5493 79.8381 2.31768) 0%, lab(86.4156 6.13147 78.3961) 100%);
```

## Z-Index Map

**4 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| sticky | 10,50 | div.f.i.x.e.d. .i.n.s.e.t.-.x.-.0. .t.o.p.-.0. .z.-.1.0. .b.o.r.d.e.r.-.b. .b.o.r.d.e.r.-.b.l.a.c.k./.5. .d.a.r.k.:.b.o.r.d.e.r.-.w.h.i.t.e./.1.0, div.p.o.i.n.t.e.r.-.e.v.e.n.t.s.-.n.o.n.e. .a.b.s.o.l.u.t.e. .i.n.s.e.t.-.0. .z.-.1.0. .g.r.i.d. .g.r.i.d.-.c.o.l.s.-.2. .g.a.p.-.1.0. .m.a.x.-.m.d.:.g.a.p.-.5. .l.g.:.g.r.i.d.-.c.o.l.s.-.3. .x.l.:.g.r.i.d.-.c.o.l.s.-.4, div.n.o.-.s.c.r.o.l.l.b.a.r. .z.-.1.0. .-.m.y.-.1. .f.l.e.x. .s.n.a.p.-.x. .s.n.a.p.-.m.a.n.d.a.t.o.r.y. .g.a.p.-.(.-.-.g.a.p.). .o.v.e.r.f.l.o.w.-.x.-.a.u.t.o. .p.y.-.1. .[.-.-.g.a.p.:.-.-.s.p.a.c.i.n.g.(.1.0.).]. .[.-.-.s.i.z.e.:.-.-.s.p.a.c.i.n.g.(.7.2.).] |
| base | 0,1 | div.r.e.l.a.t.i.v.e. .z.-.0. .i.n.l.i.n.e.-.g.r.i.d. .g.r.i.d.-.c.o.l.s.-.3. .g.a.p.-.0...5. .r.o.u.n.d.e.d.-.f.u.l.l. .b.g.-.g.r.a.y.-.9.5.0./.5. .p.-.0...7.5. .t.e.x.t.-.g.r.a.y.-.9.5.0. .d.a.r.k.:.b.g.-.w.h.i.t.e./.1.0. .d.a.r.k.:.t.e.x.t.-.w.h.i.t.e, a.z.-.1. .w.-.f.u.l.l. .t.e.x.t.-.c.e.n.t.e.r. .i.n.l.i.n.e.-.b.l.o.c.k. .r.o.u.n.d.e.d.-.4.x.l. .b.g.-.b.l.a.c.k. .p.x.-.4. .p.y.-.2. .t.e.x.t.-.s.m./.6. .f.o.n.t.-.s.e.m.i.b.o.l.d. .t.e.x.t.-.w.h.i.t.e. .h.o.v.e.r.:.b.g.-.g.r.a.y.-.8.0.0. .d.a.r.k.:.b.g.-.g.r.a.y.-.7.0.0. .d.a.r.k.:.h.o.v.e.r.:.b.g.-.g.r.a.y.-.6.0.0, a.z.-.1. .m.a.x.-.s.m.:.h.i.d.d.e.n. .i.n.l.i.n.e.-.b.l.o.c.k. .r.o.u.n.d.e.d.-.4.x.l. .b.g.-.b.l.a.c.k. .p.x.-.4. .p.y.-.2. .t.e.x.t.-.s.m./.6. .f.o.n.t.-.s.e.m.i.b.o.l.d. .t.e.x.t.-.w.h.i.t.e. .h.o.v.e.r.:.b.g.-.g.r.a.y.-.8.0.0. .d.a.r.k.:.b.g.-.g.r.a.y.-.7.0.0. .d.a.r.k.:.h.o.v.e.r.:.b.g.-.g.r.a.y.-.6.0.0 |

## SVG Icons

**30 unique SVG icons** detected. Dominant style: **outlined**.

| Size Class | Count |
|------------|-------|
| xs | 3 |
| sm | 3 |
| md | 1 |
| lg | 3 |
| xl | 20 |

**Icon colors:** `currentColor`, `lab(35.6337 -1.58697 -10.8425)`, `lab(80.3307 -20.2945 -31.385)`, `oklab(0 0 0 / 0.4)`, `var(--site-background)`, `url(#paint0_linear_408_5730)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| inter | self-hosted | 100 900 | normal, italic |
| source | self-hosted | 500 | normal |
| plexMono | self-hosted | 400, 500, 600 | normal, italic |
| ubuntuMono | self-hosted | 600 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| general | 20 | objectFit: cover, borderRadius: 8px, shape: rounded |
| thumbnail | 7 | objectFit: fill, borderRadius: 0px, shape: square |
| avatar | 7 | objectFit: fill, borderRadius: 3.35544e+07px, shape: circular |
| gallery | 3 | objectFit: fill, borderRadius: 0px, shape: square |

**Aspect ratios:** 1:1 (15x), 9:16 (8x), 3:4 (4x), 16:9 (3x), 3:2 (2x), 21:9 (1x), 2:1 (1x), 1.18:1 (1x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `150ms` | 150 |
| `md` | `300ms` | 300 |

### Easing Families

- **custom** (263 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`
- **ease-in** (1 uses) — `cubic-bezier(0.4, 0, 1, 1)`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `ping` | reveal | opacity, transform | 1 |

## Component Anatomy

### button — 12 instances

**Slots:** label, icon
**Variants:** outline
**Sizes:** xs · sm · lg

| variant | count | sample label |
|---|---|---|
| default | 9 | v4.3 |
| outline | 3 | TEMPLATES

Visually-stunning, easy to cu |

## Brand Voice

**Tone:** friendly · **Pronoun:** third-person · **Headings:** Title Case (tight)

### Top CTA Verbs

- **ui** (2)
- **v** (1)
- **k** (1)
- **quick** (1)
- **check** (1)
- **index** (1)
- **app** (1)
- **package** (1)

### Button Copy Patterns

- "v4.3" (1×)
- "⌘k" (1×)
- "quick search
⌘k" (1×)
- "check availability" (1×)
- "index.html" (1×)
- "app.css" (1×)
- "package.json" (1×)
- "terminal" (1×)
- "build.css" (1×)
- "templates

visually-stunning, easy to customize site templates built with react and next.js." (1×)

### Sample Headings

> Tailwind CSS
> Resources
> Tailwind Plus
> Community
> Tailwind CSS

## Page Intent

**Type:** `landing` (confidence 0.45)
**Description:** Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.

## Section Roles

Reading order (top→bottom): content → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | content | — | 0.3 |
| 1 | footer | Tailwind CSS | 0.95 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.559 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 32px |
| backdrop-filter in use | no |
| Gradients | 6 |

## Imagery Style

**Label:** `photography` (confidence 0.077)
**Counts:** total 37, svg 0, icon 0, screenshot-like 0, photo-like 1
**Dominant aspect:** square-ish
**Radius profile on images:** full

## Component Library

**Detected:** `tailwindcss` (confidence 0.577)

Evidence:
- tailwind-like class density 58%

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `inter` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
