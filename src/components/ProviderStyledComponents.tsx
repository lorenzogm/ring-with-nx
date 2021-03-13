import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import { ReactElement, useEffect } from 'react'

import theme from 'theme'

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
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  )
}
