import { useRing } from '@ring/core/index'
import { DynamicComponent, Modules } from '@ring/storyblok/index'
import { ReactElement } from 'react'

export function Header(): ReactElement {
  const { layout } = useRing()
  const { header } = layout

  const body: Array<Modules> = header[0].reference.content.global[0].body

  return (
    <>
      {body.map((content) => (
        <DynamicComponent key={content._uid} content={content} />
      ))}
    </>
  )
}
