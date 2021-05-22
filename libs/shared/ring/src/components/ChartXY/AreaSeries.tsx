import { AreaSeries as VisxAreaSeries } from '@visx/xychart'
import { AreaSeriesProps } from './index.d'

export default function AreaSeries({ curve, data }: AreaSeriesProps) {
  return (
    <>
      {Object.keys(data[0])
        .filter((key) => key !== 'label')
        .map((key) => {
          return (
            <VisxAreaSeries
              key={key}
              dataKey={key}
              data={data}
              xAccessor={(d) => d && d.label}
              yAccessor={(d) => d && d[key]}
              fillOpacity={0.4}
              curve={curve}
            />
          )
        })}
    </>
  )
}
