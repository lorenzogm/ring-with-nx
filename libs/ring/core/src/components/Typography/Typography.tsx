import TypographyMui, {
  TypographyProps as MuiTypographyProps,
} from '@material-ui/core/Typography'

export type TypographyProps = MuiTypographyProps

export function Typography(props: TypographyProps): JSX.Element {
  return <TypographyMui {...props} />
}
