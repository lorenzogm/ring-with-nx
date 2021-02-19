import { ReactElement, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

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
  }
}

export default function CheckoutSuccessPage({
  config,
}: CheckoutSuccessPageProps): ReactElement | null {
  const [pageState, setPageState] = useState<CheckoutSuccessPageState>({
    status: 'LOADING',
  })

  useEffect(() => {
    const orderId = localStorage.getItem('orderId')
    if (orderId) {
      setPageState({ status: 'SUCCESS', orderId })
    } else {
      setPageState({ status: 'ERROR' })
    }
  }, [])

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
