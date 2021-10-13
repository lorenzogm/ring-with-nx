import { Box, Divider, Typography } from '@ring/ui'
import { styled } from '@ring/ui/theme'
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
