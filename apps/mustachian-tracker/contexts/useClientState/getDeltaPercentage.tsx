import { DataPoint } from '@ring/components/ChartXY'

type GetDeltaPercentage = {
  deltaArray: Array<number>
  totalValuesArray: Array<number>
}
export default function getDeltaPercentage({
  deltaArray,
  totalValuesArray,
}: GetDeltaPercentage): Array<DataPoint> {
  return deltaArray.map((delta, index) => {
    return {
      label: index.toString(),
      value: `${(delta * 100) / totalValuesArray[index]}%`,
    }
  })
}
