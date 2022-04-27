import {
  useBreakpointValue,
  useToast,
  Divider, 
  Button, 
  Box, 
} from "@chakra-ui/react"
import { 
  WhoAmIQuery, 
  WhoAmIDocument, 
  useChangeUsernameMutation, 
  useRequestDeleteAccountMutation 
} from "../../generated/graphql"
import { convertErrorMsg }  from "../../utils/convertErrorMsg"
import { Form, Formik }     from 'formik'
import InputField           from "../../components/InputField"
import styles               from "./settings.module.css"
import React                from "react"
import Head                 from "next/head"

const account = () => {
  // Hooks
  const toast = useToast()
  
  // Mutations
  const [changeUsername] = useChangeUsernameMutation()
  const [requestDeleteAccount] = useRequestDeleteAccountMutation()

  return (
    <React.Fragment>
      <Head>
        <title>Account - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Home Page" />
      </Head>
      <Box className={styles.container}>
        <h1 className="title">Change Username</h1>

        <Divider marginBottom="0.75em" />

        <Formik
          initialValues={{ username: "" }}
          onSubmit={async (values, { setErrors, resetForm }) => {
            const response = await changeUsername({
              variables: values,
              update: (caches, { data }) => { // Updating the cache for live reload, skip if username error
                if (data?.changeUsername.user === null) {
                  return
                }
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
              resetForm()
            }
          }}
        >
          {
            ({ isSubmitting }) => (
              <Form style={{ width: useBreakpointValue({ sm: "100%", md: "100%", lg: "50%", })}}>
                <InputField name="username" label="Username" marginBottom="0.5em"/>
                <Button type="submit" isLoading={isSubmitting}>Save</Button>
              </Form>
            )
          }
        </Formik>

        <br />

        <h1 className="title" style={{ color: "#C53030" }}>Delete Account</h1>

        <Divider marginBottom="0.75em"/>

        {/* delete account button */}
        <Button variant="outline" colorScheme="red" style={{background: "transparent"}}
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