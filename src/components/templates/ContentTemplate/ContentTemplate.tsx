import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import PageLayout from 'components/foundations/PageLayout/PageLayout'

import type { Config } from 'types/config'
import { Content } from 'types/content'
import Carousel from 'components/elements/Carousel/Carousel'
import Image from 'components/foundations/Image/Image'
import { Slice } from 'types/slices'
import ProductTile, {
  ProductTileImage,
  ProductTileName,
  ProductTilePrice,
} from 'components/elements/ProductTile/ProductTile'

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
                  width={component.image.width}
                  height={component.image.height}
                />
              </div>
            )

          case 'list_of_products':
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`${component.sliceType}-${index}`}
                className="flex justify-center"
              >
                {component.items.map((item) => (
                  <ProductTile
                    key={item.uid}
                    category={item.category}
                    product={item}
                  >
                    <ProductTileImage />
                    <ProductTileName />
                    <ProductTilePrice currency={config.currency} />
                  </ProductTile>
                ))}
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
    <PageLayout preview={preview} config={config}>
      {render}
    </PageLayout>
  )
}
