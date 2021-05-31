import { capitalize } from '@material-ui/core'
import useClientState from 'contexts/useClientState'
import get from 'lodash.get'
import { Column } from 'react-table'
import {
  AssetCategory,
  AssetsTableRow,
  AssetTableRowCategory,
} from 'types/index'

import { isFutureDate } from '../utils/utils'

type UseTableByCurrency = {
  assetCategory: AssetCategory
}

export default function useTableByCurrency({
  assetCategory,
}: UseTableByCurrency): {
  columns: Array<Column>
  data: Array<Record<AssetTableRowCategory, string | number>>
} {
  const [clientState] = useClientState()

  const keys: AssetTableRowCategory = get(
    clientState,
    `assetsTables.${clientState.yearSelected}.${assetCategory}`,
  )
  console.log(clientState)

  if (!keys) {
    return null
  }

  const data = Object.keys(keys).map((currency) => {
    const dataPerCurrency: AssetsTableRow = get(
      clientState,
      `assetsTables.${clientState.yearSelected}.${assetCategory}.${currency}`,
      [],
    )

    return {
      name: currency,
      ...getData({
        yearSelected: clientState.yearSelected,
        data: dataPerCurrency,
      }),
    }
  })

  data.sort((a, z) => {
    // TOTAL first
    if (a.name === 'TOTAL') {
      return -1
    }

    if (z.name === 'TOTAL') {
      return 1
    }

    // TOTAL_PERCENTAGE
    if (a.name === 'TOTAL_PERCENTAGE') {
      return -1
    }

    if (z.name === 'TOTAL_PERCENTAGE') {
      return 1
    }

    // DELTA
    if (a.name === 'DELTA') {
      return -1
    }

    if (z.name === 'DELTA') {
      return 1
    }

    // DELTA_PERCENTAGE
    if (a.name === 'DELTA_PERCENTAGE') {
      return -1
    }

    if (z.name === 'DELTA_PERCENTAGE') {
      return 1
    }

    // then alphabetically
    if (a.name > z.name) {
      return 1
    }

    if (a.name < z.name) {
      return -1
    }

    return 0
  })

  const columns = [
    ...Object.keys(data[0]).map((columnLabel) => {
      return {
        Header: capitalize(columnLabel),
        accessor: columnLabel,
      }
    }),
  ]

  return { columns, data }
}

type GetData = {
  data: AssetsTableRow
  yearSelected: string
}
function getData({ data, yearSelected }: GetData): AssetsTableRow {
  return data.reduce((acc, current) => {
    let value

    if (
      isFutureDate({ year: yearSelected, month: current.label + 1 }) ||
      current.value === 'Infinity%' ||
      current.value === 'NaN%'
    ) {
      value = '-'
    } else if (
      typeof current.value === 'string' &&
      current.value.search('%') > -1
    ) {
      const valueAsString = current.value.replace('%', '')
      value = `${parseFloat(valueAsString).toFixed(2)}%`
    } else {
      value = current.value
    }

    return {
      ...acc,
      [getMonthName(current.label)]: value,
    }
  }, {}) as AssetsTableRow
}

function getMonthName(monthNumber) {
  const date = new Date(1987, monthNumber, 23)
  return date.toLocaleString('en-GB', { month: 'long' })
}
