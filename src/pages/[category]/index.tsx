import { GetStaticPaths, GetStaticProps } from 'next'

import CategoryTemplate from 'components/templates/CategoryTemplate/CategoryTemplate'
import getCMS from 'services/CMS/getCMS'

export default CategoryTemplate

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const CMS = getCMS()

  const [config, category] = await Promise.all([
    CMS.getConfig(),
    CMS.getCategoryByUID({
      uid: params?.category as string,
    }),
  ])

  if (!config) {
    throw new Error(`Undefined "config" document. Please define it in the CMS`)
  }

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
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const CMS = getCMS()
  const categories = await CMS.getAllCategories()

  return {
    paths: categories.map((category) => `/${category.slug}`),
    fallback: true,
  }
}
