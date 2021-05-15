import { ImageParsed } from '@ring/components/Image'

type ImagePrismic = {
  url: string
  alt: string
  dimensions: {
    width: number
    height: number
  }
}

export default function imageParser(image: ImagePrismic): ImageParsed {
  return {
    src: image.url,
    alt: image.alt,
    width: image.dimensions.width,
    height: image.dimensions.height,
  }
}
