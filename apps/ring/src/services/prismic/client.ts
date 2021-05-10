import { NextApiRequest } from 'next'
import Prismic from 'prismic-javascript'
import { ApiOptions } from 'prismic-javascript/types/Api'
import { DefaultClient } from 'prismic-javascript/types/client'

const { PRISMIC_API_ENDPOINT, PRISMIC_ACCESS_TOKEN } = process.env

export default function Client(
  req: NextApiRequest | null = null,
): DefaultClient {
  if (!PRISMIC_API_ENDPOINT) {
    throw new Error(
      'Undefined "PRISMIC_API_ENDPOINT" in your environment variables',
    )
  }

  if (!PRISMIC_ACCESS_TOKEN) {
    throw new Error(
      'Undefined "PRISMIC_ACCESS_TOKEN" in your environment variables',
    )
  }

  return Prismic.client(
    PRISMIC_API_ENDPOINT,
    createClientOptions(req, PRISMIC_ACCESS_TOKEN),
  )
}

type CreateClientOptions = (
  req: NextApiRequest | null,
  prismicAccessToken: string,
) => ApiOptions

const createClientOptions: CreateClientOptions = (
  req = null,
  prismicAccessToken,
) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {}

  return {
    ...reqOption,
    ...accessTokenOption,
  }
}
