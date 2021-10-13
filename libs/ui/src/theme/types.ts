import { Theme, ThemeOptions } from '@material-ui/core'

import { ThemeColors } from './colors'
import { ThemeFooter } from './footer'
import { ThemeGrid } from './grid'
import { ThemeHeader } from './header'

export type RingTheme = Theme & {
  colors: ThemeColors
  footer: ThemeFooter
  grid: ThemeGrid
  header: ThemeHeader
}

export type RingThemeOptions = ThemeOptions & {
  colors?: ThemeColors
  footer?: ThemeFooter
  grid?: ThemeGrid
  header?: ThemeHeader
}
