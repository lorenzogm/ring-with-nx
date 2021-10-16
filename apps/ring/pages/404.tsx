import { getConfig, useStoryblok } from '@ring/storyblok'
import { DynamicComponent } from '@ring/storyblok/components'
import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

export const getStaticProps: GetStaticProps = async ({
  locale,
  locales,
  preview = false,
}) => {
  const config = await getConfig({ locale, preview })

  return {
    props: {
      config,
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
    resolveRelations: [],
  })

  let content = <h1>Not found</h1>
  if (story && story.content) {
    content = <DynamicComponent content={story.content} />
  }

  return content
}
