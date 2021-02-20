import { MouseEvent, ReactElement } from 'react'
import { MutationStatus } from 'react-query'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconArrowForward from '@material-ui/icons/ArrowForward'

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

export default function CheckoutConfirmationTemplate({
  config,
  onConfirm,
  pageState,
}: CheckoutConfirmationTemplateProps): ReactElement {
  return (
    <LayoutCheckout config={config} activeStep={2}>
      <Grid container justify="center">
        <Grid item>
          {pageState.status === 'idle' && (
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirm}
              endIcon={<IconArrowForward />}
            >
              Confirmar pedido
            </Button>
          )}
          {pageState.status === 'loading' && <div>Loading...</div>}
          {pageState.status === 'success' && <div>Success!</div>}
          {pageState.status === 'error' && <div>Error</div>}
        </Grid>
      </Grid>
    </LayoutCheckout>
  )
}
