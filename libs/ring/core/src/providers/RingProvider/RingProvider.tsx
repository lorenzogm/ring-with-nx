import { ImageProps, LinkProps, VisualGrid } from '@ring/core/components'
import { createRingTheme, RingTheme } from '@ring/core/theme'
import { createContext, ReactElement, ReactNode, useContext } from 'react'

import { StyledComponentsProvider } from '..'

const initialState = {
  components: {},
  layout: {
    header: [],
  },
  seo: {
    title: '',
    description: '',
    ogImage: '',
    favicons: {
      16: '',
      32: '',
      180: '',
    },
  },
}
const Context = createContext<RingState>(initialState)

export function useRing(): RingState {
  return useContext<RingState>(Context)
}

type ProviderProps = {
  children: ReactNode
  components: Components
  layout: Layout
  locale: string
  locales: Array<string>
  theme: RingTheme
  seo: SEO
}

export function RingProvider({
  children,
  components,
  layout,
  locale,
  locales,
  theme,
  seo,
}: ProviderProps): ReactElement {
  return (
    <StyledComponentsProvider theme={createRingTheme(theme)}>
      <Context.Provider
        value={{
          components,
          layout,
          locale,
          locales,
          seo,
        }}
      >
        <>
          {children}
          {(process.env.NODE_ENV === 'development' && <VisualGrid />) || null}
        </>
      </Context.Provider>
    </StyledComponentsProvider>
  )
}

export type RingState = {
  components: Components
  layout: Layout
  locale?: string
  locales?: Array<string>
  seo: SEO
}

type Components = {
  Head?: Head
  Header?: Header
  Image?: Image
  Link?: Link
  Logo?: Logo
}

type Head = ({ children }: { children: ReactNode }) => ReactElement
type Header = () => ReactElement
type Image = ({ src }: ImageProps) => JSX.Element
type Link = ({
  ariaLabel,
  children,
  className,
  href,
  onClick,
  onMouseEnter,
  target,
  rel,
}: LinkProps) => JSX.Element
type Logo = ({ height }: { height: number }) => JSX.Element

export type Layout = {
  header: Array<any>
}

export type SEO = {
  title: string
  description: string
  ogImage: string
  favicons: Favicons
}

export type Favicons = {
  16: string
  32: string
  180: string
}
