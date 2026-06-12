// React Theme — extracted from https://anthropic.com
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
    neutral600: string;
    neutral700: string;
 *   };
 *   fonts: {
    body: string;
    mono: string;
 *   };
 *   fontSizes: {
    '12': string;
    '14': string;
    '15': string;
    '16': string;
    '18': string;
    '20': string;
    '24': string;
    '64.6857': string;
    '57.7306': string;
 *   };
 *   space: {
    '2': string;
    '21': string;
    '31': string;
    '45': string;
    '53': string;
    '58': string;
    '67': string;
    '84': string;
    '100': string;
    '142': string;
    '149': string;
    '165': string;
    '214': string;
 *   };
 *   radii: {
    md: string;
    lg: string;
    xl: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
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
    "primary": "#d97757",
    "secondary": "#faf9f5",
    "accent": "#f5e3c7",
    "background": "#faf9f5",
    "foreground": "#000000",
    "neutral50": "#141413",
    "neutral100": "#b0aea5",
    "neutral200": "#000000",
    "neutral300": "#87867f",
    "neutral400": "#f0eee6",
    "neutral500": "#3d3d3a",
    "neutral600": "#e8e6dc",
    "neutral700": "#a1a0a0"
  },
  "fonts": {
    "body": "'Times', sans-serif",
    "mono": "'Anthropic Mono', monospace"
  },
  "fontSizes": {
    "12": "12px",
    "14": "14px",
    "15": "15px",
    "16": "16px",
    "18": "18px",
    "20": "20px",
    "24": "24px",
    "64.6857": "64.6857px",
    "57.7306": "57.7306px"
  },
  "space": {
    "2": "2px",
    "21": "21px",
    "31": "31px",
    "45": "45px",
    "53": "53px",
    "58": "58px",
    "67": "67px",
    "84": "84px",
    "100": "100px",
    "142": "142px",
    "149": "149px",
    "165": "165px",
    "214": "214px"
  },
  "radii": {
    "md": "8px",
    "lg": "16px",
    "xl": "24px",
    "full": "1600px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0.01) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 4px 0px, rgba(0, 0, 0, 0.04) 0px 16px 24px 0px"
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
      "main": "#d97757",
      "light": "hsl(15, 63%, 75%)",
      "dark": "hsl(15, 63%, 45%)"
    },
    "secondary": {
      "main": "#faf9f5",
      "light": "hsl(48, 33%, 95%)",
      "dark": "hsl(48, 33%, 82%)"
    },
    "background": {
      "default": "#faf9f5",
      "paper": "#f0eee6"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#141413"
    }
  },
  "typography": {
    "fontFamily": "'Anthropic Mono', sans-serif",
    "h1": {
      "fontSize": "57.7306px",
      "fontWeight": "700",
      "lineHeight": "63.5037px"
    },
    "h2": {
      "fontSize": "24px",
      "fontWeight": "400",
      "lineHeight": "33.6px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "400",
      "lineHeight": "28px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "normal"
    }
  },
  "shape": {
    "borderRadius": 8
  },
  "shadows": [
    "rgba(0, 0, 0, 0.01) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 4px 0px, rgba(0, 0, 0, 0.04) 0px 16px 24px 0px"
  ]
};

export default theme;
