import Typography from '@material-ui/core/Typography'
import Table from '@ring/components/Table'
import useTableByCurrency from 'hooks/useTableByCurrency'
import useClientState from '../contexts/useClientState'

export default function PillarPage() {
  const [clientState] = useClientState()

  const { columns, data } = useTableByCurrency({
    assetCategory: 'PILLAR_2',
    yearSelected: clientState.yearSelected,
  })

  return (
    <div>
      <Typography variant="h2">Pillar 2</Typography>
      <Table columns={columns} data={data} />
    </div>
  )
}
