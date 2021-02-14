import { ReactElement } from 'react'
import classnames from 'classnames'

type StepperProps = {
  steps: { key: string; label: string; icon: ReactElement }[]
  stepSelected: string
}

export default function Stepper({
  steps,
  stepSelected,
}: StepperProps): ReactElement {
  const stepAsNumber = steps.findIndex((step) => step.key === stepSelected)

  return (
    <>
      {steps.map(({ key, label, icon }, index) => {
        const textColor =
          index <= stepAsNumber ? 'text-yellow-400' : 'text-grey-600'
        const borderColor =
          index <= stepAsNumber ? 'border-yellow-400' : 'border-grey-600'

        const isFirstStep = index === 0

        return (
          <div
            key={key}
            className={classnames('flex items-center', {
              'w-full': !isFirstStep,
            })}
          >
            {!isFirstStep && (
              <div
                className={classnames(
                  'flex-auto border-t-2 transition duration-500 ease-in-out',
                  borderColor,
                )}
              />
            )}

            <div
              className={classnames('flex items-center relative', textColor)}
            >
              <div
                className={classnames(
                  'flex justify-center rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2',
                  borderColor,
                  { 'bg-yellow-400': key === stepSelected },
                )}
              >
                {icon}
              </div>
              <div
                className={classnames(
                  'absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase',
                  textColor,
                )}
              >
                {label}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
