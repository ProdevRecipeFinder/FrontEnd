import React, { useState } from 'react';
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
import { MoonIcon, SunIcon, HamburgerIcon, EmailIcon, InfoIcon } from '@chakra-ui/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import NextLink from 'next/link';

import styles from "./NavigationBar.module.css";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const signedIn = false;

  return (
    <React.Fragment>
      <Drawer onClose={onClose} placement={"left"} isOpen={isOpen} closeOnOverlayClick={true}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px' textAlign="center">Recipe Finder</DrawerHeader>
          <DrawerBody>
            <Stack direction={"column"}>
              <Button>
                <FontAwesomeIcon icon={faHome} className={styles.navMenuItemIcon} />
                <NextLink href="/">Home</NextLink>
              </Button>
              <Button>
                <FontAwesomeIcon icon={faCircleInfo} className={styles.navMenuItemIcon} />
                <NextLink href="/">About</NextLink>
              </Button>
              <Button>
                <FontAwesomeIcon icon={faEnvelope} className={styles.navMenuItemIcon} />
                <NextLink href="/">Contact Us</NextLink>
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

        <Button onClick={onOpen}>
          <HamburgerIcon />
        </Button>

          <Box>
            <Center>
              <h1 id={styles.navTitle}>Recipe Finder</h1>
            </Center>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={5}>

              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
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
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem>Logout</MenuItem>
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