import { ReactNode } from 'react'

export type LinkProps = {
  href: string
  onClick?: () => void
  text?: string
  startIcon?: string
  endIcon?: string
  variant?: 'button' | 'link'
  component?: FC
  children?: ReactNode
}
export type LinkParsed = Omit<LinkProps, 'component'> & {
  type: 'link'
}
