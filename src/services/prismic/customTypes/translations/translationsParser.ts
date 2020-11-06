import { Document } from 'prismic-javascript/types/documents'
import type { Translations } from 'services/CMS/translations'

type TranslationsParser = {
  translations: Document
}

export default function translationsParser({
  translations,
}: TranslationsParser): Translations {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return translations.data
}
