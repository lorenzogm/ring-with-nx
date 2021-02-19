import { useEffect, useReducer } from 'react'
import { Address } from 'types/address'

export default function useUserAddress(): State {
  const [state, dispatch] = useReducer(reducer, {
    status: 'LOADING',
    address: {
      firstName: '',
      lastName: '',
      address: '',
      addressMoreInfo: '',
      postalCode: '',
      city: '',
      country: 'España',
    },
  })

  useEffect(() => {
    const addressFromLocalStorage = localStorage.getItem('address')

    if (addressFromLocalStorage) {
      const addressFromLocalStorageParsed: Address = JSON.parse(
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
  address: Address
}

type Action = { type: 'UPDATE_ADDRESS'; address: Address } | { type: 'SUCCESS' }

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
