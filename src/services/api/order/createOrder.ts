import type { CartDetails } from 'use-shopping-cart'
import type { Address } from 'types/address'
import type { PaymentMethods } from 'types/paymentMethods'
import type { Order } from 'types/order'

type CreateOrder = {
  address: Address
  cartDetails: CartDetails
  totalPrice: number
  paymentMethod: PaymentMethods
}

export default async function createOrder({
  address,
  cartDetails,
  paymentMethod,
  totalPrice,
}: CreateOrder): Promise<Order> {
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

  return order
}
