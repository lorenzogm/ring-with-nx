import { FC } from 'react'

import { Config } from 'services/CMS/config'
import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'

type CheckoutSuccessTemplateProps = {
  config: Config
}

const CheckoutSuccessTemplate: FC<CheckoutSuccessTemplateProps> = ({
  config,
}) => {
  return (
    <PageLayoutCheckout config={config} checkoutStep="SUCCESS">
      CheckoutSuccessTemplate
    </PageLayoutCheckout>
  )
}

export default CheckoutSuccessTemplate
