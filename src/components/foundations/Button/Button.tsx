import { ReactElement, ReactNode } from 'react'
import classnames from 'classnames'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary'
}

export default function Button({
  children,
  variant,
}: ButtonProps): ReactElement {
  return (
    <button
      type="button"
      className={classnames(
        'flex items-center py-2 text-sm uppercase font-medium rounded focus:outline-none',
        {
          'text-white': !variant,
          'bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-500 px-3 text-black':
            variant === 'primary',
        },
      )}
    >
      {children}
    </button>
  )
}
