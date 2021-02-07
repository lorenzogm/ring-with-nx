import { FC } from 'react'

import { Config } from 'services/CMS/config'
import { GetStaticProps } from 'next'
import getCMS from 'services/CMS/getCMS'
import CartTemplate from 'components/templates/CartTemplate/CartTemplate'

type CartTemplateProps = {
  config: Config
}

const CartPage: FC<CartTemplateProps> = ({ config }) => {
  return <CartTemplate config={config} />
}

export default CartPage

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
