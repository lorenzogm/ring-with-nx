import get from 'lodash.get'
import type { AssetsTablePerYear, AssetsTableRow } from 'types/index'

import getDeltaPercentage from './getDeltaPercentage'
import getDiff from './getDiff'

type GetSavings = {
  data: AssetsTablePerYear
}
export default function getSavings({ data }: GetSavings): AssetsTablePerYear {
  const dataWithExpenses = Object.keys(data).reduce((yearAcc, year) => {
    const incomeList = (get(
      data,
      `${year}.CASH_INCOME.TOTAL`,
    ) as unknown) as AssetsTableRow<number>

    const expensesList = (get(
      data,
      `${year}.CASH_EXPENSES.TOTAL`,
    ) as unknown) as AssetsTableRow<number>

    // calculate the expenses with the formula
    const savingsList = incomeList.map((income, index) => {
      const incomeValue = income.value
      const expensesValue = expensesList[index].value
      return incomeValue - expensesValue
    })

    const savingsPercentageList = savingsList.map((savings, index) => {
      const incomeValue = incomeList[index].value
      return `${(savings * 100) / incomeValue}%`
    })

    // the total savings from the last year isn't available in the total savings array of this year
    // we need to prepend it to calculate the delta
    const savingsValuesFromPreviousYear = get(
      yearAcc,
      `${parseInt(year, 10) - 1}.CASH_SAVINGS.TOTAL`,
    )

    const lastSavingsValueFromThePreviousYear = savingsValuesFromPreviousYear
      ? savingsValuesFromPreviousYear[savingsValuesFromPreviousYear.length - 1]
          .value
      : 0

    const savingsDelta = getDiff([
      lastSavingsValueFromThePreviousYear,
      ...savingsList,
    ])

    return {
      ...yearAcc,
      [year]: {
        ...data[year],
        CASH_SAVINGS: {
          ...data[year].CASH_SAVINGS,
          TOTAL: savingsList.map((value, index) => ({
            label: index,
            value,
          })),
          TOTAL_PERCENTAGE: savingsPercentageList.map((value, index) => ({
            label: index,
            value,
          })),
          DELTA: savingsDelta.map((value, index) => ({
            label: index,
            value,
          })),
          DELTA_PERCENTAGE: getDeltaPercentage({
            deltaArray: savingsDelta,
            totalValuesArray: savingsList,
          }),
        },
      },
    }
  }, {})

  return dataWithExpenses
}
