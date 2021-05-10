import { ReactElement, ReactNode } from 'react';
// import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

type ReactQueryProviderProps = {
  children: ReactNode;
};

export default ReactQueryProvider;
export function ReactQueryProvider({
  children,
}: ReactQueryProviderProps): ReactElement {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      {/* <ReactQueryDevtools /> */}
    </>
  );
}
