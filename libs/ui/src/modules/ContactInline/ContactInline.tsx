import { LinkExternal, Typography } from '@ring/ui'
import { styled } from '@ring/ui/theme'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const Email = dynamic(() => import('@mui/icons-material/Email'))
const Phone = dynamic(() => import('@mui/icons-material/Phone'))

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
      <Title variant="h5">{title}</Title>
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
    margin-right: ${theme.spacing(2)};
  `}
`
const Link = styled(LinkExternal)`
  ${({ theme }) => `
    margin-left: ${theme.spacing(1)};
  `}
`
