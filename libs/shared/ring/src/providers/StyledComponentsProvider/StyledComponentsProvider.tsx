import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  Theme,
} from '@material-ui/core/styles'
import { ReactElement, useEffect } from 'react'

type ProviderStyledComponentsProps = {
  children: ReactElement
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
