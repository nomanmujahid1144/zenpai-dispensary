
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: theme => ({
                'hero-img': "url('~/src/assets/hero-section-img.png')",
                'hero-img2': "url('~/src/assets/second-hero-section.png')"
            }),
            colors: {
                'myBg': '#E9C95D',
                'primaryText': '#515A5A',
                'secondaryText': '#FDFEFE',
                'loaderBg': 'rgba(0 , 0, 0 , 0.6)'
            },
            screens: {
                'xxs': '355px', // min-width
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
                marquee2: 'marquee2 25s linear infinite',
                'up': 'up 2s ease-out'
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                marquee2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                up: {
                    '0%': { transform: 'translateY(0)' },
                    '30%': { transform: 'translateY(-10%)' },
                  },
            },
        },
    },
    fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],

}