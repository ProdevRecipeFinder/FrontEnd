
import { Box, Divider } from "@chakra-ui/react"
import React            from "react"
import styles           from "./settings.module.css"
import Head             from 'next/head'

const profile = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Profile - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Profile" />
      </Head>
      <Box className={styles.container}>
        <h1 className="title">Profile</h1>
        <Divider />
        <br />

      </Box>
    </React.Fragment>
  )
}

export default profile;