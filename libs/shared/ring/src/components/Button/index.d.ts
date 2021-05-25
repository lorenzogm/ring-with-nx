import { ImageParsed, ImageProps } from '@ring/components/Image'

export type CarouselProps = {
  Image?: ImageProps['as']
  items: {
    image: ImageParsed
  }[]
}

export type CarouselParsed = Omit<CarouselProps, 'Image'> & {
  type: 'carousel'
}
