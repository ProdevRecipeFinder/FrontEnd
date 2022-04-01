import React from "react"
import { Stack, Button, Divider, Box } from "@chakra-ui/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faPaintBrush, faCreditCard, faShield } from '@fortawesome/free-solid-svg-icons'

const SettingsNavigationMenu = () => {
  return (
    <React.Fragment>
      <Box w="20%" >
        <Stack direction={"column"} padding="0.5em">
          <p>Account</p>
          <Button>
            <FontAwesomeIcon icon={faUser} style={{marginRight: "0.5em"}}/>
            Public Profile
          </Button>
          <Button>
            <FontAwesomeIcon icon={faGear} style={{marginRight: "0.5em"}}/>
            Account
          </Button>
          <Button>
            <FontAwesomeIcon icon={faPaintBrush} style={{marginRight: "0.5em"}}/>
            Appearance
          </Button>
        </Stack>

        <Divider orientation='horizontal' />
        <Stack direction={"column"} padding="0.5em">
          <p>Access</p>
          <Button>
            <FontAwesomeIcon icon={faCreditCard} style={{marginRight: "0.5em"}}/>
            Billing
          </Button>
          <Button>
            <FontAwesomeIcon icon={faShield} style={{marginRight: "0.5em"}}/>
            Password and Auth
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  )
}

export default SettingsNavigationMenu