import { ReactElement } from 'react'
import classnames from 'classnames'

export default function StepperCircle({
  label,
  successColor = false,
}: {
  label: string
  successColor?: boolean
}): ReactElement {
  const textColor = successColor ? 'text-teal-600' : 'text-grey-600'
  const borderColor = successColor ? 'border-teal-600' : 'border-grey-600'
  return (
    <div className={classnames('flex items-center relative', textColor)}>
      <div
        className={classnames(
          'rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2',
          borderColor,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-bookmark"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <div
        className={classnames(
          'absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ',
          textColor,
        )}
      >
        {label}
      </div>
    </div>
  )
}
