import { DeprecatedThemeOptions, Theme } from '@mui/material'

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

export type RingThemeOptions = DeprecatedThemeOptions & {
  colors?: ThemeColors
  footer?: ThemeFooter
  grid?: ThemeGrid
  header?: ThemeHeader
}
