import {
  Button as ButtonMui,
  ButtonProps as ButtonMuiProps,
} from '@material-ui/core'
import { styled } from '@ring/ui/theme'
import { ReactNode } from 'react'

export type ButtonProps = {
  children: ReactNode
  color?: 'secondary'
  disabled?: boolean
  endIcon?: ButtonMuiProps['endIcon']
  fullWidth?: boolean
  onClick?: React.MouseEventHandler
  size?: 'small'
  startIcon?: ButtonMuiProps['startIcon']
  type?: 'submit'
  variant?: 'outlined'
}

export function Button({
  children,
  color,
  disabled,
  endIcon,
  fullWidth,
  onClick,
  size,
  startIcon,
  type,
  variant,
}: ButtonProps): JSX.Element {
  return (
    <ButtonStyled
      color={color || 'primary'}
      disabled={disabled}
      endIcon={endIcon}
      onClick={onClick}
      size={size || 'large'}
      startIcon={startIcon}
      variant={variant || 'contained'}
      type={type || 'button'}
      fullWidth={fullWidth}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled(ButtonMui)<{
  fullWidth: ButtonProps['fullWidth']
}>`
  font-weight: 700;

  ${({ fullWidth }) => `
    ${fullWidth ? `width: 100%` : ''}
  `}
`
