import { FC } from 'react'

import PageLayout from 'components/foundations/PageLayout/PageLayout'
import type { Config } from 'types/config'
import Basket from 'components/modules/Basket/Basket'
import PageSectionHeader from 'components/foundations/PageSectionHeader/PageSectionHeader'
import { useShoppingCart } from 'use-shopping-cart'

type CartTemplateProps = {
  config: Config
}

const CartTemplate: FC<CartTemplateProps> = ({ config }) => {
  const { cartCount } = useShoppingCart()
  return (
    <PageLayout config={config}>
      <div className="flex">
        <div className="w-2/3 mr-4">
          <PageSectionHeader>
            Tu cesta ({cartCount} artículos)
          </PageSectionHeader>
          <Basket />
        </div>
        <div className="w-1/3 ml-4">
          <PageSectionHeader>Total</PageSectionHeader>
          <p>Subtotal</p>
          <p>Gastos de envío</p>
          <p>Total</p>
        </div>
      </div>
    </PageLayout>
  )
}

export default CartTemplate
