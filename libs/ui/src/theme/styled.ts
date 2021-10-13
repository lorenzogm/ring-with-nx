import isPropValid from '@emotion/is-prop-valid'
import {
  css as emotionCss,
  ThemeProvider as ThemeProviderEmotion,
} from '@emotion/react'
import emotionStyled from '@emotion/styled'

export const ThemeProvider = ThemeProviderEmotion
export const shouldForwardProp = isPropValid
export const css = emotionCss
export const styled = emotionStyled
