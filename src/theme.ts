import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import _ from 'cypress/types/lodash'

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const breakpoints = { 
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const fontSize = {
  xs: '0.5em',
  sm: '0.75em',
  md: '1em',
}

const theme = extendTheme({ 
  config,
  breakpoints,
  fontSize,
  // customize button for dark and light theme
  components: {
    Button: {
      baseStyle: ({ colorMode } : any) => ({
        bg: "", // for some reason this bg is required for the background property to work
        background: '#D17B69',
        color: "white",
        _hover: {
          bg: "", 
          background: '#AE6657',
        },
        _active: {
          bg: "",
          background: '#D28878',
        }
      })
    }
  },
  styles: {
    global: ({colorMode}: any) => ({
      body: {
        bg: colorMode === 'dark' ? '#171717' : 'white',
      }
    })
  },
})

export default theme