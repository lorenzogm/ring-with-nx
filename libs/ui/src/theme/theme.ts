import { createTheme, useTheme, adaptV4Theme } from '@mui/material';

import { RingTheme, RingThemeOptions } from './types'

export function createRingTheme(themeOptions: RingThemeOptions): RingTheme {
  return createTheme(adaptV4Theme(themeOptions)) as RingTheme;
}

export function useRingTheme(): RingTheme {
  return useTheme()
}
