import { FC } from 'react'
import Button from '@material-ui/core/Button'

import LayoutCheckout from 'components/layouts/LayoutCheckout/LayoutCheckout'
import type { PaymentMethods } from 'types/paymentMethods'
import type { Config } from 'types/config'

type CheckoutPaymentTemplateProps = {
  config: Config
  onSelect: ({ paymentMethod }: { paymentMethod: PaymentMethods }) => void
}

const CheckoutPaymentTemplate: FC<CheckoutPaymentTemplateProps> = ({
  config,
  onSelect,
}) => {
  return (
    <LayoutCheckout config={config} activeStep={1}>
      <Button onClick={onSelectWireTransfer}>
        <a>Transferencia bancaria</a>
      </Button>
    </LayoutCheckout>
  )

  function onSelectWireTransfer() {
    onSelect({ paymentMethod: 'WIRE_TRANSFER' })
  }
}

export default CheckoutPaymentTemplate
