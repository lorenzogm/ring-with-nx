import { FC } from 'react'

import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'
import type { Config } from 'types/config'
import type { CheckoutSuccessPageState } from './checkoutSuccess'

type CheckoutSuccessTemplateProps = {
  config: Config
  pageState: CheckoutSuccessPageState
}

const CheckoutSuccessTemplate: FC<CheckoutSuccessTemplateProps> = ({
  config,
  pageState,
}) => {
  return (
    <PageLayoutCheckout config={config} checkoutStep="SUCCESS">
      {pageState.status === 'LOADING' && <div>Loading...</div>}
      {pageState.status === 'SUCCESS' && (
        <div>Your order {pageState.orderId}!</div>
      )}
      {pageState.status === 'ERROR' && <div>Error</div>}
    </PageLayoutCheckout>
  )
}

export default CheckoutSuccessTemplate
