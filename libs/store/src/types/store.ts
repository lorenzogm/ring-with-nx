export type StoreUserAddress = {
  email: string
  firstName: string
  lastName: string
  address: string
  addressMoreInfo: string
  postcode: string
  city: string
  country: string
}

export type StoreProductColor = {
  color: string
  image: StoreProductImage
}

export type StoreProduct = {
  brand?: string
  colorDefault: string
  colors?: Array<StoreProductColor>
  imageDefault: StoreProductImage
  name: string
  price: number
  type?: 'CLOTHES_BABIES' | 'CLOTHES_BIGS' | 'CLOTHES_KIDS'
}

export type StoreProductImage = {
  src: string
  alt?: string
}

export type StoreOrder = {
  orderId: string
}

export type StorePaymentMethods = 'WIRE_TRANSFER' | 'BIZUM' | 'CREDIT_CARD'
