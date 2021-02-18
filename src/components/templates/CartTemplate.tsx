import { FC } from 'react'
import Typography from '@material-ui/core/Typography'

import { useShoppingCart } from 'use-shopping-cart'
import PageLayout from 'components/layouts/LayoutDefault/LayoutDefault'
import type { Config } from 'types/config'
import Basket from 'components/molecules/CartProductList'

type CartTemplateProps = {
  config: Config
}

const CartTemplate: FC<CartTemplateProps> = ({ config }) => {
  const { cartCount } = useShoppingCart()
  return (
    <PageLayout preview={false} config={config}>
      <div className="flex">
        <div className="w-2/3 mr-4">
          <Typography>Tu cesta ({cartCount} artículos)</Typography>
          <Basket />
        </div>
        <div className="w-1/3 ml-4">
          <Typography>Total</Typography>
          <p>Subtotal</p>
          <p>Gastos de envío</p>
          <p>Total</p>
        </div>
      </div>
    </PageLayout>
  )
}

export default CartTemplate
