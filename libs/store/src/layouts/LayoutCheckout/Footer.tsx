import { Button, Container, Grid, IconArrowBack, Link, styled } from '@ring/ui'
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

const FooterWrapper = styled.footer(
  ({ theme }) => `
  background-color: ${theme.palette.background.default};
  border-top: ${theme.palette.grey[900]} solid 1px;
  padding-bottom: ${theme.spacing(4)}px;
  padding-top: ${theme.spacing(2)}px;
`,
)
