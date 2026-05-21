/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(248, 98%, 97%)',
            '100': 'hsl(248, 98%, 94%)',
            '200': 'hsl(248, 98%, 86%)',
            '300': 'hsl(248, 98%, 76%)',
            '400': 'hsl(248, 98%, 64%)',
            '500': 'hsl(248, 98%, 50%)',
            '600': 'hsl(248, 98%, 40%)',
            '700': 'hsl(248, 98%, 32%)',
            '800': 'hsl(248, 98%, 24%)',
            '900': 'hsl(248, 98%, 16%)',
            '950': 'hsl(248, 98%, 10%)',
            DEFAULT: '#533afd'
        },
        secondary: {
            '50': 'hsl(210, 44%, 97%)',
            '100': 'hsl(210, 44%, 94%)',
            '200': 'hsl(210, 44%, 86%)',
            '300': 'hsl(210, 44%, 76%)',
            '400': 'hsl(210, 44%, 64%)',
            '500': 'hsl(210, 44%, 50%)',
            '600': 'hsl(210, 44%, 40%)',
            '700': 'hsl(210, 44%, 32%)',
            '800': 'hsl(210, 44%, 24%)',
            '900': 'hsl(210, 44%, 16%)',
            '950': 'hsl(210, 44%, 10%)',
            DEFAULT: '#e5edf5'
        },
        accent: {
            '50': 'hsl(20, 100%, 97%)',
            '100': 'hsl(20, 100%, 94%)',
            '200': 'hsl(20, 100%, 86%)',
            '300': 'hsl(20, 100%, 76%)',
            '400': 'hsl(20, 100%, 64%)',
            '500': 'hsl(20, 100%, 50%)',
            '600': 'hsl(20, 100%, 40%)',
            '700': 'hsl(20, 100%, 32%)',
            '800': 'hsl(20, 100%, 24%)',
            '900': 'hsl(20, 100%, 16%)',
            '950': 'hsl(20, 100%, 10%)',
            DEFAULT: '#ffe0d1'
        },
        'neutral-50': '#000000',
        'neutral-100': '#50617a',
        'neutral-200': '#ffffff',
        'neutral-300': '#64748d',
        'neutral-400': '#7d8ba4',
        'neutral-500': '#101010',
        'neutral-600': '#f2f7fe',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'sohne-var',
            'sans-serif'
        ]
    },
    fontSize: {
        '8': [
            '8px',
            {
                lineHeight: '8.96px'
            }
        ],
        '9': [
            '9px',
            {
                lineHeight: 'normal'
            }
        ],
        '10': [
            '10px',
            {
                lineHeight: '15px',
                letterSpacing: '0.1px'
            }
        ],
        '11': [
            '11px',
            {
                lineHeight: '16px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: 'normal'
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
                lineHeight: 'normal'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '25.2px'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '28px',
                letterSpacing: '-0.2px'
            }
        ],
        '22': [
            '22px',
            {
                lineHeight: '24.2px',
                letterSpacing: '-0.22px'
            }
        ],
        '26': [
            '26px',
            {
                lineHeight: 'normal'
            }
        ],
        '32': [
            '32px',
            {
                lineHeight: '35.2px',
                letterSpacing: '-0.64px'
            }
        ],
        '48': [
            '48px',
            {
                lineHeight: '55.2px',
                letterSpacing: '-0.96px'
            }
        ],
        '56': [
            '56px',
            {
                lineHeight: '57.68px',
                letterSpacing: '-1.4px'
            }
        ]
    },
    spacing: {
        '14': '28px',
        '16': '32px',
        '20': '40px',
        '24': '48px',
        '26': '52px',
        '30': '60px',
        '32': '64px',
        '36': '72px',
        '40': '80px',
        '48': '96px',
        '170': '340px',
        '183': '366px',
        '1px': '1px'
    },
    borderRadius: {
        xs: '1px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '100px'
    },
    boxShadow: {
        md: 'rgba(23, 23, 23, 0.06) 0px 3px 6px 0px',
        lg: 'rgba(0, 0, 0, 0.06) 0px 4px 24px 0px, rgba(0, 0, 0, 0.03) 0px 1px 2px 0px',
        xl: 'rgba(0, 0, 0, 0.1) 0px 30px 60px -50px, rgba(50, 50, 93, 0.25) 0px 30px 60px -10px'
    },
    transitionDuration: {
        '0': '0s',
        '100': '0.1s',
        '120': '0.12s',
        '150': '0.15s',
        '200': '0.2s',
        '240': '0.24s',
        '250': '0.25s',
        '300': '0.3s',
        '400': '0.4s',
        '500': '0.5s',
        '600': '0.6s',
        '800': '0.8s',
        '1000': '1s',
        '1200': '1.2s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.3, 0, 0.2, 1)',
        default: 'ease',
        linear: 'linear'
    },
    container: {
        center: true,
        padding: '16px'
    },
    maxWidth: {
        container: '1266px'
    }
},
  },
};
