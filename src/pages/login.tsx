import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Link,
  Center,
  Image,
  Box,
  useToast 
} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { InputField } from "../components/InputField";
import { useLoginMutation, WhoAmIQuery, WhoAmIDocument } from "../generated/graphql";
import { convertErrorMsg } from "../utils/convertErrorMsg";

const Login = () => {
  const h1Style = { fontSize: "1.5rem" };
  const router = useRouter()
  const [login] = useLoginMutation()
  const toast = useToast()

  return (
    <React.Fragment>
      <Center>
        <Box style={{ width: "28em" }}>
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
            <h1 style={h1Style}>Login</h1>
            <p>
              Don't have an account?{" "}
              <NextLink href="/signup">
                <Link fontStyle="italic" fontWeight="bold">
                  Sign Up
                </Link>
              </NextLink>
            </p>
          </Box>
          <br />
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

              if (response.data?.login.errors) {
                //handle errors
                return setErrors(convertErrorMsg(response.data.login.errors));
              }
              else if (response.data?.login.user) {
                //handle success
                //send notification saying the user logged in
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
                <Checkbox name="rememberMe" defaultChecked>
                  Remember Me
                </Checkbox>
                <Center>
                  <Button
                    type="submit"
                    colorScheme="red"
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

          <Center>
            <NextLink href="/reset-password/">
              <Link fontWeight="bold" float="right">
                Forgot your password?
              </Link>
            </NextLink>
          </Center>

          <br />

          <Box style={{ width: "20em", margin: "auto" }}>
            <Box
              style={{
                width: "20em",
                height: "0.9rem",
                borderBottom: "1px solid grey",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "1rem",
                  padding: "0 1rem",
                  backgroundColor: "grey",
                }}
              >
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



export default Login;