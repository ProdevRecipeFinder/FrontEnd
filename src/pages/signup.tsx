import { 
  useToast, 
  Button, 
  Center, 
  Stack, 
  Image, 
  Link, 
  Box, 
} from "@chakra-ui/react"
import { 
  useRegisterMutation, 
  WhoAmIDocument, 
  WhoAmIQuery 
} from "../generated/graphql"
import { faFacebook, faTwitter }  from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import { convertErrorMsg }        from "../utils/convertErrorMsg"
import type { NextPage }          from 'next'
import { Form, Formik }           from "formik"
import { useRouter }              from 'next/router'
import InputField                 from "../components/InputField"
import NextLink                   from "next/link"
import React                      from "react"

const SignUp: NextPage = () => {
  // Hooks
  const router = useRouter()
  const toast = useToast()
  
  // Mutations
  const [register] = useRegisterMutation()

  // Render
  return (
    <React.Fragment>
      <Center>
        <Box style={{ width: "28em" }}>

          {/* Empty avatar and login link */}
          <Center>
            <Image
              boxSize="150px"
              src="http://www.melioramedicalgroup.co.uk/wp-content/uploads/2020/08/blank-avatar.png"
              alt="avatar"
              borderRadius="full"
            />
          </Center>
          <Box>
            <br />
            <h1 style={{ fontSize: "1.5rem" }}>Sign Up</h1>
            <p>
              Have an Account
              <NextLink href="/login">
                <Link fontStyle="italic" fontWeight="bold" marginLeft="0.5em">
                  Login
                </Link>
              </NextLink>
            </p>
          </Box>

          <br />

          {/* Sign up form */}
          <Formik
            initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
            onSubmit={async (values, { setErrors }) => {
              if (values.password !== values.confirmPassword)
                return setErrors({ confirmPassword: "Passwords do not match"})

              const response = await register({
                variables: values,
                update: (caches, { data }) => {
                  caches.writeQuery<WhoAmIQuery>({
                    query: WhoAmIDocument,
                    data: {
                      __typename: 'Query',
                      whoami: data?.register.user,
                    }
                  })
                }
              })
              if (response.data?.register.errors) // If there are errors (invalid credentials)
                setErrors(convertErrorMsg(response.data.register.errors))
              else if (response.data?.register.user) { // If account creation was successful
                toast({
                  title: "Success",
                  description: `Account created for ${values.username}`,
                  status: "success",
                  duration: 150000,
                  isClosable: true
                })

                //send notification saying the user logged in 
                router.push("/")
              }
            }}
          >
            <Form>
              <Stack direction="column">
                <InputField name="username" label="username" />
                <InputField name="email" label="Email Address" />
                <InputField name="password" label="Password" type="password" />
                <InputField name="confirmPassword" label="Confirm Password" type="password" />
              </Stack>

              < br />

              <Box style={{ width: "20em", margin: "auto" }}>
                <Center>
                  <Button type="submit" isFullWidth={true} borderRadius="45">
                    Create Account
                  </Button>
                </Center>
                <br />
                <Box style={{ width: "20em", height: "0.9rem", borderBottom: "1px solid grey", textAlign: "center", }} >
                  <span style={{ fontSize: "1rem", padding: "0 1rem", backgroundColor: "grey", }} >
                    Sign up with
                  </span>
                </Box>
              </Box>
            </Form>
          </Formik>

          <br />

          {/* Social login */}
          <Box style={{ width: "20em", margin: "auto" }}>
            <Button
              aria-label="Login with Facebook"
              colorScheme="facebook"
              borderRadius="90"
              size="lg"
              width="5em">
              <FontAwesomeIcon icon={faFacebook} />
            </Button>
            <Button
              aria-label="Login with Twitter"
              colorScheme="twitter"
              borderRadius="90"
              float="right"
              size="lg"
              width="5em">
              <FontAwesomeIcon icon={faTwitter} />
            </Button>
          </Box>
        </Box>
      </Center>
    </React.Fragment>
  )
}

export default SignUp
