/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(210, 67%, 97%)',
            '100': 'hsl(210, 67%, 94%)',
            '200': 'hsl(210, 67%, 86%)',
            '300': 'hsl(210, 67%, 76%)',
            '400': 'hsl(210, 67%, 64%)',
            '500': 'hsl(210, 67%, 50%)',
            '600': 'hsl(210, 67%, 40%)',
            '700': 'hsl(210, 67%, 32%)',
            '800': 'hsl(210, 67%, 24%)',
            '900': 'hsl(210, 67%, 16%)',
            '950': 'hsl(210, 67%, 10%)',
            DEFAULT: '#f0f6fc'
        },
        secondary: {
            '50': 'hsl(137, 89%, 97%)',
            '100': 'hsl(137, 89%, 94%)',
            '200': 'hsl(137, 89%, 86%)',
            '300': 'hsl(137, 89%, 76%)',
            '400': 'hsl(137, 89%, 64%)',
            '500': 'hsl(137, 89%, 50%)',
            '600': 'hsl(137, 89%, 40%)',
            '700': 'hsl(137, 89%, 32%)',
            '800': 'hsl(137, 89%, 24%)',
            '900': 'hsl(137, 89%, 16%)',
            '950': 'hsl(137, 89%, 10%)',
            DEFAULT: '#08872b'
        },
        accent: {
            '50': 'hsl(137, 63%, 97%)',
            '100': 'hsl(137, 63%, 94%)',
            '200': 'hsl(137, 63%, 86%)',
            '300': 'hsl(137, 63%, 76%)',
            '400': 'hsl(137, 63%, 64%)',
            '500': 'hsl(137, 63%, 50%)',
            '600': 'hsl(137, 63%, 40%)',
            '700': 'hsl(137, 63%, 32%)',
            '800': 'hsl(137, 63%, 24%)',
            '900': 'hsl(137, 63%, 16%)',
            '950': 'hsl(137, 63%, 10%)',
            DEFAULT: '#1f883d'
        },
        'neutral-50': '#ffffff',
        'neutral-100': '#000000',
        'neutral-200': '#9198a1',
        'neutral-300': '#58635b',
        'neutral-400': '#59636e',
        'neutral-500': '#a4aea6',
        'neutral-600': '#d1d9e0',
        'neutral-700': '#7c8980',
        'neutral-800': '#404651',
        'neutral-900': '#484f58',
        background: '#0d1117',
        foreground: '#f0f6fc'
    },
    fontFamily: {
        sans: [
            'Mona Sans',
            'sans-serif'
        ],
        heading: [
            'Mona Sans VF',
            'sans-serif'
        ],
        mono: [
            'Mona Sans Mono',
            'sans-serif'
        ]
    },
    fontSize: {
        '12': [
            '12px',
            {
                lineHeight: '18px',
                letterSpacing: '0.5px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '21px'
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
                lineHeight: '27px',
                letterSpacing: '0.18px'
            }
        ],
        '22': [
            '22px',
            {
                lineHeight: '30.8px',
                letterSpacing: '0.24px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '36px'
            }
        ],
        '32': [
            '32px',
            {
                lineHeight: '48px'
            }
        ],
        '40': [
            '40px',
            {
                lineHeight: '48px'
            }
        ],
        '48': [
            '48px',
            {
                lineHeight: '48px'
            }
        ],
        '64': [
            '64px',
            {
                lineHeight: '69.12px',
                letterSpacing: '-2.24px'
            }
        ]
    },
    spacing: {
        '20': '40px',
        '32': '64px',
        '40': '80px',
        '48': '96px',
        '51': '102px',
        '56': '112px',
        '137': '274px',
        '154': '308px',
        '192': '384px',
        '216': '432px',
        '1px': '1px'
    },
    borderRadius: {
        sm: '3px',
        md: '6px',
        lg: '16px',
        xl: '24px',
        full: '9999px'
    },
    boxShadow: {
        sm: 'rgb(61, 68, 77) 0px 0px 0px 1px, rgba(1, 4, 9, 0.4) 0px 6px 12px -3px, rgba(1, 4, 9, 0.4) 0px 6px 18px 0px',
        xs: 'rgb(209, 217, 224) 0px 1px 0px 0px inset'
    },
    screens: {
        xs: '380px',
        sm: '640px',
        md: '804px',
        '850px': '850px',
        '876px': '876px',
        lg: '1029px',
        '1150px': '1150px',
        '1200px': '1200px',
        xl: '1300px',
        '1400px': '1400px',
        '1464px': '1464px',
        '2xl': '1600px',
        '1728px': '1728px'
    },
    transitionDuration: {
        '75': '0.075s',
        '80': '0.08s',
        '100': '0.1s',
        '150': '0.15s',
        '200': '0.2s',
        '300': '0.3s',
        '400': '0.4s',
        '480': '0.48s',
        '500': '0.5s',
        '600': '0.6s',
        '800': '0.8s',
        '33.333': '0.033333s'
    },
    transitionTimingFunction: {
        linear: 'linear',
        custom: 'cubic-bezier(0.12, 0.62, 0.12, 0.95)',
        default: 'ease'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '924px'
    }
},
  },
};
