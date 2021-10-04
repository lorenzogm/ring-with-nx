import { ReactElement } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from 'use-shopping-cart'

const { NEXT_PUBLIC_STRIPE_API_PUBLIC } = process.env

const stripePromise = NEXT_PUBLIC_STRIPE_API_PUBLIC
  ? loadStripe(NEXT_PUBLIC_STRIPE_API_PUBLIC)
  : Promise.resolve(null)

type StripeProviderProps = {
  children: ReactElement
}

export default StripeProvider
export function StripeProvider({
  children,
}: StripeProviderProps): ReactElement {
  return (
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="EUR">
      {children}
    </CartProvider>
  )
}
