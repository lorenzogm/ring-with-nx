import { BarStack as VisxBarSeries, BarSeries } from '@visx/xychart'
import { BarStackProps } from './index.d'

export default function BarStack({ config, data }: BarStackProps) {
  return (
    <VisxBarSeries offset={config.stackOffset}>
      {Object.keys(data[0])
        .filter((key) => key !== 'label')
        .map((key) => {
          return (
            <BarSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={(d) => d && d.label}
              yAccessor={(d) => d && d[key]}
            />
          )
        })}
    </VisxBarSeries>
  )
}
