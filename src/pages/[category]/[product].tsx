import { GetStaticPaths, GetStaticProps } from 'next'

import getCMS from 'services/CMS/getCMS'
import ProductTemplate from 'components/templates/ProductTemplate'

export const getStaticPaths: GetStaticPaths = async () => {
  const CMS = getCMS()

  const products = await CMS.getAllProducts({})

  return {
    paths: products.map((product) => `/${product.category.uid}/${product.uid}`),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const CMS = getCMS()

  const ref = previewData ? previewData.ref : undefined

  const [config, product] = await Promise.all([
    CMS.getConfig({ ref }),
    CMS.getProductByUID({
      uid: params?.product as string,
      ref,
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

export default ProductTemplate
