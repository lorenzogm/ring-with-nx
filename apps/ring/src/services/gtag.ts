import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const { GA_TRACKING_ID } = process.env

declare global {
  interface Window {
    gtag: () => void
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
function pageview(url: string): void {
  if (GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type EventProps = {
  action: string
  category: string
  label: string
  value: string
}
export function event({ action, category, label, value }: EventProps): void {
  if (GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    })
  }
}

export function useGtagHandlerouteChange(): void {
  const router = useRouter()

  useEffect(() => {
    if (GA_TRACKING_ID) {
      router.events.on('routeChangeComplete', pageview)
    }

    return () => {
      if (GA_TRACKING_ID) {
        router.events.off('routeChangeComplete', pageview)
      }
    }
  }, [router.events])
}
