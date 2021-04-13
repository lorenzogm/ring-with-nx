import { ReactElement } from 'react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import getCMS from 'services/CMS/getCMS'
import CheckoutAddressTemplate, {
  CheckoutAddressFormValues,
} from 'components/templates/CheckoutAddressTemplate'
import createAddress from 'services/api/address/createAddress'
import type { Config } from 'types/config'
import useUserAddress from 'hooks/useUserAddress'

const { CONFIG_STORE } = process.env

type CheckoutAddressPageProps = {
  config: Config
}

export const getStaticProps: GetStaticProps = async () => {
  if (CONFIG_STORE !== 'ENABLED') {
    return {
      props: {
        isPageEnabled: false,
      },
    }
  }

  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig({})])

  return {
    props: {
      config,
    },
    revalidate: 1,
  }
}

export default function CheckoutAddressPage({
  config,
}: CheckoutAddressPageProps): ReactElement | null {
  const router = useRouter()

  const { status, address } = useUserAddress()

  if (status === 'LOADING') {
    return null
  }

  return (
    <CheckoutAddressTemplate
      config={config}
      address={address}
      onSubmit={onSubmit}
    />
  )

  async function onSubmit(values: CheckoutAddressFormValues) {
    await createAddress(values.address)

    await router.push('/store/checkout/payment')
  }
}
