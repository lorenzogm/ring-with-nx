import { FC } from 'react'

import { Config } from 'services/CMS/config'
import { GetStaticProps } from 'next'
import getCMS from 'services/CMS/getCMS'
import CheckoutSuccessTemplate from 'components/templates/CheckoutSuccessTemplate/CheckoutSuccessTemplate'

type CheckoutSuccessPageProps = {
  config: Config
}

const CheckoutSuccessPage: FC<CheckoutSuccessPageProps> = ({ config }) => {
  return <CheckoutSuccessTemplate config={config} />
}

export default CheckoutSuccessPage

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
