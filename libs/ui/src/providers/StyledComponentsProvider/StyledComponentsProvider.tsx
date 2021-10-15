import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material'
import { ThemeProvider } from '@ring/ui'
import { ReactElement, useEffect } from 'react'

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
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}
