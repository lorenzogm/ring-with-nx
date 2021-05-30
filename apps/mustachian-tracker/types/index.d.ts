import { Cell } from '@ring/components/Spreadsheet'

export type AssetsDoc = {
  userId?: string
  assets: Record<string, Array<Asset>>
}

export type Asset = {
  name: string
  category: string
  currency: string
  values: Array<number | string>
}

export type AssetsDatatable = Record<string, DatatableTable>

export type DatatableTable = Record<string, DatatableRow>
export type DatatableRow = Record<string, DatatableCell>

export type DatatableCell = {
  label: number
  value: number
}

export type AssetsDatasheet = Record<string, AssetsDatasheetTable>
export type AssetsDatasheetTable = Array<AssetsDatasheetRow>
export type AssetsDatasheetRow = Array<AssetsDatasheetCell>
export type AssetsDatasheetCell = Cell

export type AssetMetrics = Record<Timeframe, AssetMetricsPerTimeframe>

export type Timeframe = 'MTD' | 'YTD' | '1Y'

export type AssetMetricsPerTimeframe = {
  netWorth: {
    value: number
  }
  savings: {
    percentage: string
    value: number
  }
}

export enum AssetCategories {
  'CASH' = 'Cash',
  'CASH_INCOME' = 'Income',
  'PENSION_FUND' = 'Pension Fund',
  'PENSION_FUND_PRIVATE' = 'Private Pension Fund',
  'PENSION_FUND_PRIVATE_TRANSFER' = 'Transfer to Private Pension Fund',
}
