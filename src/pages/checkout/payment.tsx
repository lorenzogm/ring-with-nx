import { FC } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'

import getCMS from 'services/CMS/getCMS'
import CheckoutPaymentTemplate from 'components/templates/CheckoutPaymentTemplate/CheckoutPaymentTemplate'
import type { Config } from 'types/config'
import type { PaymentMethods } from 'types/paymentMethods'

type CheckoutPaymentPageProps = {
  config: Config
}

const CheckoutPaymentPage: FC<CheckoutPaymentPageProps> = ({ config }) => {
  const router = useRouter()

  return <CheckoutPaymentTemplate config={config} onSelect={onSelect} />

  async function onSelect({
    paymentMethod,
  }: {
    paymentMethod: PaymentMethods
  }) {
    localStorage.setItem('paymentMethod', paymentMethod)

    await router.push('/checkout/confirmation')
  }
}

export default CheckoutPaymentPage

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig()])

  return {
    props: {
      config,
    },
  }
}
