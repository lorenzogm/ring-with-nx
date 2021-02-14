import { FC } from 'react'

import Container from 'components/foundations/PageContainer/PageContainer'
import type { Config } from 'types/config'
import Image from 'components/foundations/Image/Image'
import Navigation from 'components/elements/Navigation/Navigation'
import Stepper from 'components/elements/Stepper/Stepper'
import IconFacebook from 'components/foundations/Icon/IconFacebook'
import { CheckoutStep } from './PageLayoutCheckout.d'


type HeaderProps = {
  config: Config
  checkoutStep: CheckoutStep
}

const Header: FC<HeaderProps> = ({ config, checkoutStep }) => {
  const steps = [
    { key: 'ADDRESS', label: 'Dirección', icon: <IconFacebook /> },
    { key: 'PAYMENT', label: 'Pago', icon: <IconFacebook /> },
    { key: 'CONFIRMATION', label: 'Confirmación', icon: <IconFacebook /> },
    { key: 'SUCCESS', label: 'Hecho!', icon: <IconFacebook /> },
  ]

  return (
    <Container>
      <header>
        <div className="container mx-auto px-6 pt-3 pb-16">
          <div className="flex items-start justify-between">
            {config.logo ? (
              <Image
                src={config.logo}
                alt={config.siteName}
                width={100}
                height={100}
              />
            ) : (
              config.siteName
            )}
          </div>
          <div className="flex items-center justify-end w-full">a</div>
          <Navigation navigation={config.navigation} />
        </div>

        <div className="p-5">
          <div className="mx-4 p-4">
            <div className="flex items-center">
              <Stepper steps={steps} stepSelected={checkoutStep} />
            </div>
          </div>
        </div>
      </header>
    </Container>
  )
}

export default Header
