import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { ReactElement } from 'react'

import PageLayout from 'components/foundations/PageLayout/PageLayout'
import ProductTile, {
  ProductTileImage,
  ProductTileName,
  ProductTilePrice,
} from 'components/elements/ProductTile/ProductTile'
import type { Config } from 'types/config'
import type { Category } from 'types/category'
import type { Product } from 'types/product'

type CategoryTemplateProps = {
  config: Config
  category: Category
  products: Product[]
}

export default function CategoryTemplate({
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
    <PageLayout config={config}>
      {router.isFallback ? null : (
        <>
          <article>
            <Head>
              <title>
                {category.name} | {config.siteName}
              </title>
            </Head>

            <section className="bg-white py-8">
              <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                {products.map((product) => (
                  <ProductTile
                    key={product.name}
                    product={product}
                    category={category}
                  >
                    <ProductTileImage />
                    <ProductTileName />
                    <ProductTilePrice currency={config.currency} />
                  </ProductTile>
                ))}
              </div>
            </section>
          </article>
        </>
      )}
    </PageLayout>
  )
}
