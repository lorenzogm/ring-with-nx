import {
  LayoutCheckout,
  orderCreate,
  StoreCheckoutConfirmationTemplate,
} from '@ring/store'
import { Storyblok } from '@ring/storyblok/services'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
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
  }
}

export default function CheckoutConfirmationPage(): ReactElement {
  const router = useRouter()
  const { cartDetails, totalPrice } = useShoppingCart()

  const { status, mutateAsync } = useMutation(orderCreate)

  return (
    <LayoutCheckout activeStep={2}>
      <StoreCheckoutConfirmationTemplate
        onConfirm={onConfirm}
        onConfirmStatus={status}
      />
    </LayoutCheckout>
  )

  async function onConfirm() {
    try {
      await mutateAsync({
        cartDetails,
        totalPrice,
      })

      await router.push('/store/checkout/success')
    } catch (error) {
      // display modal
    }
  }
}
