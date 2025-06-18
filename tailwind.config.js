/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                okra: ['', 'Okra-Medium', 'Okra-ExtraBold', 'Okra-Bold', 'Okra-MediumLight'],
                excali: ['Excali-Regular'],
                montserratAlternates: ['M-Black', 'M-SemBold']
            },
            colors: {
                primary: '#FC5431',
                secondary: '#FDBB8A',
                tertiary: '#CF3239',
            },
        },
    },
    plugins: [],
};
