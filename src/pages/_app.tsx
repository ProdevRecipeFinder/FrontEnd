import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react"
import DefaultLayout from '../components/layouts/DefaultLayout'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

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
