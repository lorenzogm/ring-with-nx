import { GetStaticProps } from 'next'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'

const { CONFIG_PAGE_HOME } = process.env

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  if (CONFIG_PAGE_HOME !== 'ENABLED') {
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
      fetchLinks: [
        'product.name',
        'product.colors',
        'my.product.category.name',
      ],
    }),
  ])

  return {
    props: {
      preview,
      config,
      content,
    },
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
  return <ContentTemplate preview={preview} config={config} content={content} />
}
