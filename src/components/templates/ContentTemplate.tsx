import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import Grid from '@material-ui/core/Grid'
import PageLayout from 'components/layouts/LayoutDefault/LayoutDefault'
import type { Config } from 'types/config'
import { Content } from 'types/content'
import Carousel from 'components/molecules/Carousel'
import Image from 'components/atoms/Image'
import { Slice } from 'types/slices'
import ProductList from 'components/molecules/ProductList'

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
    <PageLayout preview={preview} config={config}>
      {render}
    </PageLayout>
  )
}
