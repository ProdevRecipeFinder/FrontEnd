import { Box, useColorMode, Radio }   from "@chakra-ui/react"
import React from "react"

interface Props {
  name: string
  imageUrl: string
  isChecked?: boolean,
  setter: (value: any) => void
}

const ThemeCard = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const handleClick = () => {
    props.setter(props.name)
    if (props.name === "light" && colorMode === "dark") {
      toggleColorMode()
      window.localStorage.setItem("theme", "light")
    }
    else if (props.name === "dark" && colorMode === "light") {
      toggleColorMode()
      window.localStorage.setItem("theme", "dark")
    }
  }

  const capitalizedTheme = () => {
    return props.name.charAt(0).toUpperCase() + props.name.slice(1)
  }

  return (
    <Box borderRadius="0.25em" border="1px solid grey" width="10em" cursor="pointer" onClick={handleClick}>
      <Box>
        <img src={props.imageUrl} alt={props.name} style={{borderTopRightRadius: "0.25em", borderTopLeftRadius: "0.25em", borderBottom: "1px solid grey"}}/>
      </Box>
      <Box padding="0.5em" fontSize="0.8em">
        <Radio value='3' isChecked={props.isChecked}> {capitalizedTheme()} </Radio>
      </Box>
    </Box>
  )
}

export default ThemeCard