import { CSSInterpolation } from '@emotion/serialize'
import {
  createTheme,
  GridSpacing,
  responsiveFontSizes as responsiveFontSizesMui,
  Theme,
  ThemeOptions,
  useTheme,
} from '@mui/material'

export function responsiveFontSizes(theme: RingTheme): RingTheme {
  return responsiveFontSizesMui(theme) as RingTheme
}

export function createRingTheme(themeOptions: RingThemeOptions): RingTheme {
  return createTheme(themeOptions) as RingTheme
}

export function useRingTheme(): RingTheme {
  return useTheme()
}

export type RingTheme = Theme & {
  colors: ThemeColors
  grid: ThemeGrid
  layouts: ThemeLayouts
  modules: ThemeModules
}

export type RingThemeOptions = ThemeOptions & {
  colors?: ThemeColors
  grid?: ThemeGrid
  layouts?: ThemeLayouts
  modules?: ThemeModules
}

export type ThemeColors = (key: string) => string

export type ThemeGrid = {
  gutter: {
    xs: GridSpacing
    sm: GridSpacing
    md: GridSpacing
    lg: GridSpacing
    xl: GridSpacing
  }
  margin: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
}

type ThemeLayouts = {
  LayoutCheckout: {
    Container: CSSInterpolation
  }
  LayoutDefault: {
    Container: CSSInterpolation
  }
}

type ThemeModules = {
  LayoutCheckout: {
    Container: CSSInterpolation
  }
  LayoutDefault: {
    Container: CSSInterpolation
  }
}
