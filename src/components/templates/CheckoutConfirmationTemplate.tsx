import { FC, MouseEvent } from 'react'
import { MutationStatus } from 'react-query'
import Button from '@material-ui/core/Button'

import type { Config } from 'types/config'
import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'

type CheckoutConfirmationPageState = {
  status: MutationStatus
}

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
    <LayoutCheckout config={config} activeStep={2}>
      {pageState.status === 'idle' && (
        <Button onClick={onConfirm}>
          <a>Confirmar pedido</a>
        </Button>
      )}
      {pageState.status === 'loading' && <div>Loading...</div>}
      {pageState.status === 'success' && <div>Success!</div>}
      {pageState.status === 'error' && <div>Error</div>}
    </LayoutCheckout>
  )
}

export default CheckoutConfirmationTemplate
