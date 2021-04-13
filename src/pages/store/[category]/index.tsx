import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import CategoryTemplate from 'components/templates/CategoryTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Category } from 'types/category'
import type { Config } from 'types/config'
import type { Product } from 'types/product'

const { CONFIG_STORE } = process.env

export const getStaticPaths: GetStaticPaths = async () => {
  if (CONFIG_STORE !== 'ENABLED') {
    return {
      paths: [],
      fallback: false,
    }
  }

  const CMS = getCMS()
  const categories = await CMS.getAllCategories({})

  return {
    paths: categories.map((category) => `/store/${category.uid}`),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  if (CONFIG_STORE !== 'ENABLED') {
    return {
      props: {
        isPageEnabled: false,
      },
    }
  }

  const CMS = getCMS()
  const ref = previewData ? previewData.ref : undefined

  const [config, category] = await Promise.all([
    CMS.getConfig({ ref }),
    CMS.getCategoryByUID({
      uid: params?.category as string,
      ref,
    }),
  ])

  if (!category) {
    throw new Error(`Undefined category "${params?.category as string}"`)
  }

  const products = await CMS.getAllProductsByCategory({
    category: category.id,
  })

  return {
    props: {
      preview,
      config,
      category,
      products,
    },
    revalidate: 1,
  }
}

type CategoryPageProps = {
  category: Category
  config: Config
  preview: boolean
  products: Product[]
}

export default function CategoryPage({
  category,
  config,
  preview,
  products,
}: CategoryPageProps): ReactElement | null {
  const router = useRouter()

  if (router.isFallback) {
    return null
  }

  return (
    <CategoryTemplate
      category={category}
      config={config}
      preview={preview}
      products={products}
    />
  )
}
