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
} from '@chakra-ui/react'
import {
    faEnvelope,
    faHome,
    faCircleInfo,
    faBars,
    faSun,
    faMoon,
    faMagnifyingGlass,
    faBookOpen,
    faCogs
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavigationBarItem from './NavigationBarItem'
import styles from "./NavigationBar.module.css"
import React from 'react'
import { useLogoutMutation, useWhoAmIQuery } from '../../generated/graphql'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { ssrWithApollo } from '../../utils/withApollo'
import NextLink from 'next/link'

const Nav = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data: userData } = useWhoAmIQuery()
    const [logout] = useLogoutMutation()

    const apolloClient = useApolloClient()
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        await apolloClient.resetStore()
        router.push('/')
    }

    return (
        <React.Fragment>

            {/* Sidebar. This will appear on the left when the hamburger button is pressed in the top left*/}
            <Drawer onClose={onClose} placement={"left"} isOpen={isOpen} closeOnOverlayClick={true}>
                <DrawerOverlay /> {/* Applies dark filter over app when drawer is open */}

                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px' textAlign="center">Recipe Finder</DrawerHeader>
                    <DrawerBody>
                        <Stack direction={"column"}>
                            <NavigationBarItem onClick={onClose} href={"/"} text={"Home"} icon={faHome} />
                            {userData?.whoami?.id ?
                                <NavigationBarItem onClick={onClose} href={"/my-cookbook/"} text={"My Cook Book"} icon={faBookOpen} />
                                : null
                            }
                            <NavigationBarItem onClick={onClose} href={"/search"} text={"Search"} icon={faMagnifyingGlass} />
                            <NavigationBarItem onClick={onClose} href={"/"} text={"About"} icon={faCircleInfo} />
                            <NavigationBarItem onClick={onClose} href={"/"} text={"Contact Us"} icon={faEnvelope} />
                            <NavigationBarItem onClick={onClose} href={"/settings/profile"} text={"Settings"} icon={faCogs} />
                        </Stack>
                    </DrawerBody>
                </DrawerContent>

            </Drawer>

            {/* Navigation Bar. This appears at the top of the page */}
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

                    {/* Hamburger Button */}
                    <Button onClick={onOpen}>
                        <FontAwesomeIcon icon={faBars} fontSize="1.3em" />
                    </Button>


                    <Center>
                        <h1 id={styles.navTitle} color={colorMode === "dark" ? "white" : "black"}>Recipe Finder</h1>
                    </Center>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={5}>

                            {/* Theme Mode Toggle */}
                            <Button onClick={toggleColorMode}>
                                <FontAwesomeIcon icon={colorMode === 'light' ? faMoon : faSun} />
                            </Button>

                            {/* If signed in, render account menu with avatar. If not, render sign in button */}
                            {
                                userData?.whoami?.id ?
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
                                                <p>{userData?.whoami?.user_name}</p>
                                            </Center>

                                            <MenuDivider />
                                            <MenuItem>Your Profile</MenuItem>
                                            <MenuItem>Profile Settings</MenuItem>
                                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
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

export default ssrWithApollo({ ssr: false })(Nav)