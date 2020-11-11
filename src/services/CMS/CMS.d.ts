import type { GetAllCategories, GetCategoryByUID } from 'services/CMS/category'
import type { GetConfig } from 'services/CMS/config'
import type {
  GetAllProducts,
  GetAllProductsByTags,
  GetAllProductsSku,
  GetProductByUID,
} from 'services/CMS/product'
import type { GetTranslations } from 'services/CMS/translations'

type CMS = {
  // category
  getAllCategories: GetAllCategories
  getCategoryByUID: GetCategoryByUID

  // config
  getConfig: GetConfig

  // product
  getAllProducts: GetAllProducts
  getAllProductsByTags: GetAllProductsByTags
  getAllProductsSku: GetAllProductsSku
  getProductByUID: GetProductByUID

  // translations
  getTranslations: GetTranslations
}
