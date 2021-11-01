import createCache from '@emotion/cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { RingTheme } from '@ring/ui'
import { ReactElement, ReactNode } from 'react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

type EmotionProviderProps = {
  children: ReactNode
  emotionCache?: EmotionCache
  theme: RingTheme
}

export function EmotionProvider({
  children,
  emotionCache,
  theme,
}: EmotionProviderProps): ReactElement {
  return (
    <CacheProvider value={emotionCache || clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}

function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}
