import { Button, Container, Meta, previewExit } from '@ring/core/index'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode } from 'react'
import ReactCookieConsent from 'react-cookie-consent'
import styled from 'styled-components'

import { Header } from './Header'

type LayoutDefaultProps = {
  preview: boolean
  children: ReactNode
}

export function LayoutDefault({
  preview,
  children,
}: LayoutDefaultProps): ReactElement {
  const router = useRouter()

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

      <Header />
      <ContainerStyled>
        <main>{children}</main>
      </ContainerStyled>

      <ReactCookieConsent>
        This website uses cookies to enhance the user experience.
      </ReactCookieConsent>
    </Background>
  )
}

const ContainerStyled = styled(Container)`
  display: flex;
  min-height: calc(100vh - 88px);
  flex-direction: column;
  margin-bottom: ${({ theme }) => `${theme.spacing(6)}px`};
  padding-left: 0;
  padding-right: 0;
`

const Background = styled.div`
  background-size: 100% 300px;
  background-repeat: no-repeat;
`
