import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import PageLayout from 'components/layouts/LayoutDefault/LayoutDefault'
import type { Config } from 'types/config'
import { Content } from 'types/content'
import { Slice } from 'types/slices'

const Grid = dynamic(() => import('@material-ui/core/Grid'))
const BlogPostLatest = dynamic(() => import('components/slices/BlogPostLatest'))
const Carousel = dynamic(() => import('components/slices/Carousel'))
const Image = dynamic(() => import('components/elements/Image'))
const ProductList = dynamic(() => import('components/slices/ProductList'))
const Teaser = dynamic(() => import('components/slices/Teaser'))

type ContentTemplateProps = {
  preview: boolean
  config: Config
  content: Content
  Layout?: ({ config }: { config: Config; children: ReactNode }) => ReactElement
}

export default function ContentTemplate({
  preview,
  config,
  content,
  Layout,
}: ContentTemplateProps): ReactElement | null {
  const render = (
    <>
      <Head>
        <title>{config.siteName}</title>
      </Head>

      {content.data.body.map((component: Slice, index) => {
        switch (component.sliceType) {
          case 'blog_posts__latest':
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${component.sliceType}-${index}`}>
                <BlogPostLatest blogPostEntries={component.items} />
              </div>
            )

          case 'carousel':
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${component.sliceType}-${index}`}>
                <Carousel items={component.items} />
              </div>
            )

          case 'image':
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${component.sliceType}-${index}`}
                className="flex justify-center"
              >
                <Image
                  src={component.image.url}
                  alt={component.image.alt}
                  width={component.image.dimensions.width}
                  height={component.image.dimensions.height}
                />
              </div>
            )

          case 'list_of_products':
            return (
              <Grid
                // eslint-disable-next-line react/no-array-index-key
                key={`${component.sliceType}-${index}`}
                container
                direction="column"
              >
                <h2>{component.title}</h2>
                <ProductList config={config} products={component.items} />
              </Grid>
            )

          case 'teaser':
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`${component.sliceType}-${index}`}>
                <Teaser variant={component.variant} items={component.items} />
              </div>
            )

          default:
            return null
        }
      })}
    </>
  )

  if (Layout) {
    return <Layout config={config}>{render}</Layout>
  }

  return (
    <PageLayout
      preview={preview}
      config={config}
      imageBackground={content.data.imageBackground}
    >
      {render}
    </PageLayout>
  )
}
