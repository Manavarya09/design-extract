export function extractVariables(cssVariables) {
  const categories = { colors: {}, spacing: {}, typography: {}, shadows: {}, radii: {}, other: {} };

  for (const [name, value] of Object.entries(cssVariables)) {
    const lower = name.toLowerCase();
    if (/color|bg|foreground|primary|secondary|accent|muted|border|ring|destructive|card|popover|chart/.test(lower)) {
      categories.colors[name] = value;
    } else if (/spacing|gap|padding|margin|space|size/.test(lower)) {
      categories.spacing[name] = value;
    } else if (/font|text|line-height|letter|tracking|leading/.test(lower)) {
      categories.typography[name] = value;
    } else if (/shadow/.test(lower)) {
      categories.shadows[name] = value;
    } else if (/radius|rounded/.test(lower)) {
      categories.radii[name] = value;
    } else {
      categories.other[name] = value;
    }
  }

  return categories;
}
