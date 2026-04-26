# Active Theory — Complete Framer Design Guide

> Extracted design system based on activetheory.net (V5 & V6) for Framer replication.
> Built with their proprietary Hydra/WebGL engine — this guide translates every visual element into Framer-compatible equivalents.

---

## 1. COLOR PALETTE

| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#000000` | Page background, canvas |
| `--bg-secondary` | `#0a0a0a` | Subtle section bg |
| `--bg-card` | `#111111` | Project cards, panels |
| `--accent-blue` | `#2779A7` | Primary brand accent, links, glows |
| `--accent-blue-light` | `#3a9fd4` | Hover state on accent |
| `--accent-blue-glow` | `rgba(39,121,167,0.35)` | Drop shadow, neon glow |
| `--text-primary` | `#FFFFFF` | Headings, primary text |
| `--text-secondary` | `#9C9C9C` | Labels, captions, secondary |
| `--text-muted` | `#353535` | Tertiary, disabled |
| `--border` | `rgba(255,255,255,0.08)` | Subtle borders, dividers |
| `--border-active` | `rgba(255,255,255,0.4)` | Active/hover borders |
| `--overlay` | `rgba(0,0,0,0.6)` | Video overlay, modal scrim |
| `--grain-opacity` | `0.04` | Film grain noise overlay |

### Framer Color Tokens (copy into Variables panel)
```
Background:   #000000
Surface:      #111111
Blue:         #2779A7
BlueHover:    #3a9fd4
BlueGlow:     rgba(39,121,167,0.35)
White:        #FFFFFF
Gray:         #9C9C9C
DarkGray:     #353535
BorderSub:    rgba(255,255,255,0.08)
BorderActive: rgba(255,255,255,0.4)
```

---

## 2. TYPOGRAPHY

### Font Stack
Active Theory uses **custom/display-class grotesque** fonts with an alien, technical aesthetic.

**Recommended Framer-compatible substitutes (closest matches):**

| Role | Font | Weight | Notes |
|---|---|---|---|
| Primary Display | `PP Neue Montreal` | 300–700 | Closest match — get from pangrampangram.com |
| Fallback Display | `Space Grotesk` | 300–700 | Free on Google Fonts |
| Monospace / Code labels | `Space Mono` | 400 | Free on Google Fonts |
| Accent / Decorative | `Syne` | 700–800 | For hero titles |

### Type Scale

| Style | Size | Weight | Line Height | Letter Spacing | Transform |
|---|---|---|---|---|---|
| Hero / H1 | `clamp(64px, 10vw, 140px)` | 300 (Light) | 0.9 | -0.03em | Uppercase |
| H2 | `clamp(36px, 5vw, 72px)` | 300 | 1.0 | -0.02em | Uppercase |
| H3 | `clamp(20px, 3vw, 36px)` | 400 | 1.1 | -0.01em | Uppercase |
| Body | `14px` | 300 | 1.6 | 0.02em | None |
| Label / Caption | `10px–12px` | 400 | 1.4 | 0.1em–0.2em | Uppercase |
| Nav Links | `11px` | 400 | 1 | 0.15em | Uppercase |
| Project Number | `10px` | 300 | 1 | 0.3em | Uppercase |

### Framer Font Settings
- Import `Space Grotesk` + `Space Mono` from Google Fonts panel in Framer
- Set base font size: `14px`
- Set base line height: `1.6`
- Default text color: `#FFFFFF`

---

## 3. LAYOUT & GRID

### Page Structure
```
[Full-screen Canvas — 100vw × 100vh]
  └── [WebGL / Video Background Layer — absolute, z-index: 0]
  └── [Film Grain Overlay — absolute, z-index: 1, pointer-events: none]
  └── [UI Overlay Layer — absolute, z-index: 10]
       ├── [Nav — top-left + top-right corners]
       ├── [Hero Content — center / bottom-left]
       ├── [Project Labels — corner anchored]
       └── [Footer Bar — bottom strip]
```

### Spacing System (8pt grid)
```
4px   — micro gap
8px   — xs
16px  — sm
24px  — md
32px  — lg
48px  — xl
64px  — 2xl
96px  — 3xl
128px — 4xl
```

