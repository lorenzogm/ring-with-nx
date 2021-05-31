import { SpreadsheetTable } from '@ring/components/Spreadsheet'
import { AuthUser } from 'next-firebase-auth'
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { db } from 'services/firebase'
import { Asset, AssetsDoc } from 'types/index'

import getAssets from './getAssets'

const Context = createContext(null)

type UseServerState = [
  ServerState,
  { setAssetsDoc: (yearSelected: string, data: SpreadsheetTable) => void },
]
export default function useServerState(): UseServerState {
  const state = useContext<UseServerState>(Context)

  return state
}

type ProviderProps = {
  children: ReactNode
  user: AuthUser
}
export function Provider({ children, user }: ProviderProps): ReactElement {
  const [state, setState] = useState<ServerState>({ status: 'IDLE', user })

  useEffect(() => {
    if (state.status === 'IDLE') {
      getAssets({ user })
        .then((assetsDoc) => {
          setState((s) => ({
            ...s,
            status: 'SUCCESS',
            assetsDoc,
          }))
        })
        .catch((e) => {
          throw e
        })
    }
  }, [state.status, user])

  if (state.status !== 'SUCCESS') {
    return null
  }

  return (
    <Context.Provider value={[state, { setAssetsDoc }]}>
      {children}
    </Context.Provider>
  )

  function setAssetsDoc(yearSelected: string, data: SpreadsheetTable) {
    const assets = {
      ...state.assetsDoc.assets,
      [yearSelected]: data
        .filter((_, index) => index > 0)
        .map((row) => {
          return row.reduce(
            (acc, cell, index) => {
              switch (index) {
                case 0:
                  return {
                    ...acc,
                    name: cell.value,
                  } as Asset

                case 1:
                  return {
                    ...acc,
                    category: cell.value,
                  } as Asset

                case 2:
                  return {
                    ...acc,
                    currency: cell.value,
                  } as Asset

                default:
                  return {
                    ...acc,
                    values: [...acc.values, cell.value],
                  } as Asset
              }
            },
            { values: [] },
          ) as Asset
        }),
    }

    if (user.id) {
      db.collection('assets')
        .doc(user.id)
        .set({
          userId: user.id,
          assets,
        })
        .catch((e) => {
          throw e
        })
    } else {
      localStorage.setItem('assets', JSON.stringify({ assets }))
    }
  }
}

export type ServerState = {
  status: 'IDLE' | 'LOADING' | 'SUCCESS'
  assetsDoc?: AssetsDoc
  user: AuthUser
}
