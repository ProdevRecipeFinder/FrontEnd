import {
  Checkbox,
  useToast,
  Divider,
  Button, 
  Center,
  Stack,
  Box,
  useColorModeValue
} from "@chakra-ui/react"
import { useDeleteAccountMutation, useLogoutMutation } from "../../generated/graphql"
import { initializeApollo }         from "../../utils/apollo"
import React, { useState }          from "react"
import { useRouter }                from 'next/router'
import styles                       from "./delete-account.module.css"

const DeleteAccount = () => {
  // Hooks
  const router = useRouter()
  const apolloClient = initializeApollo()
  const toast = useToast()
  
  // Mutations
  const [deleteAccount] = useDeleteAccountMutation()
  const [logout] = useLogoutMutation()
  
  // State
  const token = router.query.token as string
  const [agreed, setAgreed] = useState(false)

  // Render
  return (
    <React.Fragment>
      <Center>
        <h1 className="title">Delete Account</h1>
      </Center>

      <Divider />
      <br />

      <Stack direction="column">
        <Box id={styles.infoBox} bg={useColorModeValue("transparent", "#292b34")}>
          <h2 id={styles.infoBoxTitle}>Notice</h2>
          <Divider />
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eros mi, tristique eu imperdiet eget, tristique a elit. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Proin vehicula purus quis malesuada maximus. Morbi sed mattis sapien. Donec nulla mi, porttitor at mi in, venenatis venenatis massa. Sed
            quis libero eu nunc consectetur varius non eu augue. Suspendisse auctor leo nulla, eget iaculis ligula rutrum id. Aenean id porttitor metus. Cras sit amet
            bibendum lacus, vel vestibulum massa.
          </p>
          <br />
          <Checkbox isChecked={agreed} onChange={(e) => setAgreed(!agreed)}>I have read and agree to the above</Checkbox>
        </Box>
        <Center>
          <Button disabled={!agreed} colorScheme="red" onClick={async () => {
            deleteAccount({ variables: { token: token } })
            
            await logout();

            //evict cache
            apolloClient.clearStore()
            
            //notify user
            toast({
              title: "Success",
              description: "Account deleted",
              status: "success",
              duration: 5000,
              isClosable: true
            })

            //launch back to home
            router.replace("/")
          }}>Yes, delete my account</Button>
        </Center>

      </Stack>
    </React.Fragment>
  )
}

export default DeleteAccount