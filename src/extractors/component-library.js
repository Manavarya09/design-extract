// Detect the component library a site is built on. Fingerprints: class-name
// patterns, data-* attributes, script URLs, window globals. Returns the most
// likely library with a confidence score and the evidence that supported it —
// LLM agents consume this to pick the right scaffolding (e.g. "use shadcn/ui",
// "use MUI v5") when rebuilding.

const LIB_FINGERPRINTS = [
  {
    id: 'shadcn/ui',
    score: (ctx) => {
      let s = 0; const evidence = [];
      // shadcn copies Radix attributes and uses Tailwind utility density.
      if (ctx.radixAttrCount > 2 && ctx.tailwindLike > 0.4) { s += 0.5; evidence.push('radix+tailwind mix'); }
      if (/\bbutton-primary|\bbutton-destructive/.test(ctx.classBlob) && ctx.radixAttrCount > 0) { s += 0.15; evidence.push('shadcn button tokens'); }
      // `class="... bg-background text-foreground ..."` is a shadcn tell.
      if (/\bbg-background\b|\btext-foreground\b|\bborder-input\b|\bring-offset-background\b/.test(ctx.classBlob)) {
        s += 0.65; evidence.push('shadcn css tokens');
      }
      return { score: s, evidence };
    },
  },
  {
    id: 'radix-ui',
    score: (ctx) => {
      const count = ctx.radixAttrCount;
      if (count === 0) return { score: 0, evidence: [] };
      const score = Math.min(0.9, 0.3 + count * 0.05);
      return { score, evidence: [`${count} radix attributes`] };
    },
  },
  {
    id: 'headlessui',
    score: (ctx) => {
      const m = (ctx.classSample.join(' ').match(/headlessui-[a-z]+/gi) || []).length;
      if (m < 2) return { score: 0, evidence: [] };
      return { score: Math.min(0.9, 0.3 + m * 0.08), evidence: [`${m} headlessui- class refs`] };
    },
  },
  {
    id: 'mui',
    score: (ctx) => {
      const m = (ctx.classBlob.match(/Mui[A-Z][A-Za-z]+-root/g) || []).length;
      if (m < 2) return { score: 0, evidence: [] };
      return { score: Math.min(0.95, 0.4 + m * 0.04), evidence: [`${m} Mui*-root classes`] };
    },
  },
  {
    id: 'chakra-ui',
    score: (ctx) => {
      const m = (ctx.classBlob.match(/\bchakra-[a-z]+/g) || []).length;
      if (m < 3) return { score: 0, evidence: [] };
      return { score: Math.min(0.95, 0.4 + m * 0.03), evidence: [`${m} chakra- classes`] };
    },
  },
  {
    id: 'mantine',
    score: (ctx) => {
      const m = (ctx.classBlob.match(/mantine-[A-Za-z0-9]+/g) || []).length;
      if (m < 2) return { score: 0, evidence: [] };
      return { score: Math.min(0.95, 0.4 + m * 0.04), evidence: [`${m} mantine- classes`] };
    },
  },
  {
    id: 'ant-design',
    score: (ctx) => {
      const m = (ctx.classBlob.match(/\bant-[a-z]+(-[a-z]+)*/g) || []).length;
      if (m < 3) return { score: 0, evidence: [] };
      return { score: Math.min(0.95, 0.4 + m * 0.03), evidence: [`${m} ant- classes`] };
    },
  },
  {
    id: 'bootstrap',
    score: (ctx) => {
      const hits = ['container', 'row', 'col-md-', 'btn-primary', 'navbar-nav', 'card-body']
        .filter(k => ctx.classBlob.includes(k)).length;
      if (hits < 3) return { score: 0, evidence: [] };
      return { score: Math.min(0.9, 0.3 + hits * 0.1), evidence: [`bootstrap utility hits: ${hits}`] };
    },
  },
  {
    id: 'heroui',
    score: (ctx) => {
      const m = (ctx.classBlob.match(/\bheroui-|\bnextui-/g) || []).length;
      if (m < 2) return { score: 0, evidence: [] };
      return { score: Math.min(0.95, 0.4 + m * 0.05), evidence: [`${m} heroui/nextui classes`] };
    },
  },
  {
    id: 'tailwind-ui',
    score: (ctx) => {
      // Tailwind UI is a starter/template, not a runtime — use density of
      // Tailwind utilities + typical Tailwind UI patterns as a weak signal.
      if (ctx.tailwindLike < 0.6) return { score: 0, evidence: [] };
      const patterns = ['ring-offset-', 'focus:ring-', 'hover:bg-gray-', 'prose prose-'];
      const hits = patterns.filter(p => ctx.classBlob.includes(p)).length;
      if (hits < 2) return { score: 0, evidence: [] };
      return { score: 0.3 + hits * 0.12, evidence: [`tailwind density=${ctx.tailwindLike.toFixed(2)}, pattern hits=${hits}`] };
    },
  },
  {
    id: 'vuetify',
    score: (ctx) => {
      const m = (ctx.classBlob.match(/\bv-[a-z]+(-[a-z]+)?/g) || []).length;
      if (m < 5) return { score: 0, evidence: [] };
      return { score: Math.min(0.9, 0.3 + m * 0.02), evidence: [`${m} v-* classes`] };
    },
  },
  {
    id: 'tailwindcss',
    score: (ctx) => {
      if (ctx.tailwindLike < 0.35) return { score: 0, evidence: [] };
      // Tailwind itself isn't a component library but we report it as a signal
      // when no higher-level library is detected.
      return { score: 0.3 + (ctx.tailwindLike - 0.35) * 1.2, evidence: [`tailwind-like class density ${(ctx.tailwindLike * 100).toFixed(0)}%`] };
    },
  },
];

