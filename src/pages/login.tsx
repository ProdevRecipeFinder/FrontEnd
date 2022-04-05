import React, { useState } from "react";
import { Button, Center, Box } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";

const Login = () => {
  return (
    <React.Fragment>
      <Center>
        <Box style={{ width: "30em" }}>
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
              <Button type="submit">Login</Button>
            </Form>
          </Formik>
        </Box>
      </Center>
    </React.Fragment>
  );
};

export default Login;
