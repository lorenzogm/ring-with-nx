/* eslint-disable testing-library/no-node-access */
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import {
  StylesProvider,
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import { ReactElement, useEffect } from 'react'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#252e43' },
    secondary: { main: '#fafafa' },
  },
})

type ProviderStyledComponentsProps = {
  children: ReactElement
}

export default function ProviderStyledComponents({
  children,
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
          {children}
        </StyledComponentsThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}
