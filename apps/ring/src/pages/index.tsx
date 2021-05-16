import { GetStaticProps } from 'next'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'
import Image from 'components/elements/Image'

const { CONFIG_CONTENT_PAGES_HOME } = process.env

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  if (CONFIG_CONTENT_PAGES_HOME !== 'ENABLED') {
    return {
      props: {
        isPageEnabled: false,
      },
    }
  }

  const CMS = getCMS()
  const ref = previewData ? previewData.ref : undefined

  const [config, content] = await Promise.all([
    CMS.getConfig({ ref }),
    CMS.getContentByUID({
      uid: 'home',
      ref,
    }),
  ])

  return {
    props: {
      preview,
      config,
      content,
    },
    revalidate: 1,
  }
}

type HomePageProps = {
  preview: boolean
  config: Config
  content: Content
}

export default function HomePage({
  preview,
  config,
  content,
}: HomePageProps): ReactElement {
  return (
    <ContentTemplate
      preview={preview}
      config={config}
      content={content}
      Image={Image}
    />
  )
}
