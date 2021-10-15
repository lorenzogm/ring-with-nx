import { Box, Divider, Typography } from '@ring/ui'
import { ReactElement } from 'react'

type BoxHeaderProps = {
  children: string
}

export function BoxHeader({ children }: BoxHeaderProps): ReactElement {
  return (
    <Box mb={2}>
      <Typography variant="h6">{children}</Typography>
      <Divider />
    </Box>
  )
}
