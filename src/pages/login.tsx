import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Link,
  Center,
  Image,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import NextLink from "next/link";
import { ssrWithApollo } from "../utils/withApollo";
import { useLoginMutation } from "../generated/graphql";


const Login = () => {
  const h1Style = { fontSize: "1.5rem" };

  const [login] = useLoginMutation()

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
              <NextLink href="#">
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
                update: (cache, { data }) => { // update cache to login user
                }
              })
            }}
          >
            <Form>
              <InputField name="username" label="Username or Email" />
              <br />
              <NextLink href="#">
                <Link fontWeight="bold" float="right">
                  Forgot your password?
                </Link>
              </NextLink>

              <InputField name="password" label="Password" />
              <br />
              <Checkbox name="rememberMe" defaultChecked>
                Remember Me
              </Checkbox>
            </Form>
          </Formik>
          <br />
          <Box style={{ width: "20em", margin: "auto" }}>
            <Center>
              <Button
                type="submit"
                colorScheme="red"
                isFullWidth="true"
                borderRadius="45"
              >
                Login
              </Button>
            </Center>
            <br />
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
            <IconButton
              icon={<FaFacebook />}
              aria-label="Login with Facebook"
              colorScheme="facebook"
              borderRadius="90"
              size="lg"
              width="5em"
            ></IconButton>
            <IconButton
              icon={<FaTwitter />}
              aria-label="Login with Twitter"
              colorScheme="twitter"
              borderRadius="90"
              float="right"
              size="lg"
              width="5em"
            ></IconButton>
          </Box>
        </Box>
      </Center>
    </React.Fragment>
  );
};

export default ssrWithApollo({ssr: false})(Login);
