import NavigationBar from "../NavigationBar/NavigationBar"
import { Box, useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import ChatBot from "../ChatBot"

interface Props {
  children: React.ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Box
        fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
        color={useColorModeValue("gray.800", "white")}
        h="100%"
      >
        <NavigationBar />
        <ChatBot />
        <Box
          className="container"
          width={useBreakpointValue({ base: "95%", sm: "90%", md: "80%", lg: "70%", xl: "70%" })}
          backgroundColor={useColorModeValue("white", "none")}
        >
          {children}
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default DefaultLayout