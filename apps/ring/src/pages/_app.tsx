import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ReactElement, useEffect } from 'react'
import ErrorPage from 'next/error'
import 'normalize.css/normalize.css'

import StripeProvider from '@ring/providers/StripeProvider'
import StyledComponentsProvider from '@ring/providers/StyledComponentsProvider'
import ReactQueryProvider from '@ring/providers/ReactQueryProvider'
import { useGtag } from '@ring/services/Gtag'
import { createMuiTheme } from '@material-ui/core/styles'

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

  if (
    pageProps.preview === false &&
    ((pageProps.config && pageProps.config.isMaintenanceEnabled === true) ||
      router.asPath === '/maintenance')
  ) {
    return (
      <MaintenanceRedirect
        Component={Component}
        pageProps={pageProps}
        router={router}
      />
    )
  }

  if (pageProps.isPageEnabled === false) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <ReactQueryProvider>
      <StripeProvider>
        <StyledComponentsProvider theme={theme}>
          <Component
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...pageProps}
          />
        </StyledComponentsProvider>
      </StripeProvider>
    </ReactQueryProvider>
  )
}

function MaintenanceRedirect({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // redirect to "home"
    if (
      router.asPath === '/maintenance' &&
      pageProps.config.isMaintenanceEnabled === false
    ) {
      router.push('/').catch((e) => {
        throw e
      })
    }
    // redirect to "maintenance"
    else if (
      router.asPath !== '/maintenance' &&
      pageProps.config.isMaintenanceEnabled === true
    ) {
      router.push('/maintenance').catch((e) => {
        throw e
      })
    }
  }, [pageProps.config.isMaintenanceEnabled, router])

  if (
    router.asPath === '/maintenance' &&
    pageProps.config.isMaintenanceEnabled === true
  ) {
    return (
      <ReactQueryProvider>
        <StripeProvider>
          <StyledComponentsProvider theme={theme}>
            <>
              <Component
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...pageProps}
              />
            </>
          </StyledComponentsProvider>
        </StripeProvider>
      </ReactQueryProvider>
    )
  }

  return null
}
