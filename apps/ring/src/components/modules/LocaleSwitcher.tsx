import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export default function LocaleSwitcher(): ReactElement {
  const router = useRouter()

  return (
    <div className="flex">
      {router.locales && router.locales.length > 1
        ? router.locales.map((locale) => (
            <Link href={router.asPath} locale={locale} key={locale}>
              <a className="uppercase pr-4 mr-4 border-r-2 border-gray-800 last:border-r-0">
                {locale}
              </a>
            </Link>
          ))
        : null}
    </div>
  )
}
