// True in the static build (scripts/build-static.mjs): there is no server, so
// live reads can't run. Widgets that would call /api/* point at the CLI instead.
export const STATIC_SITE = process.env.NEXT_PUBLIC_STATIC_SITE === '1';

export function livePausedMessage(rawUrl) {
  const host = String(rawUrl || '').trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return `Live reads are paused on this site. Run it on your machine: npx designlang ${host || '<site>'}`;
}
