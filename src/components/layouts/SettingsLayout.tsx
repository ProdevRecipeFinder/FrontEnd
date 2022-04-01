import { 
  Avatar, 
  Button, 
  Divider, 
  Box, 
  Stack 
} from "@chakra-ui/react"
import SettingsNavigationMenu from "../../components/SettingsNavigationMenu/SettingsNavigationMenu"
import DefaultLayout          from "./DefaultLayout"
import styles                 from "../../styles/settings.module.css"
import React                  from "react"

interface Props {
  children: React.ReactNode
}

const SettingsLayout = ({ children }: Props) => {
  return (
    <DefaultLayout>
      {/* Avatar and username at the top of the page */}
      <div id={styles.account}>
        <Avatar size={'md'} src={'https://avatars.dicebear.com/api/male/username.svg'} marginRight={"0.5em"} />
        <p style={{fontWeight: "500", fontSize: "1.2em"}}>Username</p>
        <Button marginLeft="auto">
          Go to Cookbook
        </Button>
      </div>

      <Divider marginBottom="1em" marginTop="0.5em" />

      {/* Settings navigation menu and children.
      This is a layout file, so the children will be whole pages that have the .Layout property set to SettingsLayout (this file)*/}
      <Stack direction={"row"} justify="space-between">
        <Box w="15em">
          <SettingsNavigationMenu />
        </Box>
        <Box w="65em">
          {children}
        </Box>

      </Stack>
    </DefaultLayout>
  )
}

export default SettingsLayout