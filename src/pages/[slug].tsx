import { GetStaticPaths, GetStaticProps } from 'next'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'

const { CONFIG_CONTENT_PAGES } = process.env

export const getStaticPaths: GetStaticPaths = async () => {
  const CMS = getCMS()
  const contentPages = await CMS.getAllContents({})

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

type ContactPageProps = {
  preview: boolean
  config: Config
  content: Content
}

export default function ContactPage({
  preview,
  config,
  content,
}: ContactPageProps): ReactElement {
  return <ContentTemplate preview={preview} config={config} content={content} />
}
