import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { ReactElement } from 'react'

import PageLayout from 'components/layouts/LayoutDefault/LayoutDefault'
import type { Config } from 'types/config'
import type { Category } from 'types/category'
import type { Product } from 'types/product'
import ProductList from 'components/molecules/ProductList'

type CategoryTemplateProps = {
  preview: boolean
  config: Config
  category: Category
  products: Product[]
}

export default function CategoryTemplate({
  preview,
  config,
  category,
  products,
}: CategoryTemplateProps): ReactElement | null {
  const router = useRouter()

  if (!config || !category || !products) {
    return null
  }

  if (!router.isFallback && !category) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <PageLayout preview={preview} config={config}>
      {router.isFallback ? null : (
        <>
          <article>
            <Head>
              <title>
                {category.name} | {config.siteName}
              </title>
            </Head>

            <section className="bg-white py-8">
              <ProductList config={config} products={products} />
            </section>
          </article>
        </>
      )}
    </PageLayout>
  )
}
