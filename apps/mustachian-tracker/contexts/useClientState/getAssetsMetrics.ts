import { AssetsMetrics, AssetsTablePerYear, Timeframe } from 'types/index'

export default function getAssetsMetrics(
  assetsTables: AssetsTablePerYear,
): AssetsMetrics {
  const yearList = Object.keys(assetsTables).slice(0).reverse()
  const yearLatest = yearList[0]
  const now = new Date()

  const netWorthCell = assetsTables[yearLatest].NET_WORTH.TOTAL.find(
    (cell) => cell.label === now.getMonth(),
  )

  const netWorthValue = netWorthCell.value as number

  return {
    MTD: {
      netWorth: {
        value: netWorthValue,
      },
      netWorthDelta: getNetWorthDelta({
        assetsTables,
        timeframe: 'MTD',
        yearLatest,
      }),
      savings: {
        percentage: '',
        value: 9,
      },
    },
    YTD: {
      netWorth: {
        value: netWorthValue,
      },
      netWorthDelta: getNetWorthDelta({
        assetsTables,
        timeframe: 'YTD',
        yearLatest,
      }),
      savings: {
        percentage: '',
        value: 9,
      },
    },
    '1Y': {
      netWorth: {
        value: netWorthValue,
      },
      netWorthDelta: getNetWorthDelta({
        assetsTables,
        timeframe: '1Y',
        yearLatest,
      }),
      savings: {
        percentage: '',
        value: 9,
      },
    },
  }
}

type GetNetWorthDelta = {
  assetsTables: AssetsTablePerYear
  timeframe: Timeframe
  yearLatest: string
}
function getNetWorthDelta({
  assetsTables,
  timeframe,
  yearLatest,
}: GetNetWorthDelta) {
  const now = new Date()
  const monthNow = now.getMonth()

  const valueNow = assetsTables[yearLatest].NET_WORTH.DELTA[monthNow]
    .value as number
  switch (timeframe) {
    case 'MTD':
      return {
        value: valueNow,
        percentage: assetsTables[yearLatest].NET_WORTH.DELTA_PERCENTAGE[
          monthNow
        ].value as string,
      }

    case 'YTD': {
      const lastYear = assetsTables[parseInt(yearLatest, 2) - 1]
      const valueEndOfLastYear = lastYear
        ? (lastYear.NET_WORTH.DELTA[lastYear.NET_WORTH.DELTA.length - 1]
            .value as number)
        : (0 as number)

      return {
        value: valueNow - valueEndOfLastYear,
        percentage: `${(valueNow - valueEndOfLastYear) / valueEndOfLastYear}%`,
      }
    }

    case '1Y': {
      const lastYear = assetsTables[parseInt(yearLatest, 2) - 1]
      const valueEndOfLastYear = lastYear
        ? (lastYear.NET_WORTH.DELTA[monthNow].value as number)
        : (0 as number)

      return {
        value: valueNow - valueEndOfLastYear,
        percentage: `${(valueNow - valueEndOfLastYear) / valueEndOfLastYear}%`,
      }
    }

    default:
      return {
        value: 0,
        percentage: '0%',
      }
  }
}
