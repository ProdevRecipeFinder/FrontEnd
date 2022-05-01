import {
  useBreakpointValue,
  Divider,
  Avatar,
  Stack,
  Box
} from "@chakra-ui/react"
import SettingsNavigationMenu from "../../components/SettingsNavigationMenu/SettingsNavigationMenu"
import { useWhoAmIQuery } from "../../generated/graphql"
import { checkUserAuth } from "../../utils/checkUserAuth"
import DefaultLayout from "./DefaultLayout"
import React from "react"
import styles from "./settingsLayout.module.css"

interface Props {
  children?: React.ReactNode;
}

const SettingsLayout = ({ children }: Props) => {
  // Check authentication
  checkUserAuth()

  // Queries
  const { data: userData } = useWhoAmIQuery()

  // Render
  return (
    <DefaultLayout>

      {/* Avatar and username at the top of the page */}
      <Box id={styles.account}>
        <Stack direction={useBreakpointValue({ base: "column", md: "row" })}  align="center" >
          <Avatar
            size={"md"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
            marginRight={"0.5em"}
          />
          <p style={{ fontWeight: "500", fontSize: "1.2em" }}>
            {userData?.whoami?.user_name}
          </p>
        </Stack>
      </Box>

      <Divider marginBottom="1em" marginTop="0.5em" />

      {/* Settings navigation menu and children.
      This is a layout file, so the children will be whole pages that have the .Layout property set to SettingsLayout (this file)*/}

      {
        useBreakpointValue({ sm: false, md: true }) ?
          (
            <Stack direction={"row"} justify="space-between">
              <Box w="15em">
                <SettingsNavigationMenu />
              </Box>
              <Box w="65em">
                {children}
              </Box>
            </Stack>
          )
          :
          (
            <Stack direction={"column"}>
              <Box w="100%">
                <SettingsNavigationMenu />
              </Box>
              <Box w="100%">
                {children}
              </Box>
            </Stack>
          )
      }

    </DefaultLayout>
  );
};

export default SettingsLayout
