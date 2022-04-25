import NavigationBar  from "../NavigationBar/NavigationBar"
import { Box, useBreakpointValue, useColorModeValue }        from "@chakra-ui/react"
import React          from "react"

interface Props {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Box 
        fontSize={['xs', 'sm', 'md', 'lg', 'xl']} 
        color={useColorModeValue("gray.800", "white")}
      >
        <NavigationBar />
        <Box 
          className="container" 
          width={useBreakpointValue({base: "95%", sm: "90%", md: "80%", lg: "70%", xl: "60%"})}
          backgroundColor={useColorModeValue("white", "none")}
        >
          {children}
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default DefaultLayout