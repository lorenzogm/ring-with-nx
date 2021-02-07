import { FC } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

const Basket: FC = () => {
  const {
    cartDetails,
    incrementItem,
    decrementItem,
    cartCount,
  } = useShoppingCart()

  if (cartCount === 0) {
    return <p>Tu cesta está vacía</p>
  }

  return (
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
                <span className="text-gray-700 mx-2">{cartItem.quantity}</span>
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
    </>
  )
}

export default Basket
