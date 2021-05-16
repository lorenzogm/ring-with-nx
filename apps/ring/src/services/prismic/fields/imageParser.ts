import { ImageParsed } from '@ring/components/Image'

type ImagePrismic = {
  xs: ImagePrismicItem
  sm: ImagePrismicItem
  md: ImagePrismicItem
  lg: ImagePrismicItem
} & ImagePrismicItem

type ImagePrismicItem = {
  url: string
  alt: string
  dimensions: {
    width: number
    height: number
  }
}

export default function imageParser(image: ImagePrismic): ImageParsed {
  return {
    xs: {
      src: image.xs.url,
      alt: image.xs.alt,
      width: image.xs.dimensions.width,
      height: image.xs.dimensions.height,
    },
    sm: {
      src: image.sm.url,
      alt: image.sm.alt,
      width: image.sm.dimensions.width,
      height: image.sm.dimensions.height,
    },
    md: {
      src: image.md.url,
      alt: image.md.alt,
      width: image.md.dimensions.width,
      height: image.md.dimensions.height,
    },
    lg: {
      src: image.lg.url,
      alt: image.lg.alt,
      width: image.lg.dimensions.width,
      height: image.lg.dimensions.height,
    },
    xl: {
      src: image.url,
      alt: image.alt,
      width: image.dimensions.width,
      height: image.dimensions.height,
    },
  }
}
