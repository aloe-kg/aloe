import type { ReactElement, ReactNode } from 'react'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'
import { ScrollToTop } from '@components'
import store from '@redux/store'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import ThemeProvider from 'theme'

import '../styles/index.scss'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<any> & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {getLayout(<Component {...pageProps} />)}
            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
            <ScrollToTop />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