### Navigation Layout
- **Top-left**: Logo / Wordmark — `"ACTIVE THEORY"` in 11px uppercase, letter-spacing 0.15em
- **Top-right**: Nav links — `WORK  ABOUT  CONTACT` — same type style, gap 32px
- **Bottom-left**: Current environment label / coordinates text in 10px monospace gray
- **Bottom-right**: Project counter `01 / 12` in 10px monospace gray
- All nav elements: `position: fixed`, padding `24px 32px`

### Framer Frame Settings
- Canvas: 1440px wide (desktop base)
- Overflow: `hidden`
- Background: `#000000`

---

## 4. VISUAL EFFECTS (Framer equivalents)

### A. Film Grain / Noise Overlay
This is the signature texture over every screen.

**In Framer:**
1. Add a Frame `100% × 100%`, `position: fixed`, `z-index: 100`, `pointer-events: none`
2. Use a `<canvas>` code component with this effect:
```javascript
// Framer Code Component — FilmGrain.tsx
import { useEffect, useRef } from "react"
import { addPropertyControls, ControlType } from "framer"

export default function FilmGrain({ opacity = 0.04, speed = 2 }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let frame = 0
    const animate = () => {
      frame++
      if (frame % speed === 0) {
        const imageData = ctx.createImageData(canvas.width, canvas.height)
        for (let i = 0; i < imageData.data.length; i += 4) {
          const v = Math.random() * 255
          imageData.data[i] = v
          imageData.data[i+1] = v
          imageData.data[i+2] = v
          imageData.data[i+3] = 255
        }
        ctx.putImageData(imageData, 0, 0)
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, opacity, mixBlendMode:"screen", pointerEvents:"none", zIndex:100 }} />
}
addPropertyControls(FilmGrain, {
  opacity: { type: ControlType.Number, min:0, max:0.2, step:0.005, defaultValue:0.04 },
  speed: { type: ControlType.Number, min:1, max:10, step:1, defaultValue:2 },
})
```

### B. Neon Glow Effect
Used on the blue accent color, titles, and environment lights.

**Framer CSS Override:**
```css
/* Apply to text or border elements */
text-shadow: 0 0 20px rgba(39, 121, 167, 0.8),
             0 0 40px rgba(39, 121, 167, 0.4),
             0 0 80px rgba(39, 121, 167, 0.2);

/* For box/border glow */
box-shadow: 0 0 20px rgba(39, 121, 167, 0.6),
            inset 0 0 20px rgba(39, 121, 167, 0.1);
```

### C. Glitch Effect (Text Flicker)
Signature "alien" effect on hero text.

**Framer Code Component — GlitchText.tsx:**
```javascript
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

export default function GlitchText({ text = "ACTIVE THEORY", color = "#fff" }) {
  const controls = useAnimation()
  useEffect(() => {
    const glitch = async () => {
      while (true) {
        await new Promise(r => setTimeout(r, 2000 + Math.random() * 4000))
        await controls.start({ x: [-2,2,-1,1,0], opacity:[1,0.8,1,0.9,1], transition: { duration: 0.15 } })
        await controls.start({ x: [1,-1,2,-2,0], opacity:[0.9,1,0.8,1,1], transition: { duration: 0.1 } })
      }
    }
    glitch()
  }, [])
  return (
    <motion.span animate={controls} style={{ color, display:"inline-block", position:"relative" }}>
      {text}
      <motion.span animate={controls} style={{ position:"absolute", inset:0, color:"#2779A7", clipPath:"inset(40% 0 40% 0)", left:"2px" }}>
        {text}
      </motion.span>
    </motion.span>
  )
}
```

### D. Chromatic Aberration
RGB channel split on transitions.

**Framer CSS for transition overlays:**
```css
filter: blur(0px);
/* On transition start: */
filter: blur(4px) saturate(2);
/* Chromatic split via pseudo-elements with red/blue offset */
```

**Framer Variant transition:**
- From: `{ filter: "blur(8px) saturate(0)", opacity: 0, x: 4 }`
- To: `{ filter: "blur(0px) saturate(1)", opacity: 1, x: 0 }`
- Duration: `0.8s`, Easing: `[0.76, 0, 0.24, 1]`

