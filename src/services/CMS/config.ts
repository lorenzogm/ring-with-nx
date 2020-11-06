export type Config = {
  siteName: string
  logo: string
  currency: string
  instagramUrl?: string
  facebookUrl?: string
  navigation: Navigation[]
}

export type Navigation = {
  slug: string
  name: string
  description: string
  image: string
}

// getConfig
export type GetConfig = () => GetConfigReturn
export type GetConfigReturn = Promise<Config>
