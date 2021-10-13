import {
  StoreOrder,
  StorePaymentMethods,
  StoreUserAddress,
} from 'libs/ring/store/src/types'
import type { CartDetails } from 'use-shopping-cart'

type CreateOrder = {
  cartDetails: CartDetails
  totalPrice: number
}

export async function orderCreate({
  cartDetails,
  totalPrice,
}: CreateOrder): Promise<StoreOrder> {
  const addressFromLocalStorage = localStorage.getItem('address')

  if (!addressFromLocalStorage) {
    throw new Error('Undefined "address" in local storage.')
  }

  const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
  if (!paymentMethodFromLocalStorage) {
    throw new Error('Undefined "paymentMethod" in local storage.')
  }

  const address: StoreUserAddress = JSON.parse(addressFromLocalStorage)
  const paymentMethod = paymentMethodFromLocalStorage as StorePaymentMethods

  const response = await fetch('/api/store/order-create', {
    method: 'POST',
    body: JSON.stringify({
      address,
      cartDetails,
      paymentMethod,
      totalPrice,
    }),
  })

  if (!response.ok) {
    const { message } = await response.json()
    throw new Error(message)
  }

  const order = (await response.json()) as StoreOrder

  localStorage.setItem('orderId', order.orderId)

  return order
}
