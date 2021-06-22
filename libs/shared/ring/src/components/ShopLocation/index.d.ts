import { ImageProps, ImageParsed } from '../Image'
import { TitleParsed } from '../Title'

export type ShopLocationProps = {
  Image?: ImageProps['as']
  image: ImageParsed
  logo: Image
  address: TitleParsed
  email: TitleParsed
  phoneNumber: TitleParsed
  link: string
}

export type ShopLocationParsed = ShopLocationProps & {
  type: 'shopLocation'
}
