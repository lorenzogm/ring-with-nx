import ReactDatasheet from 'react-datasheet'
import styled from 'styled-components'
import Button from '@ring/components/Button'

import 'react-datasheet/lib/react-datasheet.css'

type SpreadsheetProps = {
  data: SpreadsheetTable
  setData: (data: SpreadsheetTable) => void
}

export default function Spreadsheet({ data, setData }: SpreadsheetProps) {
  const valueRenderer: ReactDatasheet.ValueRenderer<
    ReactDatasheet.Cell<any, any>,
    unknown
    // @ts-expect-error no idea, no time
  > = (cell) => cell.value
  const onCellsChanged: ReactDatasheet.CellsChangedHandler<
    ReactDatasheet.Cell<any, any>,
    unknown
  > = (changes) => {
    const dataUpdated = data
    changes.map(({ row, col, value }) => {
      dataUpdated[row][col] = { ...data[row][col], value: value as string }
    })

    setData(dataUpdated)
  }
  const onContextMenu: ReactDatasheet.ContextMenuHandler<
    ReactDatasheet.Cell<any, any>,
    unknown
  > = (e, cell) => (cell.readOnly ? e.preventDefault() : null)

  return (
    <>
      <ReactDatasheetStyled
        data={data as ReactDatasheet.Cell<any, any>[][]}
        valueRenderer={valueRenderer}
        onContextMenu={onContextMenu}
        onCellsChanged={onCellsChanged}
      />
      <Button onClick={addRow}>Add row</Button>
    </>
  )

  function addRow() {
    setData([
      ...data,
      Array.from({ length: data[0].length }, () => ({ value: '' })),
    ])
  }
}

const ReactDatasheetStyled = styled(ReactDatasheet)`
  width: 100%;
`

export type SpreadsheetTable = Array<SpreadsheetRow>
export type SpreadsheetRow = Array<SpreadsheetCell>
export type SpreadsheetCell = { value: string }
