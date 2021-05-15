import { Typography } from '@material-ui/core'
import { ReactElement } from 'react'
import { TitleProps } from './index.d'

export default function Title({
  variant,
  text,
  align,
}: TitleProps): ReactElement | null {
  return (
    <Typography variant={variant} align={align}>
      {text}
    </Typography>
  )
}
