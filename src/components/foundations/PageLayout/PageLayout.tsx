import { ReactElement, ReactNode, useState } from 'react'
import CookieBanner from 'react-cookie-banner'

import PageContainer from 'components/foundations/PageContainer/PageContainer'
import Meta from 'components/foundations/PageLayout/Meta'
import type { Config } from 'services/CMS/config'

import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import { State } from './PageLayout.d'

type PageLayoutProps = {
  config: Config
  children: ReactNode
}
export default function PageLayout({
  config,
  children,
}: PageLayoutProps): ReactElement {
  const [state, setState] = useState<State>({ isCartOpen: false })

  return (
    <>
      <Meta />
      <div className="flex flex-col h-screen justify-between">
        <Header config={config} setState={setState} />
        <Aside state={state} setState={setState} />
        <PageContainer>
          <main>{children}</main>
        </PageContainer>
        <Footer config={config} />
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
