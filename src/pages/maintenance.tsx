import { GetStaticProps } from 'next'

import { ReactElement } from 'react'
import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate'
import getCMS from 'services/CMS/getCMS'
import type { Config } from 'types/config'
import type { Content } from 'types/content'
import PageLayoutBlank from 'components/foundations/PageLayoutBlank/PageLayoutBlank'

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  const CMS = getCMS()
  const ref = previewData ? previewData.ref : undefined

  const [config, content] = await Promise.all([
    CMS.getConfig({ ref }),
    CMS.getContentByUID({ uid: 'maintenance', ref }),
  ])

  return {
    props: {
      preview,
      config,
      content,
    },
  }
}

type MaintenancePageProps = {
  preview: boolean
  config: Config
  content: Content
}

export default function MaintenancePage({
  preview,
  config,
  content,
}: MaintenancePageProps): ReactElement {
  return (
    <ContentTemplate
      preview={preview}
      config={config}
      content={content}
      Layout={PageLayoutBlank}
    />
  )
}
