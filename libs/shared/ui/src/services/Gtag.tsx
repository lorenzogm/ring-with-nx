import { ReactElement, useEffect, useCallback } from 'react'

type GtagProps = {
  trackingId: string
}
export default Gtag

export function Gtag({ trackingId }: GtagProps): ReactElement | null {
  return trackingId ? (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${trackingId}', {
      page_path: window.location.pathname,
    });
  `,
        }}
      />
    </>
  ) : null
}

type UseGtag = {
  router: {
    events: {
      on: (key: 'routeChangeComplete', pageview: (url: string) => void) => void
      off: (key: 'routeChangeComplete', pageview: (url: string) => void) => void
    }
  }
  trackingId: string
}
export function useGtag({ router, trackingId }: UseGtag): void {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  const pageview = useCallback(
    (url: string) => {
      if (trackingId) {
        window.gtag('config', trackingId, {
          page_path: url,
        })
      }
    },
    [trackingId],
  )

  useEffect(() => {
    if (trackingId) {
      router.events.on('routeChangeComplete', pageview)
    }

    return () => {
      if (trackingId) {
        router.events.off('routeChangeComplete', pageview)
      }
    }
  }, [pageview, router.events, trackingId])
}

declare global {
  interface Window {
    gtag: (
      key: string,
      trackingId: string,
      { page_path }: { page_path: string },
    ) => void
  }
}
