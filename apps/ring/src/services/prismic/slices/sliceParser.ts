import { GridParsed } from '@ring/components/Grid'
import gridParser from 'services/prismic/slices/gridParser'

export default function sliceParser(slice: any): GridParsed {
  switch (slice.slice_type) {
    case 'grid':
      return gridParser(slice)

    default:
      console.error(
        `Unexpected "slice.slice_type" = "${slice.slice_type as string}"`,
      )
      return null
  }
}
