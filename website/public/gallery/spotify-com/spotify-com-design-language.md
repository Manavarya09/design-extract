# Design Language: Spotify - Web Player: Music for everyone

> Extracted from `https://spotify.com` on May 21, 2026
> 2525 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#1ed760` | rgb(30, 215, 96) | hsl(141, 76%, 48%) | 40 |
| Secondary | `#346e4a` | rgb(52, 110, 74) | hsl(143, 36%, 32%) | 6 |
| Accent | `#1db954` | rgb(29, 185, 84) | hsl(141, 73%, 42%) | 2 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#ffffff` | hsl(0, 0%, 100%) | 2367 |
| `#b3b3b3` | hsl(0, 0%, 70%) | 1887 |
| `#000000` | hsl(0, 0%, 0%) | 610 |
| `#696969` | hsl(0, 0%, 41%) | 129 |
| `#555555` | hsl(0, 0%, 33%) | 44 |
| `#121212` | hsl(0, 0%, 7%) | 28 |
| `#7c7c7c` | hsl(0, 0%, 49%) | 25 |
| `#1f1f1f` | hsl(0, 0%, 12%) | 11 |
| `#333333` | hsl(0, 0%, 20%) | 11 |
| `#292929` | hsl(0, 0%, 16%) | 5 |
| `#c1c1c1` | hsl(0, 0%, 76%) | 2 |
| `#eeeeee` | hsl(0, 0%, 93%) | 2 |

### Background Colors

Used on large-area elements: `#121212`, `#000000`, `#535353`, `#eeeeee`

### Text Colors

Text color palette: `#000000`, `#b3b3b3`, `#0000ee`, `#ffffff`, `#7c7c7c`, `#101010`, `#c5c5c5`, `#121212`, `#808080`, `#555555`

### Gradients

```css
background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0px, rgb(42, 42, 42) 10%, rgb(42, 42, 42) 90%, rgba(0, 0, 0, 0) 100%);
```

```css
background-image: linear-gradient(90deg, rgb(175, 40, 150), rgb(80, 155, 245));
```

```css
background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgb(18, 18, 18) 100%), url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICAgPGZpbHRlciBpZD0ibiIgeD0iMCIgeT0iMCI+CiAgICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiAvPgogICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiAvPgogICA8L2ZpbHRlcj4KICAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC4wNSIgLz4KPC9zdmc+");
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#ffffff` | background, text, border | 2367 |
| `#b3b3b3` | text, border, background | 1887 |
| `#000000` | text, border, background | 610 |
| `#696969` | text, border | 129 |
| `#555555` | background, text, border | 44 |
| `#1ed760` | background | 40 |
| `#121212` | background, text, border | 28 |
| `#7c7c7c` | text, border, background | 25 |
| `#1f1f1f` | background | 11 |
| `#333333` | background | 11 |
| `#468254` | background | 9 |
| `#3860be` | text, border, background | 6 |
| `#346e4a` | background, border | 6 |
| `#292929` | border, background | 5 |
| `#0000ee` | text, border | 4 |
| `#c1c1c1` | border, text | 2 |
| `#002038` | background | 2 |
| `#eeeeee` | background | 2 |
| `#d8d8d8` | border | 2 |
| `#1db954` | background, border | 2 |
| `#b03830` | background | 1 |
| `#402830` | background | 1 |
| `#c03830` | background | 1 |
| `#701818` | background | 1 |
| `#817915` | background | 1 |
| `#384040` | background | 1 |
| `#186090` | background | 1 |
| `#93712d` | background | 1 |
| `#ba3cd1` | background | 1 |
| `#177ace` | background | 1 |

## Typography

### Font Families

