import { ReactElement, ReactNode, useState } from 'react'
import CookieBanner from 'react-cookie-banner'
import { useRouter } from 'next/router'

import type { Config } from 'types/config'
import Meta from 'components/foundations/PageLayout/Meta'
import PageContainer from 'components/foundations/PageContainer/PageContainer'
import exitPreview from 'services/api/preview/exitPreview'
import Button from '../Button/Button'
import Aside from './Aside'
import Header from './Header'
import Footer from './Footer'
import { State } from './PageLayout.d'

type PageLayoutProps = {
  preview: boolean
  config: Config
  children: ReactNode
}
export default function PageLayout({
  preview,
  config,
  children,
}: PageLayoutProps): ReactElement {
  const router = useRouter()
  const [state, setState] = useState<State>({ isCartOpen: false })

  async function onClickExitPreview() {
    await exitPreview()

    router.reload()
  }

  return (
    <>
      <Meta />
      <div className="flex flex-col h-screen justify-between">
        {preview && (
          <div className="bg-red-800 flex justify-center">
            <Button onClick={onClickExitPreview}>Exit Preview</Button>
          </div>
        )}
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
