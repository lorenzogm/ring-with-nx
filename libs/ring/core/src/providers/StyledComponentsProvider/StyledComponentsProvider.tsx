import {
  CssBaseline,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core'
import { ReactElement, useEffect } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { RingTheme } from '../../theme'

type ProviderStyledComponentsProps = {
  children: ReactElement
  theme: RingTheme
}

export function StyledComponentsProvider({
  children,
  theme,
}: ProviderStyledComponentsProps): ReactElement {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }, [])

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </StyledComponentsThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}
