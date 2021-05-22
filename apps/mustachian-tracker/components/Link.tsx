import LinkNext, { LinkProps as LinkNextProps } from 'next/link'
import React, { ReactElement, ReactNode } from 'react'
import Button from '@material-ui/core/Button'

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
      <Button variant="contained">{children}</Button>
    </LinkNext>
  )
}