function computeTailwindLike(classSample) {
  if (!classSample.length) return 0;
  // A rough "looks like Tailwind" metric: fraction of class tokens that match
  // common utility shapes (pt-4, bg-slate-100, text-2xl, flex, gap-x-2, etc.).
  const utilRe = /^(?:sm:|md:|lg:|xl:|2xl:|hover:|focus:|dark:|group-hover:)*(?:p|m|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|w|h|min-w|min-h|max-w|max-h|gap|space|text|font|leading|tracking|bg|border|rounded|shadow|ring|ringed|opacity|flex|grid|items|justify|content|self|place|overflow|z|inset|top|bottom|left|right|translate|rotate|scale|skew|transition|duration|ease|delay|animate)(?:-[a-z0-9/.:\[\]%-]+)?$/i;
  let utils = 0, total = 0;
  for (const cls of classSample) {
    for (const tok of cls.split(/\s+/).slice(0, 30)) {
      if (!tok) continue;
      total++;
      if (utilRe.test(tok)) utils++;
    }
  }
  return total > 0 ? utils / total : 0;
}

function countRadixAttrs(classSample, attrSample = []) {
  // Radix emits attributes like data-radix-popper-content-wrapper, data-state,
  // data-orientation, data-slot. We don't have a full attr dump, but script src
  // for @radix-ui is also a tell.
  let n = 0;
  for (const a of attrSample) {
    if (/data-radix|data-slot|data-state|data-orientation/.test(a)) n++;
  }
  return n;
}

export function extractComponentLibrary(stackSignals = {}) {
  const classSample = (stackSignals.classNameSample || []).slice(0, 500);
  const classBlob = classSample.join(' ');
  const scripts = (stackSignals.scripts || []).join(' ');
  const attrSample = stackSignals.attrSample || [];

  const tailwindLike = computeTailwindLike(classSample);
  let radixAttrCount = countRadixAttrs(classSample, attrSample);
  if (/@radix-ui/.test(scripts)) radixAttrCount += 3;

  const ctx = { classSample, classBlob, scripts, tailwindLike, radixAttrCount };

  const ranked = [];
  for (const lib of LIB_FINGERPRINTS) {
    const { score, evidence } = lib.score(ctx);
    if (score > 0) {
      ranked.push({ id: lib.id, score: Number(score.toFixed(3)), evidence });
    }
  }
  // Tailwind CSS is a styling layer, not a component library. If any
  // higher-level library also scored, demote tailwindcss so it doesn't shadow
  // the real answer.
  const hasHigherLevel = ranked.some(r => r.id !== 'tailwindcss' && r.id !== 'tailwind-ui' && r.score > 0.35);
  if (hasHigherLevel) {
    for (const r of ranked) {
      if (r.id === 'tailwindcss') r.score = Math.min(r.score, 0.3);
    }
  }
  ranked.sort((a, b) => b.score - a.score);

  const primary = ranked[0] || { id: 'unknown', score: 0, evidence: [] };
  // If shadcn and radix both score, prefer shadcn at the top and keep radix as
  // the underlying primitive.
  const alternates = ranked.slice(1, 5);

  return {
    library: primary.id,
    confidence: primary.score,
    evidence: primary.evidence,
    alternates,
    signals: {
      tailwindLike: Number(tailwindLike.toFixed(3)),
      radixAttrCount,
      classSampleSize: classSample.length,
    },
    needsSmart: primary.score < 0.55,
  };
}
