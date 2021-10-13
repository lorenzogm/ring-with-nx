import { DynamicComponent, Modules } from '@ring/storyblok'
import { useRing } from '@ring/ui'
import { ReactElement } from 'react'

export function Header(): ReactElement | null {
  const { layout } = useRing()
  const { header } = layout

  const body: Array<Modules> = header[0].body

  return (
    <>
      {body.map((content) => (
        <DynamicComponent key={content._uid} content={content} />
      ))}
    </>
  )
}
