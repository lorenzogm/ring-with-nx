import { BarSeries as VisxBarSeries } from '@visx/xychart'
import { BarSeriesProps } from './index.d'

export default function BarSeries({ data }: BarSeriesProps) {
  return (
    <>
      {Object.keys(data[0])
        .filter((key) => key !== 'label')
        .map((key) => {
          return (
            <VisxBarSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={(d) => d && d.label}
              yAccessor={(d) => d && d[key]}
            />
          )
        })}
    </>
  )
}
