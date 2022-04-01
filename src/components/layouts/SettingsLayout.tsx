import React from "react"
import DefaultLayout from "./DefaultLayout"
import SettingsNavigationMenu from "../../components/SettingsNavigationMenu/SettingsNavigationMenu"
import { Avatar, Button, Divider, Box, Stack } from "@chakra-ui/react"
import styles from "../../styles/settings.module.css"

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const SettingsLayout = ({ children }: Props) => {
  return (
    <DefaultLayout>
      <div className="container">
        <div id={styles.account}>
          <Avatar size={'md'} src={'https://avatars.dicebear.com/api/male/username.svg'} marginRight={"0.5em"} />
          <p>Username</p>
          <Button marginLeft="auto">
            Go to Cookbook
          </Button>
        </div>
        <Divider orientation='horizontal' marginBottom="1em" />

        <Stack direction={"row"}>
          <Box w="15em">
            <SettingsNavigationMenu />
          </Box>
          <Box w="65em">
            {children}
          </Box>

        </Stack>
      </div>
    </DefaultLayout>
  )
};

export default SettingsLayout