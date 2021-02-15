// category
import getAllCategories from './customTypes/category/getAllCategories'
import getCategoryByUID from './customTypes/category/getCategoryByUID'

// config
import getConfig from './customTypes/config/getConfig'

// content
import getAllContents from './customTypes/content/getAllContents'
import getContentByUID from './customTypes/content/getContentByUID'

// documents
import getAllDocuments from './documents/getAllDocuments'
import getDocumentByUID from './documents/getDocumentByUID'

// product
import getAllProducts from './customTypes/product/getAllProducts'
import getAllProductsByCategory from './customTypes/product/getAllProductsByCategory'
import getAllProductsByTags from './customTypes/product/getAllProductsByTags'
import getAllProductsSku from './customTypes/product/getAllProductsSku'
import getProductByUID from './customTypes/product/getProductByUID'

// translations
import getTranslations from './customTypes/translations/getTranslations'

export default {
  // category
  getAllCategories,
  getCategoryByUID,

  // config
  getConfig,

  // content
  getAllContents,
  getContentByUID,

  // documents
  getAllDocuments,
  getDocumentByUID,

  // product
  getAllProducts,
  getAllProductsByCategory,
  getAllProductsByTags,
  getProductByUID,
  getAllProductsSku,

  // getTranslations
  getTranslations,
}
