import Typography from '@material-ui/core/Typography'
import Table from '@ring/components/Table'
import useTableByCurrency from 'hooks/useTableByCurrency'
import useClientState from '../contexts/useClientState'

export default function Pillar3aPage() {
  const [clientState] = useClientState()
  const { columns, data } = useTableByCurrency({
    assetCategory: 'PILLAR_3A',
    yearSelected: clientState.yearSelected,
  })

  return (
    <>
      <Typography variant="h2">Pillar 3a</Typography>
      <Table columns={columns} data={data} />
    </>
  )
}
