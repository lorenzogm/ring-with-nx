import { StoreUserAddress } from '@ring/store'
import { useEffect, useReducer } from 'react'

export function useStoreUserAddress(): State {
  const [state, dispatch] = useReducer(reducer, {
    status: 'LOADING',
    address: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      addressMoreInfo: '',
      postcode: '',
      city: '',
      country: 'España',
    },
  })

  useEffect(() => {
    const addressFromLocalStorage = localStorage.getItem('address')

    if (addressFromLocalStorage) {
      const addressFromLocalStorageParsed: StoreUserAddress = JSON.parse(
        addressFromLocalStorage,
      )

      dispatch({
        type: 'UPDATE_ADDRESS',
        address: addressFromLocalStorageParsed,
      })
    } else {
      dispatch({
        type: 'SUCCESS',
      })
    }
  }, [])

  return state
}

type State = {
  status: 'LOADING' | 'SUCCESS'
  address: StoreUserAddress
}

type Action =
  | { type: 'UPDATE_ADDRESS'; address: StoreUserAddress }
  | { type: 'SUCCESS' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        address: { ...action.address, country: 'España' },
        status: 'SUCCESS',
      }

    case 'SUCCESS':
      return {
        ...state,
        status: 'SUCCESS',
      }

    default:
      return state
  }
}
