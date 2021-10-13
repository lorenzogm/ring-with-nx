import { createRingTheme, RingTheme, RingThemeOptions } from '@ring/ui'

import { addResponsiveFont } from './addResponsiveFont'
import { colors } from './colors'
import { footer } from './footer'
import { grid } from './grid'
import { header } from './header'
import { overrides } from './overrides'
import { props } from './props'

function commonThemeOptions(themeOptions: RingThemeOptions): RingThemeOptions {
  return {
    colors,
    footer,
    grid,
    header,
    spacing: 10,
    overrides,
    props,
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
