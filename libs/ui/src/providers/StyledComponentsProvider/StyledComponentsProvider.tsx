import {
  CssBaseline,
  StyledEngineProvider,
  Theme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import StylesProvider from '@mui/styles/StylesProvider'
import { ThemeProvider } from '@ring/ui'
import { ReactElement, useEffect } from 'react'

import { RingTheme } from '../../theme'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  )
}
