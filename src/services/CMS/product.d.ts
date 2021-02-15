import type { Product } from 'types/product'

// getAllProducts
export type GetAllProducts = ({ ref }: { ref?: string }) => Promise<Product[]>
export type GetAllProductsSku = ({
  ref,
}: {
  ref?: string
}) => Promise<ProductSku[]>

// getAllProductsByCategory
export type GetAllProductsByCategory = ({
  category,
  ref,
}: {
  category: string
  ref?: string
}) => Promise<Product[]>

// getAllProductsByTags
export type GetAllProductsByTags = ({
  tags,
  ref,
}: {
  tags: string[]
  ref?: string
}) => Promise<Product[]>

// getProductByUID
export type GetProductByUID = ({
  uid,
  ref,
}: {
  uid: string
  ref?: string
}) => Promise<Product>
