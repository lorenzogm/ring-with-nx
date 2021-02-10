// getTranslations
export type GetTranslations = ({
  locale,
  page,
}: {
  locale: string
  page:
    | 'translations_home_page'
    | 'translations_category_page'
    | 'translations_product_page'
}) => Promise<Translations>
