import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import firebase from 'firebase/app'
import { Asset } from 'types/index.d'
import get from 'lodash.get'

import { ServerState } from './index.d'
import getValues from './getValues'
import getDelta from './getDelta'
import getExpenses from './getExpenses'
import getSavings from './getSavings'

const Context = createContext(null)

export default function useServerState() {
  const state = useContext(Context)

  return state
}

type ProviderProps = {
  children: ReactNode
}
export function Provider({ children }: ProviderProps): ReactElement {
  const [state, setState] = useState<ServerState>({ status: 'IDLE' })

  useEffect(() => {
    const ref = firebase.database().ref('years')
    ref.on('value', (snapshot) => {
      setData(snapshot.val())
    })
  }, [])

  if (state.status !== 'SUCCESS') {
    return null
  }

  return <Context.Provider value={[state]}>{children}</Context.Provider>

  function setData(data: Array<Asset>) {
    const d = Object.keys(data).reduce((acc, year) => {
      return {
        ...acc,
        [year]: Object.keys(data[year]).reduce((acc, key) => {
          const asset: Asset = data[year][key]

          return {
            ...acc,
            [asset.category]: {
              ...get(acc, asset.category, {}),
              [asset.currency]: getValues({
                key: asset.currency,
                acc,
                asset,
              }),
              ['TOTAL']: getValues({ key: 'TOTAL', acc, asset }),
            },
          }
        }, {}),
      }
    }, {})

    const dataWithDelta = getDelta({ data: d })
    const dataWithExpenses = getExpenses({ data: dataWithDelta })
    const dataWithSavings = getSavings({ data: dataWithExpenses })

    const yearList = Object.keys(d).slice(0).reverse()

    setState({ status: 'SUCCESS', data: dataWithSavings, yearList })
  }
}
