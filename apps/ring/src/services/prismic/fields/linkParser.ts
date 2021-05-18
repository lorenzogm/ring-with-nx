type LinkPrismic = {
  type: 'Web'
  url: string
}

export default function linkParser(link: LinkPrismic): string {
  if (!link) {
    return null
  }

  return link.url
}
