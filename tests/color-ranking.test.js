import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractColors } from '../src/extractors/colors.js';

// Each case reproduces a ranking failure measured on a real site (bench/).

const rgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};
const CLEAR = 'rgba(0, 0, 0, 0)';
const el = ({ tag = 'div', color = '#111111', bg = null, border = null, area = 2000, classList = '', hasText, width, height } = {}) => ({
  tag, role: '', classList, area,
  color: rgb(color),
  backgroundColor: bg ? rgb(bg) : CLEAR,
  borderColor: border ? rgb(border) : CLEAR,
  backgroundImage: 'none',
  ...(hasText === undefined ? {} : { hasText }),
  ...(width === undefined ? {} : { width, height }),
});
const times = (n, make) => Array.from({ length: n }, make);
// Every real page is mostly neutral text on white.
const page = () => [...times(300, () => el()), el({ tag: 'body', bg: '#ffffff', area: 1_000_000 })];

describe('brand colour ranking', () => {
  it('links in the brand colour count toward it (atlassian)', () => {
    const styles = [
      ...page(),
      // Four small yellow buttons, nothing else yellow on the page.
      ...times(4, () => el({ tag: 'button', bg: '#ffab00', color: '#172b4d', area: 3000 })),
      // The brand blue: two buttons and 27 links, used across the page.
      ...times(2, () => el({ tag: 'button', bg: '#1868db', color: '#ffffff', area: 3000 })),
      ...times(27, () => el({ tag: 'a', color: '#1868db' })),
      ...times(110, () => el({ tag: 'span', border: '#1868db' })),
    ];
    assert.equal(extractColors(styles).primary.hex, '#1868db');
  });

  it('a colour repeated across the page beats a one-off button colour (framer)', () => {
    const styles = [
      ...page(),
      el({ tag: 'button', bg: '#0066ff', color: '#ffffff', area: 4000 }),
      ...times(44, () => el({ tag: 'span', color: '#0099ff' })),
      el({ tag: 'section', bg: '#0099ff', area: 15_000 }),
    ];
    assert.equal(extractColors(styles).primary.hex, '#0099ff');
  });

  it('a large brand-coloured surface beats a few CTA buttons in another hue (gov.uk)', () => {
    const styles = [
      ...page(),
      ...times(4, () => el({ tag: 'button', bg: '#0f7a52', color: '#ffffff', area: 400 })),
      ...times(2, () => el({ tag: 'a', bg: '#1d70b8', color: '#ffffff', area: 3000 })),
      ...times(16, () => el({ tag: 'span', color: '#1d70b8' })),
      el({ tag: 'header', bg: '#1d70b8', area: 60_000 }),
    ];
    assert.equal(extractColors(styles).primary.hex, '#1d70b8');
  });

  it('a near-black button is not the brand colour (supabase)', () => {
    const styles = [
      ...page(),
      ...times(2, () => el({ tag: 'button', bg: '#002533', color: '#ffffff', area: 3000 })),
      ...times(26, () => el({ tag: 'span', color: '#3ecf8e' })),
      el({ tag: 'a', bg: '#3ecf8e', color: '#111111', area: 2500 }),
    ];
    assert.equal(extractColors(styles).primary.hex, '#3ecf8e');
  });

  it("ignores the browser's default link blue however often it appears (paypal)", () => {
    const styles = [
      ...page(),
      ...times(1000, () => el({ tag: 'a', color: '#0000ee' })),
      ...times(3, () => el({ tag: 'button', bg: '#ff4800', color: '#ffffff', area: 3000 })),
    ];
    assert.equal(extractColors(styles).primary.hex, '#ff4800');
  });

  it('a near-black used everywhere does not outrank the brand blue (atlassian: #101214 x702, 21% area)', () => {
    const styles = [
      ...page(),
      ...times(700, () => el({ tag: 'span', color: '#101214' })),
      ...times(2, () => el({ tag: 'button', bg: '#101214', color: '#ffffff', area: 180_000 })),
      ...times(200, () => el({ tag: 'a', color: '#1868db' })),
      el({ tag: 'button', bg: '#1868db', color: '#ffffff', area: 2500 }),
    ];
    assert.equal(extractColors(styles).primary.hex, '#1868db');
  });

  it('one full-page background does not outrank the brand colour on buttons and text (discord: 84% area)', () => {
    const styles = [
      ...page(),
      el({ tag: 'main', bg: '#1a2081', area: 6_000_000 }),
      ...times(2, () => el({ tag: 'a', bg: '#5865f2', color: '#ffffff', area: 3000 })),
      ...times(33, () => el({ tag: 'span', color: '#5865f2' })),
    ];
    assert.equal(extractColors(styles).primary.hex, '#5865f2');
  });

  it('a CTA colour used on many buttons still wins over a dark accent surface (hubspot)', () => {
    const styles = [
      ...page(),
      ...times(5, () => el({ tag: 'button', bg: '#ff4800', color: '#ffffff', area: 1500 })),
      ...times(16, () => el({ tag: 'span', color: '#ff4800' })),
      el({ tag: 'section', bg: '#042729', area: 55_000 }),
    ];
    assert.equal(extractColors(styles).primary.hex, '#ff4800');
  });
});

