// Cluster similar component instances by structuralHash + style vector cosine similarity.

function cosine(a = [], b = []) {
  const n = Math.min(a.length, b.length);
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : (na === nb ? 1 : 0);
}

export function clusterComponents(elements = [], { threshold = 0.95 } = {}) {
  const byKind = {};
  for (const el of elements) {
    const key = `${el.kind}|${el.structuralHash}`;
    (byKind[key] ||= []).push(el);
  }
  const out = [];
  for (const group of Object.values(byKind)) {
    const variants = [];
    for (const el of group) {
      const match = variants.find(v => cosine(v.example.styleVector || [], el.styleVector || []) >= threshold);
      if (match) {
        match.instanceCount++;
      } else {
        variants.push({ example: el, instanceCount: 1 });
      }
    }
    out.push({
      kind: group[0].kind,
      structuralHash: group[0].structuralHash,
      instanceCount: group.length,
      variants: variants.map(v => ({ css: v.example.css, instanceCount: v.instanceCount })),
    });
  }
  return out;
}
