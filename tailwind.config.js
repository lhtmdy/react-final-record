/** @type {import('tailwindcss').Config} */
import { purpleColor, blueColor, greenColor, pinkColor, yellowColor, grayColor,orangeColor } from './src/tailwindcss/color.js'
import fontSize from './src/tailwindcss/fontSize.json'
import aspectRatio from '@tailwindcss/aspect-ratio'
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      purple: {
        ...purpleColor,
      },
      blue: {
        ...blueColor,
      },
      green: {
        ...greenColor,
      },
      pink: {
        ...pinkColor,
      },
      yellow: {
        ...yellowColor,
      },
      gray: {
        ...grayColor,
      },
      orange: {
        ...orangeColor,
      },
      transparent: 'transparent',
      white: '#ffffff',
    },
     fontSize: {
      ...fontSize,
    },
  },
   plugins: [aspectRatio],
}

