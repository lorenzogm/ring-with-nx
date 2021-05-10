import LinkNext, { LinkProps as LinkNextProps } from 'next/link'
import React, { ReactElement, ReactNode } from 'react'
import LinkRing from '@ring/components/Link'

type LinkProps = LinkNextProps & {
  onClick?: () => void
  children: ReactNode
}

export default function Link({
  children,
  onClick,
  ...rest
}: LinkProps): ReactElement {
  return (
    <LinkNext
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      passHref
    >
      <LinkRing onClick={onClick}>{children}</LinkRing>
    </LinkNext>
  )
}
