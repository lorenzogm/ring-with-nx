import { GetStaticProps } from 'next'
import ErrorPage from 'next/error'

import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'

const { PAGE_CONTACT } = process.env

export const getStaticProps: GetStaticProps = async () => {
  if (PAGE_CONTACT !== 'ENABLED') {
    return {
      props: {
        isPageEnabled: false,
      },
    }
  }

  const CMS = getCMS()

  const [config, content] = await Promise.all([
    CMS.getConfig(),
    CMS.getContentByUID({ uid: 'contacto' }),
  ])

  return {
    props: {
      config,
      content,
    },
  }
}

type HomePage = {
  config: Config
  content: Content
  isPageEnabled: boolean
}

export default function ContactPage({
  config,
  content,
  isPageEnabled,
}: HomePage) {
  if (isPageEnabled) {
    return <ContentTemplate config={config} content={content} />
  }

  return <ErrorPage statusCode={404} />
}
