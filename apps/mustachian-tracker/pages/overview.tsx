import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ChartXY from '@ring/components/ChartXY'
import Layout from 'components/Layouts/Layout'
import useClientState, { AssetCategories } from 'contexts/useClientState'
import flatten from 'lodash.flatten'
import { withAuthUserTokenSSR } from 'next-firebase-auth'
import { ReactElement } from 'react'

import { isFutureDate } from '../utils/utils'

export const getServerSideProps = withAuthUserTokenSSR()()

export default function DashboardPage(): ReactElement {
  const [clientState] = useClientState()

  const cash = flatten(
    Object.keys(clientState.assetsDatatable).map((year) => {
      return clientState.assetsDatatable[year].CASH.TOTAL.map(
        (dataPoint, index) => {
          return {
            label: `${year}-${dataPoint.label + 1}-28`,
            Cash: dataPoint.value,
            [AssetCategories.PENSION_FUND]:
              clientState.assetsDatatable[year].PENSION_FUND.TOTAL[index].value,
            [AssetCategories.PENSION_FUND_PRIVATE]:
              clientState.assetsDatatable[year].PENSION_FUND_PRIVATE.TOTAL[
                index
              ].value,
          }
        },
      )
    }),
  )

  const savings = flatten(
    Object.keys(clientState.assetsDatatable).map((year) => {
      return clientState.assetsDatatable[year].CASH_INCOME.TOTAL.map(
        (dataPoint, index) => {
          if (isFutureDate({ year, month: index + 1 })) {
            return null
          }
          return {
            label: `${year}-${dataPoint.label + 1}-28`,
            Income: dataPoint.value,
            Expenses:
              clientState.assetsDatatable[year].CASH_EXPENSES.TOTAL[index]
                .value,
            Savings:
              clientState.assetsDatatable[year].CASH_SAVINGS.TOTAL[index].value,
            'Savings %':
              clientState.assetsDatatable[year].CASH_SAVINGS.TOTAL_PERCENTAGE[
                index
              ].value,
          }
        },
      )
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
type MetricTextProps = {
  title: string
  value: string | number
  percentage: string
}

function MetricText({ title, value, percentage }) {
  return (
    <>
      <Typography>{title}</Typography>
      <Typography>{percentage}</Typography>
      <Typography>{value}</Typography>
    </>
  )
}
