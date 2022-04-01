import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps }  from 'next/app'
import DefaultLayout      from '../components/layouts/DefaultLayout'
import React              from "react"
import theme              from '../theme'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || DefaultLayout

  return (
    <React.Fragment>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </React.Fragment>
  )
}

export default MyApp
