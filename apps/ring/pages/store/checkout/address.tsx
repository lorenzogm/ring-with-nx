import {
  addressCreate,
  CheckoutAddressFormValues,
  LayoutCheckout,
  StoreCheckoutAddressTemplate,
  useStoreUserAddress,
} from '@ring/store'
import { getConfig } from '@ring/storyblok'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const config = await getConfig({ locale, preview })

  return {
    props: {
      config,
    },
    revalidate: 1,
  }
}

export default function CheckoutAddressPage(): ReactElement | null {
  const router = useRouter()
  const { address, status } = useStoreUserAddress()

  return (
    <LayoutCheckout activeStep={0}>
      {status === 'SUCCESS' ? (
        <StoreCheckoutAddressTemplate address={address} onSubmit={onSubmit} />
      ) : null}
    </LayoutCheckout>
  )

  async function onSubmit(values: CheckoutAddressFormValues) {
    await addressCreate(values.address)

    await router.push('/store/checkout/payment')
  }
}
