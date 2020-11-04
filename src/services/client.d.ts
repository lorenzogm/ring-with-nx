import { Category } from 'types/category'
import { Config } from 'types/config'
import { Product } from 'types/product'

type CMS = {
  // category
  getAllCategories: () => Promise<Category[]>
  getCategoryByUID: ({ uid }: { uid: string }) => Promise<Category>

  // config
  getConfig: () => Promise<Config>

  // product
  getAllProducts: ({
    currency,
  }: {
    currency: Config['currency']
  }) => Promise<Product[]>
  getAllProductsByTags: ({
    tags,
    config,
  }: {
    tags: string[]
    config: Config
  }) => Promise<Product[]>
  getProductByUID: ({
    uid,
    currency,
  }: {
    uid: string
    currency: Config['currency']
  }) => Promise<Product>
}
