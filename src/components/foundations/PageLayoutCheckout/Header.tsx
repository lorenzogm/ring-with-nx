import { CheckoutStep } from './PageLayoutCheckout.d'
import type { Config } from 'services/CMS/config'
import Container from 'components/foundations/PageContainer/PageContainer'
import { FC } from 'react'
import Image from 'components/foundations/Image/Image'
import Navigation from 'components/elements/Navigation/Navigation'
import StepperCircle from 'components/elements/Stepper/StepperCircle/StepperCircle'
import StepperLine from 'components/elements/Stepper/StepperLine/StepperLine'

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

        <div className="p-5">
          <div className="mx-4 p-4">
            <div className="flex items-center">
              <StepperCircle label="Log In" successColor />
              <StepperLine successColor />
              <StepperCircle label="Address" successColor />
              <StepperLine />
              <StepperCircle label="Payment" />
              <StepperLine />
              <StepperCircle label="Confirmation" />
              <StepperLine />
              <StepperCircle label="Done" />
            </div>
          </div>
        </div>
      </header>
    </Container>
  )
}

export default Header
