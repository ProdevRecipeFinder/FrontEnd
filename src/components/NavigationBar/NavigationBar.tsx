import {
  DrawerCloseButton, 
  useColorModeValue, 
  InputRightElement,
  useOutsideClick,
  useDisclosure, 
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
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { useLogoutMutation, useWhoAmIQuery }  from '../../generated/graphql'
import { useBreakpointValue }                 from '@chakra-ui/media-query'
import React, { useState }                    from 'react'
import { useApolloClient }                    from '@apollo/client'
import { FontAwesomeIcon }                    from '@fortawesome/react-fontawesome'
import NavigationBarItem                      from './NavigationBarItem'
import { useRouter }                          from 'next/router'
import urlencode                              from 'urlencode'
import NextLink                               from 'next/link'
import styles                                 from "./NavigationBar.module.css"


const NavigationBar = () => {
  // Hooks
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
    await apolloClient.resetStore()
    await logout()
    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "whoami" })
    toast({
      title: "Success",
      description: "Logout successful",
      status: "success",
      duration: 5000,
      isClosable: true
    })
    router.push('/')
  }
  const searchBar = (customHandleSearch: null | (() => void) = null) => {
    return (
      <React.Fragment>
        <form onSubmit={(e) => {
            if(customHandleSearch)
              customHandleSearch()
            handleSearch(e)
          }
        }>
          <InputGroup>
            <Input type="search" placeholder="Search" width="18em" value={searchQuery} onChange={onSearchQueryChange} />
            <InputRightElement _hover={{ cursor: "pointer" }} children={<FontAwesomeIcon icon={faMagnifyingGlass} onClick={(e) => { 
              if (customHandleSearch)
                customHandleSearch()
              handleSearch(e)
            }} />} />
          </InputGroup>
        </form>
      </React.Fragment>
    )
  }

  // Render
  return (
    <React.Fragment>

      {/* Sidebar. This will appear on the left when the hamburger button is pressed in the top left*/}
      <Drawer onClose={onClose} placement={"left"} isOpen={isOpen} closeOnOverlayClick={true} size={"xs"}>
        <DrawerOverlay /> {/* Applies dark filter over app when drawer is open */}

        <DrawerContent>
          <DrawerCloseButton />
            
          <DrawerHeader borderBottomWidth='1px' textAlign="center">
            <NextLink href="/">
              Recipe Finder
            </NextLink>
          </DrawerHeader>
          <DrawerBody>
            <Stack direction={"column"}>
              {/* Sidebar links */}
              {
                useBreakpointValue({ base: true, md: false }) ? searchBar(() => onClose()) : null
              }
              <NavigationBarItem onClick={onClose} href={"/"} text={"Home"} icon={faHome} />
              {
                !userData?.whoami?.id ? null :
                <NavigationBarItem onClick={onClose} href={"/my-cookbook/"} text={"My Cookbook"} icon={faBookOpen} />
              }
              {
                !userData?.whoami?.id ? null :
                <NavigationBarItem onClick={onClose} href={"/create-recipe/"} text={"Create Recipe"} icon={faPlus} />
              }
              <NavigationBarItem onClick={onClose} href={"/about-us/"} text={"About"} icon={faCircleInfo} />
              <NavigationBarItem onClick={onClose} href={"/contact-us/"} text={"Contact Us"} icon={faEnvelope} />
              {
                !userData?.whoami?.id ? null :
                <NavigationBarItem onClick={onClose} href={"/settings/profile/"} text={"Settings"} icon={faCogs} />
              }
            </Stack>
          </DrawerBody>
        </DrawerContent>

      </Drawer>

      {/* Navigation Bar. This appears at the top of the page */}
      <Box 
          padding="0.75em 0" 
          bg={useColorModeValue('white', 'gray.900')} 
          px={4} 
          borderBottom={useColorModeValue("2px solid lightgray", "2px solid #12141F")}
          position="fixed" 
          width="100%" 
          zIndex={5}
          top={0}
          boxShadow="0px 5px 20px 0px rgba(0,0,0, 0.3)"
        >

        <Flex alignItems={"center"} justifyContent="space-between">
          <Stack direction={'row'} spacing={5} align="center">
            <Button onClick={onOpen}>
              <FontAwesomeIcon icon={faBars} fontSize="1.3em" />
            </Button>
              
            <h1 id={styles.navTitle}>
            <NextLink href="/">
              Recipe Finder  
            </NextLink>
            </h1>
            {
              useBreakpointValue({ sm: false, md: true }) ? searchBar() : null
            }
          </Stack>
          <Flex alignItems={"center"}>
            <Stack direction={'row'} spacing={5}>
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
                      <NextLink href="/settings/profile">
                        <MenuItem>Settings</MenuItem>
                      </NextLink>
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
