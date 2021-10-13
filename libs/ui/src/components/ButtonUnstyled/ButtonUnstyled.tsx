import { styled } from '@ring/ui/theme'
import { ReactNode } from 'react'

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
