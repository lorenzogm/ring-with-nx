import { ReactElement, ReactNode } from 'react'

import PageContainer from 'components/foundations/PageContainer/PageContainer'
import Meta from 'components/foundations/PageLayout/Meta'
import type { Config } from 'services/CMS/config'

import Header from './Header'
import Footer from './Footer'

type PageLayoutProps = {
  preview: boolean
  config: Config
  children: ReactNode
}
export default function PageLayout({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview,
  config,
  children,
}: PageLayoutProps): ReactElement {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header config={config} />
        <PageContainer>
          <main>{children}</main>
        </PageContainer>
      </div>
      <Footer config={config} />
    </>
  )
}
