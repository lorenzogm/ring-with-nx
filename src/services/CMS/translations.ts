export type Translations = Record<string, string>

// getTranslations
export type GetTranslations = ({
  locale,
  page,
}: GetTranslationsProps) => GetTranslationsReturn
export type GetTranslationsProps = {
  locale: string
  page:
    | 'translations_home_page'
    | 'translations_category_page'
    | 'translations_product_page'
}
export type GetTranslationsReturn = Promise<Translations>
