import { GetStaticPaths, GetStaticProps } from 'next'

import CategoryTemplate from 'components/templates/CategoryTemplate/CategoryTemplate'
import getClient from 'services/getClient'

export default CategoryTemplate

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const CMS = getClient()

  const config = await CMS.getConfig()
  const category = await CMS.getCategoryByUID({
    uid: params?.category as string,
  })

  if (!category) {
    throw new Error(`Undefined category "${params?.category as string}"`)
  }

  const products = await CMS.getAllProductsByTags({
    tags: category.tags,
    config,
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
  const CMS = getClient()
  const categories = await CMS.getAllCategories()

  return {
    paths: categories.map((category) => `/${category.slug}`),
    fallback: true,
  }
}
