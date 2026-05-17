// React Theme — extracted from https://stripe.com
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '10': string;
    '11': string;
    '12': string;
    '14': string;
    '16': string;
    '18': string;
    '20': string;
    '22': string;
    '26': string;
    '32': string;
    '48': string;
    '56': string;
 *   };
 *   space: {
    '1': string;
    '28': string;
    '32': string;
    '40': string;
    '48': string;
    '52': string;
    '60': string;
    '64': string;
    '72': string;
    '80': string;
    '96': string;
    '340': string;
    '366': string;
 *   };
 *   radii: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
 *   };
 *   shadows: {
    md: string;
    lg: string;
    xl: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#533afd",
    "secondary": "#e5edf5",
    "accent": "#ffe0d1",
    "background": "#ffffff",
    "foreground": "#000000",
    "neutral50": "#000000",
    "neutral100": "#50617a",
    "neutral200": "#ffffff",
    "neutral300": "#64748d",
    "neutral400": "#101010",
    "neutral500": "#f2f7fe"
  },
  "fonts": {
    "body": "'sohne-var', sans-serif"
  },
  "fontSizes": {
    "10": "10px",
    "11": "11px",
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "18": "18px",
    "20": "20px",
    "22": "22px",
    "26": "26px",
    "32": "32px",
    "48": "48px",
    "56": "56px"
  },
  "space": {
    "1": "1px",
    "28": "28px",
    "32": "32px",
    "40": "40px",
    "48": "48px",
    "52": "52px",
    "60": "60px",
    "64": "64px",
    "72": "72px",
    "80": "80px",
    "96": "96px",
    "340": "340px",
    "366": "366px"
  },
  "radii": {
    "xs": "1px",
    "sm": "4px",
    "md": "8px",
    "lg": "16px",
    "full": "100px"
  },
  "shadows": {
    "md": "rgba(23, 23, 23, 0.06) 0px 3px 6px 0px",
    "lg": "rgba(0, 0, 0, 0.06) 0px 4px 24px 0px, rgba(0, 0, 0, 0.03) 0px 1px 2px 0px",
    "xl": "rgba(0, 0, 0, 0.1) 0px 30px 60px -50px, rgba(50, 50, 93, 0.25) 0px 30px 60px -10px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#533afd",
      "light": "hsl(248, 98%, 76%)",
      "dark": "hsl(248, 98%, 46%)"
    },
    "secondary": {
      "main": "#e5edf5",
      "light": "hsl(210, 44%, 95%)",
      "dark": "hsl(210, 44%, 78%)"
    },
    "background": {
      "default": "#ffffff",
      "paper": "#e5edf5"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#533afd"
    }
  },
  "typography": {
    "h1": {
      "fontSize": "32px",
      "fontWeight": "300",
      "lineHeight": "35.2px"
    },
    "h2": {
      "fontSize": "26px",
      "fontWeight": "400",
      "lineHeight": "normal"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "300",
      "lineHeight": "28px"
    }
  },
  "shape": {
    "borderRadius": 8
  },
  "shadows": [
    "rgba(23, 23, 23, 0.06) 0px 3px 6px 0px",
    "rgba(0, 0, 0, 0.06) 0px 4px 24px 0px, rgba(0, 0, 0, 0.03) 0px 1px 2px 0px",
    "rgba(50, 50, 93, 0.12) 0px 16px 32px 0px",
    "rgba(23, 23, 23, 0.08) 0px 15px 35px 0px",
    "rgba(0, 0, 0, 0.1) 0px 30px 60px -50px, rgba(50, 50, 93, 0.25) 0px 30px 60px -10px"
  ]
};

export default theme;
