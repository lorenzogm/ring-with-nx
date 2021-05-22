import get from 'lodash.get'
import getDeltaPercentage from './getDeltaPercentage'
import getDiff from './getDiff'

export default function getDelta({ data }) {
  const dataWithDelta = Object.keys(data).reduce((yearAcc, year) => {
    return {
      ...yearAcc,
      [year]: Object.keys(data[year]).reduce((acc, categoryName) => {
        const totalValuesFromPreviousYear = get(
          data,
          `${parseInt(year) - 1}.${categoryName}.TOTAL`,
        )
        const lastValueFromThePreviousYear = totalValuesFromPreviousYear
          ? totalValuesFromPreviousYear[totalValuesFromPreviousYear.length - 1]
              .value
          : 0

        const total = [
          lastValueFromThePreviousYear,
          ...data[year][categoryName]['TOTAL'].map(
            (dataPoint) => dataPoint.value,
          ),
        ]
        const deltaArray = getDiff(total)

        return {
          ...acc,
          [categoryName]: {
            ...data[year][categoryName],
            ['DELTA']: deltaArray.map((value, index) => ({
              label: index,
              value,
            })),
            ['DELTA_PERCENTAGE']: getDeltaPercentage({
              deltaArray,
              totalValuesArray: total,
            }),
          },
        }
      }, {}),
    }
  }, {})

  return dataWithDelta
}
