import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ReactElement, useEffect } from 'react'
import ErrorPage from 'next/error'
import 'normalize.css/normalize.css'

import { useGtagHandlerouteChange } from 'services/gtag'
import StripeProvider from 'providers/StripeProvider'
import StyledComponentsProvider from 'providers/StyledComponentsProvider'
import ReactQueryProvider from 'providers/ReactQueryProvider'

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement {
  useGtagHandlerouteChange()

  if (
    pageProps.preview === false &&
    ((pageProps.config && pageProps.config.isMaintenanceEnabled === false) ||
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
        <StyledComponentsProvider>
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
          <StyledComponentsProvider>
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
