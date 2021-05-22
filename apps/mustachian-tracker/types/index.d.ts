export type Asset = {
  category: AssetCategories
  currency: string
  values: Array<number | string>
}

export type AssetCategories =
  | 'CASH'
  | 'CASH_INCOME'
  | 'CASH_TRANSFER'
  | 'PILLAR_2'
  | 'PILLAR_3A'
  | 'PILLAR_3A_TRANSFER'
  | 'ETF'
