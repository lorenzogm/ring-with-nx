import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import Button from '@ring/components/Button'
import Spreadsheet, {
  SpreadsheetCell,
  SpreadsheetRow,
  SpreadsheetTable,
} from '@ring/components/Spreadsheet'
import Layout from 'components/Layouts/Layout'
import useClientState from 'contexts/useClientState'
import useServerState from 'contexts/useServerState'
import { withAuthUserTokenSSR } from 'next-firebase-auth'
import React, { ReactElement } from 'react'
import { AssetsSpreadsheetsCategory } from 'types/index'

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

  const a = clientState.assetsSpreadsheets[clientState.yearSelected]

  const data = a.map((row: SpreadsheetRow, rowIndex) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return row.map((cell: SpreadsheetCell, cellIndex) => {
      if (rowIndex > 0 && cellIndex === 1) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
          ...cell,
          forceComponent: true,
          component: (
            <Select
              native
              value={cell.value}
              onChange={(event) => handleChange(event, rowIndex, 1)}
            >
              {Object.entries(AssetsSpreadsheetsCategory).map(
                ([key, value]) => (
                  <option value={key} key={key}>
                    {value}
                  </option>
                ),
              )}
            </Select>
          ),
        } as SpreadsheetCell
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cell
    })
  })

  return (
    <Layout>
      <Typography variant="h2">Input Data</Typography>

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

      <Button onClick={addYear}>Add year</Button>

      <Spreadsheet data={data} setData={onCellChanged} />
    </Layout>
  )

  function handleChange(event, row, col) {
    const { value } = event.target

    setField(value, row, col)
  }

  function onCellChanged(d: SpreadsheetTable) {
    setData(d)
  }
}
