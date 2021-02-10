import type { CartDetails } from 'use-shopping-cart'
import type { Address } from 'types/address'
import type { PaymentMethods } from 'types/paymentMethods'
import type { Order } from 'types/order'

type CreateOrder = {
  address: Address
  cartDetails: CartDetails
  paymentMethod: PaymentMethods
}

export default async function createOrder({
  address,
  cartDetails,
  paymentMethod,
}: CreateOrder): Promise<Order> {
  const res = await fetch('/api/order/createOrder', {
    method: 'POST',
    body: JSON.stringify({ address, cartDetails, paymentMethod }),
  })

  const order = (await res.json()) as Order

  return order
}
