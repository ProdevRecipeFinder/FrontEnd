import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from "react"
import DefaultLayout from '../components/layouts/DefaultLayout'
import SettingsLayout from '../components/layouts/SettingsLayout'
import '../styles/globals.css'
import theme from '../theme'
import { useApollo } from "../utils/apollo"

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps)
  const router = useRouter()

  // If we are on the /settings route, we want to wrap our page in the SettingsLayout so that we can have the settings menu 
  const Layout = router.pathname.includes("settings") ? SettingsLayout : DefaultLayout

  return (
    <React.Fragment>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </ChakraProvider>
    </React.Fragment>
  )
}

export default MyApp
