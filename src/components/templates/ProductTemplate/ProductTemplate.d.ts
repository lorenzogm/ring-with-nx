import { Image } from 'types/image'
import { Size } from 'types/product'

export type State = {
  colorSelected: string
  imageSelected: Image
  sizeSelected?: Size
}
