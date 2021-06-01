import get from 'lodash.get'
import { AssetsTablePerYear } from 'types/index'

import getDeltaPercentage from './getDeltaPercentage'
import getDiff from './getDiff'

type GetNetWorth = {
  data: AssetsTablePerYear
}
export default function getNetWorth({ data }: GetNetWorth): AssetsTablePerYear {
  return Object.keys(data).reduce((yearAcc, year) => {
    const netWorthList = data[year].CASH.TOTAL.map((cashCell, index) => {
      const cash = cashCell.value as number
      const pensionFund = data[year].PENSION_FUND.TOTAL[index].value as number
      const pensionFundPrivate = data[year].PENSION_FUND_PRIVATE.TOTAL[index]
        .value as number
      return cash + pensionFund + pensionFundPrivate
    })

    // the data from the last year isn't available in the array of this year
    // we need to prepend it to calculate the delta
    const netWorthValuesFromPreviousYear = get(
      yearAcc,
      `${parseInt(year, 10) - 1}.NET_WORTH.TOTAL`,
    )

    const lastSavingsValueFromThePreviousYear = netWorthValuesFromPreviousYear
      ? netWorthValuesFromPreviousYear[
          netWorthValuesFromPreviousYear.length - 1
        ].value
      : 0

    const netWorthDelta = getDiff([
      lastSavingsValueFromThePreviousYear,
      ...netWorthList,
    ])

    return {
      ...yearAcc,
      [year]: {
        ...data[year],
        NET_WORTH: {
          ...data[year].CASH_SAVINGS,
          TOTAL: netWorthList.map((value, index) => ({
            label: index,
            value,
          })),
          DELTA: netWorthDelta.map((value, index) => ({
            label: index,
            value,
          })),
          DELTA_PERCENTAGE: getDeltaPercentage({
            deltaArray: netWorthDelta,
            totalValuesArray: netWorthList,
          }),
        },
      },
    }
  }, {})
}
