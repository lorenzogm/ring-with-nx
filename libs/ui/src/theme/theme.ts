import { createTheme, useTheme } from '@mui/material'

import { RingTheme, RingThemeOptions } from './types'

export function createRingTheme(themeOptions: RingThemeOptions): RingTheme {
  return createTheme(themeOptions) as RingTheme
}

export function useRingTheme(): RingTheme {
  return useTheme()
}
