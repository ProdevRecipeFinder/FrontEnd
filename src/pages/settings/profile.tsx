import { Box, Divider } from "@chakra-ui/react"
import React            from "react"
import styles           from "./settings.module.css"

const profile = () => {
  return (
    <React.Fragment>
      <Box className={styles.container}>
        <h1 className="title">Public Profile</h1>

        <Divider />
        <br />

      </Box>
    </React.Fragment>
  )
}

export default profile;