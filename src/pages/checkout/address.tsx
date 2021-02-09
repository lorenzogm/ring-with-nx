import { FC, useEffect, useState } from 'react'

import { Config } from 'services/CMS/config'
import { GetStaticProps } from 'next'
import getCMS from 'services/CMS/getCMS'
import CheckoutAddressTemplate from 'components/templates/CheckoutAddressTemplate/CheckoutAddressTemplate'
import createAddress from 'services/api/user/address/createAddress'
import { Address } from 'services/api/user/address/address'
import { CheckoutAddressFormValues } from 'components/templates/CheckoutAddressTemplate/CheckoutAddressTemplate.d'

type CheckoutAddressPageProps = {
  config: Config
}

const CheckoutAddressPage: FC<CheckoutAddressPageProps> = ({ config }) => {
  const [state, setState] = useState<State>({
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const addressFromLocalStorageParsed: Address = JSON.parse(
        addressFromLocalStorage,
      )

      setState((previousState) => ({
        ...previousState,
        status: 'SUCCESS',
        address: { ...addressFromLocalStorageParsed, country: 'España' },
      }))
    } else {
      setState((previousState) => ({
        ...previousState,
        status: 'SUCCESS',
      }))
    }
  }, [])

  if (state.status === 'LOADING') {
    return null
  }

  return (
    <CheckoutAddressTemplate
      config={config}
      address={state.address}
      onSubmit={onSubmit}
    />
  )
}

export default CheckoutAddressPage

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig()])

  if (!config) {
    throw new Error(`Undefined "config" document. Please define it in the CMS`)
  }

  return {
    props: {
      config,
    },
  }
}

type State = {
  status: 'LOADING' | 'SUCCESS'
  address: Address
}

function onSubmit(values: CheckoutAddressFormValues) {
  createAddress(values.address)
}
