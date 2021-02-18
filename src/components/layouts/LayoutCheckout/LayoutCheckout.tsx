import { ReactElement, ReactNode } from 'react'

import Container from '@material-ui/core/Container'
import Meta from 'components/layouts/Meta'
import type { Config } from 'types/config'
import Header from './Header'
import Footer from './Footer'

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
      <Container>
        <Header config={config} activeStep={activeStep} />
        <main>{children}</main>
        <Footer config={config} />
      </Container>
    </>
  )
}
