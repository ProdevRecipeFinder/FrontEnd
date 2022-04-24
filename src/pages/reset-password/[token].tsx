import {
  useToast,
  Button, 
  Center,
  VStack,
} from "@chakra-ui/react"
import { useChangeForgotPasswordMutation }  from "../../generated/graphql"
import { convertErrorMsg }                  from "../../utils/convertErrorMsg"
import { Form, Formik }                     from 'formik'
import { useRouter }                        from 'next/router'
import InputField                           from '../../components/InputField'
import styles                               from "./reset-password.module.css"
import React                                from "react"

const ResetPassword = () => {
  // Hooks
  const router = useRouter()
  const toast = useToast()
  
  // Mutations
  const [changeForgotPassword] = useChangeForgotPasswordMutation()
  
  // State
  const token = router.query.token as string
  
  // Render
  return (
    <React.Fragment>

      {/* Title */}
      <Center>
        <h1 id="title">Reset Password</h1>
      </Center>

      { /* Form */ }
      <Center>
        <VStack id={styles.resetBox} w="40em">
          <Formik
            initialValues={{ password: "", confirmNewPassword: "" }}
            onSubmit={async (values, { setErrors }) => {

              if (values.password !== values.confirmNewPassword)
                return setErrors({ password: "Passwords do not match" })

              const response = await changeForgotPassword({
                variables: {
                  newpass: values.password,
                  token
                }
              })

              if (response.data?.changeForgotPassword.errors)
                return setErrors(convertErrorMsg(response.data.changeForgotPassword.errors))

              //handle success
              toast({
                title: "Password Changed",
                description: "Your password has been changed. Please login with your new password.",
                status: "success",
                duration: 5000,
                isClosable: true
              })
              router.push("/login")
            }
            }>
            {
              ({ isSubmitting, values }) => (
                <Form style={{ width: "100%" }}>
                  <InputField type="password" name="password" label="New password" />
                  <br />
                  <InputField type="password" name="confirmNewPassword" label="Confirm new password" />
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