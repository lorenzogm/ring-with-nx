import { LayoutDefault } from '@ring/core/layouts'
import { DynamicComponent } from '@ring/storyblok/templates'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

import Storyblok, { useStoryblok } from '../src/services/storyblok'

const resolveRelations = ['GlobalReference.reference']

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const { data } = await Storyblok.get('cdn/links/')

  const paths = []
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return
    }

    // get array for slug because of catch all
    const { slug } = data.links[linkKey]
    const slugAsArray = slug.split('/')
    const [firstPath] = slugAsArray

    if (firstPath !== 'global') {
      // create additional languages
      locales.forEach((locale) => {
        paths.push({
          params: { slug: slug === 'home' ? false : slugAsArray },
          locale,
        })
      })
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({
  locale,
  locales,
  params,
  preview = false,
}) => {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : 'home'

  const sbParams = {
    version: 'draft', // or 'draft'
    resolve_relations: resolveRelations,
    language: locale,
    ...(preview ? { cv: Date.now() } : {}),
  }

  const { data } = await Storyblok.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      preview,
      locale,
      locales,
    },
    revalidate: 3600, // revalidate every hour
  }
}

type PageProps = {
  locale: string
  // locales: Array<string>
  story
}

export default function Page({
  story,
  locale,
}: // locales,
PageProps): ReactElement {
  const enableBridge = true // load the storyblok bridge everywhere
  // use the preview variable to enable the bridge only in preview mode
  // const enableBridge = preview;
  const { content } = useStoryblok({
    story,
    preview: enableBridge,
    locale,
    resolveRelations,
  })

  return (
    <LayoutDefault preview={false}>
      <DynamicComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        content={content}
      />
    </LayoutDefault>
  )
}
