import { ReactElement, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { useShoppingCart } from 'use-shopping-cart'

import getCMS from 'services/CMS/getCMS'
import CheckoutSuccessTemplate from 'components/templates/CheckoutSuccessTemplate'
import type { Config } from 'types/config'

type CheckoutSuccessPageProps = {
  config: Config
}

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig({})])

  return {
    props: {
      config,
    },
    revalidate: 1,
  }
}

export default function CheckoutSuccessPage({
  config,
}: CheckoutSuccessPageProps): ReactElement | null {
  const [pageState, setPageState] = useState<CheckoutSuccessPageState>({
    status: 'LOADING',
  })

  const { clearCart } = useShoppingCart()

  useEffect(() => {
    const orderId = localStorage.getItem('orderId')
    if (orderId) {
      setPageState({ status: 'SUCCESS', orderId })

      clearCart()
    } else {
      setPageState({ status: 'ERROR' })
    }
  }, [clearCart])

  if (pageState.status === 'LOADING') {
    return <div>Loading...</div>
  }

  if (pageState.status === 'ERROR') {
    return <div>Error</div>
  }

  return (
    <CheckoutSuccessTemplate
      config={config}
      orderId={pageState.orderId as string}
    />
  )
}

export type CheckoutSuccessPageState = {
  status: 'LOADING' | 'SUCCESS' | 'ERROR'
  orderId?: string
}
