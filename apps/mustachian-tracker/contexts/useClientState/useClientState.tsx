import { SpreadsheetTable } from '@ring/components/Spreadsheet'
import getAssetsSpreadsheets from 'contexts/useClientState/getAssetsSpreadsheets'
import getAssetsTables from 'contexts/useClientState/getAssetsTables'
import useServerState from 'contexts/useServerState'
import merge from 'lodash.merge'
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from 'react'
import {
  AssetsMetrics,
  AssetsSpreadsheets,
  AssetsTablePerYear,
  Timeframe,
} from 'types/index'

import getAssetsMetrics from './getAssetsMetrics'

const Context = createContext(null)

export type UseClientState = [
  ClientState,
  {
    addYear: (year) => void
    selectYear: (year: string) => void
    selectTimeframe: (timeframe: string) => void
    setData: (data: SpreadsheetTable) => void
    setField: (value: string, row: number, col: number) => void
  },
]
export default function useClientState(): UseClientState {
  const state = useContext<UseClientState>(Context)

  return state
}

type ProviderProps = {
  children: ReactNode
}
export function Provider({ children }: ProviderProps): ReactElement {
  const [serverState, { setAssetsDoc }] = useServerState()

  const assetsSpreadsheets = getAssetsSpreadsheets(serverState.assetsDoc)
  const assetsTables = getAssetsTables(serverState.assetsDoc)
  const assetsMetrics = getAssetsMetrics(assetsTables)

  const [state, setState] = useState<ClientState>({
    yearSelected: Object.keys(assetsSpreadsheets).slice(0).reverse()[0],
    timeframeSelected: '1Y',

    assetsSpreadsheets,
    assetsTables,
    assetsMetrics,
  })

  return (
    <Context.Provider
      value={[
        state,
        { addYear, selectYear, selectTimeframe, setData, setField },
      ]}
    >
      {children}
    </Context.Provider>
  )

  function setData(data: SpreadsheetTable) {
    setState((s) => {
      setAssetsDoc(s.yearSelected, data)

      return {
        ...s,
        assetsSpreadsheets: {
          ...s.assetsSpreadsheets,
          [state.yearSelected]: data,
        },
      }
    })
  }

  function setField(value, row, col) {
    setState((s) => {
      const data = s.assetsSpreadsheets[state.yearSelected]
      const dataUpdated = data

      dataUpdated[row][col] = { ...data[row][col], value }

      setAssetsDoc(s.yearSelected, dataUpdated)

      return {
        ...s,
        assetsSpreadsheets: {
          ...s.assetsSpreadsheets,
          [state.yearSelected]: dataUpdated,
        },
      }
    })
  }

  function selectYear(year) {
    setState((s) => ({ ...s, yearSelected: year }))
  }

  function selectTimeframe(timeframe) {
    setState((s) => ({ ...s, timeframeSelected: timeframe }))
  }

  function addYear() {
    const year =
      Math.min(
        ...Object.keys(state.assetsSpreadsheets).map((y) => parseInt(y, 10)),
      ) - 1
    const assetsDoc = merge(serverState.assetsDoc, {
      assets: {
        [year]: [],
      },
    })

    setState((s) => ({
      ...s,
      assetsSpreadsheets: getAssetsSpreadsheets(assetsDoc),
      yearSelected: year.toString(),
    }))
  }
}

export type ClientState = {
  assetsSpreadsheets: AssetsSpreadsheets
  assetsTables: AssetsTablePerYear
  yearSelected: string
  assetsMetrics: AssetsMetrics
  timeframeSelected: Timeframe
}
