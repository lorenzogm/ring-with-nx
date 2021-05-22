import { BarGroup as VisxBarGroup, BarSeries } from '@visx/xychart'
import { BarGroupProps } from './index.d'

export default function BarGroup({ data }: BarGroupProps) {
  return (
    <VisxBarGroup>
      {Object.keys(data[0])
        .filter((key) => key !== 'label')
        .map((key) => {
          return (
            <>
              <BarSeries
                key={key}
                dataKey={key}
                data={data}
                xAccessor={(d) => d && d.label}
                yAccessor={(d) => d && d[key]}
              />
              )
            </>
          )
        })}
    </VisxBarGroup>
  )
}
