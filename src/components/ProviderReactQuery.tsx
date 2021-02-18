import { ReactElement, ReactNode, useEffect } from 'react'
// import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

type ProviderReactQueryProps = {
  children: ReactNode
}

export default function ProviderReactQuery({
  children,
}: ProviderReactQueryProps): ReactElement {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      {/* <ReactQueryDevtools /> */}
    </>
  )
}
