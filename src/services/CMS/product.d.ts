import type { Product } from 'types/product'

// getAllProducts
export type GetAllProducts = () => Promise<Product[]>
export type GetAllProductsSku = () => Promise<ProductSku[]>

// getAllProductsByCategory
export type GetAllProductsByCategory = ({
  tags,
}: {
  category: string
}) => Promise<Product[]>

// getAllProductsByTags
export type GetAllProductsByTags = ({
  tags,
}: {
  tags: string[]
}) => Promise<Product[]>

// getProductByUID
export type GetProductByUID = ({ uid }: { uid: string }) => Promise<Product>
