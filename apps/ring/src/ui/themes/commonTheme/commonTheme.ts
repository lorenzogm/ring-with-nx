import { createRingTheme, RingTheme, RingThemeOptions } from '@ring/ui'

import { addResponsiveFont } from './addResponsiveFont'
import { colors } from './colors'
import { components } from './components'
import { footer } from './footer'
import { grid } from './grid'
import { header } from './header'

function commonThemeOptions(themeOptions: RingThemeOptions) {
  return {
    colors,
    footer,
    grid,
    header,
    spacing: 10,
    components,
    palette: {
      ...themeOptions.palette,
      background: {
        default: 'white',
      },
    },
  }
}

export const createTheme = (themeOptions: RingThemeOptions): RingTheme => {
  let theme = createRingTheme({
    ...themeOptions,
    ...commonThemeOptions(themeOptions),
  })

  theme = addResponsiveFont(theme)

  return theme
}
