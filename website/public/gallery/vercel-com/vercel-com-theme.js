// React Theme — extracted from https://vercel.com
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
    '8': string;
    '12': string;
    '13': string;
    '14': string;
    '16': string;
    '18': string;
    '20': string;
    '24': string;
    '32': string;
    '40': string;
    '48': string;
    '9.5': string;
 *   };
 *   space: {
    '1': string;
    '24': string;
    '32': string;
    '36': string;
    '40': string;
    '44': string;
    '48': string;
    '85': string;
    '90': string;
    '96': string;
    '135': string;
    '144': string;
    '161': string;
 *   };
 *   radii: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
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
    "primary": "#0068d6",
    "secondary": "#52aeff",
    "accent": "#0070f3",
    "background": "#fafafa",
    "foreground": "#171717",
    "neutral50": "#171717",
    "neutral100": "#ebebeb",
    "neutral200": "#4d4d4d",
    "neutral300": "#ffffff",
    "neutral400": "#666666",
    "neutral500": "#000000",
    "neutral600": "#7d7d7d",
    "neutral700": "#a8a8a8",
    "neutral800": "#8f8f8f",
    "neutral900": "#ebf5ff"
  },
  "fonts": {
    "body": "'Geist', sans-serif",
    "mono": "'Geist Mono', monospace"
  },
  "fontSizes": {
    "8": "8px",
    "12": "12px",
    "13": "13px",
    "14": "14px",
    "16": "16px",
    "18": "18px",
    "20": "20px",
    "24": "24px",
    "32": "32px",
    "40": "40px",
    "48": "48px",
    "9.5": "9.5px"
  },
  "space": {
    "1": "1px",
    "24": "24px",
    "32": "32px",
    "36": "36px",
    "40": "40px",
    "44": "44px",
    "48": "48px",
    "85": "85px",
    "90": "90px",
    "96": "96px",
    "135": "135px",
    "144": "144px",
    "161": "161px"
  },
  "radii": {
    "xs": "2px",
    "sm": "5px",
    "md": "8px",
    "lg": "16px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0.04) 0px 2px 2px 0px",
    "xs": "rgba(0, 0, 0, 0.04) 0px 1px 2px 0px"
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
      "main": "#0068d6",
      "light": "hsl(211, 100%, 57%)",
      "dark": "hsl(211, 100%, 27%)"
    },
    "secondary": {
      "main": "#52aeff",
      "light": "hsl(208, 100%, 81%)",
      "dark": "hsl(208, 100%, 51%)"
    },
    "background": {
      "default": "#fafafa",
      "paper": "#ffffff"
    },
    "text": {
      "primary": "#171717",
      "secondary": "#0072f5"
    }
  },
  "typography": {
    "h1": {
      "fontSize": "32px",
      "fontWeight": "400",
      "lineHeight": "48px"
    },
    "h2": {
      "fontSize": "24px",
      "fontWeight": "600",
      "lineHeight": "32px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "400",
      "lineHeight": "36px"
    },
    "body1": {
      "fontSize": "18px",
      "fontWeight": "400",
      "lineHeight": "28px"
    }
  },
  "shape": {
    "borderRadius": 8
  },
  "shadows": [
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 114, 245) 0px 0px 0px 4px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(235, 235, 235) 0px 0px 0px 1px",
    "rgb(235, 235, 235) 0px 0px 0px 1px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px inset",
    "rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
  ]
};

export default theme;
