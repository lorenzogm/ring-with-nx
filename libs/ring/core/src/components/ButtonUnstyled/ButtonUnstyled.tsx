import { ReactNode } from 'react'
import styled from 'styled-components'

export type ButtonUnstyledProps = {
  children: ReactNode
  onClick?: React.MouseEventHandler
}

export function ButtonUnstyled({
  children,
  onClick,
}: ButtonUnstyledProps): JSX.Element {
  return <Button onClick={onClick}>{children}</Button>
}

const Button = styled.button`
  padding: 0;
  width: 100%;
`
