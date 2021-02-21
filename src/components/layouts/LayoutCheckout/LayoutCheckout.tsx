import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

import Container from '@material-ui/core/Container'
import Meta from 'components/layouts/Meta'
import type { Config } from 'types/config'
import CookieBanner from 'components/molecules/CookieBanner'
import theme from 'theme'
import Header from './Header'
import Footer from './Footer'

const ContainerStyled = styled(Container)`
  display: flex;
  // 100vh - header height - footer height
  min-height: calc(100vh - 342px - 40px);
  flex-direction: column;
  margin-bottom: ${theme.spacing(6)}px;
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

      <CookieBanner />

      <Header config={config} activeStep={activeStep} />

      <ContainerStyled>
        <main>{children}</main>
      </ContainerStyled>

      <Footer />
    </>
  )
}
