import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  darkMode: ['class', '[data-theme="dark"]'],
  flyonui: {
    themes: [
      {
        v1: {
          primary: '#E0211FFF',
          secondary: '#1F2B48FF',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
      'dark',
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include FlyonUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    vendors: false, // default is false when true add customize css for apexChart, editor.js, flatpickr, fullcalendar, notyf, raty-js
    logs: true, // Shows info about FlyonUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
  theme: {
    extend: {},
  },
  content: ['./node_modules/flyonui/dist/js/*.js'],
  plugins: [require('flyonui'), require('flyonui/plugin')],
};
