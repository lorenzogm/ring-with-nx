import PageLayout from 'components/foundations/PageLayout/PageLayout'
import Head from 'next/head'
import { ReactElement } from 'react'

import { Config, Navigation } from 'types/config'
import Hero, {
  HeroButton,
  HeroDescription,
  HeroTitle,
  HeroType,
} from 'components/foundations/Hero/Hero'

type HomeTemplateProps = {
  preview: boolean
  config: Config
}

export default function HomeTemplate({
  preview,
  config,
}: HomeTemplateProps): ReactElement {
  return (
    <PageLayout preview={preview} config={config}>
      <Head>
        <title>{config.siteName}</title>
      </Head>

      <Hero hero={getHeroFromCategory(config.navigation[0])} variant="primary">
        <HeroTitle />
        <HeroDescription />
        <HeroButton />
      </Hero>

      <div className="md:flex mt-8 justify-between">
        <div className="mr-4 w-full">
          <Hero hero={getHeroFromCategory(config.navigation[1])}>
            <HeroTitle />
            <HeroDescription />
            <HeroButton />
          </Hero>
        </div>
        <div className="w-full">
          <Hero hero={getHeroFromCategory(config.navigation[2])}>
            <HeroTitle />
            <HeroDescription />
            <HeroButton />
          </Hero>
        </div>
      </div>
    </PageLayout>
  )
}

function getHeroFromCategory(navigationItem: Navigation): HeroType | undefined {
  if (!navigationItem) {
    return undefined
  }

  return {
    backgroundImage: navigationItem.image,
    title: navigationItem.name,
    href: `/${navigationItem.slug}`,
    description: navigationItem.description,
  }
}
