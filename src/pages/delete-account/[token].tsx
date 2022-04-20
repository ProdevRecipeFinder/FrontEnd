import {
  Button, Center,
  Divider,
  Stack,
  Box,
  Checkbox,
  useToast
} from "@chakra-ui/react"
import { useRouter } from 'next/router'
import React, { useState } from "react"
import { useDeleteAccountMutation } from "../../generated/graphql"
import { initializeApollo } from "../../utils/apollo"
import styles from "./styles.module.css"

const DeleteAccount = () => {
  const router = useRouter()
  const token = router.query.token as string
  const apolloClient = initializeApollo();
  const [agreed, setAgreed] = useState(false)
  const [deleteAccount] = useDeleteAccountMutation();
  const toast = useToast()

  return (
    <React.Fragment>
      <Center>
        <h1 className="title">Delete Account</h1>
      </Center>

      <Divider />
      <br />

      <Stack direction="column">
        <Box id={styles.infoBox}>
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
          <Button disabled={!agreed} colorScheme="red" onClick={() => {
            deleteAccount({
                variables: { token: token }
              }
            )
            //evict cache
            apolloClient.resetStore();

            //notify user
            toast({
              title: "Success",
              description: "Account deleted",
              status: "success",
              duration: 5000,
              isClosable: true
            })

            //launch back to home
            router.replace("/");
          }}>Yes, delete my account</Button>
        </Center>

      </Stack>




    </React.Fragment>
  )
}

export default DeleteAccount