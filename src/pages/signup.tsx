import React, { useState } from "react";
import { Button, Link, Center, Image, Box, IconButton } from "@chakra-ui/react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import NextLink from "next/link";
const signUp = () => {
  const h1Style = { fontSize: "1.5rem" };
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
            <h1 style={h1Style}>Sign Up</h1>
            <p>
              Have an account?{" "}
              <NextLink href="" passHref>
                <Link fontStyle="italic" fontWeight="bold">
                  Login
                </Link>
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
              <InputField name="name" label="Full name" />
              <br />
              <InputField name="email" label="Email Address" />
              <br />
              <InputField name="password" label="Password" />
              <br />
            </Form>
          </Formik>
          <Box style={{ width: "20em", margin: "auto" }}>
            <Center>
              <Button
                type="submit"
                colorScheme="red"
                isFullWidth="true"
                borderRadius="45"
              >
                Create Account
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
                Sign up with
              </span>
            </Box>
          </Box>
          <br />
          <Box style={{ width: "20em", margin: "auto" }}>
            <IconButton
              icon={<FaFacebook />}
              aria-label="signUp with Facebook"
              colorScheme="facebook"
              borderRadius="90"
              size="lg"
              width="5em"
            ></IconButton>
            <IconButton
              icon={<FaTwitter />}
              aria-label="signUp with Twitter"
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

export default signUp;
