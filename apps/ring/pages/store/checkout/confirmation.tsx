import {
  LayoutCheckout,
  orderCreate,
  StoreCheckoutConfirmationTemplate,
} from '@ring/store'
import { getConfig } from '@ring/storyblok'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { useShoppingCart } from 'use-shopping-cart'

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const config = await getConfig({ locale, preview })

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