### E. Video Background / 3D Environment
Active Theory uses full-bleed WebGL 3D scenes. In Framer, simulate with:
- Dark atmospheric video loop (Venice Beach, city lights, neon)
- Frame: `100% × 100%`, `object-fit: cover`, muted/autoplay/loop
- Apply overlay: `background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)`

---

## 5. ANIMATIONS & TRANSITIONS

### Easing Curves
```
Standard:     cubic-bezier(0.76, 0, 0.24, 1)    — snappy, cinematic
Smooth in:    cubic-bezier(0.4, 0, 0.2, 1)       — material standard
Bounce out:   cubic-bezier(0.34, 1.56, 0.64, 1)  — spring feel
Linear:       linear                              — grain/flicker only
```

### Page Load Sequence (staggered reveal)
```
t=0.0s  Background/video fades in      — opacity 0→1, duration 1.5s
t=0.3s  Grain overlay activates        — opacity 0→0.04, duration 0.5s
t=0.8s  Logo appears                   — opacity 0→1, y: 10→0, duration 0.6s
t=1.0s  Nav links stagger in           — each link: 0.15s delay between, opacity 0→1
t=1.2s  Hero text reveals              — opacity 0→1, y: 30→0, duration 0.8s
t=1.6s  Corner labels appear           — opacity 0→1, duration 0.4s
t=2.0s  Cursor dot activates
```

**Framer implementation (use Variants with `staggerChildren`):**
```javascript
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.8 } }
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
}
```

### Hover Interactions
| Element | Hover State |
|---|---|
| Nav links | `opacity: 0.4` on siblings (blur-away effect), active stays `1.0` |
| Project cards | Scale `1.0→1.02`, brightness `0.7→1.0`, duration `0.4s` |
| Buttons | Border color `rgba(255,255,255,0.08)→rgba(39,121,167,0.8)`, glow appears |
| Logo | Subtle glitch trigger (0.1s jitter) |
| Cursor | Expand from 8px dot → 40px ring with blue tint |

### Page Transition (between pages)
```
Exit:   opacity 1→0, scale 1→0.97, blur 0→6px, duration 0.5s
Enter:  opacity 0→1, scale 1.03→1, blur 6→0px, duration 0.7s
Easing: [0.76, 0, 0.24, 1]
```

**In Framer:** Use `AnimatePresence` + `motion.div` with `initial/animate/exit` variants.

### Scroll Animations
- **Parallax depth**: Background moves at `0.3x` scroll speed, foreground at `1x`
- **Text reveals**: `clipPath: inset(100% 0 0 0)` → `inset(0% 0 0 0)` on scroll entry
- **Counter increment**: Numbers count up when section enters viewport
- **Environment switch**: At scroll milestone → crossfade between 3D scenes

---

## 6. COMPONENTS — FRAMER BREAKDOWN

### 6.1 Navigation Bar
```
Frame: 100% wide, 80px tall, fixed top, z-index: 1000
Background: transparent (no blur — pure overlay)
Layout: Space Between, align center, padding: 0 32px

Left:  Logo text "ACTIVE THEORY" — 11px, uppercase, #FFF, letter-spacing 0.15em
Right: ["WORK", "ABOUT", "CONTACT"] — 11px, uppercase, #9C9C9C, gap 32px
       On hover over one: others → opacity 0.3, hovered → #FFFFFF
```

### 6.2 Hero Section
```
Frame: 100vw × 100vh, position relative
Background: #000 + fullbleed video/WebGL layer

Content (bottom-left anchored, padding 48px):
  - Overline:  "CREATIVE DIGITAL EXPERIENCES" — 10px, uppercase, #9C9C9C, letter-spacing 0.2em
  - H1 Title:  Studio name/tagline — clamp(64px,8vw,120px), weight 300, uppercase, #FFF
  - Subtext:   Short descriptor — 14px, #9C9C9C, max-width 400px, margin-top 24px
  - CTA:       Ghost button — border 1px rgba(255,255,255,0.2), padding 14px 28px, 
               11px uppercase, letter-spacing 0.1em

Corner HUD elements:
  - Bottom-right: "01 / 12" counter in Space Mono 10px #9C9C9C
  - Bottom-left:  Coordinates "33.9850° N / 118.4695° W" in Space Mono 10px #353535
```

