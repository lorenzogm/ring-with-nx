import prismic from 'services/prismic'
import type { CMS } from './CMS'

export default function getCMS(): CMS {
  if (process.browser) {
    throw new Error('"getClient" should be called in the server.')
  }

  const { CONFIG_CMS_INTEGRATION } = process.env

  if (!CONFIG_CMS_INTEGRATION) {
    throw new Error(
      'Undefined "CONFIG_CMS_INTEGRATION" in your environment variables.',
    )
  }

  switch (CONFIG_CMS_INTEGRATION) {
    case 'PRISMIC':
      return prismic

    default:
      throw new Error(`${CONFIG_CMS_INTEGRATION} is not a valid integration.`)
  }
}
