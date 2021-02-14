import type { Image } from 'types/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ImageParser = ({ image }: { image: any }) => Image

const imageParser: ImageParser = ({ image }) => {
  return {
    url: image.url,
    alt: image.alt,
    width: image.dimensions.width,
    height: image.dimensions.height,
  }
}

export default imageParser
