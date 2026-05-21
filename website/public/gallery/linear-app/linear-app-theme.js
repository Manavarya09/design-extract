// React Theme — extracted from https://linear.app
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
    '13': string;
    '14': string;
    '15': string;
    '16': string;
    '17': string;
    '18': string;
    '20': string;
    '24': string;
    '32': string;
    '40': string;
    '64': string;
    '13.3333': string;
 *   };
 *   space: {
    '1': string;
    '39': string;
    '47': string;
    '51': string;
    '56': string;
    '69': string;
    '79': string;
    '91': string;
    '95': string;
    '99': string;
    '111': string;
    '123': string;
    '127': string;
    '131': string;
    '135': string;
    '152': string;
 *   };
 *   radii: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
    xs: string;
    md: string;
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
    "primary": "#e4f222",
    "secondary": "#5e6ad2",
    "accent": "#00ff05",
    "background": "#08090a",
    "foreground": "#f7f8f8",
    "neutral50": "#f7f8f8",
    "neutral100": "#62666d",
    "neutral200": "#d0d6e0",
    "neutral300": "#e2e4e7",
    "neutral400": "#8a8f98",
    "neutral500": "#08090a",
    "neutral600": "#23252a",
    "neutral700": "#383b3f",
    "neutral800": "#000000",
    "neutral900": "#121414"
  },
  "fonts": {
    "body": "'Inter Variable', sans-serif",
    "mono": "'Berkeley Mono', monospace"
  },
  "fontSizes": {
    "13": "13px",
    "14": "14px",
    "15": "15px",
    "16": "16px",
    "17": "17px",
    "18": "18px",
    "20": "20px",
    "24": "24px",
    "32": "32px",
    "40": "40px",
    "64": "64px",
    "13.3333": "13.3333px"
  },
  "space": {
    "1": "1px",
    "39": "39px",
    "47": "47px",
    "51": "51px",
    "56": "56px",
    "69": "69px",
    "79": "79px",
    "91": "91px",
    "95": "95px",
    "99": "99px",
    "111": "111px",
    "123": "123px",
    "127": "127px",
    "131": "131px",
    "135": "135px",
    "152": "152px"
  },
  "radii": {
    "xs": "1px",
    "sm": "4px",
    "md": "7px",
    "lg": "16px",
    "xl": "20px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0.4) 0px 2px 4px 0px",
    "xs": "rgba(0, 0, 0, 0.03) 0px 1.2px 0px 0px",
    "md": "rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset",
    "xl": "rgba(8, 9, 10, 0.6) 0px 4px 32px 0px"
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
      "main": "#e4f222",
      "light": "hsl(64, 89%, 69%)",
      "dark": "hsl(64, 89%, 39%)"
    },
    "secondary": {
      "main": "#5e6ad2",
      "light": "hsl(234, 56%, 75%)",
      "dark": "hsl(234, 56%, 45%)"
    },
    "background": {
      "default": "#08090a",
      "paper": "#090a0b"
    },
    "text": {
      "primary": "#f7f8f8",
      "secondary": "#ffffff"
    }
  },
  "typography": {
    "fontFamily": "'Berkeley Mono', sans-serif",
    "h1": {
      "fontSize": "32px",
      "fontWeight": "400",
      "lineHeight": "36px"
    },
    "h2": {
      "fontSize": "24px",
      "fontWeight": "400",
      "lineHeight": "31.92px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "590",
      "lineHeight": "26.6px"
    },
    "body1": {
      "fontSize": "18px",
      "fontWeight": "400",
      "lineHeight": "28.8px"
    }
  },
  "shape": {
    "borderRadius": 7
  },
  "shadows": [
    "rgba(94, 106, 210, 0.1) 0px 0px 0px 0.125074px",
    "rgba(0, 0, 0, 0.1) 0px 0px 0px 2px",
    "rgba(0, 0, 0, 0.2) 0px 0px 0px 1px",
    "rgb(35, 37, 42) 0px 0px 0px 1px inset",
    "rgba(8, 9, 10, 0.1) 0px 0px 0px 1px, rgba(8, 9, 10, 0.4) 0px 0px 64px 0px"
  ]
};

export default theme;
