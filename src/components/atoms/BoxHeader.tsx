import { ReactElement } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

type BoxHeaderProps = {
  children: string
}

export default function BoxHeader({ children }: BoxHeaderProps): ReactElement {
  return (
    <Box mb={2}>
      <Typography variant="h5">{children}</Typography>
      <Divider />
    </Box>
  )
}
