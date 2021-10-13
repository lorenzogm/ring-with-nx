import {
  StoreCheckoutPaymentFormValues,
  StoreCheckoutPaymentTemplate,
} from '@ring/store'
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

export default function CheckoutPaymentPage(): ReactElement | null {
  const router = useRouter()

  return <StoreCheckoutPaymentTemplate onSubmit={onSubmit} />

  async function onSubmit(values: StoreCheckoutPaymentFormValues) {
    localStorage.setItem('paymentMethod', values.paymentMethod)

    await router.push('/store/checkout/confirmation')
  }
}
