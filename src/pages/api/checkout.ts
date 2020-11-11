/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextApiRequest, NextApiResponse } from 'next'
import getCMS from 'services/CMS/getCMS'
import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
import Stripe from 'stripe'

const { STRIPE_API_SECRET } = process.env
if (!STRIPE_API_SECRET) {
  throw new Error('Undefined "STRIPE_API_SECRET"')
}

const stripe = new Stripe(STRIPE_API_SECRET, { apiVersion: '2020-08-27' })

export default async function checkout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.headers.origin) {
    throw new Error('Undefined "req.headers.origin')
  }
  try {
    const CMS = getCMS()
    const productsSku = await CMS.getAllProductsSku()

    const { cartDetails } = JSON.parse(req.body)

    const lineItems = validateCartItems(productsSku, cartDetails)

    const delivery = {
      name: 'Gastos de envío',
      amount: 650,
      currency: 'EUR',
      quantity: 1,
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['ES'],
      },
      success_url: `${req.headers.origin}`,
      cancel_url: `${req.headers.origin}`,
      line_items: [...lineItems, delivery],
    })

    res.status(200).json({ sessionId: session.id })
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(500).json({ message: e.raw.message })
  }
}
