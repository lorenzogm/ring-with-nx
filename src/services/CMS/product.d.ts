import { Category } from './category'

export type Product = {
  slug: string
  name: string
  imageDefault: string
  colorDefault: string
  price: number
  description: string
  colors: Color[]
  sizes: Size[]
  category: Category
}

type Image = {
  url: string
}

type Color = {
  color: string
  image: Image
}

type Size = {
  label: string
  value: string
}

// getAllProducts
export type GetAllProducts = () => GetAllProductsReturn
export type GetAllProductsReturn = Promise<Product[]>

// getAllProductsByTags
export type GetAllProductsByTags = ({
  tags,
}: GetAllProductsByTagsProps) => GetAllProductsByTagsReturn
export type GetAllProductsByTagsProps = {
  tags: string[]
}
export type GetAllProductsByTagsReturn = Promise<Product[]>

// getProductByUID
export type GetProductByUID = ({
  uid,
}: GetProductByUIDProps) => GetProductByUIDReturn
export type GetProductByUIDProps = {
  uid: string
}
export type GetProductByUIDReturn = Promise<Product>
