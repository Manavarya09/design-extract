// React Theme — extracted from https://openai.com
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    foreground: string;
    neutral50: string;
    neutral100: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '16': string;
    '24': string;
    '13.3333': string;
 *   };
 *   space: {
    '8': string;
    '32': string;
 *   };
 *   radii: {
    sm: string;
 *   };
 *   shadows: {

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
    "foreground": "#000000",
    "neutral50": "#8e8ea0",
    "neutral100": "#000000"
  },
  "fonts": {
    "body": "'Times', sans-serif"
  },
  "fontSizes": {
    "16": "16px",
    "24": "24px",
    "13.3333": "13.3333px"
  },
  "space": {
    "8": "8px",
    "32": "32px"
  },
  "radii": {
    "sm": "5px"
  },
  "shadows": {},
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
    "background": {},
    "text": {
      "primary": "#000000",
      "secondary": "#8e8ea0"
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
    "borderRadius": 5
  },
  "shadows": []
};

export default theme;
