import { Image } from './image'
import { Product } from './product'

type Slice = SliceCarousel | SliceImage | SliceListOfProducts

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

type SliceListOfProducts = {
  sliceType: 'list_of_products'
  title: string
  items: Product[]
}
