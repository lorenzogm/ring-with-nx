import { GetTranslations } from 'services/CMS/translations'
import Client from '../../client'

import translationsParser from './translationsParser'

const getTranslations: GetTranslations = async ({ locale, page }) => {
  const client = Client()
  const translations = await client.getSingle(page, { lang: locale })

  return translationsParser({ translations })
}

export default getTranslations
