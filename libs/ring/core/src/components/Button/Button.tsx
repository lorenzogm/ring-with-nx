import {
  Button as ButtonMui,
  ButtonProps as ButtonMuiProps,
} from '@material-ui/core'
import { ReactNode } from 'react'
import styled from 'styled-components'

export type ButtonProps = {
  children: ReactNode
  color?: 'secondary'
  disabled?: boolean
  endIcon?: ButtonMuiProps['endIcon']
  size?: 'small'
  startIcon?: ButtonMuiProps['startIcon']
  variant?: 'outlined'
  onClick?: React.MouseEventHandler
}

export function Button({
  children,
  color,
  disabled,
  endIcon,
  size,
  startIcon,
  variant,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <ButtonStyled
      color={color || 'primary'}
      disabled={disabled}
      endIcon={endIcon}
      size={size || 'large'}
      startIcon={startIcon}
      variant={variant || 'contained'}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled(ButtonMui)`
  font-weight: 700;
`
