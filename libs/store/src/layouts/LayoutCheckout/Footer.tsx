import IconArrowBack from '@material-ui/icons/ArrowBack'
import { Button, Container, Grid, Link } from '@ring/ui'
import { styled } from '@ring/ui/theme'
import { ReactElement } from 'react'

export function Footer(): ReactElement {
  return (
    <FooterWrapper>
      <Container>
        <Grid container justifyContent="space-between" alignItems="center">
          <Link href="/">
            <Button startIcon={<IconArrowBack />}>Volver a la tienda</Button>
          </Link>
        </Grid>
      </Container>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.palette.background.default};
  border-top: ${({ theme }) => theme.palette.grey[900]} solid 1px;
  padding-bottom: ${({ theme }) => theme.spacing(4)}px;
  padding-top: ${({ theme }) => theme.spacing(2)}px;
`
