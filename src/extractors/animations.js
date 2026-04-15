export function extractAnimations(computedStyles, keyframes) {
  const transitionSet = new Set();
  const easingSet = new Set();
  const durationSet = new Set();

  for (const el of computedStyles) {
    if (el.transition && el.transition !== 'all 0s ease 0s' && el.transition !== 'none') {
      transitionSet.add(el.transition);

      // Extract easing and duration
      const dMatch = el.transition.match(/([\d.]+m?s)/g);
      if (dMatch) dMatch.forEach(d => durationSet.add(d));

      const eMatch = el.transition.match(/(ease|ease-in|ease-out|ease-in-out|linear|cubic-bezier\([^)]+\))/g);
      if (eMatch) eMatch.forEach(e => easingSet.add(e));
    }
  }

  return {
    transitions: [...transitionSet],
    easings: [...easingSet],
    durations: [...durationSet],
    keyframes: keyframes.map(kf => ({
      name: kf.name,
      steps: kf.steps,
    })),
  };
}
