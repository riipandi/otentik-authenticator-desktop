const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: [...defaultTheme.fontFamily.sans],
            },
            colors: {
                gray: colors.slate,
                primary: {
                    50: '#f0f5fe',
                    100: '#dde9fc',
                    200: '#c3d8fa',
                    300: '#9ac1f6',
                    400: '#6ba0ef',
                    500: '#487de9',
                    600: '#2b5adc',
                    700: '#2a4ccb',
                    800: '#283fa5',
                    900: '#253a83',
                },
                secondary: {
                    50: '#edeeff',
                    100: '#dee1ff',
                    200: '#c4c7ff',
                    300: '#a0a2ff',
                    400: '#827aff',
                    500: '#6f5afa',
                    600: '#613cef',
                    700: '#532ed3',
                    800: '#4429aa',
                    900: '#3a2986',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
