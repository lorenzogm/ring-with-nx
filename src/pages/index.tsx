import { GetStaticProps } from 'next'
import ErrorPage from 'next/error'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'

const { PAGE_HOME } = process.env

export const getStaticProps: GetStaticProps = async () => {
  if (PAGE_HOME !== 'ENABLED') {
    return {
      props: {
        isPageEnabled: false,
      },
    }
  }

  const CMS = getCMS()

  const [config, content] = await Promise.all([
    CMS.getConfig(),
    CMS.getContentByUID({ uid: 'home' }),
  ])

  return {
    props: {
      config,
      content,
      isPageEnabled: true,
    },
  }
}

type HomePageProps = {
  config: Config
  content: Content
  isPageEnabled: boolean
}

export default function HomePage({
  config,
  content,
  isPageEnabled,
}: HomePageProps): ReactElement {
  if (isPageEnabled) {
    return <ContentTemplate config={config} content={content} />
  }

  return <ErrorPage statusCode={404} />
}
