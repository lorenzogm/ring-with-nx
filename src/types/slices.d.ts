import { Image } from './image'

type Slice = SliceCarousel | SliceImage

type SliceCarousel = {
  sliceType: 'carousel'
  items: {
    image: Image
    text: string
    buttonText: string
    buttonLink: string
  }[]
}

type SliceImage = {
  sliceType: 'image'
  image: Image
}
