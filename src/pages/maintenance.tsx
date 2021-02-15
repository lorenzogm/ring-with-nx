import { GetStaticProps } from 'next'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'
import PageLayoutBlank from 'components/foundations/PageLayoutBlank/PageLayoutBlank'

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config, content] = await Promise.all([
    CMS.getConfig(),
    CMS.getContentByUID({ uid: 'maintenance' }),
  ])

  return {
    props: {
      config,
      content,
    },
  }
}

type MaintenancePageProps = {
  config: Config
  content: Content
}

export default function MaintenancePage({
  config,
  content,
}: MaintenancePageProps): ReactElement {
  return (
    <ContentTemplate
      config={config}
      content={content}
      Layout={PageLayoutBlank}
    />
  )
}
