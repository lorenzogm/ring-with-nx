import { ContactInlineStoryblok } from '@ring/storyblok'
import { ContactInline as ContactInlineRing } from '@ring/ui'
import { ReactElement } from 'react'

type ContactInlineProps = ContactInlineStoryblok

export function ContactInline({
  icon,
  link,
  text,
  title,
}: ContactInlineProps): ReactElement {
  return <ContactInlineRing icon={icon} link={link} text={text} title={title} />
}
