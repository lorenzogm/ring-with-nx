import { GetStaticPaths, GetStaticProps } from 'next'

import CategoryTemplate from 'components/templates/CategoryTemplate/CategoryTemplate'
import getCMS from 'services/CMS/getCMS'

export const getStaticPaths: GetStaticPaths = async () => {
  const CMS = getCMS()
  const categories = await CMS.getAllCategories({})

  return {
    paths: categories.map((category) => `/${category.uid}`),
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
  }
}

export default CategoryTemplate
