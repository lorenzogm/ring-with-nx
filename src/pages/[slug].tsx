import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'

const { CONFIG_CONTENT_PAGES } = process.env

export const getStaticPaths: GetStaticPaths = async () => {
  const CMS = getCMS()
  const contentPages = await CMS.getAllContents({ excludeByUID: 'home' })
  return {
    paths: contentPages.map((contentPage) => `/${contentPage.uid}`),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  if (CONFIG_CONTENT_PAGES !== 'ENABLED') {
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
    CMS.getContentByUID({ uid: params?.slug as string, ref }),
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

type ContentPageProps = {
  preview: boolean
  config: Config
  content: Content
}

export default function ContentPage({
  preview,
  config,
  content,
}: ContentPageProps): ReactElement | null {
  const router = useRouter()

  if (router.isFallback) {
    return null
  }

  return <ContentTemplate preview={preview} config={config} content={content} />
}
