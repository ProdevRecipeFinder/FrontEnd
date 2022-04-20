import {
    Button, Center,
    VStack,
    useToast
} from "@chakra-ui/react"
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { Form, Formik } from 'formik'
import React, { useState } from "react"
import { InputField } from '../../components/InputField'
import { useForgotPasswordMutation } from "../../generated/graphql"
import styles from "../../styles/reset-password.module.css"


const verifyEmail = () => {
    const [isHuman, setIsHuman] = useState(false)
    const handleVerificationSuccess = () => setIsHuman(true)
    const toast = useToast()
    const [forgotPassword] = useForgotPasswordMutation()

    return (
        <React.Fragment>
            <Center>
                <h1 id="title">Verify Email</h1>
            </Center>

            <Center>
                <VStack id={styles.resetBox} w="40em">
                    <p>Enter your user account's verified email address and we will send you a password reset link.</p>
                    <Formik
                        initialValues={{ email: "" }}
                        onSubmit={async (values, {resetForm}) => {
                            // Here send message to backend to send verify email
                            await forgotPassword({
                                variables: values
                            })

                            // display message saying email sent
                            toast({
                                title: "Password Reset Email Sent",
                                description: "Please check your email for a password reset link.",
                                status: "success",
                                duration: 5000,
                                isClosable: true
                            })
                            resetForm()
                        }
                        }>
                        {
                            ({ isSubmitting }) => (
                                <Form style={{ width: "100%" }}>
                                    <InputField name="email" placeholder="Enter email here" />
                                    < br />
                                    {/* <Center>
                                        <HCaptcha
                                            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
                                            onVerify={() => handleVerificationSuccess()}
                                        />
                                    </Center> */}
                                    <br />
                                    <Button type="submit" isLoading={isSubmitting} w="100%">Send password reset email</Button>
                                </Form>
                            )
                        }
                    </Formik>
                </VStack>
            </Center>
        </React.Fragment>
    )
}

export default verifyEmail;