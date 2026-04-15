// Design system scoring — rate consistency and quality

export function scoreDesignSystem(design) {
  const scores = {};
  const issues = [];

  // 1. Color discipline (0-100)
  // Fewer unique colors = more disciplined
  const colorCount = design.colors.all.length;
  if (colorCount <= 8) scores.colorDiscipline = 100;
  else if (colorCount <= 15) scores.colorDiscipline = 85;
  else if (colorCount <= 25) scores.colorDiscipline = 70;
  else if (colorCount <= 40) scores.colorDiscipline = 50;
  else { scores.colorDiscipline = 30; issues.push(`${colorCount} unique colors detected — consider consolidating to a tighter palette`); }

  if (!design.colors.primary) {
    scores.colorDiscipline -= 15;
    issues.push('No clear primary brand color detected');
  }

  // 2. Typography consistency (0-100)
  const fontCount = design.typography.families.length;
  if (fontCount <= 2) scores.typographyConsistency = 100;
  else if (fontCount <= 3) scores.typographyConsistency = 80;
  else { scores.typographyConsistency = 50; issues.push(`${fontCount} font families — consider limiting to 2 (heading + body)`); }

  const weightCount = design.typography.weights.length;
  if (weightCount <= 3) scores.typographyConsistency = Math.min(scores.typographyConsistency, 100);
  else if (weightCount <= 5) scores.typographyConsistency = Math.min(scores.typographyConsistency, 80);
  else { scores.typographyConsistency -= 15; issues.push(`${weightCount} font weights in use — consider standardizing to 3 (regular, medium, bold)`); }

  const scaleSize = design.typography.scale.length;
  if (scaleSize <= 6) scores.typographyConsistency = Math.min(scores.typographyConsistency, 100);
  else if (scaleSize <= 10) scores.typographyConsistency = Math.min(scores.typographyConsistency, 85);
  else { scores.typographyConsistency -= 10; issues.push(`${scaleSize} distinct font sizes — consider a tighter type scale`); }

  // 3. Spacing system (0-100)
  if (design.spacing.base) {
    scores.spacingSystem = 90;
    // Check how many values fit the base
    const fittingValues = design.spacing.scale.filter(v => v % design.spacing.base === 0).length;
    const fitRatio = fittingValues / design.spacing.scale.length;
    if (fitRatio >= 0.8) scores.spacingSystem = 100;
    else if (fitRatio >= 0.6) scores.spacingSystem = 80;
    else scores.spacingSystem = 65;
  } else {
    scores.spacingSystem = 40;
    issues.push('No consistent spacing base unit detected — values appear arbitrary');
  }

  if (design.spacing.scale.length > 20) {
    scores.spacingSystem -= 15;
    issues.push(`${design.spacing.scale.length} unique spacing values — too many one-off values`);
  }

  // 4. Shadow consistency (0-100)
  const shadowCount = design.shadows.values.length;
  if (shadowCount === 0) scores.shadowConsistency = 80; // no shadows is fine
  else if (shadowCount <= 4) scores.shadowConsistency = 100;
  else if (shadowCount <= 8) scores.shadowConsistency = 75;
  else { scores.shadowConsistency = 50; issues.push(`${shadowCount} unique shadows — consider a 3-level elevation scale (sm/md/lg)`); }

  // 5. Border radius consistency (0-100)
  const radiiCount = design.borders.radii.length;
  if (radiiCount <= 3) scores.radiusConsistency = 100;
  else if (radiiCount <= 5) scores.radiusConsistency = 85;
  else if (radiiCount <= 8) scores.radiusConsistency = 65;
  else { scores.radiusConsistency = 40; issues.push(`${radiiCount} unique border radii — standardize to 3-4 values`); }

  // 6. Accessibility (from existing extractor)
  scores.accessibility = design.accessibility?.score || 0;
  if (design.accessibility?.failCount > 0) {
    issues.push(`${design.accessibility.failCount} WCAG contrast failures`);
  }

  // 7. CSS variable usage (0-100)
  const varCount = Object.values(design.variables).reduce((s, v) => s + Object.keys(v).length, 0);
  if (varCount >= 20) scores.tokenization = 100;
  else if (varCount >= 10) scores.tokenization = 75;
  else if (varCount >= 1) scores.tokenization = 50;
  else { scores.tokenization = 20; issues.push('No CSS custom properties found — design is not tokenized'); }

  // Overall score (weighted average)
  const weights = {
    colorDiscipline: 20,
    typographyConsistency: 20,
    spacingSystem: 20,
    shadowConsistency: 10,
    radiusConsistency: 10,
    accessibility: 15,
    tokenization: 5,
  };

  let totalWeight = 0;
  let weightedSum = 0;
  for (const [key, weight] of Object.entries(weights)) {
    if (scores[key] !== undefined) {
      weightedSum += Math.max(0, scores[key]) * weight;
      totalWeight += weight;
    }
  }

  const overall = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  // Grade
  let grade;
  if (overall >= 90) grade = 'A';
  else if (overall >= 80) grade = 'B';
  else if (overall >= 70) grade = 'C';
  else if (overall >= 60) grade = 'D';
  else grade = 'F';

  return {
    overall,
    grade,
    scores,
    issues,
    strengths: getStrengths(scores),
  };
}

function getStrengths(scores) {
  const strengths = [];
  if (scores.colorDiscipline >= 85) strengths.push('Tight, disciplined color palette');
  if (scores.typographyConsistency >= 85) strengths.push('Consistent typography system');
  if (scores.spacingSystem >= 85) strengths.push('Well-defined spacing scale');
  if (scores.shadowConsistency >= 85) strengths.push('Clean elevation system');
  if (scores.radiusConsistency >= 85) strengths.push('Consistent border radii');
  if (scores.accessibility >= 90) strengths.push('Strong accessibility compliance');
  if (scores.tokenization >= 75) strengths.push('Good CSS variable tokenization');
  return strengths;
}
