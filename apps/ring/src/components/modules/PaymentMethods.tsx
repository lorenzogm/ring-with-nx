import { FC } from 'react'
import Button from '@material-ui/core/Button'

import Image from 'components/elements/Image'
import type { Config } from 'types/config'

type PaymentMethodsProps = {
  config: Config
}

const PaymentMethods: FC<PaymentMethodsProps> = ({ config }) => {
  return (
    <>
      {config.isPaymentMethodWireTransferEnabled ? (
        <p>
          <Button>Transferencia bancaria</Button>
        </p>
      ) : null}
      {config.isPaymentMethodBizumEnabled ? (
        <p>
          <Button>Bizum</Button>
        </p>
      ) : null}
      {config.isPaymentMethodCreditCardEnabled ? (
        <p>
          <Button>Pagar con tarjeta de crédito</Button>

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
