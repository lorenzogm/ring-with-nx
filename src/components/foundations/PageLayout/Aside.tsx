import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import classnames from 'classnames'
import { useShoppingCart } from 'use-shopping-cart'
import Link from 'next/link'

import Button from 'components/foundations/Button/Button'
import Divider from 'components/foundations/Divider/Divider'
import Basket from 'components/modules/Basket/Basket'

import { State } from './PageLayout.d'
import PageSectionHeader from '../PageSectionHeader/PageSectionHeader'
import IconArrowRight from '../Icon/IconArrowRight'
import IconClose from '../Icon/IconClose'

type AsideProps = {
  state: State
  setState: Dispatch<SetStateAction<State>>
}
export default function Aside({ state, setState }: AsideProps): ReactElement {
  const { cartCount } = useShoppingCart()

  const [lastCartCount, setLastCartCount] = useState(cartCount)

  useEffect(() => {
    if (!state.isCartOpen && cartCount !== lastCartCount) {
      setState((statePrevious) => ({
        ...statePrevious,
        isCartOpen: !statePrevious.isCartOpen,
      }))
      setLastCartCount(cartCount)
    }
  }, [cartCount, lastCartCount, setState, state.isCartOpen])

  return (
    <aside
      className={classnames(
        'fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300',
        {
          'translate-x-0 ease-out': state.isCartOpen,
          'translate-x-full ease-in': !state.isCartOpen,
        },
      )}
    >
      <div className="flex items-center justify-between">
        <PageSectionHeader>Tu cesta</PageSectionHeader>
        <button
          type="button"
          onClick={() =>
            setState((statePrevious) => ({
              ...statePrevious,
              isCartOpen: !state.isCartOpen,
            }))
          }
          className="text-gray-600 focus:outline-none"
        >
          <IconClose />
        </button>
      </div>
      <Divider />

      <Basket />
      {cartCount > 0 ? (
        <>
          <Divider />

          <Link href="/checkout/address">
            <a>
              <Button variant="primary">
                <span>Comenzar pedido</span>
                <IconArrowRight />
              </Button>
            </a>
          </Link>
        </>
      ) : null}
    </aside>
  )
}
