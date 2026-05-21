/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(240, 11%, 97%)',
            '100': 'hsl(240, 11%, 94%)',
            '200': 'hsl(240, 11%, 86%)',
            '300': 'hsl(240, 11%, 76%)',
            '400': 'hsl(240, 11%, 64%)',
            '500': 'hsl(240, 11%, 50%)',
            '600': 'hsl(240, 11%, 40%)',
            '700': 'hsl(240, 11%, 32%)',
            '800': 'hsl(240, 11%, 24%)',
            '900': 'hsl(240, 11%, 16%)',
            '950': 'hsl(240, 11%, 10%)',
            DEFAULT: '#f5f5f7'
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
            DEFAULT: '#0071e3'
        },
        accent: {
            '50': 'hsl(314, 81%, 97%)',
            '100': 'hsl(314, 81%, 94%)',
            '200': 'hsl(314, 81%, 86%)',
            '300': 'hsl(314, 81%, 76%)',
            '400': 'hsl(314, 81%, 64%)',
            '500': 'hsl(314, 81%, 50%)',
            '600': 'hsl(314, 81%, 40%)',
            '700': 'hsl(314, 81%, 32%)',
            '800': 'hsl(314, 81%, 24%)',
            '900': 'hsl(314, 81%, 16%)',
            '950': 'hsl(314, 81%, 10%)',
            DEFAULT: '#ea33c0'
        },
        'neutral-50': '#1d1d1f',
        'neutral-100': '#000000',
        'neutral-200': '#e8e8ed',
        'neutral-300': '#ffffff',
        'neutral-400': '#86868b',
        'neutral-500': '#6e6e73',
        'neutral-600': '#333336',
        'neutral-700': '#d2d2d7',
        'neutral-800': '#41626a',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'SF Pro Text',
            'sans-serif'
        ],
        heading: [
            'SF Pro Display',
            'sans-serif'
        ],
        font2: [
            'Arial',
            'sans-serif'
        ]
    },
    fontSize: {
        '10': [
            '10px',
            {
                lineHeight: '13px',
                letterSpacing: '-0.08px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: '16.0005px',
                letterSpacing: '-0.12px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '18.0008px',
                letterSpacing: '-0.224px'
            }
        ],
        '17': [
            '17px',
            {
                lineHeight: 'normal'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '18px'
            }
        ],
        '21': [
            '21px',
            {
                lineHeight: '25px',
                letterSpacing: '0.231px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '36px'
            }
        ],
        '28': [
            '28px',
            {
                lineHeight: '32px',
                letterSpacing: '0.196px'
            }
        ],
        '34': [
            '34px',
            {
                lineHeight: '50px',
                letterSpacing: '-0.374px'
            }
        ],
        '40': [
            '40px',
            {
                lineHeight: '44px'
            }
        ],
        '44': [
            '44px',
            {
                lineHeight: '44px',
                letterSpacing: '-0.12px'
            }
        ],
        '56': [
            '56px',
            {
                lineHeight: '60px',
                letterSpacing: '-0.28px'
            }
        ],
        '13.3333': [
            '13.3333px',
            {
                lineHeight: 'normal'
            }
        ]
    },
    spacing: {
        '2': '4px',
        '12': '24px',
        '13': '26px',
        '16': '32px',
        '17': '34px',
        '20': '40px',
        '22': '44px',
        '24': '48px',
        '28': '56px',
        '40': '80px',
        '42': '84px',
        '44': '88px',
        '57': '114px',
        '64': '128px',
        '1px': '1px',
        '29px': '29px',
        '37px': '37px',
        '53px': '53px',
        '59px': '59px'
    },
    borderRadius: {
        sm: '5px',
        md: '8px',
        lg: '11px',
        full: '999px'
    },
    boxShadow: {
        xl: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px'
    },
    screens: {
        sm: '641px',
        md: '736px',
        '834px': '834px',
        lg: '1070px',
        '1441px': '1441px'
    },
    transitionDuration: {
        '20': '0.02s',
        '40': '0.04s',
        '60': '0.06s',
        '80': '0.08s',
        '100': '0.1s',
        '120': '0.12s',
        '140': '0.14s',
        '160': '0.16s',
        '180': '0.18s',
        '200': '0.2s',
        '220': '0.22s',
        '240': '0.24s',
        '250': '0.25s',
        '300': '0.3s',
        '320': '0.32s',
        '400': '0.4s',
        '1000': '1s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.25, 0.1, 0.3, 1)',
        linear: 'linear',
        default: 'ease'
    },
    container: {
        center: true,
        padding: '22px'
    },
    maxWidth: {
        container: '1024px'
    }
},
  },
};
