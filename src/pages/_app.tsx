import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from "react"
import Layout from '../components/Layout'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </React.Fragment>
  )
}

export default MyApp
