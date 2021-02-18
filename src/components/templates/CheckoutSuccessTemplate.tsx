import { FC } from 'react'

import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import type { Config } from 'types/config'

export type CheckoutSuccessPageState = {
  status: 'LOADING' | 'SUCCESS' | 'ERROR'
  orderId?: string
}

type CheckoutSuccessTemplateProps = {
  config: Config
  pageState: CheckoutSuccessPageState
}

const CheckoutSuccessTemplate: FC<CheckoutSuccessTemplateProps> = ({
  config,
  pageState,
}) => {
  return (
    <LayoutCheckout config={config} activeStep={3}>
      {pageState.status === 'LOADING' && <div>Loading...</div>}
      {pageState.status === 'SUCCESS' && (
        <div>Your order {pageState.orderId}!</div>
      )}
      {pageState.status === 'ERROR' && <div>Error</div>}
    </LayoutCheckout>
  )
}

export default CheckoutSuccessTemplate
