import { GridSize } from '@material-ui/core'
import { GridItem as GridItemRing } from '@ring/core/index'
import { DynamicComponent, GridItemStoryblok } from '@ring/storyblok/index'
import { ReactElement } from 'react'

type GridItemProps = GridItemStoryblok & {
  mobileColumns?: string
  tabletColumns?: string
  laptopColumns?: string
}

export function GridItem({
  items,
  mobileColumns,
  tabletColumns,
  laptopColumns,
}: GridItemProps): ReactElement {
  const xs = useMediaQuery({ mediaQuery: mobileColumns })
  const sm = useMediaQuery({ mediaQuery: tabletColumns })
  const md = useMediaQuery({ mediaQuery: laptopColumns })

  return (
    <GridItemRing xs={xs} sm={sm} md={md}>
      {items.map((content) => (
        <DynamicComponent
          content={content}
          // eslint-disable-next-line no-underscore-dangle
          key={content._uid}
        />
      ))}
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
