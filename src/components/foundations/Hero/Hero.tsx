import Link from 'next/link'
import { createContext, ReactElement, ReactNode, useContext } from 'react'
import Button from 'components/foundations/Button/Button'

type HeroProps = {
  hero?: HeroType
  children: ReactNode
  variant?: HeroType['variant']
}

export type HeroType = {
  backgroundImage: string
  title: string
  description: string
  href: string
  variant?: 'primary'
}

export default function Hero({
  hero,
  children,
  variant,
}: HeroProps): ReactElement | null {
  if (!hero) {
    return null
  }

  return (
    <HeroContext.Provider value={{ ...hero, variant }}>
      <div
        className="w-full h-64 rounded-md overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('${hero.backgroundImage}')`,
        }}
      >
        <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
          <div className="px-10 max-w-xl">{children}</div>
        </div>
      </div>
    </HeroContext.Provider>
  )
}

const HeroContext = createContext<HeroType | undefined>(undefined)

function useHeroContext() {
  const context = useContext(HeroContext)

  if (!context) {
    throw new Error(`Undefined "HeroContext".`)
  }

  return context
}

export function HeroTitle(): ReactElement {
  const { title } = useHeroContext()
  return <h2 className="mb-2 text-2xl text-white font-semibold">{title}</h2>
}

export function HeroDescription(): ReactElement {
  const { description } = useHeroContext()
  return <p className="mb-4 text-gray-400">{description}</p>
}

export function HeroButton(): ReactElement {
  const { href, variant } = useHeroContext()
  return (
    <Link href={href}>
      <a>
        <Button variant={variant}>
          <span>Shop Now</span>
          <svg
            className="h-5 w-5 mx-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
      </a>
    </Link>
  )
}
