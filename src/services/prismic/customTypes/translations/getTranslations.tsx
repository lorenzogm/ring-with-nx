import { GetTranslationsProps, Translations } from 'services/CMS/translations'

import client from '../../client'
import translationsParser from './translationsParser'

export default async function getTranslations({
  locale,
  page,
}: GetTranslationsProps): Promise<Translations> {
  const translations = await client.getSingle(page, { lang: locale })

  return translationsParser({ translations })
}
