import { GetStaticPaths, GetStaticProps } from 'next'

import getClient from 'services/getClient'
import ProductTemplate from 'components/templates/ProductTemplate/ProductTemplate'

export default ProductTemplate

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const CMS = getClient()

  const config = await CMS.getConfig()
  const product = await CMS.getProductByUID({
    uid: params?.product as string,
    currency: config.currency,
  })

  return {
    props: {
      preview,
      config,
      product,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const CMS = getClient()

  const config = await CMS.getConfig()
  const products = await CMS.getAllProducts({ currency: config.currency })

  return {
    paths: products.map(
      (product) => `/${product.category.slug}/${product.slug}`,
    ),
    fallback: true,
  }
}
