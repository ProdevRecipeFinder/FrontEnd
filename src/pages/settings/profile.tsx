import SettingsLayout from "../../components/layouts/SettingsLayout"
import styles         from "../../styles/settings.module.css"
import React          from "react"

import { InputField } from '../../components/InputField'
import { Box, Divider, Button } from "@chakra-ui/react"
import { Form, Formik } from 'formik'

const profile = () => {
  return (
    <React.Fragment>
      <Box className={styles.container}>
      <h1 id={styles.title}>Public Profile</h1>

      <Divider />
      <br />
      
      <Formik 
        initialValues={{username: ""}}
        onSubmit={(values, {setErrors}) => {}
      }>
        {
          ({isSubmitting}) => (
            <Form style={{width: "25em"}}>
              <InputField name="username" label="Username" style={{width: "75%", float: "left"}} />
              <Button type="submit" isLoading={isSubmitting} w="20%" float="right">Save</Button>
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