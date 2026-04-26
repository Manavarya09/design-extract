// URL safety guard for the extraction endpoint.
//
// Validates a raw user-supplied URL against common SSRF vectors. Pure function —
// no DNS lookups (deferred to Wave 3 when we pair with BotID at middleware).
//
// Allowed: http(s) URLs on port 80/443, public hostnames.
// Rejected: private IPs (v4 + v6), loopback, link-local, localhost, *.local,
// *.localhost, non-http(s) schemes, non-standard ports.

const IPV4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

function isPrivateIPv4(host) {
  const m = host.match(IPV4);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  if (a < 0 || a > 255 || b < 0 || b > 255 || Number(m[3]) > 255 || Number(m[4]) > 255) return true;
  if (a === 10) return true;                                  // 10.0.0.0/8
  if (a === 127) return true;                                 // 127.0.0.0/8
  if (a === 169 && b === 254) return true;                    // 169.254.0.0/16
  if (a === 172 && b >= 16 && b <= 31) return true;           // 172.16.0.0/12
  if (a === 192 && b === 168) return true;                    // 192.168.0.0/16
  if (a === 0) return true;                                   // 0.0.0.0/8
  return false;
}

// Normalize an IPv6 literal: strip surrounding brackets, lowercase.
function stripV6Brackets(host) {
  if (host.startsWith('[') && host.endsWith(']')) return host.slice(1, -1);
  return host;
}

function isIPv6Literal(host) {
  // Very loose — anything with a colon that isn't a port-suffixed hostname.
  return host.includes(':');
}

// Expand an IPv6 host string to its eight 16-bit pieces. Inlines a dotted-IPv4
// tail (the WHATWG URL parser may also serialize this back to hex, but we
// accept either) and resolves "::" by inserting the right number of zero pieces.
// Returns null on malformed input.
function expandIPv6(host) {
  let normalized = host;
  const dotted = normalized.match(/^(.*:)(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (dotted) {
    const [, prefix, a, b, c, d] = dotted;
    const hi = (((+a) & 0xff) << 8) | ((+b) & 0xff);
    const lo = (((+c) & 0xff) << 8) | ((+d) & 0xff);
    normalized = `${prefix}${hi.toString(16)}:${lo.toString(16)}`;
  }
  let parts;
  if (normalized.includes('::')) {
    const [left, right] = normalized.split('::', 2);
    const leftParts = left ? left.split(':') : [];
    const rightParts = right ? right.split(':') : [];
    const missing = 8 - leftParts.length - rightParts.length;
    if (missing < 0) return null;
    parts = [...leftParts, ...Array(missing).fill('0'), ...rightParts];
  } else {
    parts = normalized.split(':');
  }
  if (parts.length !== 8) return null;
  if (!parts.every((p) => /^[0-9a-f]{1,4}$/.test(p))) return null;
  return parts;
}

function piecesAllZero(parts, start, endExclusive) {
  for (let i = start; i < endExclusive; i++) {
    if (parseInt(parts[i], 16) !== 0) return false;
  }
  return true;
}

function isPrivateIPv6(rawHost) {
  const host = stripV6Brackets(rawHost).toLowerCase();
  if (!isIPv6Literal(host)) return false;
  const parts = expandIPv6(host);
  if (!parts) return false;

  // Loopback ::1 and unspecified ::
  if (piecesAllZero(parts, 0, 7) && parseInt(parts[7], 16) === 1) return true;
  if (piecesAllZero(parts, 0, 8)) return true;
  // fc00::/7 — unique local addresses
  if (/^f[cd][0-9a-f]{0,2}$/.test(parts[0])) return true;
  // fe80::/10 — link-local
  if (/^fe[89ab][0-9a-f]?$/.test(parts[0])) return true;

  // Embedded IPv4 in the low 32 bits — IPv4-mapped (::ffff:a.b.c.d),
  // IPv4-compatible (::a.b.c.d, deprecated), NAT64 (64:ff9b::a.b.c.d).
  // Node's WHATWG URL parser re-serializes the dotted tail as two hex pieces,
  // so "[::ffff:127.0.0.1]" reaches us as "[::ffff:7f00:1]". The previous
  // dotted-only regex missed every one of these encodings.
  const isMapped = piecesAllZero(parts, 0, 5) && parts[5] === 'ffff';
  const isCompat = piecesAllZero(parts, 0, 6);
  const isNat64 = parts[0] === '64' && parts[1] === 'ff9b' && piecesAllZero(parts, 2, 6);
  if (isMapped || isCompat || isNat64) {
    const hi = parseInt(parts[6], 16);
    const lo = parseInt(parts[7], 16);
    const v4 = `${(hi >> 8) & 0xff}.${hi & 0xff}.${(lo >> 8) & 0xff}.${lo & 0xff}`;
    if (isPrivateIPv4(v4)) return true;
  }

  return false;
}

function isLocalHostname(host) {
  const h = host.toLowerCase();
  if (h === 'localhost') return true;
  if (h.endsWith('.local')) return true;
  if (h.endsWith('.localhost')) return true;
  return false;
}

export function validateTargetUrl(rawUrl) {
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) {
    return { ok: false, reason: 'URL is required', status: 400 };
  }
  let input = rawUrl.trim();
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(input)) {
    input = `https://${input}`;
  }

  let parsed;
  try { parsed = new URL(input); } catch {
    return { ok: false, reason: 'Invalid URL', status: 400 };
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { ok: false, reason: 'Only http(s) URLs are allowed', status: 400 };
  }

  // Port check: URL leaves `port` empty for defaults (80 for http, 443 for https).
  // Explicit 80/443 are fine; anything else is rejected.
  if (parsed.port && parsed.port !== '80' && parsed.port !== '443') {
    return { ok: false, reason: 'Port not allowed (only 80/443)', status: 400 };
  }

  const hostname = parsed.hostname;
  if (!hostname) {
    return { ok: false, reason: 'Missing hostname', status: 400 };
  }

  if (isLocalHostname(hostname)) {
    return { ok: false, reason: 'Local hostnames are not allowed', status: 400 };
  }

  if (IPV4.test(hostname) && isPrivateIPv4(hostname)) {
    return { ok: false, reason: 'Private IP addresses are not allowed', status: 400 };
  }

  if (isPrivateIPv6(hostname)) {
    return { ok: false, reason: 'Private IP addresses are not allowed', status: 400 };
  }

  return { ok: true, url: parsed.toString() };
}
