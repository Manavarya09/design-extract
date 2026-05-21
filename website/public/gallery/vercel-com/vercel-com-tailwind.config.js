/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(211, 100%, 97%)',
            '100': 'hsl(211, 100%, 94%)',
            '200': 'hsl(211, 100%, 86%)',
            '300': 'hsl(211, 100%, 76%)',
            '400': 'hsl(211, 100%, 64%)',
            '500': 'hsl(211, 100%, 50%)',
            '600': 'hsl(211, 100%, 40%)',
            '700': 'hsl(211, 100%, 32%)',
            '800': 'hsl(211, 100%, 24%)',
            '900': 'hsl(211, 100%, 16%)',
            '950': 'hsl(211, 100%, 10%)',
            DEFAULT: '#0068d6'
        },
        secondary: {
            '50': 'hsl(208, 100%, 97%)',
            '100': 'hsl(208, 100%, 94%)',
            '200': 'hsl(208, 100%, 86%)',
            '300': 'hsl(208, 100%, 76%)',
            '400': 'hsl(208, 100%, 64%)',
            '500': 'hsl(208, 100%, 50%)',
            '600': 'hsl(208, 100%, 40%)',
            '700': 'hsl(208, 100%, 32%)',
            '800': 'hsl(208, 100%, 24%)',
            '900': 'hsl(208, 100%, 16%)',
            '950': 'hsl(208, 100%, 10%)',
            DEFAULT: '#52aeff'
        },
        accent: {
            '50': 'hsl(212, 100%, 97%)',
            '100': 'hsl(212, 100%, 94%)',
            '200': 'hsl(212, 100%, 86%)',
            '300': 'hsl(212, 100%, 76%)',
            '400': 'hsl(212, 100%, 64%)',
            '500': 'hsl(212, 100%, 50%)',
            '600': 'hsl(212, 100%, 40%)',
            '700': 'hsl(212, 100%, 32%)',
            '800': 'hsl(212, 100%, 24%)',
            '900': 'hsl(212, 100%, 16%)',
            '950': 'hsl(212, 100%, 10%)',
            DEFAULT: '#0070f3'
        },
        'neutral-50': '#171717',
        'neutral-100': '#ebebeb',
        'neutral-200': '#4d4d4d',
        'neutral-300': '#ffffff',
        'neutral-400': '#666666',
        'neutral-500': '#000000',
        'neutral-600': '#7d7d7d',
        'neutral-700': '#a8a8a8',
        'neutral-800': '#8f8f8f',
        'neutral-900': '#ebf5ff',
        background: '#fafafa',
        foreground: '#171717'
    },
    fontFamily: {
        sans: [
            'Geist',
            'sans-serif'
        ],
        mono: [
            'Geist Mono',
            'sans-serif'
        ]
    },
    fontSize: {
        '6': [
            '6px',
            {
                lineHeight: '9px'
            }
        ],
        '7': [
            '7px',
            {
                lineHeight: '7px'
            }
        ],
        '8': [
            '8px',
            {
                lineHeight: '8px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: '16px'
            }
        ],
        '13': [
            '13px',
            {
                lineHeight: '20px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '14px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: '24px'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '28px'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '36px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '32px',
                letterSpacing: '-0.96px'
            }
        ],
        '32': [
            '32px',
            {
                lineHeight: '48px',
                letterSpacing: '-1.28px'
            }
        ],
        '40': [
            '40px',
            {
                lineHeight: '48px',
                letterSpacing: '-2.4px'
            }
        ],
        '48': [
            '48px',
            {
                lineHeight: '48px',
                letterSpacing: '-2.28px'
            }
        ],
        '9.5': [
            '9.5px',
            {
                lineHeight: '14.25px'
            }
        ],
        '7.75': [
            '7.75px',
            {
                lineHeight: '11.625px'
            }
        ]
    },
    spacing: {
        '12': '24px',
        '16': '32px',
        '18': '36px',
        '20': '40px',
        '22': '44px',
        '24': '48px',
        '45': '90px',
        '48': '96px',
        '72': '144px',
        '1px': '1px',
        '85px': '85px',
        '135px': '135px',
        '161px': '161px'
    },
    borderRadius: {
        xs: '2px',
        sm: '5px',
        md: '8px',
        lg: '16px',
        full: '9999px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0.04) 0px 2px 2px 0px',
        xs: 'rgba(0, 0, 0, 0.04) 0px 1px 2px 0px'
    },
    screens: {
        '401px': '401px',
        sm: '650px',
        md: '769px',
        lg: '1036px',
        '1151px': '1151px',
        '1200px': '1200px',
        '2300px': '2300px'
    },
    transitionDuration: {
        '90': '0.09s',
        '100': '0.1s',
        '150': '0.15s',
        '160': '0.16s',
        '200': '0.2s',
        '250': '0.25s',
        '300': '0.3s',
        '400': '0.4s'
    },
    transitionTimingFunction: {
        default: 'ease',
        custom: 'cubic-bezier(0.3, 0.57, 0.07, 0.95)'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1280px'
    }
},
  },
};
