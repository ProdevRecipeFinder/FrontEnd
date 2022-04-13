import {
  Button, Center,
  VStack
} from "@chakra-ui/react"
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from "react"
import { InputField } from '../../components/InputField'
import { useChangeForgotPasswordMutation } from "../../generated/graphql"
import styles from "../../styles/reset-password.module.css"
import { convertErrorMsg } from "../../utils/convertErrorMsg"


const ResetPassword = () => {
  const router = useRouter()
  const token = router.query.token as string

  const [changeForgotPassword] = useChangeForgotPasswordMutation()

  return (
    <React.Fragment>
      <Center>
        <h1 id="title">Change Password</h1>
      </Center>
      <Center>
        <VStack id={styles.resetBox} w="40em">
          <Formik
            initialValues={{ password: "", confirmNewPassword: "" }}
            onSubmit={async (values, { setErrors }) => {

              if (values.password !== values.confirmNewPassword) {
                setErrors({
                  password: "Passwords do not match",
                })
                return
              }

              const response = await changeForgotPassword({
                variables: {
                  newpass: values.password,
                  token
                }
              })

              if (response.data?.changeForgotPassword.errors) {
                setErrors(convertErrorMsg(response.data.changeForgotPassword.errors))
                return
              }

              //handle success
            }
            }>
            {
              ({ isSubmitting, values }) => (
                <Form style={{ width: "100%" }}>
                  <InputField name="password" label="New password" />
                  <br />
                  <InputField name="confirmNewPassword" label="Confirm new password" />
                  <br />
                  <Button disabled={!values.password.length || !values.confirmNewPassword.length} type="submit" isLoading={isSubmitting} w="100%">Change password</Button>
                </Form>
              )
            }
          </Formik>
        </VStack>
      </Center>
    </React.Fragment>
  )
}

export default ResetPassword