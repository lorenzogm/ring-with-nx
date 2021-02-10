import { NextApiHandler } from 'next'
import Stripe from 'stripe'
import { validateCartItems } from 'use-shopping-cart/src/serverUtil'

import getCMS from 'services/CMS/getCMS'

const { STRIPE_API_SECRET } = process.env
if (!STRIPE_API_SECRET) {
  throw new Error('Undefined "STRIPE_API_SECRET"')
}

const stripe = new Stripe(STRIPE_API_SECRET, { apiVersion: '2020-08-27' })

const checkout: NextApiHandler = async (req, res) => {
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
    res.status(500).json({ message: e.raw.message })
  }
}

export default checkout
