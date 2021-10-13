import { Container, Meta } from '@ring/ui'
import { styled } from '@ring/ui/theme'
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

const ContainerStyled = styled(Container)(
  ({ theme }) => `
  display: flex;
  // 100vh - header height - footer height
  min-height: calc(100vh - 342px - 40px);
  flex-direction: column;
  margin-bottom: ${theme.spacing(6)}px;
`,
)
