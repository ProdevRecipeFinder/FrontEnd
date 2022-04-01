import React from "react"
import type { NextPage } from 'next'
import SettingsNavigationMenu from "../components/SettingsNavigationMenu/SettingsNavigationMenu"
import { Avatar, Button, Divider } from "@chakra-ui/react"
import styles from "../styles/settings.module.css"

const settings: NextPage = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div id={styles.account}>
          <Avatar
            size={'md'}
            src={'https://avatars.dicebear.com/api/male/username.svg'}
            marginRight={"0.5em"}
          />
          <p>Username</p>
          <Button marginLeft="auto">
            Go to personal profile
          </Button>
        </div>
        <Divider orientation='horizontal' />
        <br />
        <SettingsNavigationMenu />
      </div>
    </React.Fragment>
  )
}

export default settings
