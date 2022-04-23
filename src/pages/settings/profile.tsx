import {
    Box, Button, Divider
} from "@chakra-ui/react"
import { Form, Formik } from 'formik'
import React from "react"
import { InputField } from '../../components/InputField'
import { useChangeUsernameMutation, WhoAmIDocument, WhoAmIQuery } from "../../generated/graphql"
import styles from "../../styles/settings.module.css"
import { convertErrorMsg } from "../../utils/convertErrorMsg"
import Head from 'next/head'


const profile = () => {

    const [changeUsername] = useChangeUsernameMutation()

    return (
        <React.Fragment>
            <Head>
        <title>Profile - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Profile Page" />
            </Head>
            <Box className={styles.container}>
                <h1 className="title">Public Profile</h1>

                <Divider />
                <br />

                <Formik
                    initialValues={{ username: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        const response = await changeUsername({
                            variables: values,
                            update: (caches, { data }) => { // Updating the cache for live reload
                                caches.writeQuery<WhoAmIQuery>({
                                    query: WhoAmIDocument,
                                    data: {
                                        __typename: "Query",
                                        whoami: data?.changeUsername.user,
                                    }
                                })
                            }
                        })

                        if (response.data?.changeUsername.errors) {
                            //handle errors
                            setErrors(convertErrorMsg(response.data.changeUsername.errors));
                        }
                        else if (response.data?.changeUsername.user) {
                            //handle success
                            //send notification saying the user logged in 

                        }
                    }}
                >
                    {
                        ({ isSubmitting }) => (
                            <Form style={{ width: "25em" }}>
                                <InputField name="username" label="Username" style={{ width: "75%", float: "left" }} />
                                <Button type="submit" isLoading={isSubmitting} w="20%" float="right">Save</Button>
                            </Form>
                        )
                    }
                </Formik>
            </Box>
        </React.Fragment>
    )
}

export default profile;