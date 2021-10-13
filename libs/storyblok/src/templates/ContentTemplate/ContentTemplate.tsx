import { DynamicComponent, Modules } from '@ring/storyblok'

type PageProps = {
  body: Array<Modules>
}

export function ContentTemplate({ body }: PageProps): JSX.Element | null {
  if (!body) {
    return null
  }

  return (
    <main>
      {body.map((content) => (
        <DynamicComponent
          content={content}
          // eslint-disable-next-line no-underscore-dangle
          key={content._uid}
        />
      ))}
    </main>
  )
}
