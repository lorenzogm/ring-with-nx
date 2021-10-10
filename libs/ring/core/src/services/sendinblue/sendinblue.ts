// Node.js SDK: https://github.com/sendinblue/APIv3-nodejs-library
import sendinblue from '@sendinblue/client'

// eslint-disable-next-line import/prefer-default-export
export const transactionalEmailsApi = new sendinblue.TransactionalEmailsApi()

const { SENDINBLUE_API_KEY } = process.env

if (!SENDINBLUE_API_KEY) {
  throw new Error('Undefined "SENDINBLUE_API_KEY"')
}

// Configure API key authorization: api-key
transactionalEmailsApi.setApiKey(
  sendinblue.TransactionalEmailsApiApiKeys.apiKey,
  SENDINBLUE_API_KEY,
)
