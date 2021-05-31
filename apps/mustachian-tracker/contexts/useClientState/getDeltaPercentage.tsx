import type { AssetsTableRow } from 'types/index'

type GetDeltaPercentage = {
  deltaArray: Array<number>
  totalValuesArray: Array<number>
}
export default function getDeltaPercentage({
  deltaArray,
  totalValuesArray,
}: GetDeltaPercentage): AssetsTableRow<string> {
  return deltaArray.map((delta, index) => {
    return {
      label: index,
      value: `${(delta * 100) / totalValuesArray[index]}%`,
    }
  })
}
