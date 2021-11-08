import { Select } from '@ring/ui'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export function LocaleSwitcher(): ReactElement | null {
  const router = useRouter()
  const { pathname, query, asPath, locale, locales, defaultLocale } = router

  if (!locales || locales.length < 1) {
    return null
  }

  return (
    <Select
      instanceId="localeSwitcher"
      onChange={onChange}
      options={locales.map((l) => ({
        value: l,
        label: l,
      }))}
      value={{ value: locale, label: locale }}
    />
  )

  async function onChange(
    localeAsObject: { label?: string; value?: string } | null,
  ) {
    await router.push({ pathname, query }, asPath, {
      locale: localeAsObject ? localeAsObject.value : defaultLocale,
    })
    // reload is not required,
    // but the "useStorybook" defined in "pages/[[...slug]].tsx" is not updating
    // the content on the client
    window.location.reload()
  }
}
