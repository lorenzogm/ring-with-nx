import { Button, Container, Meta, previewExit } from '@ring/core/index'
import { useRing } from '@ring/core/providers'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode } from 'react'
import ReactCookieConsent from 'react-cookie-consent'
import styled from 'styled-components'

type LayoutDefaultProps = {
  preview: boolean
  children: ReactNode
}

export function LayoutDefault({
  preview,
  children,
}: LayoutDefaultProps): ReactElement {
  const router = useRouter()
  const { components } = useRing()
  const { Header } = components

  async function onClickExitPreview() {
    await previewExit()

    router.reload()
  }

  return (
    <Background>
      <Meta />
      {preview && (
        <div>
          <Button onClick={onClickExitPreview}>Exit Preview</Button>
        </div>
      )}

      {Header ? <Header /> : null}
      <ContainerStyled>
        <main>{children}</main>
      </ContainerStyled>

      <ReactCookieConsent buttonText="Acepto">
        Este sitio web utiliza cookies para mejorar la expencia de usuario.
      </ReactCookieConsent>
    </Background>
  )
}

const ContainerStyled = styled(Container)`
  min-height: calc(100vh - 88px);
`

const Background = styled.div`
  background-size: 100% 300px;
  background-repeat: no-repeat;
`
