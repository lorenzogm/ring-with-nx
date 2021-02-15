import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ReactElement, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import ErrorPage from 'next/error'

import { useGtagHandlerouteChange } from 'services/gtag'
import '../styles/index.css'

const { NEXT_PUBLIC_STRIPE_API_PUBLIC } = process.env

const stripePromise = NEXT_PUBLIC_STRIPE_API_PUBLIC
  ? loadStripe(NEXT_PUBLIC_STRIPE_API_PUBLIC)
  : Promise.resolve(null)

const queryClient = new QueryClient()

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement {
  useGtagHandlerouteChange()
  if (
    (pageProps.config && pageProps.config.isMaintenanceEnabled === true) ||
    router.pathname === '/maintenance'
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
    <>
      <QueryClientProvider client={queryClient}>
        <CartProvider
          mode="checkout-session"
          stripe={stripePromise}
          currency="EUR"
        >
          <Component
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...pageProps}
          />
        </CartProvider>
      </QueryClientProvider>
      <ReactQueryDevtools />
    </>
  )
}

function MaintenanceRedirect({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // Page is "maintenance" and maintenance it's disabled, redirect to "home"
    if (
      router.pathname === '/maintenance' &&
      pageProps.config.isMaintenanceEnabled === false
    ) {
      router.push('/').catch((e) => {
        throw e
      })
    }
    // Page is NOT "maintenance" and maintenance is enabled, redirect to "maintenance"
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
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pageProps}
      />
    )
  }

  return null
}
