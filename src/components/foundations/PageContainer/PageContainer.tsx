import { ReactElement, ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
}
export default function PageContainer({
  children,
}: PageContainerProps): ReactElement {
  return <div className="container mx-auto px-5">{children}</div>
}
