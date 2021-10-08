import {
  addressCreate,
  CheckoutAddressFormValues,
  StoreCheckoutAddressTemplate,
} from '@ring/core/index'
import { Storyblok } from '@ring/storyblok/services'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export const getStaticProps: GetStaticProps = async ({ locale, preview }) => {
  const sbParams = {
    version: 'draft', // or 'draft'
    language: locale,
    ...(preview ? { cv: Date.now() } : {}),
  }
  const config = await Storyblok.get(`cdn/stories/global/config`, sbParams)

  return {
    props: {
      config,
    },
    revalidate: 1,
  }
}

export default function CheckoutAddressPage(): ReactElement | null {
  const router = useRouter()

  return <StoreCheckoutAddressTemplate onSubmit={onSubmit} />

  async function onSubmit(values: CheckoutAddressFormValues) {
    await addressCreate(values.address)

    await router.push('/store/checkout/payment')
  }
}
