import { 
  Center, 
  VStack, 
  Button 
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { Form, Formik }     from 'formik'
import { InputField }       from '../../components/InputField'
import { useRouter }        from 'next/router'
import styles               from "../../styles/reset-password.module.css"



const ResetPassword = () => {
  const router = useRouter()
  const token = router.query.token as string

  useEffect(() => {
    // verify token here. If invalid, re-route user
    //router.push("/fakeURL")
  }, [])

  return (
    <React.Fragment>
      <Center>
        <h1 id="title">Change Password</h1>
      </Center>
      <Center>
        <VStack id={styles.resetBox} w="40em">
          <Formik
            initialValues={{ username: "" }}
            onSubmit={(values, { setErrors }) => {
              // Here send message to backend to send verify email
            }
            }>
            {
              ({ isSubmitting }) => (
                <Form style={{ width: "100%" }}>
                  <InputField name="newPassword" label="New password" />
                  <br />
                  <InputField name="confirmNewPassword" label="Confirm new password" />
                  <br />
                  <Button type="submit" isLoading={isSubmitting} w="100%">Change password</Button>
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