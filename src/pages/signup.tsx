import { Box, Button, Center, IconButton, Image, Link, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { InputField } from "../components/InputField";
import { useRegisterMutation, WhoAmIDocument, WhoAmIQuery } from "../generated/graphql";
import { convertErrorMsg } from "../utils/convertErrorMsg";


const signUp = () => {
    const router = useRouter();
    const [register] = useRegisterMutation();

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
                            Have an Account{" "}
                            <NextLink href="/login">
                                <Link fontStyle="italic" fontWeight="bold">
                                    Login
                                </Link>
                            </NextLink>
                        </p>
                    </Box>
                    <br />
                    <Formik
                        initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
                        onSubmit={async (values, { setErrors }) => {
                            const response = await register({
                                variables: values,
                                update: (caches, { data }) => {
                                    caches.writeQuery<WhoAmIQuery>({
                                        query: WhoAmIDocument,
                                        data: {
                                            __typename: 'Query',
                                            whoami: data?.register.user,
                                        }
                                    })
                                }
                            });
                            if (response.data?.register.errors) {
                                setErrors(convertErrorMsg(response.data.register.errors));
                            } else if (response.data?.register.user) {
                                //handle success
                                //send notification saying the user logged in 
                                router.push("/");
                            }
                        }}
                    >
                        <Form>
                            <Stack direction="column">
                                <InputField name="username" label="username" />
                                <InputField name="email" label="Email Address" />
                                <InputField name="password" label="Password" type="password" />
                                <InputField name="confirmPassword" label="Confirm Password" type="password" />
                            </Stack>

                            < br />
                            <Box style={{ width: "20em", margin: "auto" }}>
                                <Center>
                                    <Button
                                        type="submit"
                                        colorScheme="red"
                                        isFullWidth={true}
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
                        </Form>
                    </Formik>

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
