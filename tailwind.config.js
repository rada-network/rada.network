// const { colors } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  
  darkMode: false, // or 'media' or 'class'

  theme: {
    // Add Font to Sans Font Array
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },

    // Set default container to align center and have a 1rem side padding
    container: {
      center: true,
      padding: '1rem',
    },

    extend: {

      // Only define main background images
      backgroundImage: {
       'hero-img-1': "url('/images/header/hero.png')"
      },

      // Mapping Colors
      colors: {
        primary: colors.purple,
        secondary: colors.green,
        neutral: colors.gray,
      },

      // Added Percentage Spacing
      margin: {
        '4p':   '4%',
        '8p':   '8%',
        '12p':  '12%',
        '16p':  '16%',
      },

      padding: {
        '4p':   '4%',
        '8p':   '8%',
        '12p':  '12%',
        '16p':  '16%',
      },

      // Added Icon Sizes
      width: {
        'icon-16':  '16px',
        'icon-24':  '24px',
        'icon-32':  '32px',
        'icon-40':  '40px',
        'icon-48':  '48px',
        'icon-56':  '56px',
        'icon-64':  '64px',
      },
      
      height: {
        'icon-16':  '16px',
        'icon-24':  '24px',
        'icon-32':  '32px',
        'icon-40':  '40px',
        'icon-48':  '48px',
        'icon-56':  '56px',
        'icon-64':  '64px',
      },

      // Added zIndex
      zIndex: {
        '-1': '-1',
        '-2': '-2',
       },
    }
  },

  variants: {
    scale: ['responsive', 'hover', 'focus', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};