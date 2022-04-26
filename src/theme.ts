import { extendTheme, ThemeConfig } from '@chakra-ui/react'

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
        background: colorMode === 'dark' ? '#3D4756' : '#D6DEE5',
      })
    }
  }
})

export default theme