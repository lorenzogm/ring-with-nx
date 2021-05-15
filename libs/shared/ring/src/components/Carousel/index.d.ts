import { ImageProps } from '@ring/components/Image'
import { FC } from 'react'

export type CarouselProps = {
  Image: FC<ImageProps>
  items: {
    image: ImageProps
  }[]
}

export type CarouselParsed = Omit<CarouselProps, 'Image'> & {
  type: 'carousel'
}
