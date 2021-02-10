import { FC, MouseEvent } from 'react'

import type { Config } from 'types/config'
import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'
import Button from 'components/foundations/Button/Button'
import type { CheckoutConfirmationPageState } from './checkoutConfirmation'

type CheckoutConfirmationTemplateProps = {
  config: Config
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void
  pageState: CheckoutConfirmationPageState
}

const CheckoutConfirmationTemplate: FC<CheckoutConfirmationTemplateProps> = ({
  config,
  onConfirm,
  pageState,
}) => {
  return (
    <PageLayoutCheckout config={config} checkoutStep="CONFIRMATION">
      {pageState.status === 'idle' && (
        <Button variant="primary" onClick={onConfirm}>
          <a>Confirmar pedido</a>
        </Button>
      )}
      {pageState.status === 'loading' && <div>Loading...</div>}
      {pageState.status === 'success' && <div>Success!</div>}
      {pageState.status === 'error' && <div>Error</div>}
    </PageLayoutCheckout>
  )
}

export default CheckoutConfirmationTemplate
