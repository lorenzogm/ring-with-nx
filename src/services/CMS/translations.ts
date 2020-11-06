export type Translations = Record<string, string>

// getTranslations
export type GetTranslations = ({
  page,
}: GetTranslationsProps) => GetTranslationsReturn
export type GetTranslationsProps = {
  page:
    | 'translations_home_page'
    | 'translations_category_page'
    | 'translations_product_page'
}
export type GetTranslationsReturn = Promise<Translations>
