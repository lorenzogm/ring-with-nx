import type { ReactNode } from 'react'
import styled from 'styled-components'

import { useRing } from '../../providers'

export type LinkProps = {
  href: string
  children: ReactNode
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
  onMouseEnter?: (event: React.MouseEvent<Element, MouseEvent>) => void
  download?: boolean
  className?: string
  color?: string
  variant?: string
  size?: string
  target?: string
  rel?: string
  ariaLabel?: string
}

export function Link({
  children,
  href,
  onClick,
  onMouseEnter,
  download,
  className,
  target,
  rel,
  ariaLabel,
}: LinkProps): JSX.Element {
  const { components } = useRing()
  const { Link: LinkRing } = components
  const relUpdated = useRel({ rel, target })

  if (LinkRing) {
    return (
      <LinkStyled
        href={href}
        as={LinkRing || LinkStyled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        className={className}
        target={target}
        rel={relUpdated}
        ariaLabel={ariaLabel}
      >
        {children}
      </LinkStyled>
    )
  }

  return (
    <LinkStyled
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      download={download}
      className={className}
      target={target}
      rel={relUpdated}
    >
      {children}
    </LinkStyled>
  )
}

const LinkStyled = styled.a`
  cursor: pointer;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`

type UseRelProps = {
  rel?: string
  target?: string
}

export function useRel({ rel, target }: UseRelProps): string {
  if (rel) {
    return rel
  }

  return target === '_blank' ? 'noopener noreferrer' : ''
}
