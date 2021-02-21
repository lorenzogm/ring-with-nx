import type { CartDetails } from 'use-shopping-cart'
import type { Address } from 'types/address'
import type { PaymentMethods } from 'types/paymentMethods'
import type { Order } from 'types/order'

type CreateOrder = {
  cartDetails: CartDetails
  totalPrice: number
}

export default async function createOrder({
  cartDetails,
  totalPrice,
}: CreateOrder): Promise<Order> {
  const addressFromLocalStorage = localStorage.getItem('address')

  if (!addressFromLocalStorage) {
    throw new Error('Undefined "address" in local storage.')
  }

  const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
  if (!paymentMethodFromLocalStorage) {
    throw new Error('Undefined "paymentMethod" in local storage.')
  }

  const address: Address = JSON.parse(addressFromLocalStorage)
  const paymentMethod = paymentMethodFromLocalStorage as PaymentMethods

  const res = await fetch('/api/order/createOrder', {
    method: 'POST',
    body: JSON.stringify({
      address,
      cartDetails,
      paymentMethod,
      totalPrice,
    }),
  })

  const order = (await res.json()) as Order

  localStorage.setItem('orderId', order.orderId)

  return order
}
