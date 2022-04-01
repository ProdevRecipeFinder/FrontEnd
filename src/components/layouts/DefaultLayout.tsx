import NavigationBar  from "../NavigationBar/NavigationBar"
import { Box }        from "@chakra-ui/react"
import React          from "react"

interface Props {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Box className="container">
        {children}
      </Box>
    </React.Fragment>
  )
}

export default DefaultLayout