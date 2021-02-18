import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

import Container from '@material-ui/core/Container'
import Meta from 'components/layouts/Meta'
import type { Config } from 'types/config'
import Header from './Header'
import Footer from './Footer'

const ContainerStyled = styled(Container)`
  display: flex;
  min-height: calc(100vh - 40px);
  flex-direction: column;
`

type LayoutCheckoutProps = {
  config: Config
  activeStep: number
  children: ReactNode
}
export default function LayoutCheckout({
  config,
  activeStep,
  children,
}: LayoutCheckoutProps): ReactElement {
  return (
    <>
      <Meta />
      <ContainerStyled>
        <Header config={config} activeStep={activeStep} />
        <main>{children}</main>
      </ContainerStyled>

      <Container>
        <Footer config={config} />
      </Container>
    </>
  )
}
