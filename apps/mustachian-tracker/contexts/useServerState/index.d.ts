import { AuthUser } from 'next-firebase-auth'

export type ServerState = {
  status: 'IDLE' | 'LOADING' | 'SUCCESS'
  assetsDoc?: AssetsDoc
  user: AuthUser
}
