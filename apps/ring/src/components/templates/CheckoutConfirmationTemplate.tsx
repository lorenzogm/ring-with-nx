import { MouseEvent, ReactElement, useEffect, useReducer } from 'react'
import { MutationStatus } from 'react-query'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconArrowForward from '@material-ui/icons/ArrowForward'
import CircularProgress from '@material-ui/core/CircularProgress'

import type { Config } from 'types/config'
import type { PaymentMethods } from 'types/paymentMethods'
import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import BoxHeader from '@ring/ui/BoxHeader'
import CartProductList from 'components/modules/CartProductList'
import OrderSummary from 'components/modules/OrderSummary'
import useUserAddress from 'hooks/useUserAddress'

type CheckoutConfirmationTemplateProps = {
  config: Config
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void
  onConfirmStatus: MutationStatus
}

export default function CheckoutConfirmationTemplate({
  config,
  onConfirm,
  onConfirmStatus,
}: CheckoutConfirmationTemplateProps): ReactElement | null {
  const { status: addressStatus, address } = useUserAddress()

  const [state, dispatch] = useReducer(reducer, {
    status: 'LOADING',
  })

  useEffect(() => {
    const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')

    if (!paymentMethodFromLocalStorage) {
      throw new Error(
        'Undefined "paymentMethod" in localStorage, but it should be defined.',
      )
    }

    dispatch({
      type: 'UPDATE_PAYMENT_METHOD',
      paymentMethod: (paymentMethodFromLocalStorage as unknown) as PaymentMethods,
    })
  }, [])

  if (addressStatus === 'LOADING' || state.status === 'LOADING') {
    return null
  }

  return (
    <LayoutCheckout config={config} activeStep={2}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={10} md={6}>
          <BoxHeader>Pedido</BoxHeader>
          <CartProductList />
        </Grid>
        <Grid item xs={10} md={4}>
          <BoxHeader>Dirección de envío</BoxHeader>
          <Box mb={4}>
            <Typography style={{ width: '100%' }}>
              {address.firstName} {address.lastName}
            </Typography>
            <Typography style={{ width: '100%' }}>
              {address.address}
              {address.addressMoreInfo}
            </Typography>
            <Typography style={{ width: '100%' }}>
              {address.postcode} {address.city}
            </Typography>
            <Typography style={{ width: '100%' }}>{address.country}</Typography>
          </Box>
          <BoxHeader>Forma de pago</BoxHeader>
          <Box mb={4}>
            <Typography>
              {state.paymentMethod === 'WIRE_TRANSFER' &&
                'Transferencia bancaria'}
            </Typography>
          </Box>
          <OrderSummary config={config} />
          <Button
            disabled={onConfirmStatus === 'loading'}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={
              onConfirmStatus === 'loading' ? (
                <CircularProgress color="secondary" size="1rem" />
              ) : undefined
            }
            endIcon={<IconArrowForward />}
            onClick={onConfirm}
            fullWidth
          >
            <a>Finalizar pedido</a>
          </Button>
        </Grid>
      </Grid>
    </LayoutCheckout>
  )
}

type State = {
  status: 'LOADING' | 'SUCCESS'
  paymentMethod?: PaymentMethods
}

type Action = { type: 'UPDATE_PAYMENT_METHOD'; paymentMethod: PaymentMethods }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.paymentMethod,
        status: 'SUCCESS',
      }

    default:
      return state
  }
}
