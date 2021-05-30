import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  Theme,
  responsiveFontSizes,
} from '@material-ui/core/styles'
import { ReactElement, useEffect, ReactNode } from 'react'
import { CssBaseline } from '@material-ui/core'
import '@fontsource/roboto'

type ProviderStyledComponentsProps = {
  children: ReactNode
  theme: Theme
}

export default StyledComponentsProvider
export function StyledComponentsProvider({
  children,
  theme,
}: ProviderStyledComponentsProps): ReactElement {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }, [])

  const themeResponsive = responsiveFontSizes(theme)

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={themeResponsive}>
        <StyledComponentsThemeProvider theme={themeResponsive}>
          <CssBaseline />
          {children}
        </StyledComponentsThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}
