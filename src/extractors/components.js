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

  // Navigation
  const navs = computedStyles.filter(el =>
    el.tag === 'nav' || el.role === 'navigation' ||
    /nav|navbar|header/i.test(el.classList)
  );
  if (navs.length > 0) {
    components.navigation = {
      count: navs.length,
      baseStyle: mostCommonStyle(navs, ['backgroundColor', 'color', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'position', 'boxShadow']),
    };
  }

  // Footer
  const footers = computedStyles.filter(el =>
    el.tag === 'footer' || el.role === 'contentinfo' ||
    /footer/i.test(el.classList)
  );
  if (footers.length > 0) {
    components.footer = {
      count: footers.length,
      baseStyle: mostCommonStyle(footers, ['backgroundColor', 'color', 'paddingTop', 'paddingBottom', 'fontSize']),
    };
  }

  // Modals / Dialogs
  const modals = computedStyles.filter(el =>
    el.tag === 'dialog' || el.role === 'dialog' || el.role === 'alertdialog' ||
    /modal|dialog|overlay|popup/i.test(el.classList)
  );
  if (modals.length > 0) {
    components.modals = {
      count: modals.length,
      baseStyle: mostCommonStyle(modals, ['backgroundColor', 'borderRadius', 'boxShadow', 'paddingTop', 'paddingRight', 'maxWidth']),
    };
  }

  // Dropdowns / Menus
  const dropdowns = computedStyles.filter(el =>
    el.role === 'menu' || el.role === 'listbox' ||
    /dropdown|menu|popover|combobox/i.test(el.classList)
  );
  if (dropdowns.length > 0) {
    components.dropdowns = {
      count: dropdowns.length,
      baseStyle: mostCommonStyle(dropdowns, ['backgroundColor', 'borderRadius', 'boxShadow', 'borderColor', 'paddingTop']),
    };
  }

  // Tables
  const tables = computedStyles.filter(el => el.tag === 'table' || el.role === 'table');
  const tableCells = computedStyles.filter(el => ['td', 'th'].includes(el.tag));
  if (tables.length > 0 || tableCells.length > 10) {
    components.tables = {
      count: tables.length,
      cellCount: tableCells.length,
      baseStyle: {
        ...mostCommonStyle(tables, ['borderColor', 'backgroundColor']),
        cellStyle: mostCommonStyle(tableCells, ['paddingTop', 'paddingRight', 'borderColor', 'fontSize']),
      },
    };
  }

  // Badges / Tags / Pills
  const badges = computedStyles.filter(el =>
    /badge|tag|pill|chip|label/i.test(el.classList) &&
    el.area < 5000 && el.area > 100
  );
  if (badges.length > 0) {
    components.badges = {
      count: badges.length,
      baseStyle: mostCommonStyle(badges, ['backgroundColor', 'color', 'fontSize', 'fontWeight', 'paddingTop', 'paddingRight', 'borderRadius']),
    };
  }

  // Avatars
  const avatars = computedStyles.filter(el =>
    /avatar/i.test(el.classList) ||
    (el.tag === 'img' && el.borderRadius === '9999px' && el.area < 10000 && el.area > 400)
  );
  if (avatars.length > 0) {
    components.avatars = {
      count: avatars.length,
      baseStyle: mostCommonStyle(avatars, ['borderRadius', 'backgroundColor']),
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
