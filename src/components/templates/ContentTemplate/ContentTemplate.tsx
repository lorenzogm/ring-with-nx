import Head from 'next/head'
import { ReactElement } from 'react'
import PageLayout from 'components/foundations/PageLayout/PageLayout'

import type { Config } from 'types/config'
import { Content } from 'types/content'
import Carousel from 'components/elements/Carousel/Carousel'

type ContentTemplateProps = {
  config: Config
  content: Content
}

export default function ContentTemplate({
  config,
  content,
}: ContentTemplateProps): ReactElement | null {
  return (
    <PageLayout config={config}>
      <Head>
        <title>{config.siteName}</title>
      </Head>

      {content.data.body.map((component: Slice) => {
        switch (component.sliceType) {
          case 'carousel':
            return <Carousel items={component.items} />

          default:
            return null
        }
      })}
    </PageLayout>
  )
}
