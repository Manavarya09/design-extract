// Hand-curated DTCG sample shaped exactly like formatDtcgTokens() output.
// Derived from the Stripe PR B smoke run; used as seed data for <TokenBrowser />.

export const sampleTokens = {
  $metadata: {
    generator: 'designlang',
    version: '7.0.0',
    spec: 'https://design-tokens.github.io/community-group/format/',
    source: 'https://stripe.com',
  },
  primitive: {
    color: {
      brand: {
        primary: { $value: '#533afd', $type: 'color' },
        secondary: { $value: '#0a2540', $type: 'color' },
      },
      neutral: {
        n100: { $value: '#f6f9fc', $type: 'color' },
        n500: { $value: '#8792a2', $type: 'color' },
        n900: { $value: '#0a2540', $type: 'color' },
      },
      background: {
        bg0: { $value: '#ffffff', $type: 'color' },
      },
    },
    radius: {
      r0: { $value: '4px', $type: 'dimension' },
      r1: { $value: '8px', $type: 'dimension' },
    },
    spacing: {
      s2: { $value: '8px', $type: 'dimension' },
      s4: { $value: '16px', $type: 'dimension' },
    },
  },
  semantic: {
    color: {
      action: {
        primary: { $value: '{primitive.color.brand.primary}', $type: 'color' },
      },
      surface: {
        default: { $value: '{primitive.color.background.bg0}', $type: 'color' },
      },
      text: {
        body: { $value: '{primitive.color.neutral.n900}', $type: 'color' },
      },
    },
    radius: {
      control: { $value: '{primitive.radius.r1}', $type: 'dimension' },
    },
    typography: {
      body: {
        $value: {
          fontFamily: 'sohne-var, Helvetica Neue, Arial, sans-serif',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.5',
        },
        $type: 'typography',
      },
    },
  },
};

// The CLI invocation that produced the sample.
export const sampleCommand = '$ npx designlang https://stripe.com --format dtcg';
