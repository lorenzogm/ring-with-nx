// Node.js SDK: https://github.com/sendinblue/APIv3-nodejs-library
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@sendinblue/client'

// eslint-disable-next-line import/prefer-default-export
export const transactionalEmailsApi = new TransactionalEmailsApi()

if (!process.env.SENDINBLUE_API_KEY) {
  throw new Error('Undefined "SENDINBLUE_API_KEY"')
}

// Configure API key authorization: api-key
transactionalEmailsApi.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY,
)
