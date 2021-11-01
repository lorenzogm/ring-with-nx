import { createRingTheme, responsiveFontSizes } from '@ring/ui'

import { colors } from './colors'
import { components } from './components'
import { layouts } from './layouts'

let theme = createRingTheme({
  colors,
  components,
  grid: {
    gutter: {
      xs: 1,
      sm: 1,
      md: 1,
      lg: 2,
      xl: 2,
    },
    margin: {
      xs: 2,
      sm: 3,
      md: 8,
      lg: 8,
      xl: 14,
    },
  },
  layouts,
  spacing: 10,
})

theme = responsiveFontSizes(theme)

export { theme }
