import GridMui, {
  GridProps as GridMuiProps,
  GridSize,
} from '@material-ui/core/Grid'
import { useSpacing } from '@ring/ui'
import { styled } from '@ring/ui/theme'

export type GridProps = {
  xsOffset?: GridSize
  smOffset?: GridSize
  mdOffset?: GridSize
  lgOffset?: GridSize
  xlOffset?: GridSize
} & Omit<GridMuiProps, 'spacing'>

export function Grid({
  container,
  xsOffset,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
  ...props
}: GridProps): JSX.Element {
  const { gutter } = useSpacing()

  const hasOffset = xsOffset || smOffset || mdOffset || lgOffset || xlOffset

  const render =
    container && hasOffset ? (
      <GridNestedStyled
        container={container}
        spacing={container ? gutter : undefined}
        {...props}
      />
    ) : (
      <GridStyled
        container={container}
        spacing={container ? gutter : undefined}
        {...props}
      />
    )

  if (hasOffset) {
    return (
      <GridStyled container spacing={gutter}>
        <GridMui
          item
          xs={xsOffset}
          sm={smOffset}
          md={mdOffset}
          lg={lgOffset}
          xl={xlOffset}
        />
        {render}
      </GridStyled>
    )
  }

  return render
}

const GridNestedStyled = styled(GridMui)`
  max-width: initial;
  width: 100%;
  margin: 0;
`

const GridStyled = styled(GridMui)`
  max-width: initial;
`
