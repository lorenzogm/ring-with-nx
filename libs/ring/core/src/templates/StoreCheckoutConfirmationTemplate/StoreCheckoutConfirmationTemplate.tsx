import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconArrowBack from '@material-ui/icons/ArrowBack'
import IconArrowForward from '@material-ui/icons/ArrowForward'
import {
  BoxHeader,
  Button,
  Grid,
  Link,
  StoreCartProductList,
  StoreOrderSummary,
  StorePaymentMethods,
  Typography,
  useStoreUserAddress,
} from '@ring/core/index'
import { MouseEvent, ReactElement, useEffect, useReducer } from 'react'
import { MutationStatus } from 'react-query'
import { useShoppingCart } from 'use-shopping-cart'

type CheckoutConfirmationTemplateProps = {
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void
  onConfirmStatus: MutationStatus
}

export function StoreCheckoutConfirmationTemplate({
  onConfirm,
  onConfirmStatus,
}: CheckoutConfirmationTemplateProps): ReactElement | null {
  const { status: addressStatus, address } = useStoreUserAddress()
  const { totalPrice } = useShoppingCart()

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
      paymentMethod:
        paymentMethodFromLocalStorage as unknown as StorePaymentMethods,
    })
  }, [])

  if (addressStatus === 'LOADING' || state.status === 'LOADING') {
    return null
  }

  if (totalPrice === 0) {
    return (
      <>
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography>
            Pues ya no tienes ningún artículo en tu cesta de la compra...
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center">
          <Link href="/">
            <Button startIcon={<IconArrowBack />}>Volver a la tienda</Button>
          </Link>
        </Box>
      </>
    )
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8}>
        <BoxHeader>Pedido</BoxHeader>
        <StoreCartProductList />
      </Grid>
      <Grid item xs={12} md={4}>
        <BoxHeader>Dirección de envío</BoxHeader>
        <Box mb={4}>
          <Typography>
            {address.firstName} {address.lastName}
          </Typography>
          <Typography>
            {address.address}
            {address.addressMoreInfo}
          </Typography>
          <Typography>
            {address.postcode} {address.city}
          </Typography>
          <Typography>{address.country}</Typography>
        </Box>
        <BoxHeader>Forma de pago</BoxHeader>
        <Box mb={4}>
          <Typography>
            {state.paymentMethod === 'WIRE_TRANSFER' &&
              'Transferencia bancaria'}
          </Typography>
        </Box>
        <StoreOrderSummary />
        <Button
          disabled={onConfirmStatus === 'loading'}
          type="submit"
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
  )
}

type State = {
  status: 'LOADING' | 'SUCCESS'
  paymentMethod?: StorePaymentMethods
}

type Action = {
  type: 'UPDATE_PAYMENT_METHOD'
  paymentMethod: StorePaymentMethods
}

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
