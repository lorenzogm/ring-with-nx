import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Table from '@ring/components/Table'
import useTableByCurrency from 'hooks/useTableByCurrency'
import useClientState from '../contexts/useClientState'

export default function Index() {
  const [clientState] = useClientState()
  const { columns, data } = useTableByCurrency({
    assetCategory: 'CASH',
    yearSelected: clientState.yearSelected,
  })
  const { columns: incomeColumns, data: incomeData } = useTableByCurrency({
    assetCategory: 'CASH_INCOME',
    yearSelected: clientState.yearSelected,
  })
  const { columns: expensesColumns, data: expensesData } = useTableByCurrency({
    assetCategory: 'CASH_EXPENSES',
    yearSelected: clientState.yearSelected,
  })
  const { columns: savingsColumns, data: savingsData } = useTableByCurrency({
    assetCategory: 'CASH_SAVINGS',
    yearSelected: clientState.yearSelected,
  })
  const { columns: transfersColumns, data: transfersData } = useTableByCurrency(
    {
      assetCategory: 'CASH_TRANSFER',
      yearSelected: clientState.yearSelected,
    },
  )

  return (
    <>
      <Box mb={4}>
        <Typography variant="h2">Cash</Typography>
        <Table columns={columns} data={data} />
      </Box>

      <Box mb={4}>
        <Typography variant="h3">Income</Typography>
        <Table columns={incomeColumns} data={incomeData} />
      </Box>

      <Box mb={4}>
        <Typography variant="h3">Expenses</Typography>
        <Table columns={expensesColumns} data={expensesData} />
      </Box>

      <Box mb={4}>
        <Typography variant="h3">Savings</Typography>
        <Table columns={savingsColumns} data={savingsData} />
      </Box>

      <Box mb={4}>
        <Typography variant="h3">Transfers</Typography>
        <Table columns={transfersColumns} data={transfersData} />
      </Box>
    </>
  )
}
