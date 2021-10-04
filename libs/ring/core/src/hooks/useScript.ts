import { MutableRefObject, useEffect, useRef } from 'react'

type KeyValueProps = {
  key: string
  value: string
}

type ScriptProps = {
  src?: string
  async?: boolean
  defer?: boolean
  innerHtml?: string
  attributes?: KeyValueProps[] | []
  withRef?: boolean
  disable?: boolean
}

export function useScript({
  src,
  async = false,
  defer = false,
  innerHtml = '',
  attributes = [],
  withRef = false,
  disable = false,
}: ScriptProps): // eslint-disable-next-line @typescript-eslint/no-explicit-any
MutableRefObject<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance = useRef<any>(null)

  useEffect(() => {
    // do not add any script when in sitecore Experienced Editor
    if (disable) {
      // probably an edge case but
      // maybe no need to remove script as it won't be added unless a user browses and at the same time goes to Experienced Editor.
      return () => {}
    }

    if (process.env.NODE_ENV !== 'test' && !process.env.buildId) {
      throw new Error(`Undefined "process.env.buildId" in "useScript"`)
    }

    const script = document.createElement('script')
    try {
      if (src) {
        script.src = src
      }
      if (innerHtml) {
        script.innerHTML = innerHtml
      }
      script.async = async
      script.defer = defer
      script.nonce = process.env.buildId
      script.type = 'text/javascript'
      attributes?.map(({ key, value }) => script.setAttribute(key, value))
      if (withRef) {
        instance?.current?.appendChild(script)
      } else {
        document.head.appendChild(script)
      }
    } catch (e) {
      // log error somewhere one day :-)
    }
    return () => {
      if (withRef) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        instance?.current?.removeChild(script)
      } else {
        document.head.removeChild(script)
      }
    }
  }, [instance, src, async, innerHtml, attributes, withRef, defer, disable])

  return instance
}
