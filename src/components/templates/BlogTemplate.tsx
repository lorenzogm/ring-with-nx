import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { ReactElement } from 'react'

import PageLayout from 'components/layouts/LayoutDefault/LayoutDefault'
import type { Config } from 'types/config'
import BlogPostList from 'components/molecules/BlogPostList'
import type { BlogPost } from 'types/blogPost'

type BlogTemplateProps = {
  blogPostEntries: BlogPost[]
  config: Config
  preview: boolean
}

export default function BlogTemplate({
  blogPostEntries,
  config,
  preview,
}: BlogTemplateProps): ReactElement | null {
  const router = useRouter()

  if (!config || !blogPostEntries) {
    return null
  }

  if (router.isFallback) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <PageLayout preview={preview} config={config}>
      <article>
        <Head>
          <title>Blog | {config.siteName}</title>
        </Head>

        <section>
          <BlogPostList blogPostEntries={blogPostEntries} />
        </section>
      </article>
    </PageLayout>
  )
}
