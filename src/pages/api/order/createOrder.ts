import { NextApiHandler } from 'next'
import type { CartDetails } from 'use-shopping-cart'

import { db } from 'services/firebase-admin'
import type { Address } from 'types/address'
import type { PaymentMethods } from 'types/paymentMethods'

const createOrder: NextApiHandler = async (req, res) => {
  try {
    const {
      address,
      cartDetails,
      paymentMethod,
    }: {
      address: Address
      cartDetails: CartDetails
      paymentMethod: PaymentMethods
    } = JSON.parse(req.body)

    const order = await db
      .collection('order')
      .add({ address, cartDetails, paymentMethod })

    res.status(200).json({ orderId: order.id })
  } catch (error) {
    res.status(500).json({ message: error.raw.message })
  }
}

export default createOrder
