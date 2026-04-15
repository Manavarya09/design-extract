export function extractShadows(computedStyles) {
  const shadowSet = new Set();

  for (const el of computedStyles) {
    if (el.boxShadow && el.boxShadow !== 'none') {
      shadowSet.add(el.boxShadow);
    }
  }

  const values = [...shadowSet].map(raw => {
    // Parse: offset-x offset-y blur spread color [inset]
    const inset = raw.includes('inset');
    // Approximate blur from the string for classification
    const nums = raw.match(/([\d.]+)px/g)?.map(n => parseFloat(n)) || [];
    const blur = nums[2] || 0;
    let label = 'md';
    if (blur <= 2) label = 'xs';
    else if (blur <= 6) label = 'sm';
    else if (blur <= 15) label = 'md';
    else if (blur <= 30) label = 'lg';
    else label = 'xl';
    return { raw, blur, inset, label };
  });

  values.sort((a, b) => a.blur - b.blur);
  return { values };
}
