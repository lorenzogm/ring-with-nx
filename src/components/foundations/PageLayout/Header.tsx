import Link from 'next/link'

import Navigation from 'components/elements/Navigation/Navigation'
import Container from 'components/foundations/PageContainer/PageContainer'
import { ReactElement } from 'react'
import type { Config } from 'services/CMS/config'
import IconFacebook from 'components/foundations/IconFacebook/IconFacebook'
import IconInstagram from 'components/foundations/IconInstagram/IconInstagram'
import Image from 'components/foundations/Image/Image'
import LocaleSwitcher from 'components/elements/LocaleSwitcher/LocaleSwitcher'

type HeaderProps = {
  config: Config
}

export default function Header({ config }: HeaderProps): ReactElement {
  return (
    <Container>
      <header>
        <div className="container mx-auto px-6 pt-3 pb-16">
          <div className="flex items-start justify-between">
            <div className="hidden w-full text-gray-600 md:flex md:items-center">
              {config.instagramUrl ? (
                <div className="mr-4">
                  <Link href={config.instagramUrl}>
                    <a>
                      <IconInstagram />
                    </a>
                  </Link>
                </div>
              ) : null}
              {config.facebookUrl ? (
                <Link href={config.facebookUrl}>
                  <a>
                    <IconFacebook />
                  </a>
                </Link>
              ) : null}
            </div>
            <div className="w-full text-gray-700 md:text-center text-2xl font-semibold">
              <Link href="/">
                <a>
                  <Image
                    src={config.logo}
                    alt={config.siteName}
                    width={100}
                    height={100}
                  />
                </a>
              </Link>
            </div>
            <div className="flex items-center justify-end w-full">
              <LocaleSwitcher />
              <button
                type="button"
                className="text-gray-600 focus:outline-none mx-4 sm:mx-0"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              <div className="flex sm:hidden">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <Navigation navigation={config.navigation} />
        </div>
      </header>
    </Container>
  )
}
