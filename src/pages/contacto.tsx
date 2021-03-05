import { GetStaticProps } from 'next'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'

const { CONFIG_PAGE_CONTACT } = process.env

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  if (CONFIG_PAGE_CONTACT !== 'ENABLED') {
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
    CMS.getContentByUID({ uid: 'contacto', ref }),
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
