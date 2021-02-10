import { FC } from 'react'

import Image from 'components/foundations/Image/Image'
import Button from 'components/foundations/Button/Button'
import IconArrowRight from 'components/foundations/Icon/IconArrowRight'
import type { Config } from 'types/config'

type PaymentMethodsProps = {
  config: Config
}

const PaymentMethods: FC<PaymentMethodsProps> = ({ config }) => {
  return (
    <>
      {config.isPaymentMethodWireTransferEnabled ? (
        <p>
          <Button variant="primary">
            Transferencia bancaria
            <IconArrowRight />
          </Button>
        </p>
      ) : null}
      {config.isPaymentMethodBizumEnabled ? (
        <p>
          <Button variant="primary">
            Bizum
            <IconArrowRight />
          </Button>
        </p>
      ) : null}
      {config.isPaymentMethodCreditCardEnabled ? (
        <p>
          <Button variant="primary">
            Pagar con tarjeta de crédito
            <IconArrowRight />
          </Button>

          <Image
            src="/images/payment-methods/mastercard.svg"
            alt="Mastercard"
            width={50}
            height={50}
          />
          <Image
            src="/images/payment-methods/visa.svg"
            alt="Visa"
            width={50}
            height={50}
          />
          <Image
            src="/images/payment-methods/amex.svg"
            alt="Amex"
            width={50}
            height={50}
          />
        </p>
      ) : null}
    </>
  )
}

export default PaymentMethods
