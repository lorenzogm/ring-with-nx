import Head from 'next/head'
import { FC, ReactElement, ReactNode } from 'react'
import PageLayout from 'components/foundations/PageLayout/PageLayout'

import type { Config } from 'types/config'
import { Content } from 'types/content'
import Carousel from 'components/elements/Carousel/Carousel'
import Image from 'components/foundations/Image/Image'
import { Slice } from 'types/slices'

type ContentTemplateProps = {
  config: Config
  content: Content
  Layout?: ({ config }: { config: Config; children: ReactNode }) => ReactElement
}

export default function ContentTemplate({
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

          default:
            return null
        }
      })}
    </>
  )

  if (Layout) {
    return <Layout config={config}>{render}</Layout>
  }

  return <PageLayout config={config}>{render}</PageLayout>
}
