import Button from '@material-ui/core/Button'
import LinkNext, { LinkProps as LinkNextProps } from 'next/link'
import React, { ReactElement, ReactNode } from 'react'

type LinkProps = LinkNextProps & {
  children: ReactNode
}

export default function Link({ children, ...props }: LinkProps): ReactElement {
  return (
    <LinkNext
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      passHref
    >
      <Button>{children}</Button>
    </LinkNext>
  )
}
