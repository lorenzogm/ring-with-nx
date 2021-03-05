import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import getCMS from 'services/CMS/getCMS'
import ProductTemplate from 'components/templates/ProductTemplate'
import type { Product } from 'types/product'
import type { Config } from 'types/config'

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

type ProductPageProps = {
  config: Config
  preview: boolean
  product: Product
}

export default function ProductPage({
  config,
  preview,
  product,
}: ProductPageProps): ReactElement | null {
  const router = useRouter()

  if (router.isFallback) {
    return null
  }

  return <ProductTemplate config={config} preview={preview} product={product} />
}
