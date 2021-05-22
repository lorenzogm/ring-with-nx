import { AreaSeries, AreaStack as VisxAreaStack } from '@visx/xychart'
import { AreaStackProps } from './index.d'

export default function AreaStack({ curve, data, config }: AreaStackProps) {
  return (
    <VisxAreaStack
      curve={curve}
      offset={config.stackOffset}
      renderLine={config.stackOffset !== 'wiggle'}
    >
      {Object.keys(data[0])
        .filter((key) => key !== 'label')
        .map((key) => {
          return (
            <AreaSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={(d) => d && d.label}
              yAccessor={(d) => d && d[key]}
              fillOpacity={0.4}
            />
          )
        })}
    </VisxAreaStack>
  )
}
