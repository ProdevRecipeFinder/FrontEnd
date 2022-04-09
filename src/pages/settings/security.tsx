import { 
  Box, 
  Divider, 
  Button,
  Stack 
} from "@chakra-ui/react"
import { Form, Formik }   from 'formik'
import { InputField }     from '../../components/InputField'
import styles             from "../../styles/settings.module.css"
import React              from "react"
import Link               from "next/link"

import { useChangePasswordMutation } from "../../generated/graphql"
import { convertErrorMsg } from "../../utils/convertErrorMsg"
import { ssrWithApollo } from "../../utils/withApollo"

const profile = () => {

  const [changePassword] = useChangePasswordMutation()

  return (
    <React.Fragment>
      <Box className={styles.container}>
      <h1 className="title">Change Password</h1>

      <Divider />
      <br />

      {/* Password form, with error handling. Move error handling later when refactoring */}
      <Formik 
        initialValues={{oldPassword: "", password: "", confirmNewPassword: ""}}
        onSubmit={async (values, {setErrors}) => {
          if (values.password !== values.confirmNewPassword) {
            setErrors({
              password: "Passwords do not match",
            })
          }
          const response = await changePassword({
            variables: { 
              oldpass: values.oldPassword, 
              newpass: values.password 
            }
          })

          if (response.data?.changePassword.errors) {
            setErrors(convertErrorMsg(response.data.changePassword.errors))
            return 
          }
          // handle success here
        }
      }>
        {
          ({isSubmitting}) => (
            <Form style={{width: "25em"}}>
              <InputField name="oldPassword" label="Old password" />
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

export default ssrWithApollo({ssr: false})(profile)