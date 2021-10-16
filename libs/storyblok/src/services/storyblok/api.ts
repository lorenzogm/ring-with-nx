import { Storyblok } from '@ring/storyblok'

type GetConfigProps = {
  locale: string
  preview: boolean
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getConfig({ locale, preview }: GetConfigProps) {
  return Storyblok.get(`cdn/stories/global/config`, {
    version: 'published',
    language: locale,
    ...(preview ? { cv: Date.now() } : {}),
  })
}
