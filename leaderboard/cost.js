// A hard spending cap for leaderboard runs. Prices are USD per million tokens
// from Atlas Cloud's model pages; a model missing here is priced high so the
// cap errs on the side of stopping early.

export const PRICES = {
  'openai/gpt-6.1-sol': { input: 2, output: 10 },
  'google/gemini-4-argon': { input: 1.6, output: 8 },
  'moonshotai/kimi-k3.1-pro': { input: 2, output: 10 },
  'zai-org/glm-5.3-flash': { input: 0.15, output: 0.5 },
};
const FALLBACK = { input: 3, output: 15 };

export class BudgetExceeded extends Error {
  constructor(spent, cap) {
    super(`Spent $${spent.toFixed(2)} of a $${cap} cap`);
    this.name = 'BudgetExceeded';
  }
}

export function costOf(usage = {}, model) {
  const p = PRICES[model] || FALLBACK;
  const input = usage.prompt_tokens ?? usage.input_tokens ?? 0;
  const output = usage.completion_tokens ?? usage.output_tokens ?? 0;
  return (input * p.input + output * p.output) / 1e6;
}

export function createBudget({ capUsd }) {
  let spent = 0;
  const check = () => { if (spent > capUsd) throw new BudgetExceeded(spent, capUsd); };
  return {
    charge(usage, model) { spent += costOf(usage, model); check(); },
    check,
    spent: () => spent,
  };
}
