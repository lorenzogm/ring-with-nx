import { TitleParsed } from '@ring/components/Title'

type TitlePrismic = {
  type:
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'heading6'
  text: string
}[]

export default function titleParser(items: TitlePrismic): TitleParsed {
  if (!items) {
    return null
  }

  return {
    variant: items[0].type.replace('eading', '') as TitleParsed['variant'],
    text: items[0].text,
  }
}
