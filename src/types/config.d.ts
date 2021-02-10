export type Config = {
  siteName: string
  logo: string
  currency: string
  navigation: Navigation[]
  instagramUrl?: string
  facebookUrl?: string
  isPaymentMethodWireTransferEnabled: boolean
  isPaymentMethodBizumEnabled: boolean
  isPaymentMethodCreditCardEnabled: boolean
}

export type Navigation = {
  slug: string
  name: string
  description: string
  image: string
}
