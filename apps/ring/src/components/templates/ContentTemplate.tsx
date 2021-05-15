import Head from 'next/head'
import { FC, ReactElement, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import PageLayout from 'components/layouts/LayoutDefault/LayoutDefault'
import type { Config } from 'types/config'
import { Content } from 'types/content'

const Grid = dynamic(() => import('@ring/components/Grid'))

type ContentTemplateProps = {
  preview: boolean
  config: Config
  content: Content
  Layout?: ({ config }: { config: Config; children: ReactNode }) => ReactElement
  Image: FC
}

export default function ContentTemplate({
  preview,
  config,
  content,
  Layout,
  Image,
}: ContentTemplateProps): ReactElement | null {
  const render = (
    <>
      <Head>
        <title>{config.siteName}</title>
      </Head>

      {content.data.body.map((section, index) => (
        <Grid
          key={index.toString()}
          Image={Image}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...section}
        />
      ))}
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
