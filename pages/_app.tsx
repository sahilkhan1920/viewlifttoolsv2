import { useState, useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../src/theme/theme'
import createEmotionCache from '../src/createEmotionCache'

import MainHeader from '../src/components/MainHeader'
import { Router, useRouter } from 'next/router'
import { getCookie } from 'src/helpers/queryHelpers'
import DarkHeader from 'src/components/DarkHeader'
import VLLoaderWrapper from 'src/components/common/VLLoaderWrapper'
import { AppProvider } from 'src/contexts/AppContext'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(false)

  const onRouteChangeStart = () => setLoading(true)
  const onRouteChangeComplete = () => setLoading(false)

  function HeaderSelector() {
    if (isAuth && /\/content\/(.*)/.test(router.pathname)) return null
    if (isAuth) return <MainHeader />
    return <DarkHeader />
  }

  useEffect(() => {
    const token = getCookie('accessToken')
    if (!token) {
      setIsAuth(false)
    } else setIsAuth(true)
  }, [router])

  // handling loading state for the complete app through Router events
  useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)
    Router.events.on('routeChangeError', onRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      Router.events.off('routeChangeError', onRouteChangeComplete)
    }
  }, [])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <HeaderSelector />
        <AppProvider>
          {loading ? (
            <VLLoaderWrapper loading={loading} />
          ) : (
            <Component {...pageProps} />
          )}
        </AppProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
