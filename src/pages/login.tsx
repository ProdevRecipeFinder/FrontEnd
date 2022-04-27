import React, { useEffect } from "react"
import {
  useToast,
  Button,
  Center,
  Image,
  Stack,
  Link,
  Box,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import {
  useLoginMutation,
  WhoAmIDocument,
  useWhoAmIQuery,
  WhoAmIQuery
} from "../generated/graphql"
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { convertErrorMsg } from "../utils/convertErrorMsg"
import type { NextPage } from 'next'
import { Form, Formik } from "formik"
import { useRouter } from 'next/router'
import InputField from "../components/InputField"
import NextLink from "next/link"
import Head from 'next/head'

const Login: NextPage = () => {
  // Hooks 
  const router = useRouter()
  const toast = useToast()

  // Mutations and Queries
  const { data: whoAmI } = useWhoAmIQuery()
  const [login] = useLoginMutation()

  // Effects
  useEffect(() => {
    if (whoAmI?.whoami) {
      router.push("/")
    }
  })

  // Render
  return (
    <React.Fragment>
      <Head>
        <title>Login - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Login Page" />
      </Head>
      <Center>
        <Stack direction="column" textAlign="center">
          <Center>
            <h2 style={{fontSize: "1.4em"}} >Log In to Recipe Finder</h2>
          </Center>
          <Box width={useBreakpointValue({base: "25em", md: "20em"})} padding="0 2em">
            <Box>
              {/* Empty avatar and sign up link */}
              <Center>
                <Image
                  boxSize="5em"
                  src="http://www.melioramedicalgroup.co.uk/wp-content/uploads/2020/08/blank-avatar.png"
                  alt="avatar"
                  borderRadius="full"
                />
              </Center>

            </Box>


            <br />

            {/* Login form */}
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: values,
                  update: (caches, { data }) => { // Updating the cache for live reload
                    caches.writeQuery<WhoAmIQuery>({
                      query: WhoAmIDocument,
                      data: {
                        __typename: "Query",
                        whoami: data?.login.user,
                      }
                    })
                  }
                })

                if (response.data?.login.errors) // If there are credential errors
                  return setErrors(convertErrorMsg(response.data.login.errors))
                else if (response.data?.login.user) { // If there are no errors and the user has logged in successfully
                  toast({
                    title: "Success",
                    description: "Login successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true
                  })
                  router.push("/")
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField name="username" label="Username or email address" marginBottom="0.5em"/>
                  <InputField type="password" name="password" label="Password" />
                  <br />
                  <Center>
                    <Button
                      type="submit"
                      isFullWidth={true}
                      isLoading={isSubmitting}
                      id="loginButton"
                    >
                      Log In
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>

            <br />

            {/* Social login */}
            <Center>
              <Box
                style={{
                  width: "20em",
                  height: "0.9rem",
                  borderBottom: useColorModeValue("1px solid lightgray", "1px solid #2c323d"), 
                  textAlign: "center",
                }}
              >
                <span style={{ fontSize: "1rem", padding: "0 1rem", backgroundColor: useColorModeValue("lightgray", "#2c323d")}}>
                  Or login with
                </span>
              </Box>
            </Center>

            <br />

            <Flex direction="row" justifyContent="space-around">
              <Button
                aria-label="Login with Facebook"
                style={{background: "#314E89"}}
                color="white"
                borderRadius="90"
                size="lg"
                width="5em"
                >
                <FontAwesomeIcon icon={faFacebook} />
              </Button>
              <Button
                aria-label="Login with Twitter"
                style={{background: "#1A94DA"}}
                borderRadius="90"
                color="white"
                size="lg"
                width="5em">
                <FontAwesomeIcon icon={faTwitter} />
              </Button>
            </Flex>

            <br />

            {/* Forgot password */}
            <Center>
              <NextLink href="/reset-password/">
                <Link float="right">
                  Forgot your password?
                </Link>
              </NextLink>
            </Center>
          </Box>

          <br />

          <Box style={{ width: "20em" }} padding="1em">
            <p>
              Don't have an account?
              <NextLink href="/signup">
                <Link fontStyle="italic" fontWeight="bold" marginLeft="0.5em">
                  Sign Up
                </Link>
              </NextLink>
            </p>
          </Box>

        </Stack>
      </Center>
    </React.Fragment>
  )
}

export default Login