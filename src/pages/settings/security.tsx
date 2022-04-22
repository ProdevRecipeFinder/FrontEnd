import {
  Box, 
  Button,
  Divider, 
  Stack, 
  useToast
} from "@chakra-ui/react"
import { useChangePasswordMutation }  from "../../generated/graphql"
import { convertErrorMsg }            from "../../utils/convertErrorMsg"
import { Form, Formik }               from 'formik'
import InputField                     from '../../components/InputField'
import styles                         from "../../styles/settings.module.css"
import React                          from "react"
import Link                           from "next/link"

const Security = () => {
  // Hooks
  const toast = useToast()
  
  // Mutations
  const [changePassword] = useChangePasswordMutation()

  // Render
  return (
    <React.Fragment>
      <Box className={styles.container}>
        <h1 className="title">Change Password</h1>

        <Divider />
        <br />

        {/* Password form, with error handling. Move error handling later when refactoring */}
        <Formik
          initialValues={{ oldPassword: "", password: "", confirmNewPassword: "" }}
          onSubmit={async (values, { setErrors, resetForm }) => {
            if (values.password !== values.confirmNewPassword)
              return setErrors({ password: "Passwords do not match", })
    
            const response = await changePassword({
              variables: {
                oldpass: values.oldPassword,
                newpass: values.password
              }
            })

            if (response.data?.changePassword.errors)
              return setErrors(convertErrorMsg(response.data.changePassword.errors))
              
            // handle success here
            toast({
              title: "Success",
              description: "Changed password sucessfully",
              status: "success",
              duration: 5000,
              isClosable: true
            })
            resetForm()
          }
          }>
          {
            ({ isSubmitting }) => (
              <Form style={{ width: "25em" }}>
                <InputField type="password" name="oldPassword" label="Old password" />
                <br />
                <InputField type="password" name="password" label="New password" />
                <br />
                <InputField type="password" name="confirmNewPassword" label="Confirm new password" />
                <br />
                <Stack direction={"row"}>
                  <Button type="submit" isLoading={isSubmitting}>Save</Button>
                  <Link href="/reset-password/">
                    <Button>Forgot Password</Button>
                  </Link>
                </Stack>
              </Form>
            )
          }
        </Formik>
      </Box>
    </React.Fragment>
  )
}

export default Security