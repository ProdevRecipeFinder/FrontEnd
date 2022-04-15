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
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { useLoginMutation, WhoAmIQuery, WhoAmIDocument } from "../../generated/graphql";
import { convertErrorMsg } from "../../utils/convertErrorMsg";
import { InputField } from "../InputField";


export const LoginComponent: React.FC = () => {
    const h1Style = { fontSize: "1.5rem" };
    const router = useRouter()
    const [login] = useLoginMutation()

    return (
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
    );
};