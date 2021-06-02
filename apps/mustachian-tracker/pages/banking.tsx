import Box from '@material-ui/core/Box'
import Button from '@ring/components/Button'
import Layout from 'components/Layouts/Layout'
import TableWithTitle from 'components/TableWithTitle'
import useTableByCurrency from 'hooks/useTableByCurrency'
import { withAuthUserTokenSSR } from 'next-firebase-auth'
import { ReactElement } from 'react'

import useClientState from '../contexts/useClientState'

export const getServerSideProps = withAuthUserTokenSSR()()

export default function CashPage(): ReactElement {
  const [clientState, { selectYear }] = useClientState()
  const { columns, data } = useTableByCurrency({
    assetCategory: 'CASH',
  })
  const { columns: incomeColumns, data: incomeData } = useTableByCurrency({
    assetCategory: 'CASH_INCOME',
  })
  const { columns: expensesColumns, data: expensesData } = useTableByCurrency({
    assetCategory: 'CASH_EXPENSES',
  })
  const { columns: savingsColumns, data: savingsData } = useTableByCurrency({
    assetCategory: 'CASH_SAVINGS',
  })
  const { columns: transfersColumns, data: transfersData } = useTableByCurrency(
    {
      assetCategory: 'CASH_TRANSFER',
    },
  )

  return (
    <Layout>
      <Box mb={4}>
        {Object.keys(clientState.assetsSpreadsheets)
          .slice(0)
          .reverse()
          .map((year) => (
            <Button
              key={year}
              variant={year === clientState.yearSelected ? 'contained' : 'text'}
              onClick={() => {
                selectYear(year)
              }}
            >
              {year}
            </Button>
          ))}
      </Box>

      <TableWithTitle title="Cash" columns={columns} data={data} />
      <TableWithTitle
        title="Income"
        columns={incomeColumns}
        data={incomeData}
      />
      <TableWithTitle
        title="Expenses"
        columns={expensesColumns}
        data={expensesData}
      />
      <TableWithTitle
        title="Savings"
        columns={savingsColumns}
        data={savingsData}
      />
      <TableWithTitle
        title="Transfers"
        columns={transfersColumns}
        data={transfersData}
      />
    </Layout>
  )
}
