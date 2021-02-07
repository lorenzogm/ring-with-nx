import { FC } from 'react'

import { Config } from 'services/CMS/config'
import { GetStaticProps } from 'next'
import getCMS from 'services/CMS/getCMS'
import CheckoutPaymentTemplate from 'components/templates/CheckoutPaymentTemplate/CheckoutPaymentTemplate'

type CheckoutPaymentPageProps = {
  config: Config
}

const CheckoutPaymentPage: FC<CheckoutPaymentPageProps> = ({ config }) => {
  return <CheckoutPaymentTemplate config={config} />
}

export default CheckoutPaymentPage

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig()])

  if (!config) {
    throw new Error(`Undefined "config" document. Please define it in the CMS`)
  }

  return {
    props: {
      config,
    },
  }
}
