import { ImageProps, ImageParsed } from '../Image'
import { TitleParsed } from '../Title'

export type CallToActionProps = {
  Image?: ImageProps['as']
  image: ImageParsed
  title: TitleParsed
}

export type CallToActionParsed = CallToActionProps & {
  type: 'callToAction'
}
