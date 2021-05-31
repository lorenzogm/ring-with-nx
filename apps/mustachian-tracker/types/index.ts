import { SpreadsheetTable } from '@ring/components/Spreadsheet'

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

export type AssetCategory =
  | 'CASH'
  | 'CASH_INCOME'
  | 'CASH_EXPENSES'
  | 'CASH_SAVINGS'
  | 'CASH_TRANSFER'
  | 'PENSION_FUND'
  | 'PENSION_FUND_PRIVATE'
  | 'PENSION_FUND_PRIVATE_TRANSFER'

// AssetsTables
export type Year = string
export type AssetsTablePerYear = Record<Year, AssetsTable>
export type AssetsTable = Record<AssetCategory, AssetsTableRowPerCategory>
export type AssetsTableRowPerCategory = Record<
  AssetTableRowCategory,
  AssetsTableRow
>
export type AssetsTableRow = Array<AssetsTableCell>
export type AssetsTableCell = {
  label: number
  value: number | string
}
export type AssetTableRowCategory =
  | 'TOTAL'
  | 'TOTAL_PERCENTAGE'
  | 'DELTA'
  | 'DELTA_PERCENTAGE'

// AssetsSpreadsheets
export type AssetsSpreadsheets = Record<string, SpreadsheetTable>
export enum AssetsSpreadsheetsCategory {
  'CASH' = 'Cash',
  'CASH_INCOME' = 'Income',
  'PENSION_FUND' = 'Pension Fund',
  'PENSION_FUND_PRIVATE' = 'Private Pension Fund',
  'PENSION_FUND_PRIVATE_TRANSFER' = 'Transfer to Private Pension Fund',
}

// AssetsMetrics
export type AssetsMetrics = Record<Timeframe, AssetsMetricsPerTimeframe>

export type Timeframe = 'MTD' | 'YTD' | '1Y'

export type AssetsMetricsPerTimeframe = {
  netWorth: {
    value: number
  }
  savings: {
    percentage: string
    value: number
  }
}
