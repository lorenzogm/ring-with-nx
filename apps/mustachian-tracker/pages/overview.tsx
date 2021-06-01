import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import Button from '@ring/components/Button'
import ChartXY from '@ring/components/ChartXY'
import Layout from 'components/Layouts/Layout'
import useClientState from 'contexts/useClientState'
import flatten from 'lodash.flatten'
import { withAuthUserTokenSSR } from 'next-firebase-auth'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Timeframes } from 'types/index'

import { isFutureDate } from '../utils/utils'

export const getServerSideProps = withAuthUserTokenSSR()()

export default function DashboardPage(): ReactElement {
  const [clientState, { selectTimeframe }] = useClientState()

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

  const assetsMetricsPerTimeframe =
    clientState.assetsMetrics[clientState.timeframeSelected]

  return (
    <Layout>
      {Object.keys(Timeframes).map((timeframe) => (
        <Button
          key={timeframe}
          variant={
            timeframe === clientState.timeframeSelected ? 'contained' : 'text'
          }
          onClick={() => {
            selectTimeframe(timeframe)
          }}
        >
          {timeframe}
        </Button>
      ))}
      <Grid container>
        <Grid item xs={6} sm={3}>
          <MetricText
            title="Net Worth"
            value={assetsMetricsPerTimeframe.netWorth.value}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <MetricText
            title="Net Worth Delta"
            value={assetsMetricsPerTimeframe.netWorthDelta.value}
            percentage={assetsMetricsPerTimeframe.netWorthDelta.percentage}
            type="diff"
          />
        </Grid>
        {/* <Grid item xs={6} sm={3}>
          <MetricText title="Net Worth" value={0} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <MetricText title="Net Worth" value={0} />
        </Grid> */}
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
  percentage?: string
  type?: 'value' | 'diff'
}

function MetricText({
  title,
  value,
  percentage,
  type = 'value',
}: MetricTextProps) {
  return (
    <Box mb={2}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Box mr={2}>
          <MetricTextValue variant="h4" type={type}>
            {percentage || value}
          </MetricTextValue>
        </Box>
        {percentage ? (
          <MetricTextValue type={type}>{value}</MetricTextValue>
        ) : null}
      </Grid>
    </Box>
  )
}

type MetricTextValueProps = {
  children: string | number
} & Pick<TypographyProps, 'variant'> &
  Pick<MetricTextProps, 'type'>
function MetricTextValue({ children, type, variant }: MetricTextValueProps) {
  const isPositive =
    typeof children === 'string'
      ? parseFloat(children.replace('%', '')) > 0
      : children > 0
  const isNegative =
    typeof children === 'string'
      ? parseFloat(children.replace('%', '')) > 0
      : children < 0

  const fontColor =
    // eslint-disable-next-line no-nested-ternary
    type === 'value'
      ? null
      : // eslint-disable-next-line no-nested-ternary
      isPositive
      ? 'lightgreen'
      : isNegative
      ? 'red'
      : null

  return (
    <TypographyStyled variant={variant} fontColor={fontColor}>
      <>
        {type === 'diff' && isPositive ? '+' : null}
        {children}
      </>
    </TypographyStyled>
  )
}

const TypographyStyled = styled(Typography)`
  ${({ fontColor }: { fontColor: 'red' | 'lightgreen' | null }) => `
    ${fontColor !== null && `color: ${fontColor}`}
  `}
`
