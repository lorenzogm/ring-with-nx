import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import getCMS from 'services/CMS/getCMS'
import type { BlogPost } from 'types/blogPost'
import type { Config } from 'types/config'
import BlogTemplate from 'components/templates/BlogTemplate'

const { CONFIG_BLOG } = process.env

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}) => {
  if (CONFIG_BLOG !== 'ENABLED') {
    return {
      props: {
        isPageEnabled: false,
      },
    }
  }

  const CMS = getCMS()
  const ref = previewData ? previewData.ref : undefined

  const [config, blogPostEntries] = await Promise.all([
    CMS.getConfig({ ref }),
    CMS.getAllBlogPostEntries({
      ref,
    }),
  ])

  return {
    props: {
      config,
      blogPostEntries,
      preview,
    },
    revalidate: 1,
  }
}

type BlogPageProps = {
  blogPostEntries: BlogPost[]
  config: Config
  preview: boolean
}

export default function BlogPage({
  blogPostEntries,
  config,
  preview,
}: BlogPageProps): ReactElement | null {
  const router = useRouter()

  if (router.isFallback) {
    return null
  }

  return (
    <BlogTemplate
      blogPostEntries={blogPostEntries}
      config={config}
      preview={preview}
    />
  )
}