### 6.3 Project Grid / Work Section
```
Layout: Full-bleed cards, 2-col on desktop
Each Card:
  - Aspect ratio: 16:9
  - Background: project video/image (dark-tinted)
  - Overlay: gradient bottom to top rgba(0,0,0,0) → rgba(0,0,0,0.8)
  - Category tag: top-left, 10px uppercase Space Mono, #9C9C9C, letter-spacing 0.15em
  - Title: bottom-left, 24-36px, weight 300, #FFF
  - Year: bottom-right, 10px Space Mono, #9C9C9C
  
  Hover:
    - Scale: 1 → 1.02, transition 0.4s
    - Overlay opacity: 0.8 → 0.4
    - Blue border appears: 1px solid rgba(39,121,167,0.6)
    - Play icon fades in (centered)
```

### 6.4 Custom Cursor
```javascript
// Framer Code Component — CustomCursor.tsx
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

export default function CustomCursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <>
      {/* Dot */}
      <motion.div style={{ position:"fixed", top:0, left:0, x:springX, y:springY,
        width:8, height:8, borderRadius:"50%", background:"#2779A7",
        transform:"translate(-50%,-50%)", zIndex:9999, pointerEvents:"none" }} />
      {/* Ring */}
      <motion.div style={{ position:"fixed", top:0, left:0, x:springX, y:springY,
        width:40, height:40, borderRadius:"50%", border:"1px solid rgba(39,121,167,0.5)",
        transform:"translate(-50%,-50%)", zIndex:9998, pointerEvents:"none" }} />
    </>
  )
}
```

### 6.5 Section Divider / Horizontal Rule
```
Height: 1px
Background: rgba(255,255,255,0.06)
Margin: 0 (full width)
Animation on scroll-enter: scaleX 0→1 from left, duration 0.8s
```

### 6.6 Ghost Button
```
Border: 1px solid rgba(255,255,255,0.15)
Background: transparent
Padding: 14px 28px
Font: 11px, uppercase, letter-spacing 0.1em, #FFF
Border-radius: 0 (sharp corners — no radius)
Hover: border-color → rgba(39,121,167,0.8), box-shadow → 0 0 20px rgba(39,121,167,0.3)
Transition: all 0.3s cubic-bezier(0.76, 0, 0.24, 1)
```

### 6.7 Loading / Intro Screen
```
Full-screen black overlay
Center: Logo or wordmark
Animation:
  1. Logo fades + scales in (0→1, 0.9→1), 0.8s
  2. Loader bar: horizontal line grows left→right, duration 1.5s, color #2779A7
  3. Number counter: 0→100 in Space Mono 48px #FFF
  4. Full overlay fades out (opacity 1→0), 0.5s
  5. Main content reveals
```

---

## 7. BACKGROUND / ENVIRONMENT EFFECTS

### Dark Atmospheric Background Options for Framer

**Option A — CSS Gradient (simplest):**
```css
background: 
  radial-gradient(ellipse 80% 50% at 50% -10%, rgba(39,121,167,0.15) 0%, transparent 60%),
  radial-gradient(ellipse 60% 40% at 80% 80%, rgba(39,121,167,0.08) 0%, transparent 50%),
  #000000;
```

**Option B — Video loop (recommended):**
- Use a dark cinematic loop: city at night, abstract particles, neon reflections
- Sources: Mixkit, Pexels, Coverr (free), or purchase from Motion Array
- Settings: autoplay, muted, loop, `object-fit: cover`, brightness 0.4

**Option C — Framer Shader Component:**
- From Framer Marketplace: "Shader 3D Background" or "FluidFlow Background"
- Configure with colors: `#000000`, `#0a1628`, `#2779A7`

---

## 8. FRAMER PROJECT SETUP CHECKLIST

### Step-by-step to build the site:

1. **New Framer Project**
   - Canvas size: 1440px (Desktop), 390px (Mobile)
   - Background: `#000000`

2. **Install Fonts**
   - Google Fonts: `Space Grotesk` (300, 400, 700) + `Space Mono` (400)
   - Optional paid: PP Neue Montreal from pangrampangram.com

