// category
import getAllCategories from './customTypes/category/getAllCategories'
import getCategoryByUID from './customTypes/category/getCategoryByUID'

// config
import getConfig from './customTypes/config/getConfig'

// product
import getAllProducts from './customTypes/product/getAllProducts'
import getAllProductsByTags from './customTypes/product/getAllProductsByTags'
import getProductByUID from './customTypes/product/getProductByUID'

// translations
import getTranslations from './customTypes/translations/getTranslations'

import client from './client'

export default {
  client,

  // category
  getAllCategories,
  getCategoryByUID,

  // config
  getConfig,

  // product
  getAllProducts,
  getAllProductsByTags,
  getProductByUID,

  // getTranslations
  getTranslations,
}
