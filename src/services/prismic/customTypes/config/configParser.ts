import { Document } from 'prismic-javascript/types/documents'
import type { Config } from 'services/CMS/config'

type ConfigParser = {
  config: Document
  navigationItems: Document[]
}

export default function configParser({
  config,
  navigationItems,
}: ConfigParser): Config {
  return {
    siteName: config.data.site_name as Config['siteName'],
    logo: (config.data.logo.url || '') as Config['logo'],
    currency: config.data.currency,
    navigation: navigationItems.map((item) => ({
      slug: item.uid,
      name: item.data.name,
      description: item.data.description,
      image: item.data.image.url || '',
    })) as Config['navigation'],
    // social
    instagramUrl: config.data.instagram_url || null,
    facebookUrl: config.data.facebook_url || null,
    // payments
    isPaymentMethodWireTransferEnabled:
      config.data.is_payment_method_wire_transfer_enabled || false,
    isPaymentMethodBizumEnabled:
      config.data.is_payment_method_bizum_enabled || false,
    isPaymentMethodCreditCardEnabled:
      config.data.is_payment_method_credit_card_enabled || false,
  }
}
