import { GetStaticProps } from 'next'

import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'

export const getStaticProps: GetStaticProps = async () => {
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
}

export default function HomePage({ config, content }: HomePage) {
  return <ContentTemplate config={config} content={content} />
}
