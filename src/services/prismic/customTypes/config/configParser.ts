import { Document } from 'prismic-javascript/types/documents'
import type { Config } from 'types/config'

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
    isMaintenanceEnabled: config.data.is_maintenance_enabled || false,
    logo: config.data.logo,
    currency: config.data.currency,
    navigation: navigationItems.map((item) => ({
      type: item.type,
      slug: item.uid,
      name: item.data.name,
      description: item.data.description,
      image: item.data.image.url || '',
    })) as Config['navigation'],
    // company
    company: {
      name: config.data.company_name || '',
      email: config.data.company_email || '',
      address: config.data.company_address || '',
      postcode: config.data.company_postcode || '',
      city: config.data.company_city || '',
      country: config.data.company_country || '',
    },
    // emails
    emails: {
      orderConfirmationTemplateId: config.data.order_confirmation_template_id,
    },
    // social
    instagramUrl: config.data.instagram_url || null,
    facebookUrl: config.data.facebook_url || null,
    // payments
    paymentMethods: {
      wireTransfer: {
        isEnabled: config.data.payment_method_wire_transfer_is_enabled || false,
        accountHolder:
          config.data.payment_method_wire_transfer_account_holder || '',
        IBAN: config.data.payment_method_wire_transfer_iban || '',
      },
      bizum: {
        isEnabled: config.data.is_payment_method_bizum_enabled || false,
      },
      creditCard: {
        isEnabled: config.data.is_payment_method_credit_card_enabled || false,
      },
    },
    // shipping
    shipping: {
      costs: config.data.shipping_costs,
      freeAmount: config.data.shipping_free_amount,
    },
  }
}