// A dark marketing site. Numbers below are what linear.app measured: the
// brand indigo is painted on one banner link, a customer-story card is an <a>
// 432x480 in neon yellow, and a code-diff illustration paints #00ff05 on 19
// spans and #ff0000 on 6. designlang 13.3.2 returned the three neon colours
// as primary, secondary and accent.
const NEON = ['#e4f222', '#00ff05', '#ff0000'];
const darkPage = () => [
  ...times(300, () => el({ color: '#f7f8f8', hasText: true })),
  // A full-length page, as measured: 12.3M px of canvas, not a 1M px fixture.
  el({ tag: 'body', color: '#f7f8f8', bg: '#08090a', area: 12_000_000 }),
];
const codeDiff = () => [
  ...times(19, () => el({ tag: 'span', classList: 'charAdded', bg: '#00ff05', color: '#08090a', area: 700, hasText: true })),
  ...times(6, () => el({ tag: 'span', classList: 'charRemoved', bg: '#ff0000', color: '#08090a', area: 700, hasText: true })),
];
const customerCard = () => el({ tag: 'a', classList: 'customerCard', bg: '#e4f222', color: '#08090a', area: 207_360, width: 432, height: 480, hasText: false });
const indigoBanner = () => el({ tag: 'a', bg: '#5e6ad2', color: '#ffffff', area: 40_960, width: 1280, height: 32, hasText: true });

describe('brand colour roles on a dark site (linear.app)', () => {
  it('the colour the site declares as brand beats neon decoration', () => {
    const styles = [...darkPage(), customerCard(), ...codeDiff(), indigoBanner()];
    const cssVariables = {
      '--color-brand-bg': '#5e6ad2',
      '--color-accent': '#7170ff',
      '--color-text-primary': '#f7f8f8',
      '--color-bg-primary': '#08090a',
    };
    const colors = extractColors(styles, { cssVariables });
    assert.equal(colors.primary.hex, '#5e6ad2');
  });

  it('a link around a whole card is a surface, not a call to action', () => {
    const styles = [
      ...darkPage(),
      customerCard(),
      el({ tag: 'a', bg: '#2563eb', color: '#ffffff', area: 4800, width: 120, height: 40, hasText: true }),
    ];
    assert.equal(extractColors(styles).primary.hex, '#2563eb');
  });

  it('code-diff highlights never become secondary or accent', () => {
    const styles = [
      ...darkPage(),
      ...times(3, () => el({ tag: 'button', bg: '#5e6ad2', color: '#ffffff', area: 4800, width: 120, height: 40, hasText: true })),
      ...codeDiff(),
    ];
    const colors = extractColors(styles);
    assert.equal(colors.primary.hex, '#5e6ad2');
    for (const role of [colors.secondary, colors.accent]) {
      assert.ok(!role || !NEON.includes(role.hex), `neon highlight became a role: ${role && role.hex}`);
    }
  });

  it('--color-text-primary and --color-bg-primary are not brand declarations', () => {
    const styles = [
      ...darkPage(),
      ...times(6, () => el({ tag: 'button', bg: '#d97706', color: '#ffffff', area: 4800, width: 120, height: 40, hasText: true })),
      ...times(3, () => el({ tag: 'button', bg: '#5e6ad2', color: '#ffffff', area: 4800, width: 120, height: 40, hasText: true })),
    ];
    const cssVariables = { '--color-text-primary': '#5e6ad2', '--color-bg-primary': '#5e6ad2' };
    assert.equal(extractColors(styles, { cssVariables }).primary.hex, '#d97706');
  });
});

describe('foreground colour', () => {
  // stripe.com: the <html> default is #000000 and no visible text uses it.
  // Headings are #061b31, links and captions #50617a.
  const stripe = () => [
    el({ tag: 'html', color: '#000000', bg: '#ffffff', area: 18_000_000, hasText: false }),
    el({ tag: 'head', color: '#000000', area: 0, hasText: false }),
    ...times(30, () => el({ tag: 'a', color: '#50617a', area: 6000, hasText: true })),
    ...times(12, () => el({ tag: 'h3', color: '#061b31', area: 9000, hasText: true })),
  ];

  it('is the colour of the headings, not the html default (stripe)', () => {
    assert.equal(extractColors(stripe()).text[0], '#061b31');
  });

  it('still lists the html default, after the colours that paint text', () => {
    const text = extractColors(stripe()).text;
    assert.deepEqual(text, ['#061b31', '#50617a', '#000000']);
  });

  it('with no headings, the colour that paints the most text wins', () => {
    const styles = [
      el({ tag: 'html', color: '#000000', area: 18_000_000, hasText: false }),
      ...times(5, () => el({ tag: 'span', color: '#8a8f98', area: 500, hasText: true })),
      ...times(5, () => el({ tag: 'p', color: '#d0d6e0', area: 20_000, hasText: true })),
    ];
    assert.equal(extractColors(styles).text[0], '#d0d6e0');
  });
});

describe('declared brand variables', () => {
  it('--color-brand outranks a numbered shade of it (supabase)', () => {
    const styles = [
      ...page(),
      ...times(19, () => el({ tag: 'span', border: '#3ecf8e' })),
      ...times(3, () => el({ tag: 'button', bg: '#0e7e4e', color: '#ffffff', area: 3000 })),
    ];
    const cssVariables = { '--color-brand': 'hsl(152.9deg 60% 52.9%)', '--color-brand-600': 'hsl(156.5deg 86.5% 26.1%)' };
    assert.equal(extractColors(styles, { cssVariables }).primary.hex, '#3ecf8e');
  });
});
