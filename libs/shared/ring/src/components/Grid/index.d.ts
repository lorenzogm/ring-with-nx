import type {
  GridJustification,
  GridSize,
  GridSpacing,
} from '@material-ui/core'
import { FC } from 'react'

export type GridProps = {
  backgroundColor: string
  backgroundImage: Image
  fullWidth: boolean
  justify?: GridJustification
  spacing: GridSpacing
  marginTop: GridSpacing
  marginRight: GridSpacing
  marginBottom: GridSpacing
  marginLeft: GridSpacing
  paddingTop: GridSpacing
  paddingRight: GridSpacing
  paddingBottom: GridSpacing
  paddingLeft: GridSpacing
  items: {
    content: unknown
    xs: GridSize
    sm: GridSize
    md: GridSize
    lg: GridSize
    xl: GridSize
    marginTop: GridSpacing
    marginRight: GridSpacing
    marginBottom: GridSpacing
    marginLeft: GridSpacing
    paddingTop: GridSpacing
    paddingRight: GridSpacing
    paddingBottom: GridSpacing
    paddingLeft: GridSpacing
  }[]
  Image?: FC
}

export type GridParsed = GridProps & {
  sliceType: 'grid'
}
