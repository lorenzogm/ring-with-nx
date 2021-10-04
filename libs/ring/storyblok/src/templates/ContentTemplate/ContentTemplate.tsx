import {
  Carousel,
  ContactInline,
  Container,
  GridContainer,
  GridItem,
  Image,
} from '@ring/storyblok/modules'
import {
  CarouselStoryblok,
  ContactInlineStoryblok,
  ContainerStoryblok,
  ContentTemplateStoryblok,
  GridContainerStoryblok,
  GridItemStoryblok,
  ImageStoryblok,
} from '@ring/storyblok/types'
import { ReactElement } from 'react'
import StoryblokReact from 'storyblok-react'

import { Placeholder } from './Placeholder'

type PageProps = {
  body: Array<Modules>
}

export function ContentTemplate({ body }: PageProps): JSX.Element | null {
  if (!body) {
    return null
  }

  return (
    <main>
      {body.map((content) => (
        <DynamicComponent
          content={content}
          // eslint-disable-next-line no-underscore-dangle
          key={content._uid}
        />
      ))}
    </main>
  )
}

export type Modules =
  | CarouselStoryblok
  | ContainerStoryblok
  | GridContainerStoryblok
  | GridItemStoryblok
  | ContactInlineStoryblok
  | ContentTemplateStoryblok
  | ImageStoryblok
const ModulesMapping = {
  ContactInline,
  Container,
  ContentTemplate,
  Carousel,
  GridContainer,
  GridItem,
  Image,
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
