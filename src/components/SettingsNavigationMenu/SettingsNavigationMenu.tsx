import { 
  faUser, 
  faGear, 
  faPaintBrush, 
  faCreditCard, 
  faShield 
} from '@fortawesome/free-solid-svg-icons'
import { Stack, Divider } from "@chakra-ui/react"
import NavigationBarItem  from '../NavigationBar/NavigationBarItem'
import React              from "react"

const SettingsNavigationMenu = () => {
  return (
    <React.Fragment>
      <Stack direction={"column"} padding="0.5em">
        <p>Account</p>
        <NavigationBarItem icon={faUser} text={"Public Profile"} href={"/settings/profile"}/>
        <NavigationBarItem icon={faGear} text={"Account"} href={"/"}/>
        <NavigationBarItem icon={faPaintBrush} text={"Appearance"} href={"/"}/>
      </Stack>

      <Divider margin="0.5em 0"/>

      <Stack direction={"column"} padding="0.5em">
        <p>Access</p>
        <NavigationBarItem icon={faCreditCard} text={"Billing"} href={"/"}/>
        <NavigationBarItem icon={faShield} text={"Password and Auth"} href={"/"}/>
      </Stack>
    </React.Fragment>
  )
}

export default SettingsNavigationMenu