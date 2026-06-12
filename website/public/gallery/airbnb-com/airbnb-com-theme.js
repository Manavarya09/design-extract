// React Theme — extracted from https://airbnb.com
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
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
    '8': string;
    '12': string;
    '14': string;
    '16': string;
    '21': string;
    '22': string;
    '28': string;
 *   };
 *   space: {
    '2': string;
    '15': string;
    '20': string;
    '32': string;
    '35': string;
    '48': string;
    '80': string;
    '131': string;
 *   };
 *   radii: {
    xs: string;
    md: string;
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
    "primary": "#ff385c",
    "secondary": "#e00b41",
    "background": "#ffffff",
    "foreground": "#000000",
    "neutral50": "#222222",
    "neutral100": "#6a6a6a",
    "neutral200": "#000000",
    "neutral300": "#ffffff",
    "neutral400": "#dddddd",
    "neutral500": "#ebebeb"
  },
  "fonts": {
    "body": "'Times', sans-serif"
  },
  "fontSizes": {
    "8": "8px",
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "21": "21px",
    "22": "22px",
    "28": "28px"
  },
  "space": {
    "2": "2px",
    "15": "15px",
    "20": "20px",
    "32": "32px",
    "35": "35px",
    "48": "48px",
    "80": "80px",
    "131": "131px"
  },
  "radii": {
    "xs": "2px",
    "md": "8px",
    "xl": "20px",
    "full": "100px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 8px 24px 0px",
    "xs": "rgba(60, 77, 107, 0.25) 0px 0.953955px 1.90791px 0px, rgba(60, 77, 107, 0.25) 0px 3.81582px 5.72373px 0px, rgb(0, 28, 64) 0px 0px 2px 0.5px inset, rgb(215, 235, 255) 0px -1px 3px 0px inset"
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
      "main": "#ff385c",
      "light": "hsl(349, 100%, 76%)",
      "dark": "hsl(349, 100%, 46%)"
    },
    "secondary": {
      "main": "#e00b41",
      "light": "hsl(345, 91%, 61%)",
      "dark": "hsl(345, 91%, 31%)"
    },
    "background": {
      "default": "#ffffff",
      "paper": "#ebebeb"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#222222"
    }
  },
  "typography": {
    "fontFamily": "'Times', sans-serif",
    "h2": {
      "fontSize": "28px",
      "fontWeight": "700",
      "lineHeight": "40.04px"
    },
    "h3": {
      "fontSize": "21px",
      "fontWeight": "700",
      "lineHeight": "30.03px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "normal"
    },
    "body2": {
      "fontSize": "12px",
      "fontWeight": "500",
      "lineHeight": "16px"
    }
  },
  "shape": {
    "borderRadius": 8
  },
  "shadows": [
    "rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 8px 24px 0px",
    "rgba(60, 77, 107, 0.25) 0px 0.953955px 1.90791px 0px, rgba(60, 77, 107, 0.25) 0px 3.81582px 5.72373px 0px, rgb(0, 28, 64) 0px 0px 2px 0.5px inset, rgb(215, 235, 255) 0px -1px 3px 0px inset"
  ]
};

export default theme;
