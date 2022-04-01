import React from "react"
import { Stack, Divider } from "@chakra-ui/react"
import { faUser, faGear, faPaintBrush, faCreditCard, faShield } from '@fortawesome/free-solid-svg-icons'
import NavigationBarItem from '../NavigationBar/NavigationBarItem'

const SettingsNavigationMenu = () => {
  return (
    <React.Fragment>
      <Stack direction={"column"}>
        <p>Account</p>
        <NavigationBarItem icon={faUser} text={"Public Profile"} href={"/settings/profile"}/>
        <NavigationBarItem icon={faGear} text={"Account"} href={"/"}/>
        <NavigationBarItem icon={faPaintBrush} text={"Appearance"} href={"/"}/>
      </Stack>

      <Divider orientation='horizontal' margin="0.5em 0"/>

      <Stack direction={"column"} padding="0.5em">
        <p>Access</p>
        <NavigationBarItem icon={faCreditCard} text={"Billing"} href={"/"}/>
        <NavigationBarItem icon={faShield} text={"Password and Auth"} href={"/"}/>
      </Stack>
    </React.Fragment>
  )
}

export default SettingsNavigationMenu