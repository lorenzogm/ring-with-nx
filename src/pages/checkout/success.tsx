import { FC, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

import getCMS from 'services/CMS/getCMS'
import CheckoutSuccessTemplate from 'components/templates/CheckoutSuccessTemplate/CheckoutSuccessTemplate'
import type { Config } from 'types/config'
import type { CheckoutSuccessPageState } from 'components/templates/CheckoutSuccessTemplate/checkoutSuccess.d'

type CheckoutSuccessPageProps = {
  config: Config
}

const CheckoutSuccessPage: FC<CheckoutSuccessPageProps> = ({ config }) => {
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

  return <CheckoutSuccessTemplate config={config} pageState={pageState} />
}

export default CheckoutSuccessPage

export const getStaticProps: GetStaticProps = async () => {
  const CMS = getCMS()

  const [config] = await Promise.all([CMS.getConfig({})])

  return {
    props: {
      config,
    },
  }
}
