import { FC, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import getCMS from 'services/CMS/getCMS'
import CheckoutAddressTemplate from 'components/templates/CheckoutAddressTemplate/CheckoutAddressTemplate'
import createAddress from 'services/api/address/createAddress'
import { CheckoutAddressFormValues } from 'components/templates/CheckoutAddressTemplate/checkoutAddress'
import type { Config } from 'types/config'
import type { Address } from 'types/address'

type CheckoutAddressPageProps = {
  config: Config
}

const CheckoutAddressPage: FC<CheckoutAddressPageProps> = ({ config }) => {
  const router = useRouter()

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

  async function onSubmit(values: CheckoutAddressFormValues) {
    await createAddress(values.address)

    await router.push('/checkout/payment')
  }
}

export default CheckoutAddressPage

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig()])

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
