
import type { NextPage }  from 'next'
import { Box, Divider }   from "@chakra-ui/react"
import React              from "react"
import styles             from "./settings.module.css"
import Head               from 'next/head'

const Appearance: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Appearance - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Appearance Page" />
      </Head>
      <Box className={styles.container}>
        <h1 className="title">Appearance</h1>
        <Divider />
        <br />

      </Box>
    </React.Fragment>
  )
}

export default Appearance