import { LineSeries as VisxLineSeries } from '@visx/xychart'
import { LineSeriesProps } from './index.d'

export default function LineSeries({ curve, data }: LineSeriesProps) {
  return (
    <>
      {Object.keys(data[0])
        .filter((key) => key !== 'label')
        .map((key) => {
          return (
            <VisxLineSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={(d) => d && d.label}
              yAccessor={(d) => d && d[key]}
              curve={curve}
            />
          )
        })}
    </>
  )
}
