/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(340, 93%, 97%)',
            '100': 'hsl(340, 93%, 94%)',
            '200': 'hsl(340, 93%, 86%)',
            '300': 'hsl(340, 93%, 76%)',
            '400': 'hsl(340, 93%, 64%)',
            '500': 'hsl(340, 93%, 50%)',
            '600': 'hsl(340, 93%, 40%)',
            '700': 'hsl(340, 93%, 32%)',
            '800': 'hsl(340, 93%, 24%)',
            '900': 'hsl(340, 93%, 16%)',
            '950': 'hsl(340, 93%, 10%)',
            DEFAULT: '#ec0853'
        },
        secondary: {
            '50': 'hsl(210, 100%, 97%)',
            '100': 'hsl(210, 100%, 94%)',
            '200': 'hsl(210, 100%, 86%)',
            '300': 'hsl(210, 100%, 76%)',
            '400': 'hsl(210, 100%, 64%)',
            '500': 'hsl(210, 100%, 50%)',
            '600': 'hsl(210, 100%, 40%)',
            '700': 'hsl(210, 100%, 32%)',
            '800': 'hsl(210, 100%, 24%)',
            '900': 'hsl(210, 100%, 16%)',
            '950': 'hsl(210, 100%, 10%)',
            DEFAULT: '#0080ff'
        },
        accent: {
            '50': 'hsl(205, 100%, 97%)',
            '100': 'hsl(205, 100%, 94%)',
            '200': 'hsl(205, 100%, 86%)',
            '300': 'hsl(205, 100%, 76%)',
            '400': 'hsl(205, 100%, 64%)',
            '500': 'hsl(205, 100%, 50%)',
            '600': 'hsl(205, 100%, 40%)',
            '700': 'hsl(205, 100%, 32%)',
            '800': 'hsl(205, 100%, 24%)',
            '900': 'hsl(205, 100%, 16%)',
            '950': 'hsl(205, 100%, 10%)',
            DEFAULT: '#2ca8ff'
        },
        'neutral-50': '#000000',
        'neutral-100': '#ffffff',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'inter',
            'sans-serif'
        ],
        body: [
            'plexMono',
            'sans-serif'
        ]
    },
    fontSize: {
        '12': [
            '12px',
            {
                lineHeight: '20px'
            }
        ],
        '13': [
            '13px',
            {
                lineHeight: '24px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '24px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: '24px'
            }
        ],
        '17': [
            '17px',
            {
                lineHeight: '28px'
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
                lineHeight: '24px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '40px'
            }
        ],
        '30': [
            '30px',
            {
                lineHeight: '36px'
            }
        ],
        '36': [
            '36px',
            {
                lineHeight: '48px'
            }
        ],
        '40': [
            '40px',
            {
                lineHeight: '40px',
                letterSpacing: '-2px'
            }
        ],
        '96': [
            '96px',
            {
                lineHeight: '96px',
                letterSpacing: '-4.8px'
            }
        ]
    },
    spacing: {
        '16': '64px',
        '18': '72px',
        '24': '96px',
        '40': '160px',
        '84': '336px',
        '100': '400px',
        '1px': '1px',
        '57px': '57px'
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        full: '32px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.999994 0.0000455678 0.0000200868 / 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0) 0px 0px 0px 0px, oklab(0.129999 -0.00404751 -0.027702 / 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px'
    },
    screens: {
        md: '768px',
        lg: '1024px'
    },
    transitionDuration: {
        '150': '0.15s',
        '300': '0.3s',
        '350': '0.35s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.4, 0, 1, 1)'
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
