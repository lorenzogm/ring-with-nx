import { ReactElement } from 'react'

import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import type { Config } from 'types/config'

type CheckoutSuccessTemplateProps = {
  config: Config
  orderId: string
}

export default function CheckoutSuccessTemplate({
  config,
  orderId,
}: CheckoutSuccessTemplateProps): ReactElement {
  return (
    <LayoutCheckout config={config} activeStep={3}>
      {orderId}!
    </LayoutCheckout>
  )
}
