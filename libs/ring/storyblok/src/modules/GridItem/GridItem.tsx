import { GridSize } from '@material-ui/core'
import { GridItem as GridItemRing } from '@ring/core/index'
import {
  DynamicComponent,
  GridItemStoryblok,
  Modules,
} from '@ring/storyblok/index'
import { ReactElement } from 'react'

type GridItemProps = GridItemStoryblok & {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}

export function GridItem({
  item,
  xs,
  sm,
  md,
  lg,
  xl,
}: GridItemProps): ReactElement {
  const xsUpdated = useMediaQuery({ mediaQuery: xs })
  const smUpdated = useMediaQuery({ mediaQuery: sm })
  const mdUpdated = useMediaQuery({ mediaQuery: md })
  const lgUpdated = useMediaQuery({ mediaQuery: lg })
  const xlUpdated = useMediaQuery({ mediaQuery: xl })

  return (
    <GridItemRing
      xs={xsUpdated}
      sm={smUpdated}
      md={mdUpdated}
      lg={lgUpdated}
      xl={xlUpdated}
    >
      <DynamicComponent content={item[0] as Modules} />
    </GridItemRing>
  )
}

type UseMediaQuery = {
  mediaQuery?: string
}
function useMediaQuery({ mediaQuery }: UseMediaQuery): GridSize | undefined {
  if (mediaQuery === undefined || mediaQuery === '') {
    return undefined
  }

  if (Number(mediaQuery) > 12) {
    return 12
  }

  return Number(mediaQuery) as GridSize
}
