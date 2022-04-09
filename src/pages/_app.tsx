import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps }  from 'next/app'
import SettingsLayout     from '../components/layouts/SettingsLayout'
import DefaultLayout      from '../components/layouts/DefaultLayout'
import React              from "react"
import theme              from '../theme'
import { useRouter }      from 'next/router'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const Layout = router.pathname.includes("settings") ? SettingsLayout : DefaultLayout
  
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
