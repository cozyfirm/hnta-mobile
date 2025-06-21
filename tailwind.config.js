/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './modals/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#333366',
        primary: '#66CCCC',
        secondary: '#EEF0F2',
        link: '#FFCC33',
        tertiary: '#FFCC33',
        meal: '#FF6633',
        party: '#99CC33',
      },
      fontFamily: {
        'gimlet-light': ['GimletSansVariable-Light'],
        'gimlet-regular': ['GimletSansVariable-Regular'],
        'gimlet-medium': ['GimletSansVariable-Medium'],
        'gimlet-semibold': ['GimletSansVariable-SemiBold'],
        'gimlet-bold': ['GimletSansVariable-Bold'],
        'gimlet-black': ['GimletSansVariable-Black'],
      },
    },
  },
  plugins: [],
};
