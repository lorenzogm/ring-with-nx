import {
  CarouselStoryblok,
  ContactInlineStoryblok,
  ContainerStoryblok,
  ContentTemplateStoryblok,
  GridContainerStoryblok,
  GridItemStoryblok,
  ImageStoryblok,
  LinkExternalStoryblok,
  StoreProductStoryblok,
  TitleStoryblok,
} from '@ring/storyblok/types'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
import StoryblokReact from 'storyblok-react'

const Placeholder = dynamic(() => import('./Placeholder'))

// templates
const ContentTemplate = dynamic(
  () => import('@ring/storyblok/templates/ContentTemplate'),
)
const StoreProductTemplate = dynamic(
  () => import('@ring/storyblok/templates/StoreProductTemplate'),
)

// modules
const Carousel = dynamic(() => import('@ring/storyblok/modules/Carousel'))
const ContactInline = dynamic(
  () => import('@ring/storyblok/modules/ContactInline'),
)
const Container = dynamic(() => import('@ring/storyblok/modules/Container'))
const GridContainer = dynamic(
  () => import('@ring/storyblok/modules/GridContainer'),
)
const GridItem = dynamic(() => import('@ring/storyblok/modules/GridItem'))
const Image = dynamic(() => import('@ring/storyblok/modules/Image'))
const LinkExternal = dynamic(
  () => import('@ring/storyblok/modules/LinkExternal'),
)
const LocaleSwitcher = dynamic(
  () => import('@ring/storyblok/modules/LocaleSwitcher'),
)
const Title = dynamic(() => import('@ring/storyblok/modules/Title'))

export type Modules =
  | CarouselStoryblok
  | ContainerStoryblok
  | GridContainerStoryblok
  | GridItemStoryblok
  | ContactInlineStoryblok
  | ContentTemplateStoryblok
  | ImageStoryblok
  | LinkExternalStoryblok
  | StoreProductStoryblok
  | TitleStoryblok

const ModulesMapping = {
  ContactInline,
  Container,
  ContentTemplate,
  Carousel,
  GridContainer,
  GridItem,
  Image,
  LinkExternal,
  LocaleSwitcher,
  StoreProduct: StoreProductTemplate,
  Title,
}

type DynamicComponentProps = {
  content: Modules
}

export function DynamicComponent({
  content,
}: DynamicComponentProps): ReactElement {
  if (typeof content === 'undefined') {
    return <Placeholder componentName="content" />
  }

  if (typeof ModulesMapping[content.component] === 'undefined') {
    return <Placeholder componentName={content.component} />
  }

  const Component = ModulesMapping[content.component]

  return (
    <StoryblokReact
      content={content}
      // eslint-disable-next-line no-underscore-dangle
      key={content._uid}
    >
      {/* @ts-expect-error no clue */}
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...content}
      />
    </StoryblokReact>
  )
}
