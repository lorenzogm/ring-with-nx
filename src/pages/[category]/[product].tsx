import { GetStaticPaths, GetStaticProps } from 'next'

import getCMS from 'services/CMS/getCMS'
import ProductTemplate from 'components/templates/ProductTemplate/ProductTemplate'

export default ProductTemplate

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const CMS = getCMS()

  const [config, product] = await Promise.all([
    CMS.getConfig(),
    CMS.getProductByUID({
      uid: params?.product as string,
    }),
  ])

  return {
    props: {
      preview,
      config,
      product,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const CMS = getCMS()

  const products = await CMS.getAllProducts()

  return {
    paths: products.map(
      (product) => `/${product.category.slug}/${product.slug}`,
    ),
    fallback: true,
  }
}
