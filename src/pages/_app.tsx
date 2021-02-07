import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ReactElement } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'
import { ReactQueryDevtools } from 'react-query-devtools'

import { useGtagHandlerouteChange } from 'services/gtag'
import '../styles/index.css'

const { NEXT_PUBLIC_STRIPE_API_PUBLIC } = process.env

const stripePromise = NEXT_PUBLIC_STRIPE_API_PUBLIC
  ? loadStripe(NEXT_PUBLIC_STRIPE_API_PUBLIC)
  : Promise.resolve(null)

export default function MyApp({
  Component,
  pageProps,
}: AppProps): ReactElement {
  useGtagHandlerouteChange()

  return (
    <>
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
      <ReactQueryDevtools />
    </>
  )
}
