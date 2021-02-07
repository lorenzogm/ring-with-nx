import { FC } from 'react'

import { Config } from 'services/CMS/config'
import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'

type CheckoutAddressTemplateProps = {
  config: Config
}

const CheckoutAddressTemplate: FC<CheckoutAddressTemplateProps> = ({
  config,
}) => {
  return (
    <PageLayoutCheckout config={config} checkoutStep="ADDRESS">
      CheckoutAddressTemplate
    </PageLayoutCheckout>
  )
}

export default CheckoutAddressTemplate
