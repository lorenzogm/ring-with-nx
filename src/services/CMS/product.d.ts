import { Category } from './category'

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

// getAllProducts
export type GetAllProducts = ({
  currency,
}: GetAllProductsProps) => GetAllProductsReturn
export type GetAllProductsProps = {
  currency: Config['currency']
}
export type GetAllProductsReturn = Promise<Product[]>

// getAllProductsByTags
export type GetAllProductsByTags = ({
  tags,
  config,
}: GetAllProductsByTagsProps) => GetAllProductsByTagsReturn
export type GetAllProductsByTagsProps = {
  tags: string[]
  config: Config
}
export type GetAllProductsByTagsReturn = Promise<Product[]>

// getProductByUID
export type GetProductByUID = ({
  uid,
  currency,
}: GetProductByUIDProps) => GetProductByUIDReturn
export type GetProductByUIDProps = {
  uid: string
  currency: Config['currency']
}
export type GetProductByUIDReturn = Promise<Product>
