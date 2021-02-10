import { FC } from 'react'

import PageLayoutCheckout from 'components/foundations/PageLayoutCheckout/PageLayoutCheckout'
import Button from 'components/foundations/Button/Button'
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
    <PageLayoutCheckout config={config} checkoutStep="PAYMENT">
      <Button variant="primary" onClick={onSelectWireTransfer}>
        <a>Transferencia bancaria</a>
      </Button>
    </PageLayoutCheckout>
  )

  function onSelectWireTransfer() {
    onSelect({ paymentMethod: 'WIRE_TRANSFER' })
  }
}

export default CheckoutPaymentTemplate
