# Design Language: Airbnb | Vacation rentals, cabins, beach houses, & more

> Extracted from `https://airbnb.com` on June 12, 2026
> 1026 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#ff385c` | rgb(255, 56, 92) | hsl(349, 100%, 61%) | 14 |
| Secondary | `#e00b41` | rgb(224, 11, 65) | hsl(345, 91%, 46%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#222222` | hsl(0, 0%, 13%) | 1262 |
| `#6a6a6a` | hsl(0, 0%, 42%) | 416 |
| `#000000` | hsl(0, 0%, 0%) | 335 |
| `#ffffff` | hsl(0, 0%, 100%) | 26 |
| `#dddddd` | hsl(0, 0%, 87%) | 6 |
| `#ebebeb` | hsl(0, 0%, 92%) | 4 |

### Background Colors

Used on large-area elements: `#ffffff`, `#ebebeb`, `#000000`, `#f7f7f7`

### Text Colors

Text color palette: `#000000`, `#222222`, `#ff385c`, `#ffffff`, `#6a6a6a`

### Gradients

```css
background-image: linear-gradient(357.5deg, rgb(62, 86, 124) 1.59%, rgb(58, 84, 117) 21.23%, rgb(45, 60, 91) 58.6%, rgb(128, 157, 192) 97.4%);
```

```css
background-image: linear-gradient(173.86deg, rgba(255, 255, 255, 0.9) 90.56%, rgba(191, 205, 213, 0.9) 82.32%);
```

```css
background-image: linear-gradient(to top, rgb(255, 255, 255), rgba(0, 0, 0, 0) 50%);
```

```css
background-image: radial-gradient(50% 50%, rgb(255, 248, 223) 0%, rgba(255, 254, 224, 0.2) 51.5%, rgba(255, 250, 225, 0) 100%);
```

```css
background-image: linear-gradient(rgb(255, 255, 255) 39.9%, rgb(248, 248, 248) 100%);
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#222222` | text, border, background | 1262 |
| `#6a6a6a` | text, border | 416 |
| `#000000` | text, border, background | 335 |
| `#ffffff` | background, text, border | 26 |
| `#ff385c` | text, border | 14 |
| `#dddddd` | border, background | 6 |
| `#ebebeb` | background, border | 4 |
| `#e00b41` | background | 1 |

## Typography

### Font Families

- **Airbnb Cereal VF** — used for all (859 elements)
- **Times** — used for body (167 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 28px | 1.75rem | 700 | 40.04px | normal | h1 |
| 22px | 1.375rem | 500 | 26px | -0.44px | h2 |
| 21px | 1.3125rem | 700 | 30.03px | normal | h2 |
| 16px | 1rem | 400 | normal | normal | html, head, meta, link |
| 14px | 0.875rem | 400 | 20.02px | normal | body, div, a, svg |
| 12px | 0.75rem | 500 | 16px | normal | div |
| 8px | 0.5rem | 400 | 11.44px | normal | span |

### Heading Scale

```css
h1 { font-size: 28px; font-weight: 700; line-height: 40.04px; }
h2 { font-size: 22px; font-weight: 500; line-height: 26px; }
h2 { font-size: 21px; font-weight: 700; line-height: 30.03px; }
h3 { font-size: 14px; font-weight: 400; line-height: 20.02px; }
```

### Body Text

```css
body { font-size: 14px; font-weight: 400; line-height: 20.02px; }
```

### Font Weights in Use

`400` (839x), `500` (177x), `700` (10x)

## Spacing

**Base unit:** 2px

| Token | Value | Rem |
|-------|-------|-----|
| spacing-2 | 2px | 0.125rem |
| spacing-15 | 15px | 0.9375rem |
| spacing-20 | 20px | 1.25rem |
| spacing-32 | 32px | 2rem |
| spacing-35 | 35px | 2.1875rem |
| spacing-48 | 48px | 3rem |
| spacing-80 | 80px | 5rem |
| spacing-131 | 131px | 8.1875rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 2px | 2 |
| md | 8px | 20 |
| xl | 20px | 1 |
| full | 32px | 5 |
| full | 50px | 13 |
| full | 100px | 3 |

## Box Shadows

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 8px 24px 0px;
```

**xs (inset)** — blur: 1.90791px
```css
box-shadow: rgba(60, 77, 107, 0.25) 0px 0.953955px 1.90791px 0px, rgba(60, 77, 107, 0.25) 0px 3.81582px 5.72373px 0px, rgb(0, 28, 64) 0px 0px 2px 0.5px inset, rgb(215, 235, 255) 0px -1px 3px 0px inset;
```

## CSS Custom Properties

### Colors

```css
--corner-radius-tiny4px-border-radius: 4px;
--corner-radius-small8px-border-radius: 8px;
--corner-radius-medium12px-border-radius: 12px;
--corner-radius-large16px-border-radius: 16px;
--corner-radius-xlarge20px-border-radius: 20px;
--corner-radius-xxlarge24px-border-radius: 24px;
--corner-radius-xxlarge28px-border-radius: 28px;
--corner-radius-xxxlarge32px-border-radius: 32px;
--elevation-high-border: 1px solid rgba(0,0,0,0.04);
--elevation-primary-box-shadow: 0 6px 20px rgba(0,0,0,0.2);
--elevation-primary-border: 1px solid rgba(0,0,0,0.04);
--elevation-secondary-box-shadow: 0 6px 16px rgba(0,0,0,0.12);
--elevation-secondary-border: 1px solid rgba(0,0,0,0.04);
--elevation-tertiary-border: 1px solid rgba(0,0,0,0.08);
--motion-springs-fast-duration: 451.75438596491193ms;
--motion-springs-fast-easing: linear(0,0.18557241650572898,0.46530560393651493,0.6823338821577483,0.8223254801509006,0.9049744175651648,0.951288850000914,0.9763638545339052,0.9896118636450829,0.9964846505475399,1);
--motion-springs-fast-source-mass: 1px;
--motion-springs-fast-source-damping: 35px;
--motion-springs-fast-source-stiffness: 300px;
--motion-springs-standard-duration: 583.7719298245607ms;
--motion-springs-standard-easing: linear(0,0.15794349142280711,0.4146686698630492,0.6303103850844771,0.7802275692100804,0.8751011408890221,0.9317564666924485,0.9642434451985746,0.9823049252758026,0.992097579596505,0.9972943925635941,1);
--motion-springs-standard-source-mass: 1px;
--motion-springs-standard-source-damping: 26px;
--motion-springs-standard-source-stiffness: 175px;
--motion-springs-medium-bounce-duration: 574.1228070175433ms;
--motion-springs-medium-bounce-easing: linear(0,0.17056804830171035,0.47921259292635127,0.749704997553311,0.9261583179716212,1.0149357719696455,1.0442328379057395,1.042269832870079,1.028981085732054,1.0152861473492045,1.0054622129208994,1);
--motion-springs-medium-bounce-source-mass: 1px;
--motion-springs-medium-bounce-source-damping: 18.5px;
--motion-springs-medium-bounce-source-stiffness: 175px;
--motion-springs-fast-bounce-duration: 449.12280701754327ms;
--motion-springs-fast-bounce-easing: linear(0,0.25484239226416866,0.643483807710504,0.9061742021274407,1.0208040643586513,1.043750765143047,1.0303012036555117,1.0119725530453332,1);
--motion-springs-fast-bounce-source-mass: 1px;
--motion-springs-fast-bounce-source-damping: 22px;
--motion-springs-fast-bounce-source-stiffness: 250px;
--motion-springs-slow-duration: 745.6140350877179ms;
--motion-springs-slow-easing: linear(0,0.1726495179466309,0.44139132340393467,0.6575338740242772,0.8021357455779029,0.890693569261087,0.9421755177398626,0.9710919896728034,0.9869420351097642,0.9954729340379553,1);
--motion-springs-slow-source-mass: 1px;
--motion-springs-slow-source-damping: 20px;
--motion-springs-slow-source-stiffness: 100px;
--motion-springs-slow-bounce-duration: 762.2807017543847ms;
--motion-springs-slow-bounce-easing: linear(0,0.17157063121773947,0.4812770425544863,0.7518340186858384,0.9276145377206974,1.0155374835651005,1.0441834344763297,1.0418987538382922,1.028565879063093,1.0149848580762686,1.005322404392434,1);
--motion-springs-slow-bounce-source-mass: 1px;
--motion-springs-slow-bounce-source-damping: 14px;
--motion-springs-slow-bounce-source-stiffness: 100px;
--palette-bg-primary: #FFFFFF;
--palette-bg-primary-disabled: #F7F7F7;
--palette-bg-primary-hover: #F7F7F7;
--palette-bg-primary-selected: #F7F7F7;
--palette-bg-primary-error: #FFF8F6;
--palette-bg-primary-core: #FF385C;
--palette-bg-primary-luxe: #460479;
--palette-bg-primary-plus: #92174D;
--palette-bg-primary-inverse: #222222;
--palette-bg-primary-inverse-hover: #000000;
--palette-bg-primary-inverse-disabled: #DDDDDD;
--palette-bg-primary-inverse-error: #C13515;
--palette-bg-primary-inverse-error-hover: #B32505;
--palette-bg-secondary: #F7F7F7;
--palette-bg-secondary-core: linear-gradient(to right,#E61E4D 0%,#E31C5F 50%,#D70466 100%);
--palette-bg-secondary-core-rtl: linear-gradient(to left,#E61E4D 0%,#E31C5F 50%,#D70466 100%);
--palette-bg-secondary-plus: linear-gradient(to right,#BD1E59 0%,#92174D 50%,#861453 100%);
--palette-bg-secondary-plus-rtl: linear-gradient(to left,#BD1E59 0%,#92174D 50%,#861453 100%);
--palette-bg-secondary-luxe: linear-gradient(to right,#59086E 0%,#460479 50%,#440589 100%);
--palette-bg-secondary-luxe-rtl: linear-gradient(to left,#59086E 0%,#460479 50%,#440589 100%);
--palette-bg-secondary-core-hover: radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%);
--palette-bg-secondary-plus-hover: radial-gradient(circle at center,#D70466 0%,#BD1E59 30%,#92174D 55%,#861453 72.5%,#6C0D63 90%,#6C0D63 100%);
--palette-bg-secondary-luxe-hover: radial-gradient(circle at center,#6C0D63 0%,#59086E 30%,#460479 55%,#440589 72.5%,#3B07BB 90%,#3B07BB 100%);
--palette-bg-tertiary: #B0B0B0;
--palette-bg-tertiary-hover: #6A6A6A;
--palette-bg-tertiary-disabled: #EBEBEB;
--palette-bg-tertiary-core: #E00B41;
--palette-bg-quaternary: #F2F2F2;
--palette-bg-quaternary-hover: #EBEBEB;
--palette-text-primary: #222222;
--palette-text-primary-disabled: #DDDDDD;
--palette-text-primary-hover: #000000;
--palette-text-primary-error: #C13515;
--palette-text-primary-error-hover: #B32505;
--palette-text-primary-inverse: #FFFFFF;
--palette-text-primary-core: linear-gradient(to right,#E61E4D 0%,#E31C5F 50%,#D70466 100%);
--palette-text-secondary: #6A6A6A;
--palette-text-secondary-disabled: #DDDDDD;
--palette-text-secondary-error: #C13515;
--palette-text-secondary-error-hover: #B32505;
--palette-icon-primary: #222222;
--palette-icon-primary-disabled: #DDDDDD;
--palette-icon-primary-hover: #000000;
--palette-icon-primary-error: #C13515;
--palette-icon-primary-error-hover: #B32505;
--palette-icon-primary-inverse: #FFFFFF;
--palette-icon-secondary: #6A6A6A;
--palette-icon-secondary-hover: #222222;
--palette-icon-secondary-selected: #222222;
--palette-icon-secondary-disabled: #F7F7F7;
--palette-border-primary: #222222;
--palette-border-primary-hover: #000000;
--palette-border-primary-disabled: #DDDDDD;
--palette-border-primary-inverse: #FFFFFF;
--palette-border-secondary: #B0B0B0;
--palette-border-secondary-hover: #222222;
--palette-border-secondary-selected: #222222;
--palette-border-secondary-disabled: #EBEBEB;
--palette-border-secondary-error: #C13515;
--palette-border-tertiary: #DDDDDD;
--palette-border-tertiary-hover: #000000;
--palette-border-tertiary-selected: #222222;
--palette-border-tertiary-error: #C13515;
--palette-border-tertiary-error-hover: #B32505;
--palette-border-quarternary: #8C8C8C;
--material-backgrounds-extra-thin-background-color: rgba(218,218,218,0.40);
--material-backgrounds-thin-background-color: rgba(240,240,240,0.50);
--material-backgrounds-regular-background-color: rgba(250,250,250,0.72);
--material-backgrounds-thick-background-color: rgba(240,240,240,0.86);
--material-backgrounds-extra-thick-background-color: rgba(255,255,255,0.925);
```

### Spacing

```css
--spacing-macro16px: 16px;
--spacing-macro24px: 24px;
--spacing-macro32px: 32px;
--spacing-macro40px: 40px;
--spacing-macro48px: 48px;
--spacing-macro64px: 64px;
--spacing-macro80px: 80px;
--spacing-micro2px: 2px;
--spacing-micro4px: 4px;
--spacing-micro8px: 8px;
--spacing-micro12px: 12px;
--spacing-micro16px: 16px;
--spacing-micro24px: 24px;
--spacing-micro32px: 32px;
--typography-special-display-medium_40_44-font-size: 2.5rem;
--typography-special-display-medium_40_44-letter-spacing: normal;
--typography-special-display-medium_48_54-font-size: 3rem;
--typography-special-display-medium_48_54-letter-spacing: normal;
--typography-special-display-medium_60_68-font-size: 3.75rem;
--typography-special-display-medium_60_68-letter-spacing: normal;
--typography-special-display-medium_72_74-font-size: 4.5rem;
--typography-special-display-medium_72_74-letter-spacing: normal;
--typography-titles-semibold_14_18-font-size: 0.875rem;
--typography-titles-semibold_14_18-letter-spacing: normal;
--typography-titles-semibold_16_20-font-size: 1rem;
--typography-titles-semibold_16_20-letter-spacing: normal;
--typography-titles-semibold_18_24-font-size: 1.125rem;
--typography-titles-semibold_18_24-letter-spacing: normal;
--typography-titles-semibold_22_26-font-size: 1.375rem;
--typography-titles-semibold_22_26-letter-spacing: normal;
--typography-titles-semibold_26_30-font-size: 1.625rem;
--typography-titles-semibold_26_30-letter-spacing: normal;
--typography-titles-semibold_32_36-font-size: 2rem;
--typography-titles-semibold_32_36-letter-spacing: normal;
--typography-titles-medium_14_18-font-size: 0.875rem;
--typography-titles-medium_14_18-letter-spacing: normal;
--typography-titles-medium_16_20-font-size: 1rem;
--typography-titles-medium_16_20-letter-spacing: normal;
--typography-titles-medium_18_24-font-size: 1.125rem;
--typography-titles-medium_18_24-letter-spacing: normal;
--typography-subtitles-book_14_18-font-size: 0.875rem;
--typography-subtitles-book_14_18-letter-spacing: normal;
--typography-subtitles-book_16_22-font-size: 1rem;
--typography-subtitles-book_16_22-letter-spacing: normal;
--typography-subtitles-book_18_24-font-size: 1.125rem;
--typography-subtitles-book_18_24-letter-spacing: normal;
--typography-body-paragraphs-text_14_20-font-size: 0.875rem;
--typography-body-paragraphs-text_14_20-letter-spacing: normal;
--typography-body-paragraphs-text_16_22-font-size: 1rem;
--typography-body-paragraphs-text_16_22-letter-spacing: normal;
--typography-body-paragraphs-text_16_24-font-size: 1rem;
--typography-body-paragraphs-text_16_24-letter-spacing: normal;
--typography-body-paragraphs-text_18_28-font-size: 1.125rem;
--typography-body-paragraphs-text_18_28-letter-spacing: normal;
--typography-body-text_11_15-font-size: 0.6875rem;
--typography-body-text_11_15-letter-spacing: normal;
--typography-body-text_12_16-font-size: 0.75rem;
--typography-body-text_12_16-letter-spacing: normal;
--typography-body-text_14_18-font-size: 0.875rem;
--typography-body-text_14_18-letter-spacing: normal;
--typography-body-text_16_20-font-size: 1rem;
--typography-body-text_16_20-letter-spacing: normal;
--typography-body-text_18_24-font-size: 1.125rem;
--typography-body-text_18_24-letter-spacing: normal;
--typography-caption-text_12_16-font-size: 0.75rem;
--typography-caption-text_12_16-letter-spacing: normal;
--typography-tracking-normal-letter-spacing: normal;
--typography-tracking-wide-letter-spacing: 0.04em;
--typography-base-extra-small10px-font-size: 0.625rem;
--typography-base-extra-small10px-letter-spacing: normal;
```

### Typography

```css
--palette-text-legal: #428BFF;
--palette-text-link-disabled: #929292;
--palette-text-focused: #3F3F3F;
--palette-text-material-disabled: rgba(0,0,0,0.24);
--typography-font-family-cereal-font-family: 'Airbnb Cereal VF','Circular',-apple-system,'BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
--typography-special-display-medium_40_44-line-height: 2.75rem;
--typography-special-display-medium_40_44-font-weight: 600;
--typography-special-display-medium_48_54-line-height: 3.375rem;
--typography-special-display-medium_48_54-font-weight: 600;
--typography-special-display-medium_60_68-line-height: 4.25rem;
--typography-special-display-medium_60_68-font-weight: 600;
--typography-special-display-medium_72_74-line-height: 4.625rem;
--typography-special-display-medium_72_74-font-weight: 600;
--typography-titles-semibold_14_18-line-height: 1.125rem;
--typography-titles-semibold_14_18-font-weight: 600;
--typography-titles-semibold_16_20-line-height: 1.25rem;
--typography-titles-semibold_16_20-font-weight: 600;
--typography-titles-semibold_18_24-line-height: 1.5rem;
--typography-titles-semibold_18_24-font-weight: 600;
--typography-titles-semibold_22_26-line-height: 1.625rem;
--typography-titles-semibold_22_26-font-weight: 600;
--typography-titles-semibold_26_30-line-height: 1.875rem;
--typography-titles-semibold_26_30-font-weight: 600;
--typography-titles-semibold_32_36-line-height: 2.25rem;
--typography-titles-semibold_32_36-font-weight: 600;
--typography-titles-medium_14_18-line-height: 1.125rem;
--typography-titles-medium_14_18-font-weight: 500;
--typography-titles-medium_16_20-line-height: 1.25rem;
--typography-titles-medium_16_20-font-weight: 500;
--typography-titles-medium_18_24-line-height: 1.5rem;
--typography-titles-medium_18_24-font-weight: 500;
--typography-subtitles-book_14_18-line-height: 1.125rem;
--typography-subtitles-book_14_18-font-weight: 400;
--typography-subtitles-book_16_22-line-height: 1.375rem;
--typography-subtitles-book_16_22-font-weight: 400;
--typography-subtitles-book_18_24-line-height: 1.5rem;
--typography-subtitles-book_18_24-font-weight: 400;
--typography-body-paragraphs-text_14_20-line-height: 1.25rem;
--typography-body-paragraphs-text_16_22-line-height: 1.375rem;
--typography-body-paragraphs-text_16_24-line-height: 1.5rem;
--typography-body-paragraphs-text_18_28-line-height: 1.75rem;
--typography-body-text_11_15-line-height: 0.9375rem;
--typography-body-text_12_16-line-height: 1rem;
--typography-body-text_14_18-line-height: 1.125rem;
--typography-body-text_16_20-line-height: 1.25rem;
--typography-body-text_18_24-line-height: 1.5rem;
--typography-caption-text_12_16-line-height: 1rem;
--typography-base-extra-small10px-line-height: 0.75rem;
```

### Shadows

```css
--elevation-high-box-shadow: 0 8px 28px rgba(0,0,0,0.28);
--elevation-tertiary-box-shadow: 0 2px 4px rgba(0,0,0,0.18);
--elevation-elevation0-box-shadow: 0px 0px 0px 1px #DDDDDD inset;
--elevation-elevation1-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.02),0px 2px 4px 0px rgba(0,0,0,0.16);
--elevation-elevation2-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.02),0px 2px 6px 0px rgba(0,0,0,0.04),0px 4px 8px 0px rgba(0,0,0,0.10);
--elevation-elevation3-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.02),0px 8px 24px 0px rgba(0,0,0,0.10);
--elevation-elevation4-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.02),0px 4px 8px 0px rgba(0,0,0,0.08),0px 12px 30px 0px rgba(0,0,0,0.12);
--elevation-elevation5-box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.02),0px 6px 8px 0px rgba(0,0,0,0.10),0px 16px 56px 0px rgba(0,0,0,0.18);
--palette-shadow50: rgba(0,0,0,0.04);
--palette-shadow100: rgba(0,0,0,0.08);
--palette-shadow150: rgba(0,0,0,0.12);
--palette-shadow200: rgba(0,0,0,0.135);
--palette-shadow250: rgba(0,0,0,0.18);
--palette-shadow300: rgba(0,0,0,0.20);
--palette-shadow350: rgba(0,0,0,0.28);
--palette-shadow600: rgba(0,0,0,0.60);
```

### Other

```css
--elevation-sharp-edge-background: rgba(0,0,0,0.08);
--motion-standard-curve-animation-timing-function: cubic-bezier(0.2,0,0,1);
--motion-enter-curve-animation-timing-function: cubic-bezier(0.1,0.9,0.2,1);
--motion-exit-curve-animation-timing-function: cubic-bezier(0.4,0,1,1);
--motion-linear-curve-animation-timing-function: cubic-bezier(0,0,1,1);
--palette-black: #000000;
--palette-hof: #222222;
--palette-foggy: #6A6A6A;
--palette-bobo: #B0B0B0;
--palette-deco: #DDDDDD;
--palette-bebe: #EBEBEB;
--palette-faint: #F7F7F7;
--palette-white: #FFFFFF;
--palette-arches: #C13515;
--palette-arches2: #B32505;
--palette-arches12: #FFF8F6;
--palette-capiz: #F7F6F2;
--palette-hapuna: #F5F1EA;
--palette-mykonou5: #428BFF;
--palette-ondo: #E07912;
--palette-spruce: #008A05;
--palette-rausch: #FF385C;
--palette-product-rausch: #E00B41;
--palette-plus: #92174D;
--palette-luxe: #460479;
--palette-rausch-gradient-linear-gradient: linear-gradient(to right,#E61E4D 0%,#E31C5F 50%,#D70466 100%);
--palette-rausch-gradient-linear-gradient-rtl: linear-gradient(to left,#E61E4D 0%,#E31C5F 50%,#D70466 100%);
--palette-rausch-gradient-radial-gradient: radial-gradient(circle at center,#FF385C 0%,#E61E4D 27.5%,#E31C5F 40%,#D70466 57.5%,#BD1E59 75%,#BD1E59 100%);
--palette-plus-gradient-linear-gradient: linear-gradient(to right,#BD1E59 0%,#92174D 50%,#861453 100%);
--palette-plus-gradient-linear-gradient-rtl: linear-gradient(to left,#BD1E59 0%,#92174D 50%,#861453 100%);
--palette-plus-gradient-radial-gradient: radial-gradient(circle at center,#D70466 0%,#BD1E59 30%,#92174D 55%,#861453 72.5%,#6C0D63 90%,#6C0D63 100%);
--palette-luxe-gradient-linear-gradient: linear-gradient(to right,#59086E 0%,#460479 50%,#440589 100%);
--palette-luxe-gradient-linear-gradient-rtl: linear-gradient(to left,#59086E 0%,#460479 50%,#440589 100%);
--palette-luxe-gradient-radial-gradient: radial-gradient(circle at center,#6C0D63 0%,#59086E 30%,#460479 55%,#440589 72.5%,#3B07BB 90%,#3B07BB 100%);
--palette-icon-tertiary: #8C8C8C;
--palette-icon-error: #C13515;
--palette-icon-warning: #E07912;
--palette-icon-info: #428BFF;
--palette-icon-success: #008A05;
--palette-grey0: #FFFFFF;
--palette-grey100: #F7F7F7;
--palette-grey200: #F2F2F2;
--palette-grey300: #EBEBEB;
--palette-grey400: #DDDDDD;
--palette-grey500: #C1C1C1;
--palette-grey600: #8C8C8C;
--palette-grey700: #6C6C6C;
--palette-grey800: #515151;
--palette-grey900: #3F3F3F;
--palette-grey1000: #222222;
--palette-grey1100: #000000;
--palette-red100: #FFF5F3;
--palette-red200: #FFEFEC;
--palette-red300: #FFE6E2;
--palette-red400: #FFD3CD;
--palette-red500: #FFACA5;
--palette-red600: #F84A43;
--palette-red700: #D7251C;
--palette-red800: #A3150F;
--palette-red900: #772320;
--palette-red1000: #381918;
--palette-green100: #F1FAF2;
--palette-green200: #E6F6E9;
--palette-green300: #DCF1E1;
--palette-green400: #C3E6CC;
--palette-green500: #8DD19E;
--palette-green600: #12A139;
--palette-green700: #038026;
--palette-green800: #015F1A;
--palette-green900: #104B20;
--palette-green1000: #112716;
--palette-blue100: #F0F8FF;
--palette-blue200: #E8F3FE;
--palette-blue300: #DDEDFE;
--palette-blue400: #C6E0FE;
--palette-blue500: #94C5FD;
--palette-blue600: #318CF7;
--palette-blue700: #166BD8;
--palette-blue800: #0D4DAA;
--palette-blue900: #173F7F;
--palette-blue1000: #162339;
--palette-orange100: #FEF6EC;
--palette-orange200: #FDF0E1;
--palette-orange300: #FDE8D4;
--palette-orange400: #FBD8BB;
--palette-orange500: #F7B383;
--palette-orange600: #EB6100;
--palette-orange700: #BE4900;
--palette-orange800: #8F3400;
--palette-orange900: #712A05;
--palette-orange1000: #371C10;
--palette-purple100: #F7F6FF;
--palette-purple200: #F3F1FF;
--palette-purple300: #ECE9FE;
--palette-purple400: #DED9FE;
--palette-purple500: #C2B9FE;
--palette-purple600: #8C78FF;
--palette-purple700: #6E57E4;
--palette-purple800: #503EB2;
--palette-purple900: #413582;
--palette-purple1000: #221F38;
--palette-magenta100: #FDF5FB;
--palette-magenta200: #FBEFF8;
--palette-magenta300: #FAE6F5;
--palette-magenta400: #F5D3EC;
--palette-magenta500: #EFADDE;
--palette-magenta600: #E54EC1;
--palette-magenta700: #BD31A1;
--palette-magenta800: #901E7C;
--palette-magenta900: #6A255E;
--palette-magenta1000: #311B2D;
--palette-rausch100: #FFF5F6;
--palette-rausch200: #FFEEF0;
--palette-rausch300: #FEE5E7;
--palette-rausch400: #FFD2D7;
--palette-rausch500: #FFABB6;
--palette-rausch600: #FF385C;
--palette-rausch700: #DA1249;
--palette-rausch800: #A21039;
--palette-rausch900: #732139;
--palette-rausch1000: #361A21;
--palette-beige100: #F7F6F2;
--palette-beige200: #F4F2EC;
--palette-beige300: #EEEBE5;
--palette-beige400: #DFDCD6;
--palette-beige500: #C5C1BB;
--palette-beige600: #8F8B87;
--palette-beige700: #6E6A66;
--palette-beige800: #53514E;
--palette-beige900: #413F3D;
--palette-beige1000: #232221;
--typography-weight-book400: 400;
--typography-weight-medium500: 500;
--typography-weight-semibold600: 600;
--typography-weight-bold700: 700;
--material-backgrounds-extra-thin-backdrop-filter: blur(8px) saturate(1);
--material-backgrounds-thin-backdrop-filter: blur(36px) saturate(1.6);
--material-backgrounds-regular-backdrop-filter: blur(24px) saturate(1.6);
--material-backgrounds-thick-backdrop-filter: blur(12px) saturate(3.00);
--material-backgrounds-extra-thick-backdrop-filter: blur(16px) saturate(1.6);
--vw: 12.8px;
--vh: 8px;
--vw-unitless: 1280;
--view-transition_play-state: running;
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
| xs | 300px | max-width |
| xs | 320px | max-width |
| xs | 330px | max-width |
| xs | 368px | min-width |
| xs | 375px | max-width |
| xs | 376px | min-width |
| 395px | 395px | max-width |
| 403px | 403px | min-width |
| 412px | 412px | min-width |
| sm | 420px | min-width |
| sm | 429px | min-width |
| sm | 431px | min-width |
| sm | 440px | min-width |
| sm | 499px | max-width |
| sm | 500px | min-width |
| 550px | 550px | min-width |
| 551px | 551px | min-width |
| sm | 667px | min-width |
| md | 743px | max-width |
| md | 744px | max-width |
| md | 768px | max-width |
| md | 800px | min-width |
| 880px | 880px | max-width |
| 895px | 895px | max-width |
| 949px | 949px | max-width |
| 950px | 950px | min-width |
| lg | 1024px | min-width |
| lg | 1028px | max-width |
| 1127px | 1127px | max-width |
| 1128px | 1128px | max-width |
| 1194px | 1194px | min-width |
| 1200px | 1200px | min-width |
| xl | 1238px | max-width |
| xl | 1240px | min-width |
| xl | 1280px | min-width |
| 1348px | 1348px | min-width |
| 1440px | 1440px | min-width |
| 2xl | 1600px | min-width |
| 1735px | 1735px | min-width |
| 1760px | 1760px | min-width |
| 1880px | 1880px | min-width |
| 1920px | 1920px | min-width |
| 2120px | 2120px | min-width |
| 2560px | 2560px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`, `[object Object]`, `[object Object]`

**Durations:** `0.25s`, `0.175s`, `0.3s`, `0.451754s`, `0.15s`, `0.2s`, `0.1s`

### Common Transitions

```css
transition: all;
transition: color 0.25s cubic-bezier(0.2, 0, 0, 1);
transition: opacity 0.175s cubic-bezier(0, 0, 1, 1);
transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
transition: transform 0.451754s linear(0 0%, 0.185572 10%, 0.465306 20%, 0.682334 30%, 0.822325 40%, 0.904974 50%, 0.951289 60%, 0.976364 70%, 0.989612 80%, 0.996485 90%, 1 100%);
transition: opacity 0.15s cubic-bezier(0, 0, 1, 1);
transition: box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1), transform 0.1s cubic-bezier(0.2, 0, 0, 1);
transition: transform 0.1s cubic-bezier(0.2, 0, 0, 1);
transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);
```

### Keyframe Animations

**dot-xefpb8**
```css
@keyframes dot-xefpb8 {
  100% { opacity: 0; }
  80% { opacity: 0; }
  0% { opacity: 0; }
  50% { opacity: 1; }
  30% { opacity: 1; }
}
```

**dot-kkmion**
```css
@keyframes dot-kkmion {
  100% { opacity: 0; }
  80% { opacity: 0; }
  0% { opacity: 0; }
  50% { opacity: 1; }
  30% { opacity: 1; }
}
```

**dot-pulse-18sbrvj**
```css
@keyframes dot-pulse-18sbrvj {
  100% { opacity: 0; }
  80% { opacity: 0; }
  0% { opacity: 0; }
  50% { opacity: 1; }
  30% { opacity: 1; }
}
```

**fadeEnter-14e8nj2**
```css
@keyframes fadeEnter-14e8nj2 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**dls_sheets_fadeIn-14e8nj2**
```css
@keyframes dls_sheets_fadeIn-14e8nj2 {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**dls_sheets_slideUp-14e8nj2**
```css
@keyframes dls_sheets_slideUp-14e8nj2 {
  0% { transform: translate(0,var(--slide-up_amount,100px)); }
  100% { transform: translate(0px, 0px); }
}
```

**fadeLeave-1f0cb0c**
```css
@keyframes fadeLeave-1f0cb0c {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

**dls_sheets_fadeOut-1f0cb0c**
```css
@keyframes dls_sheets_fadeOut-1f0cb0c {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
```

**dls_sheets_slideDown-1f0cb0c**
```css
@keyframes dls_sheets_slideDown-1f0cb0c {
  0% { transform: translate(0px, 0px); }
  100% { transform: translate(0,var(--slide-down_amount,50px)); }
}
```

**dls_sheets_slideDownOut-1f0cb0c**
```css
@keyframes dls_sheets_slideDownOut-1f0cb0c {
  0% { transform: translate(0px, 0px); opacity: 1; }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translate(0,var(--slide-down_amount,50px)); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (26 instances)

```css
.button {
  background-color: rgb(242, 242, 242);
  color: rgb(34, 34, 34);
  font-size: 14px;
  font-weight: 500;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 8px;
}
```

### Inputs (1 instances)

```css
.input {
  color: rgb(34, 34, 34);
  border-color: rgb(34, 34, 34);
  border-radius: 0px;
  font-size: 14px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Links (141 instances)

```css
.link {
  color: rgb(106, 106, 106);
  font-size: 14px;
  font-weight: 400;
}
```

### Navigation (2 instances)

```css
.navigatio {
  background-color: rgb(255, 255, 255);
  color: rgb(34, 34, 34);
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
  background-color: rgb(247, 247, 247);
  color: rgb(34, 34, 34);
  padding-top: 0px;
  padding-bottom: 80px;
  font-size: 14px;
}
```

### Tabs (10 instances)

```css
.tab {
  color: rgb(106, 106, 106);
  font-size: 14px;
  font-weight: 500;
  padding-top: 10px;
  padding-right: 10px;
  border-color: rgb(106, 106, 106);
  border-radius: 8px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Input — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(34, 34, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px none rgb(34, 34, 34);
  font-size: 14px;
  font-weight: 500;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(34, 34, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 50px;
  border: 0px none rgb(34, 34, 34);
  font-size: 14px;
  font-weight: 400;
```

### Button — 5 instances, 2 variants

**Variant 1** (3 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(34, 34, 34);
  padding: 11px 12px 11px 12px;
  border-radius: 20px;
  border: 0px solid rgb(34, 34, 34);
  font-size: 14px;
  font-weight: 500;
```

**Variant 2** (2 instances)

```css
  background: rgb(242, 242, 242);
  color: rgb(34, 34, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 50%;
  border: 0px none rgb(34, 34, 34);
  font-size: 14px;
  font-weight: 400;
```

### Button — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(34, 34, 34);
  padding: 10px 10px 10px 10px;
  border-radius: 8px;
  border: 0px none rgb(34, 34, 34);
  font-size: 14px;
  font-weight: 500;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(34, 34, 34);
  padding: 0px 0px 0px 0px;
  border-radius: 8px;
  border: 0px none rgb(34, 34, 34);
  font-size: 14px;
  font-weight: 500;
```

## Layout System

**13 grid containers** and **149 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1920px | 32px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 3-column | 7x |
| 1-column | 3x |
| 11-column | 1x |
| 6-column | 1x |
| 12-column | 1x |

### Grid Templates

```css
grid-template-columns: 86.6562px 86.6562px 86.6562px 86.6562px 86.6562px 86.6562px 86.6562px 86.6562px 86.6562px 86.6562px 86.6562px 86.6562px;
gap: normal 16px;
grid-template-columns: 196px 196px 196px 196px 196px 196px;
gap: 24px 8px;
grid-template-columns: 394.672px;
gap: 16px;
grid-template-columns: 394.656px;
gap: 16px;
grid-template-columns: 394.656px;
gap: 16px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 49x |
| column/nowrap | 100x |

**Gap values:** `12px`, `16px`, `20px`, `24px 8px`, `2px`, `35px`, `4px`, `8px`, `normal 16px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 0 passing, 0 failing color pairs

## Design System Score

**Overall: 91/100 (Grade: A)**

| Category | Score |
|----------|-------|
| Color Discipline | 100/100 |
| Typography Consistency | 100/100 |
| Spacing System | 85/100 |
| Shadow Consistency | 100/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Tight, disciplined color palette, Consistent typography system, Well-defined spacing scale, Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 271 !important rules — prefer specificity over overrides
- 98% of CSS is unused — consider purging
- 21818 duplicate CSS declarations

## Gradients

**5 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| linear | 357.5deg | 4 | bold |
| linear | 173.86deg | 2 | brand |
| linear | to top | 2 | brand |
| radial | — | 4 | bold |
| linear | — | 2 | brand |

```css
background: linear-gradient(357.5deg, rgb(62, 86, 124) 1.59%, rgb(58, 84, 117) 21.23%, rgb(45, 60, 91) 58.6%, rgb(128, 157, 192) 97.4%);
background: linear-gradient(173.86deg, rgba(255, 255, 255, 0.9) 90.56%, rgba(191, 205, 213, 0.9) 82.32%);
background: linear-gradient(to top, rgb(255, 255, 255), rgba(0, 0, 0, 0) 50%);
background: radial-gradient(50% 50%, rgb(255, 248, 223) 0%, rgba(255, 254, 224, 0.2) 51.5%, rgba(255, 250, 225, 0) 100%);
background: linear-gradient(rgb(255, 255, 255) 39.9%, rgb(248, 248, 248) 100%);
```

## Z-Index Map

**8 unique z-index values** across 3 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| modal | 2001,2001 | div.c.x.n.s.l.1.q. .a.t.m._.j.3._.1.o.s.q.o.2.v. .a.t.m._.m.k._.1.n.9.t.6.r.b. .a.t.m._.w.q._.1.1.5.5.0.3.r. .a.t.m._.v.y._.1.o.s.q.o.2.v. .a.t.m._.6.i._.u.2.9.b.r.m. .a.t.m._.f.q._.i.d.p.f.g.4. .a.t.m._.r.3._.1.h.6.o.j.u.z. .a.t.m._.l.8._.a.w.d.u.q.1. .a.t.m._.v.y._.i.x.j.v.8.3._._.o.g.g.z.y.c. .a.t.m._.f.q._.1.v.i.7.e.c.w._._.o.g.g.z.y.c. .a.t.m._.6.i._.1.w.q.b.8.t.t._._.o.g.g.z.y.c. .a.t.m._.r.3._.1.k.w.7.n.m.4._._.o.g.g.z.y.c. .a.t.m._.l.8._.i.d.p.f.g.4._._.o.g.g.z.y.c. .d.i.r. .d.i.r.-.l.t.r |
| dropdown | 100,100 | div.w.1.x.a.r.p.k.i. .a.t.m._.m.k._.1.i.f.8.5.x.1. .a.t.m._.t.k._.i.d.p.f.g.4. .a.t.m._.v.y._.1.o.s.q.o.2.v. .a.t.m._.w.q._.b.4.w.l.g. .a.t.m._.h.3._.l.s.r.m.w.u. .d.i.r. .d.i.r.-.l.t.r |
| base | -3,2 | div.b.1.p.4.h.3.d.r. .a.t.m._.m.k._.s.t.n.w.8.8. .a.t.m._.v.y._.1.o.s.q.o.2.v. .a.t.m._.e.2._.1.o.s.q.o.2.v. .a.t.m._.t.k._.i.d.p.f.g.4. .a.t.m._.f.q._.i.d.p.f.g.4. .a.t.m._.w.q._.6.q.w.0.k.a. .a.t.m._.5.j._.1.2.x.x.u.b.j. .d.i.r. .d.i.r.-.l.t.r, div.b.1.p.4.h.3.d.r. .a.t.m._.m.k._.s.t.n.w.8.8. .a.t.m._.v.y._.1.o.s.q.o.2.v. .a.t.m._.e.2._.1.o.s.q.o.2.v. .a.t.m._.t.k._.i.d.p.f.g.4. .a.t.m._.f.q._.i.d.p.f.g.4. .a.t.m._.w.q._.6.q.w.0.k.a. .a.t.m._.5.j._.1.2.x.x.u.b.j. .b.7.v.5.x.m.d. .a.t.m._.3.f._.i.o.d.1.r.o. .a.t.m._.2.d._.8.3.j.q.0.t. .d.i.r. .d.i.r.-.l.t.r, div.b.1.p.4.h.3.d.r. .a.t.m._.m.k._.s.t.n.w.8.8. .a.t.m._.v.y._.1.o.s.q.o.2.v. .a.t.m._.e.2._.1.o.s.q.o.2.v. .a.t.m._.t.k._.i.d.p.f.g.4. .a.t.m._.f.q._.i.d.p.f.g.4. .a.t.m._.w.q._.6.q.w.0.k.a. .a.t.m._.5.j._.1.2.x.x.u.b.j. .b.1.x.9.m.8.6.8. .a.t.m._.7.0._.v.i.s.m.f.c. .a.t.m._.3.f._.i.o.d.1.r.o. .d.i.r. .d.i.r.-.l.t.r |

## SVG Icons

**9 unique SVG icons** detected. Dominant style: **filled**.

| Size Class | Count |
|------------|-------|
| xs | 1 |
| sm | 7 |
| xl | 1 |

**Icon colors:** `rgb(34, 34, 34)`, `currentcolor`, `rgb(0, 0, 0)`, `rgb(255, 255, 255)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| Airbnb Cereal VF | self-hosted | 400, normal | normal, italic |

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `xs` | `100ms` | 100 |
| `sm` | `175ms` | 175 |
| `md` | `300ms` | 300 |
| `xxl` | `451754s` | 451754000 |

### Easing Families

- **custom** (54 uses) — `cubic-bezier(0.2, 0, 0, 1)`
- **ease-in-out** (2 uses) — `cubic-bezier(0, 0, 1, 1)`
- **linear** (2 uses) — `linear`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `opacity-fade-in-1ntc5ot` | fade | opacity | 3 |

## Component Anatomy

### button — 14 instances

**Slots:** label, icon

## Brand Voice

**Tone:** friendly · **Pronoun:** third-person · **Headings:** Sentence case (tight)

### Top CTA Verbs

- **become** (1)
- **popular** (1)
- **arts** (1)
- **beach** (1)
- **mountains** (1)
- **outdoors** (1)
- **things** (1)
- **airbnb** (1)

### Button Copy Patterns

- "become a host" (1×)
- "popular" (1×)
- "arts & culture" (1×)
- "beach" (1×)
- "mountains" (1×)
- "outdoors" (1×)
- "things to do" (1×)
- "airbnb-friendly apartments" (1×)
- "show more" (1×)
- "english (ae)" (1×)

### Sample Headings

> Site Footer
> Support
> Hosting
> Airbnb
> Support
> Hosting
> Airbnb

## Page Intent

**Type:** `landing` (confidence 0.45)
**Description:** Get an Airbnb for every kind of trip → 8 million vacation rentals → 2 million Guest Favorites → 220+ countries and regions worldwide

## Section Roles

Reading order (top→bottom): nav → nav → content → footer → content → pricing → content → content

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.4 |
| 1 | nav | — | 0.9 |
| 2 | content | — | 0.3 |
| 3 | footer | Site Footer | 0.95 |
| 4 | content | Support | 0.3 |
| 5 | pricing | Hosting | 0.4 |
| 6 | content | Airbnb | 0.3 |
| 7 | content | — | 0.3 |

## Material Language

**Label:** `flat` (confidence 0)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.216 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 100px |
| backdrop-filter in use | no |
| Gradients | 5 |

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Airbnb Cereal VF` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
