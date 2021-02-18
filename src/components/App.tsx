import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ReactElement, useEffect } from 'react'
import ErrorPage from 'next/error'
import 'normalize.css/normalize.css'

import { useGtagHandlerouteChange } from 'services/gtag'
import ProviderStripe from './ProviderStripe'
import ProviderStyledComponents from './ProviderStyledComponents'
import ProviderReactQuery from './ProviderReactQuery'

export default function App({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement {
  useGtagHandlerouteChange()

  if (
    pageProps.preview === false &&
    ((pageProps.config && pageProps.config.isMaintenanceEnabled === true) ||
      router.pathname === '/maintenance')
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
    <ProviderReactQuery>
      <ProviderStripe>
        <ProviderStyledComponents>
          <Component
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...pageProps}
          />
        </ProviderStyledComponents>
      </ProviderStripe>
    </ProviderReactQuery>
  )
}

function MaintenanceRedirect({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // redirect to "home"
    if (
      router.pathname === '/maintenance' &&
      pageProps.config.isMaintenanceEnabled === false
    ) {
      router.push('/').catch((e) => {
        throw e
      })
    }
    // redirect to "maintenance"
    else if (
      router.pathname !== '/maintenance' &&
      pageProps.config.isMaintenanceEnabled === true
    ) {
      router.push('/maintenance').catch((e) => {
        throw e
      })
    }
  }, [pageProps.config.isMaintenanceEnabled, router])

  if (
    router.pathname === '/maintenance' &&
    pageProps.config.isMaintenanceEnabled === true
  ) {
    return (
      <ProviderReactQuery>
        <ProviderStripe>
          <ProviderStyledComponents>
            <>
              <Component
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...pageProps}
              />
            </>
          </ProviderStyledComponents>
        </ProviderStripe>
      </ProviderReactQuery>
    )
  }

  return null
}
