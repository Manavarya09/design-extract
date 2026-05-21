// React Theme — extracted from https://spotify.com
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
 *   };
 *   fontSizes: {
    '12': string;
    '14': string;
    '16': string;
    '24': string;
    '14.4': string;
    '13.6': string;
    '13.3333': string;
    '13.008': string;
    '12.992': string;
    '12.8': string;
    '10.5': string;
 *   };
 *   space: {
    '1': string;
    '15': string;
    '20': string;
    '23': string;
    '28': string;
    '35': string;
    '40': string;
    '48': string;
    '64': string;
    '96': string;
    '125': string;
    '154': string;
 *   };
 *   radii: {
    xs: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
    xs: string;
    md: string;
    lg: string;
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
    "primary": "#1ed760",
    "secondary": "#346e4a",
    "accent": "#1db954",
    "background": "#121212",
    "foreground": "#000000",
    "neutral50": "#ffffff",
    "neutral100": "#b3b3b3",
    "neutral200": "#000000",
    "neutral300": "#696969",
    "neutral400": "#555555",
    "neutral500": "#121212",
    "neutral600": "#7c7c7c",
    "neutral700": "#1f1f1f",
    "neutral800": "#333333",
    "neutral900": "#292929"
  },
  "fonts": {
    "body": "'SpotifyMixUITitle', sans-serif"
  },
  "fontSizes": {
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "24": "24px",
    "14.4": "14.4px",
    "13.6": "13.6px",
    "13.3333": "13.3333px",
    "13.008": "13.008px",
    "12.992": "12.992px",
    "12.8": "12.8px",
    "10.5": "10.5px"
  },
  "space": {
    "1": "1px",
    "15": "15px",
    "20": "20px",
    "23": "23px",
    "28": "28px",
    "35": "35px",
    "40": "40px",
    "48": "48px",
    "64": "64px",
    "96": "96px",
    "125": "125px",
    "154": "154px"
  },
  "radii": {
    "xs": "2px",
    "md": "10px",
    "lg": "16px",
    "xl": "20px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0.5) 0px 2px 4px 0px",
    "xs": "rgb(18, 18, 18) 0px 1px 0px 0px, rgb(124, 124, 124) 0px 0px 0px 1px inset",
    "md": "rgba(0, 0, 0, 0.3) 0px 8px 8px 0px",
    "lg": "rgba(0, 0, 0, 0.5) 0px 8px 24px 0px"
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
      "main": "#1ed760",
      "light": "hsl(141, 76%, 63%)",
      "dark": "hsl(141, 76%, 33%)"
    },
    "secondary": {
      "main": "#346e4a",
      "light": "hsl(143, 36%, 47%)",
      "dark": "hsl(143, 36%, 17%)"
    },
    "background": {
      "default": "#121212",
      "paper": "#000000"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#b3b3b3"
    }
  },
  "typography": {
    "fontFamily": "'Times', sans-serif",
    "h2": {
      "fontSize": "24px",
      "fontWeight": "700",
      "lineHeight": "normal"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "normal"
    },
    "body2": {
      "fontSize": "13.3333px",
      "fontWeight": "400",
      "lineHeight": "normal"
    }
  },
  "shape": {
    "borderRadius": 6
  },
  "shadows": [
    "rgb(124, 124, 124) 0px 0px 0px 1px inset",
    "rgb(18, 18, 18) 0px 1px 0px 0px, rgb(124, 124, 124) 0px 0px 0px 1px inset",
    "rgb(128, 128, 128) 0px 0px 5px 0px",
    "rgba(0, 0, 0, 0.5) 0px 2px 4px 0px",
    "rgb(199, 197, 199) -3px -3px 5px -2px"
  ]
};

export default theme;
