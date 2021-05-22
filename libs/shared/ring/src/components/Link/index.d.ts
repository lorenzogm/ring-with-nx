export type LinkProps = {
  href: string
  onClick?: () => void
  text: string
  startIcon?: string
  endIcon?: string
  variant?: 'button' | 'link'
  component: FC
}
export type LinkParsed = LinkProps & {
  type: 'link'
}
