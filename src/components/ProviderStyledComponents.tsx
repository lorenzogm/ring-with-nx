import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'
import { ReactElement } from 'react'

import theme from 'theme'

type ProviderStyledComponentsProps = {
  children: ReactElement
}

export default function ProviderStyledComponents({
  children,
}: ProviderStyledComponentsProps): ReactElement {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StylesProvider>
  )
}
