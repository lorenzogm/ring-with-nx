import { DynamicComponent } from '@ring/storyblok/templates'
import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

import { useStoryblok } from '../src/services/storyblok'

export const getStaticProps: GetStaticProps = async ({
  locale,
  locales,
  preview = false,
}) => {
  return {
    props: {
      preview,
      locale,
      locales,
    },
  }
}

type Page404Props = {
  locale: string
  locales: Array<string>
}

export default function Page404({ locale }: Page404Props): ReactElement {
  const enableBridge = true // load the storyblok bridge everywhere
  // const enableBridge = preview; // load only inside preview mode
  const story = useStoryblok({
    story: null,
    preview: enableBridge,
    locale,
  })

  let content = <h1>Not found</h1>
  if (story && story.content) {
    content = <DynamicComponent content={story.content} />
  }

  return content
}
