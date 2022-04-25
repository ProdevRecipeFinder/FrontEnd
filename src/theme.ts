import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
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
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.2rem',
}

const theme = extendTheme({ 
  config,
  breakpoints,
  fontSize
})

export default theme