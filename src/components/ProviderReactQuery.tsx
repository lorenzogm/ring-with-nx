import { ReactElement, ReactNode } from 'react'
// import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

type ProviderReactQueryProps = {
  children: ReactNode
}

export default function ProviderReactQuery({
  children,
}: ProviderReactQueryProps): ReactElement {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      {/* <ReactQueryDevtools /> */}
    </>
  )
}
