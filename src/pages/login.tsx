import React, { useEffect } from "react"
import {
  Checkbox,
  useToast, 
  Button,
  Center,
  Image,
  Link,
  Box,
} from "@chakra-ui/react"
import { 
  useLoginMutation, 
  WhoAmIDocument,
  useWhoAmIQuery,
  WhoAmIQuery
} from "../generated/graphql"
import { faFacebook, faTwitter }  from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import { convertErrorMsg }        from "../utils/convertErrorMsg"
import type { NextPage }          from 'next'
import { Form, Formik }           from "formik"
import { useRouter }              from 'next/router'
import InputField                 from "../components/InputField"
import NextLink                   from "next/link"
import Head                       from 'next/head'

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
        <Box style={{ width: "28em" }}>

          {/* Empty avatar and sign up link */}
          <Center>
            <Image
              boxSize="150px"
              src="http://www.melioramedicalgroup.co.uk/wp-content/uploads/2020/08/blank-avatar.png"
              alt="avatar"
              borderRadius="full"
            />
          </Center>
          <Box>
            <br />
            <h1 style={{ fontSize: "1.5rem" }}>Login</h1>
            <p>
              Don't have an account?
              <NextLink href="/signup">
                <Link fontStyle="italic" fontWeight="bold" marginLeft="0.5em">
                  Sign Up
                </Link>
              </NextLink>
            </p>
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
                <InputField name="username" label="Username or Email" />
                <br />
                <InputField type="password" name="password" label="Password" />
                <br />
                <Center>
                  <Button
                    type="submit"
                    isFullWidth={true}
                    isLoading={isSubmitting}
                    borderRadius="45"
                    id="loginButton"
                  >
                    Login
                  </Button>
                </Center>
              </Form>
            )}
          </Formik>

          <br />

          {/* Forgot password */}
          <Center>
            <NextLink href="/reset-password/">
              <Link fontWeight="bold" float="right">
                Forgot your password?
              </Link>
            </NextLink>
          </Center>

          <br />

          {/* Social login */}
          <Box style={{ width: "20em", margin: "auto" }}>
            <Box
              style={{
                width: "20em",
                height: "0.9rem",
                borderBottom: "1px solid grey",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "1rem", padding: "0 1rem", backgroundColor: "grey"}} >
                Or login with
              </span>
            </Box>
          </Box>
          <br />
          <Box style={{ width: "20em", margin: "auto" }}>
            <Button
              aria-label="Login with Facebook"
              colorScheme="facebook"
              borderRadius="90"
              size="lg"
              width="5em">
              <FontAwesomeIcon icon={faFacebook} />
            </Button>
            <Button
              aria-label="Login with Twitter"
              colorScheme="twitter"
              borderRadius="90"
              float="right"
              size="lg"
              width="5em">
              <FontAwesomeIcon icon={faTwitter} />
            </Button>
          </Box>
        </Box>
      </Center>
    </React.Fragment>
  )
}

export default Login