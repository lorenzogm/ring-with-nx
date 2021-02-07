import { FC } from 'react'

import { Config } from 'services/CMS/config'
import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'

type CheckoutConfirmationTemplateProps = {
  config: Config
}

const CheckoutConfirmationTemplate: FC<CheckoutConfirmationTemplateProps> = ({
  config,
}) => {
  return (
    <PageLayoutCheckout config={config} checkoutStep="CONFIRMATION">
      CheckoutConfirmationTemplate
    </PageLayoutCheckout>
  )
}

export default CheckoutConfirmationTemplate
