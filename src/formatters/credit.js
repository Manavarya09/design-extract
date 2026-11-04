// The small "Measured with designlang" line on the files people paste into
// their projects. Off with --no-credit.

export const CREDIT_URL = 'https://designlang.app';

export function withCredit(content, kind) {
  if (kind === 'md') return `${content.replace(/\s*$/, '')}\n\n---\n\nMeasured with [designlang](${CREDIT_URL}).\n`;
  if (kind === 'js') return `// Measured with designlang: ${CREDIT_URL}\n${content}`;
  if (kind === 'css') return `/* Measured with designlang: ${CREDIT_URL} */\n${content}`;
  return content;
}
