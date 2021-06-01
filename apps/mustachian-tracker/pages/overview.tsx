import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ChartXY from '@ring/components/ChartXY'
import Layout from 'components/Layouts/Layout'
import useClientState from 'contexts/useClientState'
import flatten from 'lodash.flatten'
import { withAuthUserTokenSSR } from 'next-firebase-auth'
import { ReactElement } from 'react'

import { isFutureDate } from '../utils/utils'

export const getServerSideProps = withAuthUserTokenSSR()()

export default function DashboardPage(): ReactElement {
  const [clientState] = useClientState()

  const cash = flatten(
    Object.entries(clientState.assetsTables).map(([year, assetsTable]) => {
      return assetsTable.CASH.TOTAL.map((dataPoint, index) => {
        return {
          label: `${year}-${dataPoint.label + 1}-28`,
          Cash: dataPoint.value,
          'Pension Fund': assetsTable.PENSION_FUND.TOTAL[index].value,
          'Private Pension Fund':
            assetsTable.PENSION_FUND_PRIVATE.TOTAL[index].value,
        }
      })
    }),
  )

  const savings = flatten(
    Object.entries(clientState.assetsTables).map(([year, assetsTable]) => {
      return assetsTable.CASH_INCOME.TOTAL.map((dataPoint, index) => {
        if (isFutureDate({ year, month: index + 1 })) {
          return null
        }
        return {
          label: `${year}-${dataPoint.label + 1}-28`,
          Income: dataPoint.value,
          Expenses: assetsTable.CASH_EXPENSES.TOTAL[index].value,
          Savings: assetsTable.CASH_SAVINGS.TOTAL[index].value,
          'Savings %': assetsTable.CASH_SAVINGS.TOTAL_PERCENTAGE[index].value,
        }
      })
    }),
  )

  // const netWorthValue = clientState.assetsDatatable[clientState.yearSelected].TOTAL

  return (
    <Layout>
      <Grid container>
        <Grid item>{/* <MetricText title="Net Worth" value={} /> */}</Grid>
      </Grid>
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
    </Layout>
  )
}
