/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import LinkNext, { LinkProps as LinkNextProps } from 'next/link'
import type { ReactElement, ReactNode } from 'react'

export type LinkProps = LinkNextProps & {
  ariaLabel?: string
  children: ReactNode
  target?: string
  className?: string
  rel?: string
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
  onMouseEnter?: (event: React.MouseEvent<Element, MouseEvent>) => void
}

export function Link({
  ariaLabel,
  children,
  target,
  className,
  onClick,
  onMouseEnter,
  rel,
  ...rest
}: LinkProps): ReactElement {
  return (
    <LinkNext {...rest} passHref>
      <a
        className={className}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        onMouseEnter={onMouseEnter}
      >
        {children}
      </a>
    </LinkNext>
  )
}
