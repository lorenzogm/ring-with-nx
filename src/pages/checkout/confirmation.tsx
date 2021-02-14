import { FC } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useShoppingCart } from 'use-shopping-cart'

import getCMS from 'services/CMS/getCMS'
import CheckoutConfirmationTemplate from 'components/templates/CheckoutConfirmationTemplate/CheckoutConfirmationTemplate'
import createOrder from 'services/api/order/createOrder'
import { PaymentMethods } from 'types/paymentMethods'
import type { Config } from 'types/config'
import type { Address } from 'types/address'
import { Order } from 'types/order'

type CheckoutConfirmationPageProps = {
  config: Config
}

const CheckoutConfirmationPage: FC<CheckoutConfirmationPageProps> = ({
  config,
}) => {
  const router = useRouter()
  const { cartDetails } = useShoppingCart()

  const { status, mutateAsync } = useMutation(createOrder)

  return (
    <CheckoutConfirmationTemplate
      config={config}
      onConfirm={onConfirm}
      pageState={{ status }}
    />
  )

  async function onConfirm() {
    const addressFromLocalStorage = localStorage.getItem('address')

    if (!addressFromLocalStorage) {
      throw new Error('Undefined address')
    }

    const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
    if (!paymentMethodFromLocalStorage) {
      throw new Error('Undefined address')
    }

    const address: Address = JSON.parse(addressFromLocalStorage)

    const paymentMethod = paymentMethodFromLocalStorage as PaymentMethods

    const order: Order = await mutateAsync({
      address,
      cartDetails,
      paymentMethod,
    })

    localStorage.setItem('orderId', order.orderId)

    await router.push('/checkout/success')
  }
}

export default CheckoutConfirmationPage

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig()])

  return {
    props: {
      config,
    },
  }
}
