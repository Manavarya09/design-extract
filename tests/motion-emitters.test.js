import { describe, it } from 'node:test';
import assert from 'node:assert';

import { formatFramerMotion } from '../src/formatters/framer-motion.js';
import { formatMotionOne } from '../src/formatters/motion-one.js';
import { formatMotionCss } from '../src/formatters/motion-css.js';
import { formatMotionTailwind } from '../src/formatters/motion-tailwind.js';
import { formatMotionGsap } from '../src/formatters/motion-gsap.js';
import { formatMotionWaapi } from '../src/formatters/motion-waapi.js';

const designWithSpringAndScroll = {
  meta: { url: 'https://example.com/' },
  motion: {
    durations: [
      { name: 'xs', ms: 120, css: '120ms' },
      { name: 'md', ms: 280, css: '280ms' },
      { name: 'lg', ms: 600, css: '600ms' },
    ],
    easings: [
      { family: 'ease-out', raw: 'cubic-bezier(0.16, 1, 0.3, 1)', count: 42 },
      { family: 'ease-in-out', raw: 'cubic-bezier(0.4, 0, 0.2, 1)', count: 18 },
    ],
    springs: [
      { family: 'spring', raw: 'cubic-bezier(0.34, 1.56, 0.64, 1)', count: 6, overshoot: true },
    ],
    keyframes: [
      {
        name: 'fadeIn',
        used: true,
        usageCount: 4,
        steps: [
          { offset: '0%', style: 'opacity: 0; transform: translateY(8px)' },
          { offset: '100%', style: 'opacity: 1; transform: translateY(0)' },
        ],
      },
    ],
    scrollLinked: { present: true, signals: ['view:reveal'] },
  },
};

const minimalDesign = {
  meta: { url: 'https://minimal.test/' },
  motion: { durations: [], easings: [], springs: [], keyframes: [], scrollLinked: { present: false, signals: [] } },
};

