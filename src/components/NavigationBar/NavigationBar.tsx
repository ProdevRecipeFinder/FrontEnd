import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';

import NavigationBarItem from './NavigationBarItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faCircleInfo, faBars, faSun, faMoon, faMagnifyingGlass, faBookOpen, faCogs} from '@fortawesome/free-solid-svg-icons'

import styles from "./NavigationBar.module.css";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const signedIn = true

  return (
    <React.Fragment>
      <Drawer onClose={onClose} placement={"left"} isOpen={isOpen} closeOnOverlayClick={true}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' textAlign="center">Recipe Finder</DrawerHeader>
          <DrawerBody>
            <Stack direction={"column"}>
              <NavigationBarItem href={"/"} text={"Home"} icon={faHome} />
              { signedIn ? <NavigationBarItem href={"/"} text={"My Cook Book"} icon={faBookOpen} /> : null }
              <NavigationBarItem href={"/"} text={"Search"} icon={faMagnifyingGlass} />
              <NavigationBarItem href={"/"} text={"About"} icon={faCircleInfo} />
              <NavigationBarItem href={"/"} text={"Contact Us"} icon={faEnvelope} />
              <NavigationBarItem href={"/"} text={"Settings"} icon={faCogs} />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

        <Button onClick={onOpen}>
          <FontAwesomeIcon icon={faBars} fontSize="1.3em"/>
        </Button>

          <Box>
            <Center>
              <h1 id={styles.navTitle} color={colorMode === "dark" ? "white" : "black"}>Recipe Finder</h1>
            </Center>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={5}>

              <Button onClick={toggleColorMode}>
                <FontAwesomeIcon icon={colorMode === 'dark' ? faMoon : faSun} />
              </Button>

              {
                signedIn ? 
                  <Menu>
                    <MenuButton>
                      <Avatar
                        size={'sm'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                      />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar
                          size={'2xl'}
                          src={'https://avatars.dicebear.com/api/male/username.svg'}
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>Username</p>
                      </Center>
        
                      <MenuDivider />
                      <MenuItem>Your Profile</MenuItem>
                      <MenuItem>Profile Settings</MenuItem>
                      <MenuItem>Sign Out</MenuItem>
                    </MenuList>
                  </Menu>
                :
                  <Button>
                    Sign In
                  </Button>
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </React.Fragment>
  );
}

export default Nav