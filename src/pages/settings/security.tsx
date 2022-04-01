import { 
  Box, 
  Divider, 
  Button,
  Stack 
} from "@chakra-ui/react"
import passwordValidator  from "password-validator"
import { Form, Formik }   from 'formik'
import { InputField }     from '../../components/InputField'
import SettingsLayout     from "../../components/layouts/SettingsLayout"
import styles             from "../../styles/settings.module.css"
import React              from "react"

const profile = () => {
  const passwordSchema = new passwordValidator()
  passwordSchema
  .is().max(100)
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)

  const reasonsForFailureMap = {
    "min": "Password must be at least 8 characters long",
    "max": "Password must be less than 100 characters long",
    "uppercase": "Password must contain at least one uppercase letter",
    "lowercase": "Password must contain at least one lowercase letter",
    "digits": "Password must contain at least one digit"
  }

  return (
    <React.Fragment>
      <Box className={styles.container}>
      <h1 id="title">Change Password</h1>

      <Divider />
      <br />

      {/* Password form, with error handling. Move error handling later when refactoring */}
      <Formik 
        initialValues={{oldPassword: "", newPassword: "", confirmNewPassword: ""}}
        onSubmit={(values, {setErrors}) => {
          const reasonsForFailure = passwordSchema.validate(values.newPassword, { list: true }) as string[]
          if (false) { // This if will be updated when the front-end and back-end are stitched together
            setErrors({oldPassword: "Old password incorrect"})
          }
          if (reasonsForFailure.length > 0) {
            const index = reasonsForFailure.shift() as ("min" | "max" | "uppercase" | "lowercase" | "digits")
            setErrors({newPassword: reasonsForFailureMap[index]})
          }
          else if (values.newPassword !== values.confirmNewPassword) {
            setErrors({
              confirmNewPassword: "Passwords do not match",
              newPassword: "Passwords do not match"
            })
          }
        }
      }>
        {
          ({isSubmitting}) => (
            <Form style={{width: "25em"}}>
              <InputField name="oldPassword" label="Old password" />
              <br />
              <InputField name="newPassword" label="New password" />
              <br />
              <InputField name="confirmNewPassword" label="Confirm new password" />
              <br />
              <Stack direction={"row"}>
                <Button type="submit" isLoading={isSubmitting}>Save</Button>
                <Button>Forgot Password</Button>
              </Stack>
            </Form>
          )
        }
      </Formik>
      </Box>
    </React.Fragment>
  )
}

profile.Layout = SettingsLayout

export default profile