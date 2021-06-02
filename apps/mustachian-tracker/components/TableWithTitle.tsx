import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Table from '@ring/components/Table'
import { ReactElement } from 'react'
import { Column } from 'react-table'
import { AssetsTableColumns, AssetTableRowCategory } from 'types/index'

type TableWithTitleProps = {
  title: string
  columns: Array<Column> | null
  data: Array<Record<AssetTableRowCategory, AssetsTableColumns>> | null
}
export default function TableWithTitle({
  title,
  columns,
  data,
}: TableWithTitleProps): ReactElement | null {
  if (!columns || !data) {
    return null
  }

  return (
    <Box mb={4}>
      <Typography variant="h3">{title}</Typography>
      <Table columns={columns} data={data} />
    </Box>
  )
}
