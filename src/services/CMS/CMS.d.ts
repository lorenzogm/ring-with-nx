import { GetAllBlogPostEntries } from './blogPost'
import type { GetAllCategories, GetCategoryByUID } from './category'
import type { GetConfig } from './config'
import type { GetAllContents, GetContentByUID } from './content'
import type {
  GetAllProducts,
  GetAllProductsByCategory,
  GetAllProductsByTags,
  GetAllProductsSku,
  GetProductByUID,
} from './product'
import type { GetTranslations } from './translations'

type CMS = {
  // blogPost
  getAllBlogPostEntries: GetAllBlogPostEntries

  // category
  getAllCategories: GetAllCategories
  getCategoryByUID: GetCategoryByUID

  // config
  getConfig: GetConfig

  // content
  getAllContents: GetAllContents
  getContentByUID: GetContentByUID

  // product
  getAllProducts: GetAllProducts
  getAllProductsByCategory: GetAllProductsByCategory
  getAllProductsByTags: GetAllProductsByTags
  getAllProductsSku: GetAllProductsSku
  getProductByUID: GetProductByUID

  // translations
  getTranslations: GetTranslations
}
