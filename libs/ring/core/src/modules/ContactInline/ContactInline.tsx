import { LinkExternal, Typography } from '@ring/core/index'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import styled from 'styled-components'

const Email = dynamic(() => import('@material-ui/icons/Email'))
const Phone = dynamic(() => import('@material-ui/icons/Phone'))

type ContactInlineProps = {
  title?: string
  icon?: 'Email' | 'Phone'
  link: string
  text: string
}

export function ContactInline({
  title,
  icon,
  link,
  text,
}: ContactInlineProps): ReactElement {
  return (
    <Container>
      <Title variant="h5" component="p">
        {title}
      </Title>
      {icon === 'Email' ? <Email /> : null}
      {icon === 'Phone' ? <Phone /> : null}
      <Link href={link}>{text}</Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => `
    padding: ${theme.spacing(1, 0)};
  `}
`
const Title = styled(Typography)`
  ${({ theme }) => `
    margin-right: ${theme.spacing(2)}px;
  `}
`
const Link = styled(LinkExternal)`
  ${({ theme }) => `
    margin-left: ${theme.spacing(1)}px;
  `}
`
