import { LayoutCheckout, StoreCheckoutSuccessTemplate } from '@ring/store'
import { Storyblok } from '@ring/storyblok/services'
import { GetStaticProps } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const sbParams = {
    version: 'draft', // or 'draft'
    language: locale,
    ...(preview ? { cv: Date.now() } : {}),
  }
  const config = await Storyblok.get(`cdn/stories/global/config`, sbParams)

  return {
    props: {
      config,
    },
    revalidate: 1,
  }
}

export default function StoreCheckoutSuccessPage(): ReactElement | null {
  const [pageState, setPageState] = useState<CheckoutSuccessPageState>({
    status: 'LOADING',
  })

  const { clearCart } = useShoppingCart()

  useEffect(() => {
    const orderId = localStorage.getItem('orderId')
    if (orderId) {
      setPageState({ status: 'SUCCESS', orderId })

      clearCart()
    } else {
      setPageState({ status: 'ERROR' })
    }
  }, [clearCart])

  return (
    <LayoutCheckout activeStep={3}>
      {pageState.status === 'SUCCESS' ? (
        <StoreCheckoutSuccessTemplate orderId={pageState.orderId as string} />
      ) : null}
    </LayoutCheckout>
  )
}

export type CheckoutSuccessPageState = {
  status: 'LOADING' | 'SUCCESS' | 'ERROR'
  orderId?: string
}
