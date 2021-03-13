import { FC } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'

import getCMS from 'services/CMS/getCMS'
import CheckoutPaymentTemplate, {
  CheckoutPaymentFormValues,
} from 'components/templates/CheckoutPaymentTemplate'
import type { Config } from 'types/config'

type CheckoutPaymentPageProps = {
  config: Config
}

const CheckoutPaymentPage: FC<CheckoutPaymentPageProps> = ({ config }) => {
  const router = useRouter()

  return <CheckoutPaymentTemplate config={config} onSubmit={onSubmit} />

  async function onSubmit(values: CheckoutPaymentFormValues) {
    localStorage.setItem('paymentMethod', values.paymentMethod)

    await router.push('/store/checkout/confirmation')
  }
}

export default CheckoutPaymentPage

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
