export type SpreadsheetProps = {
  data: Datasheet
  setData: (data) => void
}

export type Datasheet = Array<Row>
export type Row = Array<Cell>
export type Cell = { value: string }
