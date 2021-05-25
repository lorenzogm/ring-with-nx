import { GridElement } from '@ring/components/Spreadsheet'

export type ClientState = {
  assetsDatasheet?: AssetsDatasheet
  assetsDatatable?: AssetsDatatable
  yearSelected: string
}

export type AssetsDatatable = Record<string, DatatableTable>

export type DatatableTable = Record<string, DatatableRow>
export type DatatableRow = Record<string, DatatableCell>

export type DatatableCell = {
  label: number
  value: number
}

export type AssetsDatasheet = Record<string, Array<Array<GridElement>>>
