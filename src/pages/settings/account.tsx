import {
  Box, Button, Divider, useToast
} from "@chakra-ui/react"
import { Form, Formik } from 'formik'
import React from "react"
import styles from "../../styles/settings.module.css"
import { InputField } from "../../components/InputField"
import { useChangeUsernameMutation, WhoAmIQuery, WhoAmIDocument, useRequestDeleteAccountMutation } from "../../generated/graphql"
import { convertErrorMsg } from "../../utils/convertErrorMsg"

const account = () => {
  const [changeUsername] = useChangeUsernameMutation()
  const [requestDeleteAccount] = useRequestDeleteAccountMutation()
  const toast = useToast()

  return (
    <React.Fragment>
      <Box className={styles.container}>
        <h1 className="title">Change Username</h1>

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
              toast({
                title: "Success",
                description: `Username changed to ${values.username}`,
                status: "success",
                duration: 5000,
                isClosable: true
              })
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

        <br /><br /><br />

        <h1 className="title" style={{ color: "red" }}>Delete Account</h1>

        <Divider />
        <br />

        {/* delete account button */}
        <Button variant="outline" colorScheme="red" 
          onClick={() => {
            requestDeleteAccount()
            toast({
              title: "Account Deletion Link Sent",
              description: "Please check your email for a link to delete your account.",
              status: "success",
              duration: 5000,
              isClosable: true
            })
          }}>
          Delete your account
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default account;