import get from 'lodash.get'
import type { Asset, AssetsDoc, AssetsTablePerYear } from 'types/index'

import getDelta from './getDelta'
import getExpenses from './getExpenses'
import getNetWorth from './getNetWorth'
import getSavings from './getSavings'
import getValues from './getValues'

export default function getAssetsTables(doc: AssetsDoc): AssetsTablePerYear {
  const data: AssetsTablePerYear = Object.keys(doc.assets).reduce(
    (yearAcc, year) => {
      return {
        ...yearAcc,
        [year]: Object.keys(doc.assets[year]).reduce((acc, key) => {
          const asset: Asset = doc.assets[year][key]

          return {
            ...acc,
            [asset.category]: {
              ...get(acc, asset.category, {}),
              [asset.currency]: getValues({
                key: asset.currency,
                acc,
                asset,
              }),
              TOTAL: getValues({ key: 'TOTAL', acc, asset }),
            },
          }
        }, {}),
      }
    },
    {},
  )

  const dataWithNetWorth = getNetWorth({ data })
  const dataWithDelta = getDelta({ data: dataWithNetWorth })
  const dataWithExpenses = getExpenses({ data: dataWithDelta })
  const dataWithSavings = getSavings({ data: dataWithExpenses })

  return dataWithSavings
}
