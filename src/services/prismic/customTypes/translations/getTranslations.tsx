import { GetTranslations } from 'services/CMS/translations'
import client from '../../client'
import translationsParser from './translationsParser'

const getTranslations: GetTranslations = async ({ locale, page }) => {
  const translations = await client.getSingle(page, { lang: locale })

  return translationsParser({ translations })
}

export default getTranslations
