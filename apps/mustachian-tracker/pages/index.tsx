import flatten from 'lodash.flatten'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ChartXY from '@ring/components/ChartXY'
import useServerState from 'contexts/useServerState'
import { isFutureDate } from '../utils/utils'

export default function Index() {
  const [serverState] = useServerState()

  const cash = flatten(
    Object.keys(serverState.data).map((year) => {
      return serverState.data[year]['CASH']['TOTAL'].map((dataPoint, index) => {
        return {
          label: `${year}-${dataPoint.label + 1}-28`,
          ['Cash']: dataPoint.value,
          ['Pillar 2']:
            serverState.data[year]['PILLAR_2']['TOTAL'][index].value,
          ['Pillar 3a']:
            serverState.data[year]['PILLAR_3A']['TOTAL'][index].value,
        }
      })
    }),
  )

  const savings = flatten(
    Object.keys(serverState.data).map((year) => {
      return serverState.data[year]['CASH_INCOME']['TOTAL'].map(
        (dataPoint, index) => {
          if (isFutureDate({ year, month: index + 1 })) {
            return null
          }
          return {
            label: `${year}-${dataPoint.label + 1}-28`,
            ['Income']: dataPoint.value,
            ['Expenses']:
              serverState.data[year]['CASH_EXPENSES']['TOTAL'][index].value,
            ['Savings']:
              serverState.data[year]['CASH_SAVINGS']['TOTAL'][index].value,
            ['Savings %']:
              serverState.data[year]['CASH_SAVINGS']['TOTAL_PERCENTAGE'][index]
                .value,
          }
        },
      )
    }),
  )

  return (
    <>
      <Box mb={4}>
        <Typography variant="h2">Net Worth</Typography>
        <ChartXY
          width={1000}
          height={400}
          data={cash}
          // @ts-expect-error in the ChartXY they should be required, but it use a default config
          config={{
            chartType: 'BarStack',
            yAxis: {
              label: 'CHF',
            },
          }}
        />
      </Box>

      <Box mb={4}>
        <Typography variant="h2">Savings</Typography>
        <ChartXY
          width={1000}
          height={400}
          data={savings}
          // @ts-expect-error in the ChartXY they should be required, but it use a default config
          config={{
            chartType: 'LineSeries',
            yAxis: {
              label: 'CHF',
            },
          }}
        />
      </Box>
    </>
  )
}
