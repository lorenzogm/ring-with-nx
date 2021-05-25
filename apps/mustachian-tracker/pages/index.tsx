import { ReactElement } from 'react'
import Typography from '@material-ui/core/Typography'
import { useAuthUser } from 'next-firebase-auth'
import Button from '@ring/components/Button'
import Spreadsheet, { Row } from '@ring/components/Spreadsheet'
import useClientState from 'contexts/useClientState'
import useServerState, { AssetsDoc } from 'contexts/useServerState'
import { db } from 'services/firebase'

export default function AssetsPage(): ReactElement {
  const [serverState] = useServerState()
  const [clientState, { addYear, selectYear, setData }] = useClientState()
  const user = useAuthUser()

  if (serverState.status !== 'SUCCESS') {
    return null
  }

  return (
    <div>
      <Typography variant="h2">Input Data</Typography>

      {Object.keys(clientState.assetsDatasheet)
        .slice(0)
        .reverse()
        .map((year) => (
          <Button
            key={year}
            variant={year === clientState.yearSelected ? 'contained' : 'text'}
            onClick={() => {
              selectYear(year)
            }}
          >
            {year}
          </Button>
        ))}

      <Button onClick={addYear}>Add year</Button>

      <Spreadsheet
        data={clientState.assetsDatasheet[clientState.yearSelected]}
        setData={onCellChanged}
      />
    </div>
  )

  function onCellChanged(data) {
    setData(data)

    const assets: AssetsDoc['assets'] = {
      ...serverState.assetsDoc.assets,
      [clientState.yearSelected]: data
        .filter((_, index) => index > 0)
        .map((row: Row) => {
          return row.reduce(
            (acc, cell, index) => {
              switch (index) {
                case 0:
                  return {
                    ...acc,
                    name: cell.value,
                  }
                case 1:
                  return {
                    ...acc,
                    category: cell.value,
                  }
                case 2:
                  return {
                    ...acc,
                    currency: cell.value,
                  }

                default:
                  return {
                    ...acc,
                    values: [...acc.values, cell.value],
                  }
              }
            },
            { values: [] },
          )
        }),
    }

    if (user.id) {
      db.collection('assets').doc(user.id).set({
        userId: user.id,
        assets,
      })
    } else {
      localStorage.setItem('assets', JSON.stringify({ assets }))
    }
  }
}
