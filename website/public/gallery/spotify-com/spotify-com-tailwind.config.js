/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(141, 76%, 97%)',
            '100': 'hsl(141, 76%, 94%)',
            '200': 'hsl(141, 76%, 86%)',
            '300': 'hsl(141, 76%, 76%)',
            '400': 'hsl(141, 76%, 64%)',
            '500': 'hsl(141, 76%, 50%)',
            '600': 'hsl(141, 76%, 40%)',
            '700': 'hsl(141, 76%, 32%)',
            '800': 'hsl(141, 76%, 24%)',
            '900': 'hsl(141, 76%, 16%)',
            '950': 'hsl(141, 76%, 10%)',
            DEFAULT: '#1ed760'
        },
        secondary: {
            '50': 'hsl(143, 36%, 97%)',
            '100': 'hsl(143, 36%, 94%)',
            '200': 'hsl(143, 36%, 86%)',
            '300': 'hsl(143, 36%, 76%)',
            '400': 'hsl(143, 36%, 64%)',
            '500': 'hsl(143, 36%, 50%)',
            '600': 'hsl(143, 36%, 40%)',
            '700': 'hsl(143, 36%, 32%)',
            '800': 'hsl(143, 36%, 24%)',
            '900': 'hsl(143, 36%, 16%)',
            '950': 'hsl(143, 36%, 10%)',
            DEFAULT: '#346e4a'
        },
        accent: {
            '50': 'hsl(141, 73%, 97%)',
            '100': 'hsl(141, 73%, 94%)',
            '200': 'hsl(141, 73%, 86%)',
            '300': 'hsl(141, 73%, 76%)',
            '400': 'hsl(141, 73%, 64%)',
            '500': 'hsl(141, 73%, 50%)',
            '600': 'hsl(141, 73%, 40%)',
            '700': 'hsl(141, 73%, 32%)',
            '800': 'hsl(141, 73%, 24%)',
            '900': 'hsl(141, 73%, 16%)',
            '950': 'hsl(141, 73%, 10%)',
            DEFAULT: '#1db954'
        },
        'neutral-50': '#ffffff',
        'neutral-100': '#b3b3b3',
        'neutral-200': '#000000',
        'neutral-300': '#696969',
        'neutral-400': '#555555',
        'neutral-500': '#121212',
        'neutral-600': '#7c7c7c',
        'neutral-700': '#1f1f1f',
        'neutral-800': '#333333',
        'neutral-900': '#292929',
        background: '#121212',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'SpotifyMixUI',
            'sans-serif'
        ],
        body: [
            'Times',
            'sans-serif'
        ],
        font2: [
            'SpotifyMixUITitle',
            'sans-serif'
        ]
    },
    fontSize: {
        '12': [
            '12px',
            {
                lineHeight: 'normal'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: 'normal'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: 'normal'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: 'normal'
            }
        ],
        '14.4': [
            '14.4px',
            {
                lineHeight: '38px',
                letterSpacing: '0.144px'
            }
        ],
        '13.6': [
            '13.6px',
            {
                lineHeight: '27.2px'
            }
        ],
        '13.3333': [
            '13.3333px',
            {
                lineHeight: 'normal'
            }
        ],
        '13.008': [
            '13.008px',
            {
                lineHeight: '16.9104px'
            }
        ],
        '12.992': [
            '12.992px',
            {
                lineHeight: '19.488px'
            }
        ],
        '12.8': [
            '12.8px',
            {
                lineHeight: 'normal'
            }
        ],
        '10.5': [
            '10.5px',
            {
                lineHeight: '14px'
            }
        ]
    },
    spacing: {
        '0': '1px',
        '1': '15px',
        '2': '20px',
        '3': '23px',
        '4': '28px',
        '5': '35px',
        '6': '40px',
        '7': '48px',
        '8': '64px',
        '9': '96px',
        '10': '125px',
        '11': '154px'
    },
    borderRadius: {
        xs: '2px',
        md: '10px',
        lg: '16px',
        xl: '20px',
        full: '9999px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0.5) 0px 2px 4px 0px',
        xs: 'rgb(18, 18, 18) 0px 1px 0px 0px, rgb(124, 124, 124) 0px 0px 0px 1px inset',
        md: 'rgba(0, 0, 0, 0.3) 0px 8px 8px 0px',
        lg: 'rgba(0, 0, 0, 0.5) 0px 8px 24px 0px'
    },
    screens: {
        '400px': '400px',
        sm: '426px',
        md: '769px',
        '890px': '890px',
        '897px': '897px',
        lg: '1024px',
        xl: '1280px'
    },
    transitionDuration: {
        '100': '0.1s',
        '150': '0.15s',
        '200': '0.2s',
        '220': '0.22s',
        '250': '0.25s',
        '300': '0.3s',
        '500': '0.5s',
        '1000': '1s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.3, 0, 0, 1)',
        default: 'ease'
    },
    container: {
        center: true,
        padding: '40px'
    },
    maxWidth: {
        container: '1955px'
    }
},
  },
};
