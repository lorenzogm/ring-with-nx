import { createTheme, useTheme } from '@material-ui/core'

import { RingTheme, RingThemeOptions } from './types'

export function createRingTheme(themeOptions: RingThemeOptions): RingTheme {
  return createTheme(themeOptions) as RingTheme
}

export function useRingTheme(): RingTheme {
  return useTheme()
}
