import { getConfig, Storyblok, useStoryblok } from '@ring/storyblok'
import { DynamicComponent } from '@ring/storyblok/components'
import { LayoutDefault } from '@ring/ui/layouts'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

const resolveRelations = ['GlobalReference.reference']

export const getStaticPaths: GetStaticPaths = async () => {
  // const { data } = await Storyblok.get('cdn/links/')

  // const paths = []
  // Object.keys(data.links).forEach((linkKey) => {
  //   if (data.links[linkKey].is_folder) {
  //     return
  //   }

  //   // get array for slug because of catch all
  //   const { slug } = data.links[linkKey]

  //   const slugAsArray = slug.split('/')
  //   const [firstPath] = slugAsArray

  //   if (firstPath !== 'global') {
  //     // create additional languages
  //     if (locales) {
  //       locales.forEach((locale) => {
  //         paths.push({
  //           params: { slug: slug === 'home' ? ['/'] : slugAsArray },
  //           locale,
  //         })
  //       })
  //     } else {
  //       paths.push({
  //         params: { slug: slug === 'home' ? ['/'] : slugAsArray },
  //       })
  //     }
  //   }
  // })

  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({
  locale,
  locales,
  params,
  preview = false,
}) => {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : 'home'

  try {
    const { data } = await Storyblok.get(`cdn/stories/${slug}`, {
      version: 'draft',
      language: locale,
      ...(preview ? { cv: Date.now() } : {}),
    })

    const config = await getConfig({ locale, preview })

    return {
      props: {
        story: data ? data.story : false,
        config,
        preview,
        locale,
        locales,
      },
      revalidate: 10, // in seconds
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

type PageProps = {
  locale: string
  story
}

export default function Page({ story, locale }: PageProps): ReactElement {
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
