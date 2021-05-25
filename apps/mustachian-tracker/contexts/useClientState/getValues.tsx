import get from 'lodash.get'
import { Asset } from 'contexts/useServerState'
import { DatatableCell } from './index.d'

type GetValues = {
  key: string
  acc: any
  asset: Asset
}

export default function getValues({
  key,
  acc,
  asset,
}: GetValues): Array<DatatableCell> {
  const accValues = get(acc, `${asset.category}.${key}`, [])

  const values = asset.values.map((v, i) => {
    const previousCell = accValues.find((cell) => cell.label === i) || {
      label: i,
      value: 0,
    }
    // eslint-disable-next-line no-nested-ternary
    const value = v === '' ? 0 : typeof v === 'string' ? parseFloat(v) : v
    const previousValue =
      typeof previousCell.value === 'string'
        ? parseFloat(previousCell.value)
        : previousCell.value

    return {
      label: i,
      value: value + previousValue,
    }
  })

  return values
}
