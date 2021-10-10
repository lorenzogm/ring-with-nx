import {
  firestore,
  StorePaymentMethods,
  StoreUserAddress,
  transactionalEmailsApi,
} from '@ring/core/index'
import { GlobalConfigStoryblok, Storyblok } from '@ring/storyblok/index'
import { SendSmtpEmail } from '@sendinblue/client'
import { NextApiHandler } from 'next'
import { CartDetails, formatCurrencyString } from 'use-shopping-cart'
import * as yup from 'yup'

const schema = yup.object().shape({
  storeShippingFreeAmount: yup.number().required().positive().integer(),
  storeShippingCosts: yup.number().required().positive().integer(),
  storeCurrency: yup.string().required(),
  storeCompanyName: yup.string().required(),
  storeCompanyEmail: yup.string().required().email(),
  storeCompanyAddress: yup.string().required(),
  storeCompanyPostcode: yup.string().required(),
  storeCompanyCity: yup.string().required(),
  storeCompanyCountry: yup.string().required(),
  storeCompanyIBANAccountHolder: yup.string().required(),
  storeCompanyIBAN: yup.string().required(),
})

const createOrder: NextApiHandler = async (req, res) => {
  const {
    address,
    cartDetails,
    paymentMethod,
    totalPrice,
  }: {
    address: StoreUserAddress
    cartDetails: CartDetails
    paymentMethod: StorePaymentMethods
    totalPrice: number
  } = JSON.parse(req.body)

  const sbParams = {
    version: 'draft', // or 'draft'
    language: 'es',
  }
  // @ts-expect-error missing generic
  const config: GlobalConfigStoryblok = await Storyblok.get(
    `cdn/stories/global/config`,
    sbParams,
  )

  await schema.isValid(config).catch((error) => {
    res.status(500).json(error)
  })

  const subtotal = totalPrice
  const shipping =
    subtotal >= config.storeShippingFreeAmount
      ? 0
      : (config.storeShippingCosts as number)
  const total = subtotal + shipping

  const payment = {
    subtotal: formatCurrencyString({
      value: subtotal,
      currency: config.storeCurrency,
    }),
    shipping:
      shipping === 0
        ? 'Gratis'
        : formatCurrencyString({
            value: shipping,
            currency: config.storeCurrency,
          }),
    total: formatCurrencyString({
      value: total,
      currency: config.storeCurrency,
    }),
  }

  const date = new Date()
  const dateString = date.toLocaleString()

  const order = await firestore
    .collection('order')
    .add({ address, cartDetails, paymentMethod, payment, date: dateString })

  const params: OrderConfirmationEmail = {
    companyName: config.storeCompanyName,
    companyEmail: config.storeCompanyEmail,
    companyAddress: config.storeCompanyAddress,
    companyPostCode: config.storeCompanyPostcode,
    companyCity: config.storeCompanyCity,
    companyCountry: config.storeCompanyCountry,
    companyAccountHolder: config.storeCompanyIBANAccountHolder,
    companyIBAN: config.storeCompanyIBAN,
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
    orderPaymentMethod:
      paymentMethod === 'WIRE_TRANSFER' ? 'Transferencia bancaria' : '',
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
      ...(config.company.email
        ? [
            {
              email: config.company.email,
              name: config.company.name,
            },
          ]
        : []),
    ],
    templateId: config.emails.orderConfirmationTemplateId,
    params,
  }

  const r = await transactionalEmailsApi
    .sendTransacEmail(sendSmtpEmail)
    .catch(() => {
      res.status(500).json({
        message: `Unexpected error when sending the transactional email with Sendinblue`,
      })
    })

  if (!r) {
    return
  }

  res.status(200).json({ orderId: order.id })
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
