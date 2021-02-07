import { FC } from 'react'

import { Config } from 'services/CMS/config'
import { GetStaticProps } from 'next'
import getCMS from 'services/CMS/getCMS'
import CheckoutAddressTemplate from 'components/templates/CheckoutAddressTemplate/CheckoutAddressTemplate'

type CheckoutAddressPageProps = {
  config: Config
}

const CheckoutAddressPage: FC<CheckoutAddressPageProps> = ({ config }) => {
  return <CheckoutAddressTemplate config={config} />
}

export default CheckoutAddressPage

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
