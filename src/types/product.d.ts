import { Category } from './category'

type Image = {
  url: string
}

type Color = {
  color: string
  image: Image
}

type Size = {
  size: string
}

export type Product = {
  slug: string
  name: string
  image: string
  price: string
  description: string
  colors: Color[]
  sizes: Size[]
  category: Category
}
