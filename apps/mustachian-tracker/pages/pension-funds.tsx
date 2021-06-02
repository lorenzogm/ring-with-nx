import Layout from 'components/Layouts/Layout'
import TableWithTitle from 'components/TableWithTitle'
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
      <TableWithTitle
        title="Pension Funds"
        columns={pensionFundColumns}
        data={pensionFundData}
      />
      <TableWithTitle
        title="Private Pension Funds"
        columns={pensionFundsPrivateColumns}
        data={pensionFundsPrivateData}
      />
    </Layout>
  )
}
