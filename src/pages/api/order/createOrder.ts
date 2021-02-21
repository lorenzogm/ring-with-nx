import { NextApiHandler } from 'next'
import { CartDetails, formatCurrencyString } from 'use-shopping-cart'
import { SendSmtpEmail } from 'sib-api-v3-typescript'

import { db } from 'services/firebase-admin'
import type { Address } from 'types/address'
import type { PaymentMethods } from 'types/paymentMethods'
import { transactionalEmailsApi } from 'services/sendinblue'
import getCMS from 'services/CMS/getCMS'

const createOrder: NextApiHandler = async (req, res) => {
  try {
    const {
      address,
      cartDetails,
      paymentMethod,
      totalPrice,
    }: {
      address: Address
      cartDetails: CartDetails
      paymentMethod: PaymentMethods
      totalPrice: number
    } = JSON.parse(req.body)

    const CMS = getCMS()
    const config = await CMS.getConfig({})

    const subtotal = totalPrice
    const shipping =
      subtotal >= config.shipping.freeAmount ? 0 : config.shipping.costs
    const total = subtotal + shipping

    if (
      paymentMethod === 'WIRE_TRANSFER' &&
      config.paymentMethods.wireTransfer.isEnabled === false
    ) {
      res.status(401).json({
        message: `Invalid payment method. "${paymentMethod}" is not enabled `,
      })

      return
    }

    const payment = {
      subtotal: formatCurrencyString({
        value: subtotal,
        currency: config.currency,
      }),
      shipping:
        shipping === 0
          ? 'Gratis'
          : formatCurrencyString({
              value: shipping,
              currency: config.currency,
            }),
      total: formatCurrencyString({
        value: total,
        currency: config.currency,
      }),
    }

    const date = new Date()
    const dateString = date.toLocaleString()

    const order = await db
      .collection('order')
      .add({ address, cartDetails, paymentMethod, payment, date: dateString })

    const params: OrderConfirmationEmail = {
      companyName: config.company.name,
      companyEmail: config.company.email,
      companyAddress: config.company.address,
      companyPostCode: config.company.postcode,
      companyCity: config.company.city,
      companyCountry: config.company.country,
      companyAccountHolder: config.paymentMethods.wireTransfer.accountHolder,
      companyIBAN: config.paymentMethods.wireTransfer.IBAN,
      customerFirstName: address.firstName,
      customerLastName: address.lastName,
      customerAddress: address.address,
      customerAddressMoreInfo: address.addressMoreInfo,
      customerPostCode: address.postcode,
      customerCity: address.city,
      customerCountry: address.country,
      orderDate: dateString,
      orderSubtotal: payment.subtotal,
      orderShipping: payment.shipping,
      orderTotal: payment.total,
      orderPaymentMethod: paymentMethod,
      products: Object.values(cartDetails).map((product) => ({
        name: product.name,
        image: product.image as string,
        url: '',
        price: product.formattedValue,
        color: product.color as string,
        size: product.size as string,
      })),
      year: date.getFullYear(),
    }

    let sendSmtpEmail = new SendSmtpEmail()
    sendSmtpEmail = {
      to: [
        {
          email: address.email,
          name: `${address.firstName} ${address.lastName}`,
        },
        {
          email: config.company.email,
          name: config.company.name,
        },
      ],
      templateId: 2,
      params,
    }

    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail)

    res.status(200).json({ orderId: order.id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default createOrder

type OrderConfirmationEmail = {
  companyName: string
  companyEmail: string
  companyAddress: string
  companyPostCode: string
  companyCity: string
  companyCountry: string
  companyAccountHolder?: string
  companyIBAN?: string
  customerFirstName: string
  customerLastName: string
  customerAddress: string
  customerAddressMoreInfo: string
  customerPostCode: string
  customerCity: string
  customerCountry: string
  orderPaymentMethod: string
  orderSubtotal: string
  orderShipping: string
  orderTotal: string
  orderDate: string
  products: {
    name: string
    image: string
    url: string
    color: string
    size: string
  }[]
  year: number
}
