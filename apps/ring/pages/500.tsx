import { Storyblok, useStoryblok } from '@ring/storyblok'
import { DynamicComponent } from '@ring/storyblok/components'
import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

export const getStaticProps: GetStaticProps = async ({
  locale,
  locales,
  preview = false,
}) => {
  const sbParams = {
    version: 'draft', // or 'draft'
    language: locale,
    ...(preview ? { cv: Date.now() } : {}),
  }

  const config = await Storyblok.get(`cdn/stories/global/config`, sbParams)
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

export default function Page500({ locale }: Page404Props): ReactElement {
  const enableBridge = true // load the storyblok bridge everywhere
  // const enableBridge = preview; // load only inside preview mode
  const story = useStoryblok({
    story: null,
    preview: enableBridge,
    locale,
    resolveRelations: [],
  })

  let content = <h1>Server error</h1>
  if (story && story.content) {
    content = <DynamicComponent content={story.content} />
  }

  return content
}
