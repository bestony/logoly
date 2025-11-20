import presetIcons from '@unocss/preset-icons'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      /* options */
    }),
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
  ],
  theme: {
    colors: {
      primary: '#ff9000',
      background: '#000',
    },
  },
})
