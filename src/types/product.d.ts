import { RichTextBlock } from 'prismic-reactjs'

import { Category } from './category'
import { Image } from './image'

export type Product = {
  uid: string
  name: string
  type: string
  imageDefault: Image
  colorDefault?: string
  price: number
  description?: RichTextBlock[]
  colors?: Color[]
  sizes?: Size[]
  category: Category
}

export type ProductSku = {
  name: string
  sku: string
  price: number
  image: string
  currency: string
}

type Color = {
  color: string
  image: Image
}

type Size = {
  label: string
  value: string
}
