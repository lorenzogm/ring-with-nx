import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@ring/components/Table'
import Layout from 'components/Layouts/Layout'
import useTableByCurrency from 'hooks/useTableByCurrency'
import { withAuthUserTokenSSR } from 'next-firebase-auth'
import { ReactElement } from 'react'

export const getServerSideProps = withAuthUserTokenSSR()()

export default function PillarPage(): ReactElement {
  const {
    columns: pensionFundColumns,
    data: pensionFundData,
  } = useTableByCurrency({
    assetCategory: 'PENSION_FUND',
  })
  const {
    columns: pensionFundsPrivateColumns,
    data: pensionFundsPrivateData,
  } = useTableByCurrency({
    assetCategory: 'PENSION_FUND_PRIVATE',
  })

  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h2">Pension Funds</Typography>
        <Table columns={pensionFundColumns} data={pensionFundData} />
      </Box>

      <Box mb={4}>
        <Typography variant="h2">Private Pension Funds</Typography>
        <Table
          columns={pensionFundsPrivateColumns}
          data={pensionFundsPrivateData}
        />
      </Box>
    </Layout>
  )
}
