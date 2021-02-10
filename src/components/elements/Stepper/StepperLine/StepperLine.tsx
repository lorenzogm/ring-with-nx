import { ReactElement } from 'react'
import classnames from 'classnames'

export default function StepperLine({
  successColor = false,
}: {
  successColor?: boolean
}): ReactElement {
  const lineColor = successColor ? 'border-teal-300' : 'border-gray-300'
  return (
    <div
      className={classnames(
        'flex-auto border-t-2 transition duration-500 ease-in-out',
        lineColor,
      )}
    ></div>
  )
}
