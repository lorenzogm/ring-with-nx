import { useCallback, useEffect, useState } from 'react'
import StoryblokClient from 'storyblok-js-client'

export const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
})

type UseStoryblokProps = {
  story: any
  preview: boolean
  locale: string
  resolveRelations: Array<string>
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStoryblok({
  story,
  preview,
  locale,
  resolveRelations = [],
}: UseStoryblokProps) {
  const [storyUpdated, setStoryUpdated] = useState(story)

  // adds the events for updating the visual editor
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
  const initEventListeners = useCallback(() => {
    // @ts-expect-error TODO
    const { StoryblokBridge } = window
    if (typeof StoryblokBridge !== 'undefined') {
      // initialize the bridge with your token
      const storyblokInstance = new StoryblokBridge({
        resolveRelations,
        language: locale,
      })

      // reload on Next.js page on save or publish event in the Visual Editor
      // eslint-disable-next-line no-restricted-globals
      storyblokInstance.on(['change', 'published'], () => location.reload())

      // live update the story on input events
      storyblokInstance.on('input', (event: { story: { _uid: any } }) => {
        if (story && event.story._uid === story._uid) {
          setStoryUpdated(event.story)
        }
      })

      storyblokInstance.on('enterEditmode', (event: { storyId: string }) => {
        // loading the draft version on initial enter of editor
        Storyblok.get(`cdn/stories/${event.storyId}`, {
          version: 'draft',
          resolve_relations: resolveRelations,
          language: locale,
        })
          .then(({ data }) => {
            if (data.story) {
              setStoryUpdated(data.story)
            }
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      })
    }
  }, [locale, resolveRelations, story])

  // appends the bridge script tag to our document
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#installing-the-storyblok-js-bridge
  function addBridge(callback: { (): void; (): void }) {
    // check if the script is already present
    // eslint-disable-next-line testing-library/no-node-access
    const existingScript = document.getElementById('storyblokBridge')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = '//app.storyblok.com/f/storyblok-v2-latest.js'
      script.id = 'storyblokBridge'
      document.body.appendChild(script)
      script.onload = () => {
        // once the scrip is loaded, init the event listeners
        callback()
      }
    } else {
      callback()
    }
  }

  useEffect(() => {
    // only load inside preview mode
    if (preview) {
      // first load the bridge, then initialize the event listeners
      addBridge(initEventListeners)
    }
  }, [initEventListeners, preview])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return storyUpdated
}
