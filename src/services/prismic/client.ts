import Prismic from 'prismic-javascript'

const { PRISMIC_API_ENDPOINT, PRISMIC_ACCESS_TOKEN } = process.env

if (!PRISMIC_API_ENDPOINT) {
  throw new Error(
    'Undefined "PRISMIC_API_ENDPOINT" in your environment variables',
  )
}

const client = Prismic.client(
  PRISMIC_API_ENDPOINT,
  PRISMIC_ACCESS_TOKEN ? { accessToken: PRISMIC_ACCESS_TOKEN } : {},
)
export default client
