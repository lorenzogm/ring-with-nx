import { FC } from 'react'

import { Config } from 'services/CMS/config'
import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'

type CheckoutPaymentTemplateProps = {
  config: Config
}

const CheckoutPaymentTemplate: FC<CheckoutPaymentTemplateProps> = ({
  config,
}) => {
  return (
    <PageLayoutCheckout config={config} checkoutStep="PAYMENT">
      CheckoutPaymentTemplate
    </PageLayoutCheckout>
  )
}

export default CheckoutPaymentTemplate
