import { TitleParsed } from '../Title'

export type ShopLocationProps = {
  image: Image
  logo: Image
  address: TitleParsed
  email: TitleParsed
  phoneNumber: TitleParsed
}

export type ShopLocationParsed = ShopLocationProps & {
  type: 'shopLocation'
}
