/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                okra: ['Okra-Regular', 'Okra-Medium', 'Okra-ExtraBold', 'Okra-Bold', 'Okra-MediumLight'],
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
