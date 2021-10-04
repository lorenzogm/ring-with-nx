import TypographyMui, {
  TypographyProps as MuiTypographyProps,
} from '@material-ui/core/Typography'

export type TypographyProps = Omit<MuiTypographyProps, 'variant'> & {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
}

export function Typography(
  props: TypographyProps & { component?: React.ElementType },
): JSX.Element {
  return <TypographyMui {...props} />
}
