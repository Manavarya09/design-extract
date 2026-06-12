// React Theme — extracted from https://github.com
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
    neutral800: string;
    neutral900: string;
 *   };
 *   fonts: {
    body: string;
    mono: string;
 *   };
 *   fontSizes: {
    '12': string;
    '14': string;
    '16': string;
    '18': string;
    '22': string;
    '24': string;
    '32': string;
    '40': string;
    '48': string;
    '64': string;
 *   };
 *   space: {
    '1': string;
    '40': string;
    '64': string;
    '80': string;
    '96': string;
    '102': string;
    '112': string;
    '274': string;
    '308': string;
    '384': string;
    '432': string;
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
    xs: string;
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
    "primary": "#f0f6fc",
    "secondary": "#08872b",
    "accent": "#1f883d",
    "background": "#0d1117",
    "foreground": "#f0f6fc",
    "neutral50": "#ffffff",
    "neutral100": "#000000",
    "neutral200": "#9198a1",
    "neutral300": "#58635b",
    "neutral400": "#59636e",
    "neutral500": "#a4aea6",
    "neutral600": "#d1d9e0",
    "neutral700": "#7c8980",
    "neutral800": "#404651",
    "neutral900": "#484f58"
  },
  "fonts": {
    "body": "'Mona Sans VF', sans-serif",
    "mono": "'Mona Sans Mono', monospace"
  },
  "fontSizes": {
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "18": "18px",
    "22": "22px",
    "24": "24px",
    "32": "32px",
    "40": "40px",
    "48": "48px",
    "64": "64px"
  },
  "space": {
    "1": "1px",
    "40": "40px",
    "64": "64px",
    "80": "80px",
    "96": "96px",
    "102": "102px",
    "112": "112px",
    "274": "274px",
    "308": "308px",
    "384": "384px",
    "432": "432px"
  },
  "radii": {
    "sm": "3px",
    "md": "6px",
    "lg": "16px",
    "xl": "24px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "rgb(61, 68, 77) 0px 0px 0px 1px, rgba(1, 4, 9, 0.4) 0px 6px 12px -3px, rgba(1, 4, 9, 0.4) 0px 6px 18px 0px",
    "xs": "rgb(209, 217, 224) 0px 1px 0px 0px inset"
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
      "main": "#f0f6fc",
      "light": "hsl(210, 67%, 95%)",
      "dark": "hsl(210, 67%, 81%)"
    },
    "secondary": {
      "main": "#08872b",
      "light": "hsl(137, 89%, 43%)",
      "dark": "hsl(137, 89%, 13%)"
    },
    "background": {
      "default": "#0d1117",
      "paper": "#ffffff"
    },
    "text": {
      "primary": "#f0f6fc",
      "secondary": "#1f2328"
    }
  },
  "typography": {
    "h1": {
      "fontSize": "32px",
      "fontWeight": "600",
      "lineHeight": "48px"
    },
    "h2": {
      "fontSize": "24px",
      "fontWeight": "600",
      "lineHeight": "36px"
    },
    "h3": {
      "fontSize": "22px",
      "fontWeight": "400",
      "lineHeight": "30.8px"
    }
  },
  "shape": {
    "borderRadius": 6
  },
  "shadows": [
    "rgba(209, 217, 224, 0.25) 0px 0px 0px 1px, rgba(37, 41, 46, 0.04) 0px 6px 12px -3px, rgba(37, 41, 46, 0.12) 0px 6px 18px 0px",
    "rgba(209, 217, 224, 0) 0px 0px 0px 1px, rgba(37, 41, 46, 0.24) 0px 40px 80px 0px",
    "rgba(255, 255, 255, 0) 0px 0px 0px 1px inset",
    "rgb(61, 68, 77) 0px 0px 0px 1px, rgba(1, 4, 9, 0.4) 0px 6px 12px -3px, rgba(1, 4, 9, 0.4) 0px 6px 18px 0px",
    "rgba(31, 35, 40, 0.04) 0px 1px 0px 0px inset"
  ]
};

export default theme;
