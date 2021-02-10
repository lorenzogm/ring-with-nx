import { FC, useState } from 'react'

import PageContainer from 'components/foundations/PageContainer/PageContainer'
import Meta from 'components/foundations/PageLayout/Meta'
import type { Config } from 'types/config'

import Header from './Header'
import Footer from './Footer'
import { CheckoutStep } from './PageLayoutCheckout.d'

type PageLayoutCheckoutProps = {
  config: Config
  checkoutStep: CheckoutStep
}
const PageLayoutCheckout: FC<PageLayoutCheckoutProps> = ({
  config,
  checkoutStep,
  children,
}) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col h-screen justify-between">
        <Header config={config} checkoutStep={checkoutStep} />
        <PageContainer>
          <main>{children}</main>
        </PageContainer>
        <Footer />
      </div>
    </>
  )
}

export default PageLayoutCheckout
