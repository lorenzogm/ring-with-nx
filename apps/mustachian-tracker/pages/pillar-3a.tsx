import Typography from '@material-ui/core/Typography'
import { Table } from '@ring/components/Table'
import Layout from 'components/Layouts/Layout'
import useTableByCurrency from 'hooks/useTableByCurrency'
import { withAuthUserTokenSSR } from 'next-firebase-auth'
import { ReactElement } from 'react'

import useClientState, { AssetCategories } from '../contexts/useClientState'

export const getServerSideProps = withAuthUserTokenSSR()()

export default function Pillar3aPage(): ReactElement {
  const [clientState] = useClientState()
  const { columns, data } = useTableByCurrency({
    assetCategory: AssetCategories.PENSION_FUND_PRIVATE,
    yearSelected: clientState.yearSelected,
  })

  return (
    <Layout>
      <Typography variant="h2">Pillar 3a</Typography>
      <Table columns={columns} data={data} />
    </Layout>
  )
}
