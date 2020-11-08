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

import { State } from './PageLayout.d'

type AsideProps = {
  state: State
  setState: Dispatch<SetStateAction<State>>
}
export default function Aside({ state, setState }: AsideProps): ReactElement {
  const {
    cartDetails,
    incrementItem,
    decrementItem,
    cartCount,
  } = useShoppingCart()

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
        <h3 className="text-2xl font-medium text-gray-700">Tu cesta</h3>
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
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Divider />
      {cartCount === 0 ? (
        <p>Tu cesta está vacía</p>
      ) : (
        <>
          {Object.values(cartDetails).map((cartItem) => (
            <div key={cartItem.sku} className="flex justify-between mt-6">
              <div className="flex">
                <img
                  className="h-20 w-20 object-cover rounded"
                  src={cartItem.image}
                  alt={cartItem.name}
                />
                <div className="mx-3">
                  <h3 className="text-sm text-gray-600">{cartItem.name}</h3>
                  <p>Color: {cartItem.color}</p>
                  <p>Talla: {cartItem.size}</p>
                  <div className="flex items-center mt-2">
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none focus:text-gray-600"
                      onClick={() => decrementItem(cartItem.sku)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <span className="text-gray-700 mx-2">
                      {cartItem.quantity}
                    </span>
                    <button
                      type="button"
                      className="text-gray-500 focus:outline-none focus:text-gray-600"
                      onClick={() => incrementItem(cartItem.sku)}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <span className="text-gray-600">{cartItem.formattedValue}</span>
            </div>
          ))}
          <Divider />

          <Link href="/cart">
            <a>
              <Button variant="primary">
                <span>Comenzar pedido</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </a>
          </Link>
        </>
      )}
    </aside>
  )
}
