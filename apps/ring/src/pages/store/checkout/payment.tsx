import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'

import getCMS from 'services/CMS/getCMS'
import CheckoutPaymentTemplate, {
  CheckoutPaymentFormValues,
} from 'components/templates/CheckoutPaymentTemplate'
import type { Config } from 'types/config'

const { CONFIG_STORE } = process.env

export const getStaticProps: GetStaticProps = async () => {
  if (CONFIG_STORE !== 'ENABLED') {
    return {
      props: {
        isPageEnabled: false,
      },
    }
  }

  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig({})])

  return {
    props: {
      config,
    },
    revalidate: 1,
  }
}

type CheckoutPaymentPageProps = {
  config: Config
}

export default function CheckoutPaymentPage({
  config,
}: CheckoutPaymentPageProps): ReactElement | null {
  const router = useRouter()

  if (router.isFallback) {
    return null
  }

  return <CheckoutPaymentTemplate config={config} onSubmit={onSubmit} />

  async function onSubmit(values: CheckoutPaymentFormValues) {
    localStorage.setItem('paymentMethod', values.paymentMethod)

    await router.push('/store/checkout/confirmation')
  }
}
