import { CMS } from './client'
import prismic from './prismic'

export default function getClient(): CMS {
  if (process.browser) {
    throw new Error('"getClient" should be called in the server.')
  }

  const { CMS_INTEGRATION } = process.env

  if (!CMS_INTEGRATION) {
    throw new Error(
      'Undefined "CMS_INTEGRATION" in your environment variables.',
    )
  }

  switch (CMS_INTEGRATION) {
    case 'PRISMIC':
      return prismic

    default:
      throw new Error(`${CMS_INTEGRATION} is not a valid integration.`)
  }
}
