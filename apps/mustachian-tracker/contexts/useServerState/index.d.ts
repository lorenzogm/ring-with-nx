export type ServerState = {
  status: 'IDLE' | 'SUCCESS'
  assetsDoc?: AssetsDoc
}

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
