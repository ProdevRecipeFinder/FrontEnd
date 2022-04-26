
import { Box, Divider, Stack, useColorMode } from "@chakra-ui/react"
import type { NextPage } from 'next'
import ThemeCard from "../../components/ThemeCard"
import styles from "./settings.module.css"
import React, { useEffect, useState } from "react"
import Head from 'next/head'

const Appearance: NextPage = () => {

  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState(colorMode)

  console.log(theme)

  return (
    <React.Fragment>
      <Head>
        <title>Appearance - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Appearance Page" />
      </Head>
      <Box className={styles.container}>
        <h1 className="title">Appearance</h1>
        <Divider marginBottom="0.5em" />
        <p>Choose how RecipeFinder looks to you. Select a single theme, or sync with your system.</p>

        <br />

        <Stack direction="row" spacing="1em">
          <ThemeCard setter={setTheme} name="dark" imageUrl="https://github.githubassets.com/images/modules/settings/color_modes/dark_preview.svg" isChecked={"dark" === theme} />
          <ThemeCard setter={setTheme} name="light" imageUrl="https://github.githubassets.com/images/modules/settings/color_modes/light_preview.svg" isChecked={"light" === theme} />
        </Stack>

      </Box>
    </React.Fragment>
  )
}

export default Appearance