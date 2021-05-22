import React, { ReactElement } from 'react'
import { AppProps } from 'next/app'
import 'normalize.css/normalize.css'
import 'firebaseui/dist/firebaseui.css'

import StyledComponentsProvider from '@ring/providers/StyledComponentsProvider'
import { useGtag } from '@ring/services/Gtag'
import { createMuiTheme } from '@material-ui/core/styles'

import 'services/firebase'
import { Provider as UseServerStateProvider } from '../contexts/useServerState'
import { Provider as UseClientStateProvider } from '../contexts/useClientState'
import Layout from 'components/Layout'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#252e43' },
    secondary: { main: '#fafafa' },
  },
})

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement {
  useGtag({ router, trackingId: process.env.TRACKING_ID })

  return (
    <StyledComponentsProvider theme={theme}>
      <UseServerStateProvider>
        <UseClientStateProvider>
          <Layout>
            <Component
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...pageProps}
            />
          </Layout>
        </UseClientStateProvider>
      </UseServerStateProvider>
    </StyledComponentsProvider>
  )
}
