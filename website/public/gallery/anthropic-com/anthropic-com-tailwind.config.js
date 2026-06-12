/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(15, 63%, 97%)',
            '100': 'hsl(15, 63%, 94%)',
            '200': 'hsl(15, 63%, 86%)',
            '300': 'hsl(15, 63%, 76%)',
            '400': 'hsl(15, 63%, 64%)',
            '500': 'hsl(15, 63%, 50%)',
            '600': 'hsl(15, 63%, 40%)',
            '700': 'hsl(15, 63%, 32%)',
            '800': 'hsl(15, 63%, 24%)',
            '900': 'hsl(15, 63%, 16%)',
            '950': 'hsl(15, 63%, 10%)',
            DEFAULT: '#d97757'
        },
        secondary: {
            '50': 'hsl(48, 33%, 97%)',
            '100': 'hsl(48, 33%, 94%)',
            '200': 'hsl(48, 33%, 86%)',
            '300': 'hsl(48, 33%, 76%)',
            '400': 'hsl(48, 33%, 64%)',
            '500': 'hsl(48, 33%, 50%)',
            '600': 'hsl(48, 33%, 40%)',
            '700': 'hsl(48, 33%, 32%)',
            '800': 'hsl(48, 33%, 24%)',
            '900': 'hsl(48, 33%, 16%)',
            '950': 'hsl(48, 33%, 10%)',
            DEFAULT: '#faf9f5'
        },
        accent: {
            '50': 'hsl(37, 70%, 97%)',
            '100': 'hsl(37, 70%, 94%)',
            '200': 'hsl(37, 70%, 86%)',
            '300': 'hsl(37, 70%, 76%)',
            '400': 'hsl(37, 70%, 64%)',
            '500': 'hsl(37, 70%, 50%)',
            '600': 'hsl(37, 70%, 40%)',
            '700': 'hsl(37, 70%, 32%)',
            '800': 'hsl(37, 70%, 24%)',
            '900': 'hsl(37, 70%, 16%)',
            '950': 'hsl(37, 70%, 10%)',
            DEFAULT: '#f5e3c7'
        },
        'neutral-50': '#141413',
        'neutral-100': '#b0aea5',
        'neutral-200': '#000000',
        'neutral-300': '#87867f',
        'neutral-400': '#f0eee6',
        'neutral-500': '#3d3d3a',
        'neutral-600': '#e8e6dc',
        'neutral-700': '#a1a0a0',
        background: '#faf9f5',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Anthropic Sans',
            'sans-serif'
        ],
        heading: [
            'Anthropic Serif',
            'sans-serif'
        ],
        body: [
            'Times',
            'sans-serif'
        ]
    },
    fontSize: {
        '12': [
            '12px',
            {
                lineHeight: '16.8px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '18.2px'
            }
        ],
        '15': [
            '15px',
            {
                lineHeight: '21px',
                letterSpacing: '-0.0375px'
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
                lineHeight: '28px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '33.6px'
            }
        ],
        '64.6857': [
            '64.6857px',
            {
                lineHeight: '71.1543px'
            }
        ],
        '57.7306': [
            '57.7306px',
            {
                lineHeight: '63.5037px'
            }
        ]
    },
    spacing: {
        '0': '2px',
        '1': '21px',
        '2': '31px',
        '3': '45px',
        '4': '53px',
        '5': '58px',
        '6': '67px',
        '7': '84px',
        '8': '100px',
        '9': '142px',
        '10': '149px',
        '11': '165px',
        '12': '214px'
    },
    borderRadius: {
        md: '8px',
        lg: '16px',
        xl: '24px',
        full: '1600px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0.01) 0px 2px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 4px 0px, rgba(0, 0, 0, 0.04) 0px 16px 24px 0px'
    },
    screens: {
        md: '768px'
    },
    transitionDuration: {
        '100': '0.1s',
        '200': '0.2s',
        '300': '0.3s',
        '400': '0.4s',
        '800': '0.8s',
        '289.479': '0.289479s',
        '335.674': '0.335674s',
        '152.46699999999998': '0.152467s',
        '317.476': '0.317476s',
        '152.09': '0.15209s',
        '255.89800000000002': '0.255898s',
        '122.42599999999999': '0.122426s',
        '383.064': '0.383064s',
        '198.601': '0.198601s',
        '282.028': '0.282028s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.16, 1, 0.3, 1)',
        default: 'ease'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1145.08px'
    }
},
  },
};
