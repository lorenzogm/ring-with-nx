import type { Asset } from 'types/index.d'

export type ServerState =
  | {
      status: 'IDLE'
    }
  | {
      status: 'SUCCESS'
      data: unknown
      yearList: Array<string>
    }

type Data = Record<string, Array<Asset>>