3. **Color Variables** (Framer Variables panel)
   - Add all 10 color tokens from Section 1

4. **Global Styles**
   - Body background: `#000`
   - Default text: `#FFF`
   - Cursor: `none` (use custom cursor component)
   - Selection color: `#2779A7`

5. **Add Film Grain Component**
   - Insert FilmGrain code component → `100%w × 100%h`, `fixed`, `z-index: 100`

6. **Add Custom Cursor Component**
   - Insert CustomCursor code → fixed, z-index 9999

7. **Build Sections in order:**
   - [ ] Loading screen (animate out on complete)
   - [ ] Navigation (fixed overlay)
   - [ ] Hero (full-screen, video BG)
   - [ ] Work/Projects grid
   - [ ] About section
   - [ ] Contact section
   - [ ] Footer

8. **Scroll Animations**
   - Use Framer's built-in `Scroll` → `WhileInView` for each section
   - Variants: fade up (`y: 30→0`, `opacity: 0→1`)
   - Stagger siblings with `staggerChildren: 0.1`

9. **Page Transitions**
   - Enable Framer Router
   - Wrap pages in `AnimatePresence`
   - Use exit: `{ opacity: 0, scale: 0.97, filter: "blur(6px)" }`

---

## 9. CINEMATIC FEEL — KEY PRINCIPLES

These are what make Active Theory feel cinematic, not just "dark":

| Principle | Implementation |
|---|---|
| **Restraint** | Lots of empty black space — don't fill every pixel |
| **Micro-flicker** | Text/elements occasionally twitch 1-2px at random intervals |
| **Sound design** | Subtle ambient hum, click sounds on nav (optional) |
| **Slow reveals** | Nothing pops in instantly — everything breathes in (0.6-1.2s) |
| **Depth layers** | BG parallax 0.3x, midground 0.7x, UI 1x — creates Z-depth |
| **Monochrome base** | 90% of UI is white/gray/black — blue accent is rare, powerful |
| **Uppercase small text** | All labels, nav, captions are uppercase + wide letter-spacing |
| **Sharp geometry** | Zero border-radius on buttons/cards — industrial precision |
| **Grain everywhere** | Grain overlay unifies the whole page into one cinematic texture |
| **AI/tech language** | Coordinates, counters, version numbers in corners — HUD aesthetic |

---

## 10. ASSETS & RESOURCES

| Asset | Source | Notes |
|---|---|---|
| Space Grotesk font | fonts.google.com | Free |
| Space Mono font | fonts.google.com | Free |
| PP Neue Montreal | pangrampangram.com | Paid, closest to AT's font |
| Dark video loops | mixkit.co / pexels.com/videos | Free, filter by "dark" / "city night" |
| Film grain CSS | Via code component above | Custom |
| WebGL shader BG | Framer Marketplace → "Shader 3D Background" | Paid Framer component |
| Particle system | Framer Marketplace → "Particles Background" | |
| Smooth scroll | Framer built-in: Pages → Scroll → Smooth | |

---

## Quick Reference — Paste Into Framer CSS Override

```css
/* Global base */
* { box-sizing: border-box; cursor: none; }
body { background: #000; color: #fff; font-family: 'Space Grotesk', sans-serif; }
::selection { background: #2779A7; color: #fff; }

/* Nav links */
.nav-link { 
  font-size: 11px; 
  letter-spacing: 0.15em; 
  text-transform: uppercase; 
  color: #9C9C9C;
  transition: color 0.3s, opacity 0.3s;
}
.nav-link:hover { color: #fff; }

/* Ghost button */
.btn-ghost {
  border: 1px solid rgba(255,255,255,0.15);
  background: transparent;
  padding: 14px 28px;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  border-radius: 0;
  transition: all 0.3s cubic-bezier(0.76, 0, 0.24, 1);
}
.btn-ghost:hover {
  border-color: rgba(39,121,167,0.8);
  box-shadow: 0 0 20px rgba(39,121,167,0.3);
}

/* Neon glow text */
.neon-text {
  text-shadow: 
    0 0 20px rgba(39,121,167,0.8),
    0 0 40px rgba(39,121,167,0.4);
}

/* Label style */
.label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #9C9C9C;
}
```
