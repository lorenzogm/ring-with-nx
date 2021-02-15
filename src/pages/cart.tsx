import { FC } from 'react'

import { GetStaticProps } from 'next'
import type { Config } from 'types/config'
import getCMS from 'services/CMS/getCMS'
import CartTemplate from 'components/templates/CartTemplate/CartTemplate'

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig({})])

  if (!config) {
    throw new Error(`Undefined "config" document. Please define it in the CMS`)
  }

  return {
    props: {
      config,
    },
  }
}

type CartTemplateProps = {
  config: Config
}

const CartPage: FC<CartTemplateProps> = ({ config }) => {
  return <CartTemplate config={config} />
}

export default CartPage
