/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(349, 100%, 97%)',
            '100': 'hsl(349, 100%, 94%)',
            '200': 'hsl(349, 100%, 86%)',
            '300': 'hsl(349, 100%, 76%)',
            '400': 'hsl(349, 100%, 64%)',
            '500': 'hsl(349, 100%, 50%)',
            '600': 'hsl(349, 100%, 40%)',
            '700': 'hsl(349, 100%, 32%)',
            '800': 'hsl(349, 100%, 24%)',
            '900': 'hsl(349, 100%, 16%)',
            '950': 'hsl(349, 100%, 10%)',
            DEFAULT: '#ff385c'
        },
        secondary: {
            '50': 'hsl(345, 91%, 97%)',
            '100': 'hsl(345, 91%, 94%)',
            '200': 'hsl(345, 91%, 86%)',
            '300': 'hsl(345, 91%, 76%)',
            '400': 'hsl(345, 91%, 64%)',
            '500': 'hsl(345, 91%, 50%)',
            '600': 'hsl(345, 91%, 40%)',
            '700': 'hsl(345, 91%, 32%)',
            '800': 'hsl(345, 91%, 24%)',
            '900': 'hsl(345, 91%, 16%)',
            '950': 'hsl(345, 91%, 10%)',
            DEFAULT: '#e00b41'
        },
        'neutral-50': '#222222',
        'neutral-100': '#6a6a6a',
        'neutral-200': '#000000',
        'neutral-300': '#ffffff',
        'neutral-400': '#dddddd',
        'neutral-500': '#ebebeb',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Airbnb Cereal VF',
            'sans-serif'
        ],
        body: [
            'Times',
            'sans-serif'
        ]
    },
    fontSize: {
        '8': [
            '8px',
            {
                lineHeight: '11.44px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: '16px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '20.02px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: 'normal'
            }
        ],
        '21': [
            '21px',
            {
                lineHeight: '30.03px'
            }
        ],
        '22': [
            '22px',
            {
                lineHeight: '26px',
                letterSpacing: '-0.44px'
            }
        ],
        '28': [
            '28px',
            {
                lineHeight: '40.04px'
            }
        ]
    },
    spacing: {
        '1': '2px',
        '10': '20px',
        '16': '32px',
        '24': '48px',
        '40': '80px',
        '15px': '15px',
        '35px': '35px',
        '131px': '131px'
    },
    borderRadius: {
        xs: '2px',
        md: '8px',
        xl: '20px',
        full: '100px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 8px 24px 0px',
        xs: 'rgba(60, 77, 107, 0.25) 0px 0.953955px 1.90791px 0px, rgba(60, 77, 107, 0.25) 0px 3.81582px 5.72373px 0px, rgb(0, 28, 64) 0px 0px 2px 0.5px inset, rgb(215, 235, 255) 0px -1px 3px 0px inset'
    },
    screens: {
        xs: '376px',
        '403px': '403px',
        '412px': '412px',
        sm: '667px',
        '550px': '550px',
        '551px': '551px',
        md: '800px',
        '950px': '950px',
        lg: '1024px',
        '1194px': '1194px',
        '1200px': '1200px',
        xl: '1280px',
        '1348px': '1348px',
        '1440px': '1440px',
        '2xl': '1600px',
        '1735px': '1735px',
        '1760px': '1760px',
        '1880px': '1880px',
        '1920px': '1920px',
        '2120px': '2120px',
        '2560px': '2560px'
    },
    transitionDuration: {
        '100': '0.1s',
        '150': '0.15s',
        '175': '0.175s',
        '200': '0.2s',
        '250': '0.25s',
        '300': '0.3s',
        '451.75399999999996': '0.451754s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0, 0, 1, 1)',
        linear: 'linear'
    },
    container: {
        center: true,
        padding: '32px'
    },
    maxWidth: {
        container: '1920px'
    }
},
  },
};
