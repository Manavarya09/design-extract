export function extractComponents(computedStyles) {
  const components = {};

  // Buttons
  const buttons = computedStyles.filter(el =>
    el.tag === 'button' || el.role === 'button' ||
    (el.tag === 'a' && /btn|button/i.test(el.classList))
  );
  if (buttons.length > 0) {
    components.buttons = {
      count: buttons.length,
      baseStyle: mostCommonStyle(buttons, ['backgroundColor', 'color', 'fontSize', 'fontWeight', 'paddingTop', 'paddingRight', 'borderRadius']),
    };
  }

  // Cards
  const cards = computedStyles.filter(el =>
    /card/i.test(el.classList) ||
    (el.tag === 'div' && el.boxShadow !== 'none' && el.borderRadius !== '0px' && el.backgroundColor !== 'rgba(0, 0, 0, 0)')
  );
  if (cards.length > 0) {
    components.cards = {
      count: cards.length,
      baseStyle: mostCommonStyle(cards, ['backgroundColor', 'borderRadius', 'boxShadow', 'paddingTop', 'paddingRight']),
    };
  }

  // Inputs
  const inputs = computedStyles.filter(el =>
    ['input', 'textarea', 'select'].includes(el.tag)
  );
  if (inputs.length > 0) {
    components.inputs = {
      count: inputs.length,
      baseStyle: mostCommonStyle(inputs, ['backgroundColor', 'color', 'borderColor', 'borderRadius', 'fontSize', 'paddingTop', 'paddingRight']),
    };
  }

  // Links
  const links = computedStyles.filter(el => el.tag === 'a');
  if (links.length > 0) {
    components.links = {
      count: links.length,
      baseStyle: mostCommonStyle(links, ['color', 'fontSize', 'fontWeight']),
    };
  }

  return components;
}

function mostCommonStyle(elements, properties) {
  const style = {};
  for (const prop of properties) {
    const counts = new Map();
    for (const el of elements) {
      const val = el[prop];
      if (val && val !== 'none' && val !== 'auto' && val !== 'normal' && val !== 'rgba(0, 0, 0, 0)') {
        counts.set(val, (counts.get(val) || 0) + 1);
      }
    }
    if (counts.size > 0) {
      style[prop] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
    }
  }
  return style;
}
