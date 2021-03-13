import { Company } from './company'

export type Config = {
  siteName: string
  isMaintenanceEnabled: boolean
  logo: Image
  currency: string
  navigation: Navigation[]
  company: Company
  emails: Emails
  instagramUrl?: string
  facebookUrl?: string
  paymentMethods: PaymentMethods
  shipping: Shipping
}

export type Navigation = {
  slug: string
  name: string
  description: string
  image: string
}

type PaymentMethods = {
  wireTransfer: PaymentMethodsWireTransfer
  bizum: PaymentMethodsBizum
  creditCard: PaymentMethodsCreditCard
}

type PaymentMethodsWireTransfer = {
  isEnabled: boolean
  accountHolder: string
  IBAN: string
}

type PaymentMethodsBizum = {
  isEnabled: boolean
}

type PaymentMethodsCreditCard = {
  isEnabled: boolean
}

type Shipping = {
  costs: number
  freeAmount: number
}
