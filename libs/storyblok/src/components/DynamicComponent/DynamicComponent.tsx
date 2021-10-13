import {
  Carousel,
  ContactInline,
  Container,
  GridContainer,
  GridItem,
  Image,
  LinkExternal,
  Title,
} from '@ring/storyblok/modules'
import {
  ContentTemplate,
  StoreProductTemplate,
} from '@ring/storyblok/templates'
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
import { ReactElement } from 'react'
import StoryblokReact from 'storyblok-react'

import { Placeholder } from './Placeholder'

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
