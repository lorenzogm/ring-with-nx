import Link from 'next/link'
import { ReactElement } from 'react'

import type { Navigation as NavigationType } from 'services/CMS/config'

type NavigationProps = {
  navigation: NavigationType[]
}

export default function Navigation({
  navigation,
}: NavigationProps): ReactElement {
  return (
    <nav className="sm:flex sm:justify-center sm:items-center mt-4">
      <div className="flex flex-col sm:flex-row">
        {navigation &&
          navigation.map((item) => (
            <Link href={`/${item.slug}`} key={item.slug}>
              <a className="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0">
                {item.name}
              </a>
            </Link>
          ))}
      </div>
    </nav>
  )
}
