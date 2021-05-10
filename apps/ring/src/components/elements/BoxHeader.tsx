import { ReactElement } from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const TypographyStyled = styled(Typography)`
  text-transform: uppercase;
`

type BoxHeaderProps = {
  children: string
}

export default function BoxHeader({ children }: BoxHeaderProps): ReactElement {
  return (
    <Box mb={2}>
      <TypographyStyled variant="h6">{children}</TypographyStyled>
      <Divider />
    </Box>
  )
}
