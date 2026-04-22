// Optional LLM fallback for low-confidence classifications. No SDK deps — we
// hit the OpenAI or Anthropic REST API directly via global fetch. Runs only
// when the user passes --smart AND an API key is available in env. Silently
// no-ops otherwise so the core extractor stays zero-config.
//
// Consumers call `refineWithSmart({ pageIntent, sectionRoles, materialLanguage,
// componentLibrary }, digest)` — we only hit the network for fields where
// `needsSmart` is true.

const TASKS = {
  pageIntent: {
    system: 'You classify a web page into one of these types: landing, pricing, docs, blog, blog-post, product, about, dashboard, auth, legal, unknown. Return only a JSON object {"type":"...","confidence":0.xx,"why":"one sentence"}.',
  },
  materialLanguage: {
    system: 'You classify a website\'s visual material language. Choose one of: glassmorphism, neumorphism, flat, brutalist, skeuomorphic, material-you, soft-ui, mixed. Return only a JSON object {"label":"...","confidence":0.xx,"why":"one sentence"}.',
  },
  componentLibrary: {
    system: 'You identify which UI component library a website most likely uses. Choose from: shadcn/ui, radix-ui, headlessui, mui, chakra-ui, mantine, ant-design, bootstrap, heroui, tailwind-ui, vuetify, tailwindcss, unknown. Return only a JSON object {"library":"...","confidence":0.xx,"why":"one sentence"}.',
  },
};

function detectProvider() {
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}

function buildDigest({ rawData, design, pageIntent }) {
  // A compact digest — URL, title, meta description, first 1000 chars of
  // visible text, top classes. Keep under ~3k tokens.
  const sections = (rawData?.light?.sections) || [];
  const text = sections.map(s => s.text || '').join('\n').slice(0, 1500);
  const metas = (rawData?.light?.stack?.metas || []).slice(0, 10)
    .map(m => `${m.name || ''}: ${(m.content || '').slice(0, 120)}`).join('\n');
  const classes = (rawData?.light?.stack?.classNameSample || []).slice(0, 60).join(' | ').slice(0, 1500);
  return [
    `URL: ${rawData?.url || ''}`,
    `TITLE: ${rawData?.title || ''}`,
    `PATH: ${pageIntent?.path || ''}`,
    `METAS:\n${metas}`,
    `SECTION ROLES: ${(design?.regions || []).map(r => r.role).join(',')}`,
    `TEXT SAMPLE:\n${text}`,
    `CLASS SAMPLE:\n${classes}`,
  ].join('\n\n');
}

async function callAnthropic(system, user) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.DESIGNLANG_MODEL || 'claude-haiku-4-5-20251001',
      max_tokens: 200,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const json = await res.json();
  const text = (json.content || []).map(b => b.text || '').join('');
  return text;
}

async function callOpenAI(system, user) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.DESIGNLANG_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      max_tokens: 200,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}`);
  const json = await res.json();
  return json.choices?.[0]?.message?.content || '';
}

async function callLLM(provider, system, user) {
  if (provider === 'anthropic') return callAnthropic(system, user);
  return callOpenAI(system, user);
}

function parseJsonLoose(text) {
  try { return JSON.parse(text); } catch { /* try to find a JSON object */ }
  const m = text.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return null;
}

export async function refineWithSmart({ enabled, rawData, design, pageIntent, sectionRoles, materialLanguage, componentLibrary }) {
  if (!enabled) return { applied: false, reason: 'disabled' };
  const provider = detectProvider();
  if (!provider) return { applied: false, reason: 'no API key (set OPENAI_API_KEY or ANTHROPIC_API_KEY)' };

  const digest = buildDigest({ rawData, design, pageIntent });
  const updates = {};
  const errors = [];

  const queue = [];
  if (pageIntent?.needsSmart) queue.push(['pageIntent', pageIntent]);
  if (materialLanguage && (materialLanguage.confidence || 0) < 0.55) queue.push(['materialLanguage', materialLanguage]);
  if (componentLibrary?.needsSmart) queue.push(['componentLibrary', componentLibrary]);

  for (const [task, current] of queue) {
    const spec = TASKS[task];
    if (!spec) continue;
    const user = `Digest:\n${digest}\n\nCurrent heuristic result:\n${JSON.stringify(current)}\n\nRespond with the requested JSON.`;
    try {
      const raw = await callLLM(provider, spec.system, user);
      const parsed = parseJsonLoose(raw);
      if (parsed) updates[task] = { ...parsed, smart: true, provider };
    } catch (e) {
      errors.push(`${task}: ${e.message}`);
    }
  }

  return { applied: true, provider, updates, errors };
}
