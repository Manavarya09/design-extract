/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        'neutral-50': '#8e8ea0',
        'neutral-100': '#000000',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Arial',
            'sans-serif'
        ],
        body: [
            'Times',
            'sans-serif'
        ]
    },
    fontSize: {
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
        '13.3333': [
            '13.3333px',
            {
                lineHeight: 'normal'
            }
        ]
    },
    spacing: {
        '0': '8px',
        '1': '32px'
    },
    borderRadius: {
        sm: '5px'
    },
    screens: {
        md: '768px'
    }
},
  },
};