describe('motionlang emitters', () => {
  it('framer-motion: emits spring derived from detected overshoot bezier', () => {
    const out = formatFramerMotion(designWithSpringAndScroll);
    assert.match(out, /export const springs = \{/);
    assert.match(out, /soft: \{ type: 'spring', stiffness: \d+, damping: \d+, mass: 1 \}/);
    // transitions.spring should reference the springs map, not a hard-coded literal
    assert.match(out, /spring: springs\.soft,/);
  });

  it('framer-motion: emits whileInView block when scroll-linked motion is present', () => {
    const out = formatFramerMotion(designWithSpringAndScroll);
    assert.match(out, /export const inView = \{/);
    assert.match(out, /whileInView: variants\.fade\.show/);
  });

  it('framer-motion: reconstructs keyframe variants from used @keyframes', () => {
    const out = formatFramerMotion(designWithSpringAndScroll);
    assert.match(out, /fadeIn: \{/);
    assert.match(out, /"opacity": \["0","1"\]/);
  });

  it('framer-motion: degrades cleanly with no motion signal', () => {
    const out = formatFramerMotion(minimalDesign);
    assert.match(out, /standard: \[0\.25, 1, 0\.5, 1\]/);
    assert.match(out, /soft: \{ type: 'spring'/);
    assert.doesNotMatch(out, /export const inView/);
  });

  it('motion-one: emits animations helpers calling animate()', () => {
    const out = formatMotionOne(designWithSpringAndScroll);
    assert.match(out, /import \{ animate \} from 'motion'/);
    assert.match(out, /export const animations = \{/);
    assert.match(out, /fadeIn: \(target, opts = \{\}\) =>/);
  });

  it('motion-one: emits inView/scroll helpers only when scroll-linked', () => {
    const withScroll = formatMotionOne(designWithSpringAndScroll);
    const without = formatMotionOne(minimalDesign);
    assert.match(withScroll, /import \{ inView, scroll \} from 'motion'/);
    assert.match(withScroll, /export const parallaxY/);
    assert.doesNotMatch(without, /import \{ inView, scroll \}/);
  });

  it('motion-one: spring stiffness/damping respond to overshoot magnitude', () => {
    const out = formatMotionOne(designWithSpringAndScroll);
    const match = out.match(/soft: \{ type: 'spring', stiffness: (\d+), damping: (\d+),/);
    assert.ok(match, 'spring preset present');
    const stiffness = Number(match[1]);
    const damping = Number(match[2]);
    assert.ok(stiffness >= 80 && stiffness <= 700, 'stiffness in expected band');
    assert.ok(damping >= 8 && damping <= 30, 'damping reduced from default by overshoot');
  });

  it('motion-css: emits custom properties from extracted tokens', () => {
    const out = formatMotionCss(designWithSpringAndScroll);
    assert.match(out, /:root \{/);
    assert.match(out, /--duration-md: 280ms;/);
    assert.match(out, /--ease-ease-out: cubic-bezier\(0\.16, 1, 0\.3, 1\)/);
    // detected overshoot bezier surfaces as a spring easing var
    assert.match(out, /--ease-spring: cubic-bezier\(0\.34, 1\.56, 0\.64, 1\)/);
  });

  it('motion-css: always guards prefers-reduced-motion', () => {
    const out = formatMotionCss(designWithSpringAndScroll);
    const min = formatMotionCss(minimalDesign);
    assert.match(out, /@media \(prefers-reduced-motion: reduce\)/);
    assert.match(min, /@media \(prefers-reduced-motion: reduce\)/);
    assert.match(out, /\.mo-slide-up \{ animation-name: slide-up;/);
  });

  it('motion-css: degrades to sane defaults with no motion signal', () => {
    const out = formatMotionCss(minimalDesign);
    assert.match(out, /--duration-base: 300ms;/);
    assert.match(out, /--ease-standard: cubic-bezier\(0\.25, 0\.1, 0\.25, 1\)/);
  });

  it('motion-tailwind: emits a requireable theme.extend block', () => {
    const out = formatMotionTailwind(designWithSpringAndScroll);
    assert.match(out, /module\.exports = \{ extend \};/);
    const mod = { exports: {} };
    new Function('module', out)(mod);
    const { extend } = mod.exports;
    assert.equal(extend.transitionDuration.md, '280ms');
    assert.equal(extend.transitionTimingFunction['ease-out'], 'cubic-bezier(0.16, 1, 0.3, 1)');
    assert.ok(extend.keyframes['fade-in'], 'built-in fade-in keyframe present');
    assert.ok(extend.animation['slide-up'], 'slide-up animation utility present');
  });

  it('motion-tailwind: reconstructs used on-page @keyframes', () => {
    const out = formatMotionTailwind(designWithSpringAndScroll);
    const mod = { exports: {} };
    new Function('module', out)(mod);
    // the fixture's used @keyframes is literally named "fadeIn" → kebab "fade-in"
    assert.ok(mod.exports.extend.keyframes['fade-in']);
  });

  it('motion-tailwind: spring easing appears when overshoot bezier detected', () => {
    const out = formatMotionTailwind(designWithSpringAndScroll);
    const mod = { exports: {} };
    new Function('module', out)(mod);
    assert.equal(mod.exports.extend.transitionTimingFunction.spring, 'cubic-bezier(0.34, 1.56, 0.64, 1)');
  });

  it('motion-waapi: reproduces extracted cubic-bezier curves verbatim (no approximation)', () => {
    const out = formatMotionWaapi(designWithSpringAndScroll);
    assert.match(out, /export const easings = \{/);
    assert.match(out, /easeOut: 'cubic-bezier\(0\.16, 1, 0\.3, 1\)'/);
    // detected overshoot bezier surfaces as a native `spring` easing string
    assert.match(out, /spring: 'cubic-bezier\(0\.34, 1\.56, 0\.64, 1\)'/);
    assert.match(out, /--?duration|md: 280/);
  });

  it('motion-waapi: emits zero-dependency animate() helpers honouring reduced-motion', () => {
    const out = formatMotionWaapi(designWithSpringAndScroll);
    assert.match(out, /export const prefersReducedMotion = \(\) =>/);
    assert.match(out, /export const animations = \{/);
    assert.match(out, /fadeIn: \(el, opts = \{\}\) => _animate\(el,/);
    assert.match(out, /if \(prefersReducedMotion\(\)\) timing\.duration = 0;/);
    // no library import — must run on the native Element.animate()
    assert.doesNotMatch(out, /from 'motion'|from 'gsap'/);
  });

  it('motion-waapi: reconstructs used @keyframes as frame arrays', () => {
    const out = formatMotionWaapi(designWithSpringAndScroll);
    assert.match(out, /export const keyframes = \{/);
    assert.match(out, /"opacity":"0"/);
    assert.match(out, /"offset":1/);
  });

  it('motion-gsap: registers extracted curves as CustomEase path data', () => {
    const out = formatMotionGsap(designWithSpringAndScroll);
    assert.match(out, /export const eases = \{/);
    assert.match(out, /easeOut: 'M0,0 C0\.16,1 0\.3,1 1,1'/);
    assert.match(out, /export function registerEases\(gsap\) \{/);
    assert.match(out, /CustomEase\.create\(name, path\)/);
  });

  it('motion-gsap: emits gsap.from reveals and a ScrollTrigger reveal when scroll-linked', () => {
    const out = formatMotionGsap(designWithSpringAndScroll);
    assert.match(out, /export const reveals = \{/);
    assert.match(out, /slideUp: \(target, vars = \{\}\) => gsap\.from\(target,/);
    assert.match(out, /export function revealOnScroll\(/);
    assert.match(out, /scrollTrigger: \{ trigger: el/);
  });

  it('motion-gsap: omits ScrollTrigger helper and degrades cleanly with no motion', () => {
    const out = formatMotionGsap(minimalDesign);
    assert.doesNotMatch(out, /revealOnScroll/);
    assert.match(out, /standard: 'M0,0 C0\.25,0\.1 0\.25,1 1,1'/);
  });
});
