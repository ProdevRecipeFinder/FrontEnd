import {
  DrawerCloseButton, 
  useColorModeValue, 
  InputRightElement,
  useDisclosure, 
  useColorMode, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerHeader,
  DrawerBody, 
  MenuButton, 
  MenuDivider, 
  InputGroup, 
  MenuItem, 
  MenuList, 
  useToast,
  Avatar, 
  Button, 
  Center, 
  Drawer,
  Input, 
  Menu,
  Stack,
  Flex, 
  Box
} from '@chakra-ui/react'
import {
  faMagnifyingGlass, 
  faCircleInfo, 
  faBookOpen,
  faEnvelope,
  faBars, 
  faCogs, 
  faHome, 
  faMoon, 
  faSun
} from '@fortawesome/free-solid-svg-icons'
import { useLogoutMutation, useWhoAmIQuery }  from '../../generated/graphql'
import { useApolloClient }                    from '@apollo/client'
import { FontAwesomeIcon }                    from '@fortawesome/react-fontawesome'
import React, { useState }                    from 'react'
import NavigationBarItem                      from './NavigationBarItem'
import { useRouter }                          from 'next/router'
import urlencode                              from 'urlencode'
import NextLink                               from 'next/link'
import styles                                 from "./NavigationBar.module.css"

const NavigationBar = () => {
  // Hooks
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const apolloClient = useApolloClient()
  const router = useRouter()
  const toast = useToast()
  
  // Mutations and Queries
  const { data: userData } = useWhoAmIQuery()
  const [logout] = useLogoutMutation()

  // State
  const [searchQuery, setSearchQuery] = useState('')

  // Functions
  const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)
  const handleSearch = (event: any) => {
    event.preventDefault()
    // Clear the cache incase the user has previously searched for something
    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "searchRecipes" })
    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "getSavedStatus" })
    router.push("/search?q=" + urlencode(searchQuery))
  }
  const handleLogout = async () => {
    await logout()
    await apolloClient.resetStore()
    toast({
      title: "Success",
      description: "Logout successful",
      status: "success",
      duration: 5000,
      isClosable: true
    })
    router.push('/')
  }

  // Render
  return (
    <React.Fragment>

      {/* Sidebar. This will appear on the left when the hamburger button is pressed in the top left*/}
      <Drawer onClose={onClose} placement={"left"} isOpen={isOpen} closeOnOverlayClick={true} size={"xs"}>
        <DrawerOverlay /> {/* Applies dark filter over app when drawer is open */}

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' textAlign="center">Recipe Finder</DrawerHeader>
          <DrawerBody>
            <Stack direction={"column"}>
              {/* Sidebar links */}
              <NavigationBarItem onClick={onClose} href={"/"} text={"Home"} icon={faHome} />
              {userData?.whoami?.id ?
                <NavigationBarItem onClick={onClose} href={"/my-cookbook/"} text={"My Cook Book"} icon={faBookOpen} />
                : null
              }
              <NavigationBarItem onClick={onClose} href={"/"} text={"About"} icon={faCircleInfo} />
              <NavigationBarItem onClick={onClose} href={"/"} text={"Contact Us"} icon={faEnvelope} />
              {userData?.whoami?.id ?
                <NavigationBarItem onClick={onClose} href={"/settings/profile"} text={"Settings"} icon={faCogs} />
                : null
              }
            </Stack>
          </DrawerBody>
        </DrawerContent>

      </Drawer>

      {/* Navigation Bar. This appears at the top of the page */}
      <Box padding="0.75em 0" bg={useColorModeValue('gray.100', 'gray.900')} px={4}>

        <h1 id={styles.navTitle}>Recipe Finder</h1>

        <Flex alignItems={"center"} justifyContent="space-between">
          <Stack direction={'row'} spacing={5}>
            <Button onClick={onOpen}>
              <FontAwesomeIcon icon={faBars} fontSize="1.3em" />
            </Button>

            <form onSubmit={handleSearch}>
              <InputGroup>
                <Input type="search" placeholder="Search" width="20em" value={searchQuery} onChange={onSearchQueryChange} />
                <InputRightElement _hover={{ cursor: "pointer" }} onClick={handleSearch} children={<FontAwesomeIcon icon={faMagnifyingGlass} />} />
              </InputGroup>
            </form>
          </Stack>

          <Flex alignItems={"center"}>
            <Stack direction={'row'} spacing={5}>
              <Button onClick={toggleColorMode}>
                <FontAwesomeIcon icon={colorMode === 'light' ? faMoon : faSun} />
              </Button>
              {/*  If the user is logged in, display user menu. If not, display login button */}
              {
                userData?.whoami?.id ?
                  <Menu>
                    <MenuButton>
                      <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar size={'xl'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                      </Center>
                      <br />
                      <Center>
                        <p>{userData?.whoami?.user_name}</p>
                      </Center>

                      <MenuDivider />
                      <MenuItem>Settings</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                  :
                  <NextLink href="/login">
                    <Button>
                      Log In
                    </Button>
                  </NextLink>
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </React.Fragment>
  )
}

export default NavigationBar