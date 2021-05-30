import 'normalize.css/normalize.css'
import 'firebaseui/dist/firebaseui.css'

import { createMuiTheme } from '@material-ui/core/styles'
import StyledComponentsProvider from '@ring/providers/StyledComponentsProvider'
import { useGtag } from '@ring/services/Gtag'
import GlobalStyle from 'components/GlobalStyle'
import { Provider as UseClientStateProvider } from 'contexts/useClientState'
import { Provider as UseServerStateProvider } from 'contexts/useServerState'
import { AnimateSharedLayout } from 'framer-motion'
import { AppProps } from 'next/app'
import React, { ReactElement } from 'react'
import { initialize } from 'services/firebase'

initialize()

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#ddc3a5' },
    secondary: { main: '#e9a96d' },
    // background: {
    //   default: '#1d3c45',
    // },
    text: {
      primary: '#fff',
    },
    // button: {
    //   primary:
    // }
  },
})

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement {
  useGtag({ router, trackingId: process.env.TRACKING_ID })
  const user = pageProps.AuthUserSerialized
    ? JSON.parse(pageProps.AuthUserSerialized)
    : null

  return (
    <StyledComponentsProvider theme={theme}>
      <GlobalStyle />
      <UseServerStateProvider user={user}>
        <UseClientStateProvider>
          <AnimateSharedLayout>
            <Component
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...pageProps}
            />
          </AnimateSharedLayout>
        </UseClientStateProvider>
      </UseServerStateProvider>
    </StyledComponentsProvider>
  )
}
