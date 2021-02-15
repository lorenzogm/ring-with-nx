import { ReactElement, ReactNode } from 'react'
import CookieBanner from 'react-cookie-banner'

import Meta from 'components/foundations/PageLayout/Meta'
import PageContainer from 'components/foundations/PageContainer/PageContainer'

type PageLayoutProps = {
  children: ReactNode
}
export default function PageLayout({
  children,
}: PageLayoutProps): ReactElement {
  return (
    <>
      <Meta />
      <div className="flex flex-col h-screen justify-between">
        <PageContainer>
          <main>{children}</main>
        </PageContainer>
        <CookieBanner
          message="Hola, usamos cookies. Si sigues navegando significa que aceptas el uso de cookies."
          cookie="user-has-accepted-cookies"
          dismissOnScroll
          dismissOnClick
        />
      </div>
    </>
  )
}
