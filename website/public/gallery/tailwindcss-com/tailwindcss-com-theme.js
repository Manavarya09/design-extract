// React Theme — extracted from https://tailwindcss.com
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
 *   };
 *   fonts: {
    body: string;
    mono: string;
 *   };
 *   fontSizes: {
    '12': string;
    '13': string;
    '14': string;
    '16': string;
    '17': string;
    '18': string;
    '20': string;
    '24': string;
    '30': string;
    '36': string;
    '40': string;
    '96': string;
 *   };
 *   space: {
    '1': string;
    '57': string;
    '64': string;
    '72': string;
    '96': string;
    '160': string;
    '336': string;
    '400': string;
 *   };
 *   radii: {
    sm: string;
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
    "primary": "#ec0853",
    "secondary": "#0080ff",
    "accent": "#2ca8ff",
    "background": "#ffffff",
    "foreground": "#000000",
    "neutral50": "#000000",
    "neutral100": "#ffffff"
  },
  "fonts": {
    "body": "'inter', sans-serif",
    "mono": "'plexMono', monospace"
  },
  "fontSizes": {
    "12": "12px",
    "13": "13px",
    "14": "14px",
    "16": "16px",
    "17": "17px",
    "18": "18px",
    "20": "20px",
    "24": "24px",
    "30": "30px",
    "36": "36px",
    "40": "40px",
    "96": "96px"
  },
  "space": {
    "1": "1px",
    "57": "57px",
    "64": "64px",
    "72": "72px",
    "96": "96px",
    "160": "160px",
    "336": "336px",
    "400": "400px"
  },
  "radii": {
    "sm": "4px",
    "md": "8px",
    "lg": "16px",
    "xl": "24px",
    "full": "32px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
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
      "main": "#ec0853",
      "light": "hsl(340, 93%, 63%)",
      "dark": "hsl(340, 93%, 33%)"
    },
    "secondary": {
      "main": "#0080ff",
      "light": "hsl(210, 100%, 65%)",
      "dark": "hsl(210, 100%, 35%)"
    },
    "background": {
      "default": "#ffffff",
      "paper": "#000102"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#ffffff"
    }
  },
  "typography": {
    "fontFamily": "'plexMono', sans-serif",
    "h1": {
      "fontSize": "36px",
      "fontWeight": "600",
      "lineHeight": "48px"
    },
    "h2": {
      "fontSize": "24px",
      "fontWeight": "500",
      "lineHeight": "40px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "600",
      "lineHeight": "24px"
    }
  },
  "shape": {
    "borderRadius": 8
  },
  "shadows": [
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.08) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px"
  ]
};

export default theme;
