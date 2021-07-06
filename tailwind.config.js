// const { colors } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './components/**/*.{js,jsx,ts,tsx,vue}',    
    './lib/**/*.{js,jsx,ts,tsx,vue}',    
    './pages/**/*.{js,jsx,ts,tsx,vue}',    
  ],
  
  darkMode: 'class', // or 'media' or 'class'

  theme: {
    // Add Font to Sans Font Array
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },

    // Set default container to align center and have a 1rem side padding
    container: {
      center: true,
    },

    extend: {

      // Mapping Colors
      colors: {
        primary: colors.purple,
        secondary: colors.green,
        alternative: colors.yellow,
        'bluegray-50': '#f8fafd',
        'bluegray-100': '#ebf1f9',
        'shadepurple-50': '#fafaff',
        'shadepurple-100': '#eff0fe',
        'shadeyellow-50': '#fffefa',
        'shadeyellow-100': '#fffdf7',
      },

      // Extra Font Sizes
      fontSize: {
        xxs: ['0.65rem', '1'],
      },

      // Added Percentage Spacing
      margin: {
        '4p':   '4%',
        '8p':   '8%',
        '12p':  '12%',
        '16p':  '16%',
      },

      padding: {
        '1px':  '1px',
        '3px':  '3px',
        '2px':  '2px',
        '4px':  '4px',
        '4p':   '4%',
        '8p':   '8%',
        '12p':  '12%',
        '16p':  '16%',
      },

      // Added Icon Sizes
      width: {
        'px-16':  '16px',
        'px-24':  '24px',
        'px-32':  '32px',
        'px-40':  '40px',
        'px-48':  '48px',
        'px-56':  '56px',
        'px-64':  '64px',
        'px-80':  '80px',
        'px-88':  '88px',
        'px-96':  '96px',
        'px-104': '104px',
        'px-112': '112px',
        'px-128': '128px',
      },
      
      height: {
        'px-16':  '16px',
        'px-24':  '24px',
        'px-32':  '32px',
        'px-40':  '40px',
        'px-48':  '48px',
        'px-56':  '56px',
        'px-64':  '64px',
        'px-80':  '80px',
        'px-88':  '88px',
        'px-96':  '96px',
        'px-104': '104px',
        'px-112': '112px',
        'px-128': '128px',
      },

      // Added zIndex
      zIndex: {
        '-1': '-1',
        '-2': '-2',
       },
    }
  },

  variants: {
    scale:                ['responsive', 'hover', 'focus', 'group-hover'],
    fontSize:             ['responsive', 'hover', 'focus', 'group-hover'],
    textColor:            ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    textOpacity:          ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    display:              ['responsive', 'hover', 'focus', 'group-hover'],
    transform:            ['responsive', 'hover', 'focus', 'group-hover'],
    translate:            ['responsive', 'hover', 'focus', 'group-hover'],
    opacity:              ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor:      ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    backgroundImage:      ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    gradientColorStops:   ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
    width:                ['responsive', 'hover', 'focus', 'group-hover'],
    padding:              ['responsive', 'hover', 'focus', 'group-hover'],
    margin:               ['responsive', 'hover', 'focus', 'group-hover'],
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};