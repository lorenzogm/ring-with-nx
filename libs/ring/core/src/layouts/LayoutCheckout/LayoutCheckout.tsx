import { Container, Meta } from '@ring/core/index'
import { styled } from '@ring/core/theme'
import { ReactElement, ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

type LayoutCheckoutProps = {
  activeStep: number
  children: ReactNode
}
export function LayoutCheckout({
  activeStep,
  children,
}: LayoutCheckoutProps): ReactElement {
  return (
    <>
      <Meta />

      <Header activeStep={activeStep} />

      <ContainerStyled>
        <main>{children}</main>
      </ContainerStyled>

      <Footer />
    </>
  )
}

const ContainerStyled = styled(Container)`
  display: flex;
  // 100vh - header height - footer height
  min-height: calc(100vh - 342px - 40px);
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(6)}px;
`
