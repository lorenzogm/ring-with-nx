import { GridParsed } from '@ring/components/Grid'
import { Company } from './company'

export type Config = {
  siteName: string
  isMaintenanceEnabled: boolean
  header: Slice[]
  footer: Slice[]
  currency: string
  navigation: Navigation[]
  company: Company
  emails: Emails
  instagramUrl?: string
  facebookUrl?: string
  paymentMethods: PaymentMethods
  shipping: Shipping
  seo: SEO
}

export type Navigation = {
  type: string
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

type SEO = {
  title: string
  description: string
  favicon: { url: string }
  ogImage: string
}
