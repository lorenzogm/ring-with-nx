export type CheckoutSuccessPageState = {
  status: 'LOADING' | 'SUCCESS' | 'ERROR'
  orderId?: string
}
