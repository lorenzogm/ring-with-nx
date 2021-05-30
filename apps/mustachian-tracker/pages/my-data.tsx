import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import Button from '@ring/components/Button'
import Spreadsheet, { Datasheet } from '@ring/components/Spreadsheet'
import Layout from 'components/Layouts/Layout'
import useClientState from 'contexts/useClientState'
import useServerState from 'contexts/useServerState'
import { withAuthUserTokenSSR } from 'next-firebase-auth'
import React, { ReactElement } from 'react'
import {
  AssetCategories,
  AssetsDatasheetCell,
  AssetsDatasheetTable,
} from 'types/index.d'

export const getServerSideProps = withAuthUserTokenSSR()()

export default function AssetsPage(): ReactElement {
  const [serverState] = useServerState()
  const [
    clientState,
    { addYear, selectYear, setData, setField },
  ] = useClientState()

  if (serverState.status !== 'SUCCESS') {
    return null
  }

  const data: Datasheet = clientState.assetsDatasheet[
    clientState.yearSelected
  ].map((row, rowIndex) => {
    return row.map((cell: AssetsDatasheetCell, cellIndex: number) => {
      if (rowIndex > 0 && cellIndex === 1) {
        return {
          ...cell,
          forceComponent: true,
          component: (
            <Select
              native
              value={cell.value}
              onChange={(event) => handleChange(event, rowIndex, 1)}
            >
              {Object.entries(AssetCategories).map(([key, value]) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </Select>
          ),
        }
      }
      return cell
    }) as Datasheet
  })

  return (
    <Layout>
      <Typography variant="h2">Input Data</Typography>

      {Object.keys(clientState.assetsDatasheet)
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

      <Button onClick={addYear}>Add year</Button>

      <Spreadsheet data={data} setData={onCellChanged} />
    </Layout>
  )

  function handleChange(event, row, col) {
    const { value } = event.target

    setField(value, row, col)
  }

  function onCellChanged(d: AssetsDatasheetTable) {
    setData(d)
  }
}