- **SpotifyMixUI** — used for all (2400 elements)
- **Times** — used for body (115 elements)
- **SpotifyMixUITitle** — used for all (10 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 24px | 1.5rem | 700 | normal | normal | h2, span, a, h1 |
| 16px | 1rem | 400 | normal | normal | html, head, style, meta |
| 14.4px | 0.9rem | 400 | 38px | 0.144px | button, svg, title, g |
| 14px | 0.875rem | 700 | normal | normal | a, span, svg, path |
| 13.6px | 0.85rem | 400 | 27.2px | normal | div, svg, path, span |
| 13.3333px | 0.8333rem | 400 | normal | normal | textarea, button, svg, path |
| 13.008px | 0.813rem | 700 | 16.9104px | normal | div |
| 12.992px | 0.812rem | 400 | 19.488px | normal | div, br, a, p |
| 12.8px | 0.8rem | 400 | normal | normal | input |
| 12px | 0.75rem | 400 | normal | normal | span, div, a, button |
| 10.5px | 0.6563rem | 600 | 14px | normal | span |

### Heading Scale

```css
h2 { font-size: 24px; font-weight: 700; line-height: normal; }
h1 { font-size: 16px; font-weight: 400; line-height: normal; }
h4 { font-size: 14px; font-weight: 700; line-height: normal; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: normal; }
```

### Font Weights in Use

`400` (2409x), `700` (86x), `600` (26x), `500` (4x)

## Spacing

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-15 | 15px | 0.9375rem |
| spacing-20 | 20px | 1.25rem |
| spacing-23 | 23px | 1.4375rem |
| spacing-28 | 28px | 1.75rem |
| spacing-35 | 35px | 2.1875rem |
| spacing-40 | 40px | 2.5rem |
| spacing-48 | 48px | 3rem |
| spacing-64 | 64px | 4rem |
| spacing-96 | 96px | 6rem |
| spacing-125 | 125px | 7.8125rem |
| spacing-154 | 154px | 9.625rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 2px | 43 |
| md | 6px | 103 |
| md | 10px | 4 |
| lg | 16px | 1 |
| xl | 20px | 9 |
| full | 32px | 1 |
| full | 50px | 34 |
| full | 500px | 41 |
| full | 9999px | 106 |

## Box Shadows

**sm (inset)** — blur: 0px
```css
box-shadow: rgb(124, 124, 124) 0px 0px 0px 1px inset;
```

**xs (inset)** — blur: 0px
```css
box-shadow: rgb(18, 18, 18) 0px 1px 0px 0px, rgb(124, 124, 124) 0px 0px 0px 1px inset;
```

**sm** — blur: 5px
```css
box-shadow: rgb(128, 128, 128) 0px 0px 5px 0px;
```

**sm** — blur: 4px
```css
box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px 0px;
```

**md** — blur: 5px
```css
box-shadow: rgb(199, 197, 199) -3px -3px 5px -2px;
```

**md** — blur: 10px
```css
box-shadow: rgb(153, 153, 153) 0px 2px 10px -3px;
```

**md** — blur: 12px
```css
box-shadow: rgb(199, 197, 199) 0px 0px 12px 2px;
```

**md** — blur: 8px
```css
box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 8px 0px;
```

**lg** — blur: 18px
```css
box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 18px 0px;
```

**lg** — blur: 24px
```css
box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 24px 0px;
```

## CSS Custom Properties

### Colors

```css
--start-gradient-color: rgb(0, 0, 0);
--encore-border-width-focus: 2px;
--encore-border-width-thick: 4px;
--encore-border-radius-rounded: 9999px;
--encore-border-width-hairline: 1px;
--encore-border-width-thin: 2px;
--encore-z-index-popover: 1060;
--end-gradient-color: rgb(0, 0, 0);
--gradient-color-bottom: rgb(24, 24, 24);
--text-bright-accent: #1ed760;
--essential-bright-accent: #1ed760;
--encore-border-width-thicker: 8px;
```

### Spacing

```css
--encore-control-size-larger: 56px;
--encore-layout-margin-tighter: 24px;
--encore-text-size-smaller-2: .75rem;
--encore-graphic-size-informative-smaller: 1rem;
--content-spacing: 16px;
--encore-text-size-larger-3: 3rem;
--encore-text-size-larger-5: 6rem;
--encore-spacing-looser-4: 64px;
--encore-layout-margin-looser: 64px;
--encore-graphic-size-decorative-smaller-2: 12px;
--encore-text-size-base: 1rem;
--encore-graphic-size-informative-smaller-2: .75rem;
--encore-graphic-size-decorative-larger-5: 88px;
--encore-spacing-looser-6: 128px;
--encore-graphic-size-decorative-larger-3: 48px;
--encore-graphic-size-decorative-larger: 32px;
--encore-spacing-looser-5: 96px;
--encore-spacing-tighter-5: 2px;
--encore-graphic-size-decorative-larger-2: 40px;
--encore-spacing-tighter-2: 8px;
--encore-graphic-size-informative-larger-2: 2.5rem;
--encore-layout-margin-base: 32px;
--encore-spacing-looser-2: 32px;
--encore-text-size-larger-4: 4rem;
--encore-text-size-large: 1.25rem;
--encore-graphic-size-informative-larger-3: 3rem;
--encore-graphic-size-informative-larger-4: 4rem;
--encore-control-size-base: 48px;
--encore-spacing-tighter-4: 4px;
--encore-control-size-smaller: 32px;
--encore-graphic-size-informative-larger: 2rem;
--encore-text-size-larger-2: 2rem;
--encore-graphic-size-decorative-smaller: 16px;
--encore-spacing-looser: 24px;
--encore-spacing-looser-3: 48px;
--encore-text-size-larger: 1.5rem;
--encore-graphic-size-decorative-base: 24px;
--encore-graphic-size-informative-base: 1.5rem;
--encore-graphic-size-decorative-larger-4: 64px;
--encore-spacing-tighter: 12px;
--encore-spacing-base: 16px;
--encore-graphic-size-informative-larger-5: 5.5rem;
--encore-spacing-tighter-3: 6px;
--encore-text-size-smaller: .875rem;
--encore-text-size-smaller-3: .625rem;
```

### Typography

```css
--text-negative: #f3727f;
--encore-title-font-stack: SpotifyMixUITitle,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,Helvetica Neue,helvetica,arial,Hiragino Sans,Hiragino Kaku Gothic ProN,Meiryo,MS Gothic;
--encore-body-font-stack: SpotifyMixUI,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,Helvetica Neue,helvetica,arial,Hiragino Sans,Hiragino Kaku Gothic ProN,Meiryo,MS Gothic;
--text-subdued: #b3b3b3;
--encore-variable-font-stack: SpotifyMixUITitleVariable,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,Helvetica Neue,helvetica,arial,Hiragino Sans,Hiragino Kaku Gothic ProN,Meiryo,MS Gothic;
--text-warning: #ffa42b;
--text-positive: #1ed760;
--encore-bodyMono-font-stack: SpotifyMixMono,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,Helvetica Neue,helvetica,arial,Hiragino Sans,Hiragino Kaku Gothic ProN,Meiryo,MS Gothic;
--fallback-fonts: Helvetica Neue,helvetica,arial,Hiragino Sans,Hiragino Kaku Gothic ProN,Meiryo,MS Gothic;
--text-announcement: #539df5;
--text-base: #fff;
```

### Shadows

```css
--encore-overlay-drop-shadow: 0 4px 6px #0000004d;
--encore-overlay-box-shadow: 0 4px 12px 0 #0000004d;
--encore-focus-box-shadow: 0 3px 0 0;
```

### Radii

```css
--encore-corner-radius-larger-2: 8px;
--encore-corner-radius-larger: 6px;
--encore-corner-radius-base: 4px;
--encore-corner-radius-smaller: 2px;
--encore-corner-radius-larger-3: 16px;
```

### Other

```css
--essential-announcement: #1278f2;
--right-sidebar-width: 0;
--background-base: #121212;
--background-elevated-press: #191919;
--scrollAnimationRangeStart: 0px;
--os-viewport-percent: 0;
--encore-shortest-1: 50ms;
--background-elevated-highlight: #2a2a2a;
--encore-shortest-4: .2s;
--cinema-canvas-distance-from-top: 0px;
--encore-productive-accelerate: cubic-bezier(.8,0,1,1);
--encore-sidebar-base-width: 200px;
--encore-shortest-3: .15s;
--decorative-subdued: #292929;
--background-press: #000;
--essential-base: #fff;
--essential-positive: #1ed760;
--essential-subdued: #7c7c7c;
--encore-opacity-disabled: .3;
--encore-productive-exit-duration: .2s;
--background-highlight: #1f1f1f;
--encore-opacity-active: .7;
--essential-warning: #ffa42b;
--encore-z-index-dialog: 1050;
--encore-short-1: .25s;
--encore-z-index-skiplink: 9999;
--decorative-base: #fff;
--encore-button-hover-scale: 1.04;
--encore-short-2: .3s;
--scrollAnimationRangeEnd: 0px;
--cinema-media-height: 0px;
--background-tinted-press: #ffffff36;
--background-noise: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICAgPGZpbHRlciBpZD0ibiIgeD0iMCIgeT0iMCI+CiAgICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiAvPgogICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiAvPgogICA8L2ZpbHRlcj4KICAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC4wNSIgLz4KPC9zdmc+);
--encore-productive-decelerate: cubic-bezier(0,0,.2,1);
--encore-productive-exit: .2s/**/cubic-bezier(.8,0,1,1);
--left-sidebar-width: 232;
--background-elevated-base: #1f1f1f;
--os-scroll-percent: 0;
--background-tinted-highlight: #ffffff24;
--cinema-canvas-height: 0px;
--marquee-width: 0px;
--cinema-media-distance-from-top: 0px;
--background-tinted-base: #ffffff1a;
--encore-productive: cubic-bezier(.3,0,0,1);
--essential-negative: #ed2c3f;
--encore-shortest-2: .1s;
--top-bar-z-index: 1;
--content-max-width: 1955px;
--encore-productive-enter: .25s/**/cubic-bezier(0,0,.2,1);
--onboarding-circle-percentage: 0%;
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
| 400px | 400px | min-width |
| sm | 425px | min-width |
| sm | 426px | min-width |
| sm | 500px | max-width |
| sm | 530px | max-width |
| 550px | 550px | max-width |
| sm | 600px | max-width |
| md | 768px | min-width |
| md | 769px | min-width |
| 890px | 890px | min-width |
| 896px | 896px | max-width |
| 897px | 897px | min-width |
| lg | 992px | min-width |
| lg | 1023px | max-width |
| lg | 1024px | min-width |
| xl | 1280px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.3s`, `0.5s`, `0.2s`, `0.22s`, `0.1s`, `0.15s`, `1s`, `0.25s`

### Common Transitions

```css
transition: all;
transition: right 0.3s;
transition: background 0.5s cubic-bezier(0.3, 0, 0.4, 1);
transition: opacity 0.3s ease-in;
transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
transition: width 0.22s ease-in;
transition: color 0.22s ease-in;
transition: box-shadow 0.22s ease-in, background 0.22s ease-in, color 0.22s ease-in;
transition: opacity 0.22s ease-in-out;
transition: opacity 0.1s ease-in;
```

### Keyframe Animations

**onetrust-fade-in**
```css
@keyframes onetrust-fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**slide-down-custom**
```css
@keyframes slide-down-custom {
  0% {  }
  100% { bottom: 0px; }
}
```

**slide-down-custom**
```css
@keyframes slide-down-custom {
  0% {  }
  100% { bottom: 0px; }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (183 instances)

```css
.button {
  background-color: rgb(41, 41, 41);
  color: rgb(179, 179, 179);
  font-size: 13.3333px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Cards (244 instances)

```css
.card {
  background-color: rgb(51, 51, 51);
  border-radius: 0px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 24px 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Inputs (20 instances)

```css
.input {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  border-radius: 0px;
  font-size: 13.3333px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (326 instances)

```css
.link {
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
}
```

### Navigation (17 instances)

```css
.navigatio {
  background-color: rgb(18, 18, 18);
  color: rgb(105, 105, 105);
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  position: static;
}
```

### Footer (20 instances)

```css
.foote {
  background-color: rgb(18, 18, 18);
  color: rgb(179, 179, 179);
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 12px;
}
```

### Modals (15 instances)

```css
.modal {
  background-color: rgb(40, 40, 40);
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
  max-width: 978px;
}
```

### Badges (1 instances)

```css
.badge {
  color: rgb(128, 128, 128);
  font-size: 16px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 0px;
}
```

### Accordions (10 instances)

```css
.accordion {
  color: rgb(179, 179, 179);
  font-size: 16px;
  padding-top: 0px;
  padding-right: 0px;
  border-color: rgb(179, 179, 179) rgb(216, 216, 216) rgb(216, 216, 216);
}
```

### Switches (28 instances)

```css
.switche {
  background-color: rgb(70, 130, 84);
  border-radius: 0px;
  border-color: rgb(179, 179, 179);
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 47 instances, 3 variants

**Variant 1** (1 instance)

```css
  background: rgb(31, 31, 31);
  color: rgb(255, 255, 255);
  padding: 12px 12px 12px 12px;
  border-radius: 50%;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (45 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(179, 179, 179);
  padding: 12px 12px 12px 12px;
  border-radius: 9999px;
  border: 0px none rgb(179, 179, 179);
  font-size: 16px;
  font-weight: 400;
```

**Variant 3** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(179, 179, 179);
  padding: 8px 8px 8px 8px;
  border-radius: 50%;
  border: 0px none rgb(179, 179, 179);
  font-size: 16px;
  font-weight: 400;
```

### Button — 45 instances, 3 variants

**Variant 1** (10 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

**Variant 2** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(179, 179, 179);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(179, 179, 179);
  font-size: 14px;
  font-weight: 700;
```

**Variant 3** (34 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(0, 0, 0);
  font-size: 13.3333px;
  font-weight: 400;
```

### Input — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(31, 31, 31);
  color: rgb(255, 255, 255);
  padding: 12px 96px 12px 48px;
  border-radius: 500px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(179, 179, 179);
  padding: 8px 0px 8px 0px;
  border-radius: 9999px;
  border: 0px none rgb(179, 179, 179);
  font-size: 16px;
  font-weight: 700;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(179, 179, 179);
  padding: 4px 16px 4px 36px;
  border-radius: 9999px;
  border: 0px none rgb(179, 179, 179);
  font-size: 14px;
  font-weight: 700;
```

### Button — 4 instances, 1 variant

**Variant 1** (4 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  padding: 8px 32px 8px 32px;
  border-radius: 9999px;
  border: 0px none rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 700;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(31, 31, 31);
  color: rgb(179, 179, 179);
  padding: 8px 8px 8px 8px;
  border-radius: 9999px;
  border: 0px none rgb(179, 179, 179);
  font-size: 13.3333px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(0, 0, 238);
  padding: 0px 0px 0px 0px;
  border-radius: 9999px;
  border: 0px none rgb(0, 0, 238);
  font-size: 14px;
  font-weight: 700;
```

### Button — 34 instances, 1 variant

**Variant 1** (34 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  padding: 0px 0px 0px 0px;
  border-radius: 9999px;
  border: 0px none rgb(0, 0, 0);
  font-size: 13.3333px;
  font-weight: 400;
```

### Card — 33 instances, 1 variant

**Variant 1** (33 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 12px 12px 12px 12px;
  border-radius: 6px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Button — 33 instances, 1 variant

**Variant 1** (33 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Card — 32 instances, 1 variant

**Variant 1** (32 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Card — 32 instances, 1 variant

**Variant 1** (32 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

### Card — 32 instances, 1 variant

**Variant 1** (32 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**13 grid containers** and **651 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1955px | 40px |
| 100% | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 1-column | 5x |
| 10-column | 2x |
| 3-column | 1x |
| 20-column | 1x |
| 2-column | 1x |

### Grid Templates

```css
grid-template-columns: 294px 954px 0px;
gap: 8px;
grid-template-columns: 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 177.719px 225.719px;
grid-template-columns: 1264px;
grid-template-columns: none;
grid-template-columns: none;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| column/nowrap | 218x |
| row/nowrap | 430x |
| row/wrap | 3x |

**Gap values:** `12px`, `16px`, `16px 32px`, `20px`, `24px`, `2px`, `4px`, `8px`, `8px 12px`, `8px normal`, `normal 12px`

## Accessibility (WCAG 2.1)

**Overall Score: 88%** — 7 passing, 1 failing color pairs

### Failing Color Pairs

| Foreground | Background | Ratio | Level | Used On |
|------------|------------|-------|-------|---------|
| `#ffffff` | `#1db954` | 2.59:1 | FAIL | button (1x) |

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#000000` | `#ffffff` | 21:1 | AAA |
| `#ffffff` | `#346e4a` | 6.04:1 | AA |

## Design System Score

**Overall: 75/100 (Grade: C)**

| Category | Score |
|----------|-------|
| Color Discipline | 65/100 |
| Typography Consistency | 80/100 |
| Spacing System | 70/100 |
| Shadow Consistency | 90/100 |
| Border Radius Consistency | 80/100 |
| Accessibility | 88/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Clean elevation system, Good CSS variable tokenization

**Issues:**
- 1 WCAG contrast failures
- 175 !important rules — prefer specificity over overrides
- 71% of CSS is unused — consider purging
- 12418 duplicate CSS declarations

## Gradients

**3 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | to right | 4 | bold |
| linear | 90deg | 2 | brand |
| linear | — | 2 | brand |

```css
background: linear-gradient(to right, rgba(0, 0, 0, 0) 0px, rgb(42, 42, 42) 10%, rgb(42, 42, 42) 90%, rgba(0, 0, 0, 0) 100%);
background: linear-gradient(90deg, rgb(175, 40, 150), rgb(80, 155, 245));
background: linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgb(18, 18, 18) 100%);
```

## Z-Index Map

**14 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 9999,2147483647 | a.e.-.1.0.4.5.1.-.s.k.i.p.-.l.i.n.k. .e.n.c.o.r.e.-.i.n.v.e.r.t.e.d.-.s.e.t, div.o.t.F.l.a.t. .b.o.t.t.o.m. .o.t.-.w.o.-.t.i.t.l.e. .v.e.r.t.i.c.a.l.-.a.l.i.g.n.-.c.o.n.t.e.n.t, div.o.n.e.t.r.u.s.t.-.p.c.-.d.a.r.k.-.f.i.l.t.e.r. .o.t.-.h.i.d.e. .o.t.-.f.a.d.e.-.i.n |
| dropdown | 100,100 | div.R.x.l.w.J.6.t.C.p.4.g.6.A.A.A.H, div.R.x.l.w.J.6.t.C.p.4.g.6.A.A.A.H |
| base | -1,7 | div.Q.7.c.i.R.0.k.A.s.u.k.i.C.p.r.c, div, div |

**Issues:**
- [object Object]

## SVG Icons

**20 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| sm | 15 |
| md | 4 |
| lg | 1 |

**Icon colors:** `rgb(255, 255, 255)`, `rgba(0, 0, 0, 0)`, `rgb(179, 179, 179)`, `rgb(0, 0, 0)`, `rgba(255, 255, 255, 0.7)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| CircularSp-Deva | self-hosted | 400, 700, 800 | normal |
| CircularSp-Grek | self-hosted | 400, 700, 800 | normal |
| CircularSp-Arab | self-hosted | 400, 700, 800 | normal |
| CircularSp-Cyrl | self-hosted | 400, 700, 800 | normal |
| CircularSp-Hebr | self-hosted | 400, 700, 800 | normal |
| SpotifyMixUI | self-hosted | 400, 700 | normal |
| SpotifyMixUITitle | self-hosted | 700, 800 | normal |
| SpotifyMixUITitleVariable | self-hosted | 100 1000 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 92 | objectFit: fill, borderRadius: 0px, shape: square |
| general | 10 | objectFit: cover, borderRadius: 50%, shape: circular |

**Aspect ratios:** 1:1 (102x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |
| `lg` | `500ms` | 500 |
| `xl` | `1s` | 1000 |

### Easing Families

- **custom** (132 uses) — `cubic-bezier(0.3, 0, 0.4, 1)`, `cubic-bezier(0.3, 0, 0, 1)`
- **ease-in-out** (90 uses) — `ease`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `onetrust-fade-in` | fade | opacity | 2 |

## Component Anatomy

### button — 170 instances

**Slots:** label, icon
**Variants:** tertiary · primary · secondary
**Sizes:** medium · small

| variant | count | sample label |
|---|---|---|
| default | 117 | Log in |
| primary | 38 | Log in |
| tertiary | 14 | Premium |
| secondary | 1 | English |

### card — 129 instances

**Slots:** media, footer
**Sizes:** medium

## Brand Voice

**Tone:** friendly · **Pronoun:** you-only · **Headings:** Sentence case (tight)

### Top CTA Verbs

- **sign** (3)
- **log** (2)
- **create** (2)
- **browse** (2)
- **premium** (1)
- **support** (1)
- **download** (1)
- **install** (1)

### Button Copy Patterns

- "log in" (2×)
- "create playlist" (2×)
- "browse podcasts" (2×)
- "sign up free" (2×)
- "premium" (1×)
- "support" (1×)
- "download" (1×)
- "install app" (1×)
- "sign up" (1×)
- "english" (1×)

### Sample Headings

> Your Library
> Your Library
> Home
> Trending songs
> Popular artists
> Popular albums and singles
> Home
> Trending songs
> Popular artists
> Popular albums and singles

## Page Intent

**Type:** `landing` (confidence 0.29)
**Description:** Spotify is a digital music service that gives you access to millions of songs.

Alternates: legal (0.4), blog-post (0.35)

## Section Roles

Reading order (top→bottom): content → content → content → content → content → nav → nav → pricing → testimonials → hero → content → content → content → hero → cta → nav

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | Your Library | 0.9 |
| 1 | nav | Your Library | 0.4 |
| 2 | content | — | 0.3 |
| 3 | content | — | 0.3 |
| 4 | cta | — | 0.75 |
| 5 | pricing | Home | 0.4 |
| 6 | testimonials | Home | 0.4 |
| 7 | hero | Trending songs | 0.85 |
| 8 | content | Popular artists | 0.3 |
| 9 | hero | Popular albums and singles | 0.4 |
| 10 | nav | — | 0.9 |
| 11 | content | Location | 0.3 |
| 12 | content |  Manage Consent Preferences | 0.3 |
| 13 | content | Cookie List | 0.3 |
| 14 | content | — | 0.3 |
| 15 | content | — | 0.3 |

## Material Language

**Label:** `material-you` (confidence 0.45)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.5 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 9999px |
| backdrop-filter in use | no |
| Gradients | 3 |

## Imagery Style

**Label:** `flat-illustration` (confidence 0.013)
**Counts:** total 102, svg 62, icon 62, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** soft

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `SpotifyMixUI` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
