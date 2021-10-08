import { ImageProps, LinkProps, VisualGrid } from '@ring/core/components'
import { createRingTheme, RingTheme } from '@ring/core/theme'
import { createContext, ReactElement, ReactNode, useContext } from 'react'

import { StyledComponentsProvider } from '..'

const initialState = {
  components: {},
  layout: {
    header: [],
  },
  meta: {
    title: '',
    description: '',
    openGraphImage: '',
    favicons: {
      favicon: '',
      favicon16: '',
      favicon32: '',
      androidChrome192: '',
      androidChrome512: '',
      appleTouchIcon: '',
      mstile150: '',
      safariPinnedTab: '',
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
  meta: MetaProps
}

export function RingProvider({
  children,
  components,
  layout,
  locale,
  locales,
  meta,
  theme,
}: ProviderProps): ReactElement {
  return (
    <StyledComponentsProvider theme={createRingTheme(theme)}>
      <Context.Provider
        value={{
          components,
          layout,
          locale,
          locales,
          meta,
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
  meta: MetaProps
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

export type MetaProps = {
  title: string
  description: string
  openGraphImage: string
  favicons: Favicons
}

export type Favicons = {
  favicon: string
  favicon16: string
  favicon32: string
  androidChrome192: string
  androidChrome512: string
  appleTouchIcon: string
  mstile150: string
  safariPinnedTab: string
}
