import { AssetMetrics, AssetsDoc } from 'types/index.d'

export default function getAssetsMetrics(doc: AssetsDoc): AssetMetrics {
  const yearList = Object.keys(doc.assets).slice(0).reverse()
  const now = new Date()
  const netWorthValue = Object.entries(doc.assets[yearList[0]]).reduce(
    (acc, [, value]) => {
      switch (value.category) {
        case 'CASH':
        case 'PENSION_FUND':
        case 'PENSION_FUND_PRIVATE': {
          const v = value.values[now.getMonth()] as number
          return acc + v
        }

        default:
          return acc
      }
    },
    0,
  )

  return {
    MTD: {
      netWorth: {
        value: netWorthValue,
      },
      savings: {
        percentage: '',
        value: 9,
      },
    },
    YTD: {
      netWorth: {
        value: netWorthValue,
      },
      savings: {
        percentage: '',
        value: 9,
      },
    },
    '1Y': {
      netWorth: {
        value: netWorthValue,
      },
      savings: {
        percentage: '',
        value: 9,
      },
    },
  }
}
