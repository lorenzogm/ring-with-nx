import { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useShoppingCart } from 'use-shopping-cart'

import getCMS from 'services/CMS/getCMS'
import CheckoutConfirmationTemplate from 'components/templates/CheckoutConfirmationTemplate'
import createOrder from 'services/api/order/createOrder'
import type { Config } from 'types/config'

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig({})])

  return {
    props: {
      config,
    },
    revalidate: 1,
  }
}

type CheckoutConfirmationPageProps = {
  config: Config
}

export default function CheckoutConfirmationPage({
  config,
}: CheckoutConfirmationPageProps): ReactElement {
  const router = useRouter()
  const { cartDetails, totalPrice } = useShoppingCart()

  const { status, mutateAsync } = useMutation(createOrder)

  return (
    <CheckoutConfirmationTemplate
      config={config}
      onConfirm={onConfirm}
      onConfirmStatus={status}
    />
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
