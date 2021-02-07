import { FC } from 'react'

import { Config } from 'services/CMS/config'
import { GetStaticProps } from 'next'
import getCMS from 'services/CMS/getCMS'
import CheckoutConfirmationTemplate from 'components/templates/CheckoutConfirmationTemplate/CheckoutConfirmationTemplate'

type CheckoutConfirmationPageProps = {
  config: Config
}

const CheckoutConfirmationPage: FC<CheckoutConfirmationPageProps> = ({
  config,
}) => {
  return <CheckoutConfirmationTemplate config={config} />
}

export default CheckoutConfirmationPage

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
