import Navigation from 'components/elements/Navigation/Navigation'
import Container from 'components/foundations/PageContainer/PageContainer'
import { FC } from 'react'
import type { Config } from 'services/CMS/config'
import Image from 'components/foundations/Image/Image'

import { CheckoutStep } from './PageLayoutCheckout.d'

type HeaderProps = {
  config: Config
  checkoutStep: CheckoutStep
}

const Header: FC<HeaderProps> = ({ config, checkoutStep }) => {
  return (
    <Container>
      <header>
        <div className="container mx-auto px-6 pt-3 pb-16">
          <div className="flex items-start justify-between">
            <Image
              src={config.logo}
              alt={config.siteName}
              width={100}
              height={100}
            />
          </div>
          <div className="flex items-center justify-end w-full">a</div>

          <Navigation navigation={config.navigation} />
        </div>
        {checkoutStep === 'ADDRESS' ? '1 ok' : '1'}
        {checkoutStep === 'PAYMENT' ? '2 ok ' : '2'}
        {checkoutStep === 'CONFIRMATION' ? '3 ok' : '3'}
      </header>
    </Container>
  )
}

export default Header
