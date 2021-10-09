import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import { Typography } from '@ring/core/components/Typography'
import { styled } from '@ring/core/theme'
import { ReactElement } from 'react'

type BoxHeaderProps = {
  children: string
}

export function BoxHeader({ children }: BoxHeaderProps): ReactElement {
  return (
    <Box mb={2}>
      <TypographyStyled variant="h6">{children}</TypographyStyled>
      <Divider />
    </Box>
  )
}

const TypographyStyled = styled(Typography)`
  text-transform: uppercase;
`
