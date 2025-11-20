import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetTypography from '@unocss/preset-typography'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons(),
    presetWebFonts(),
    presetTypography(),
    presetRemToPx(),
    presetAttributify(),
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
