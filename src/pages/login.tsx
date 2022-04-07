import React, { useState } from "react";
import { Button, Checkbox, Link, Center, Image, Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import NextLink from "next/link";
const Login = () => {
  return (
    <React.Fragment>
      <Center>
        <Box style={{ width: "28em" }}>
          <Center>
            <Image
              boxSize="200px"
              src="http://www.melioramedicalgroup.co.uk/wp-content/uploads/2020/08/blank-avatar.png"
              alt="avatar"
              borderRadius="full"
            />
          </Center>
          <Box>
            <h1>Login</h1>
            <p>
              Don't have an acount?
              <NextLink href="" passHref>
                <Link> Sign Up</Link>
              </NextLink>
            </p>
          </Box>
          <br />
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={() => {
              console.log("here");
            }}
          >
            <Form>
              <InputField name="username" label="Username or Email" />
              <br />
              <InputField name="password" label="Password" />
              <br />
              <Checkbox name="rememberMe" defaultChecked>
                Remember Me
              </Checkbox>
              <br />
              <Center>
                <Button type="submit" colorScheme="red">
                  Login
                </Button>
              </Center>
            </Form>
          </Formik>
        </Box>
      </Center>
    </React.Fragment>
  );
};

export default Login;
