import Image from 'next/image'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import classnames from 'classnames'

import type { Product } from 'types/product'
import type { State } from './ProductTemplate.d'

type ColorSelectorProps = {
  product: Product
  state: State
  setState: Dispatch<SetStateAction<State>>
}
export default function ColorSelector({
  product,
  state,
  setState,
}: ColorSelectorProps): ReactElement | null {
  if (!product.colors) {
    return null
  }

  return (
    <div className="">
      <div className="mr-3">Colour: {state.colorSelected}</div>
      <div className="flex">
        {product.colors.map(({ image, color }) => (
          <button
            type="button"
            onClick={() =>
              setState((statePrevious) => ({
                ...statePrevious,
                colorSelected: color,
                imageSelected: image.url,
              }))
            }
            key={color}
            className={classnames(
              'border-gray-200 border-2 mr-4 last:mr-0 hover:border-gray-800',
              {
                'border-gray-800': state.colorSelected === color,
              },
            )}
          >
            <Image src={image.url} alt={color} width={100} height={100} />
          </button>
        ))}
      </div>
    </div>
  )
}
