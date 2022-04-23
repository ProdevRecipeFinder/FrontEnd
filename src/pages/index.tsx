import { Box } from '@chakra-ui/react'
import type { NextPage }  from 'next'
import React              from 'react'

const Home: NextPage = () => {

  return (
    <React.Fragment>
      <Box fontSize={["sm", "md", "lg", "xl"]}>Font Size</Box>
    </React.Fragment>
  )
}

export default Home
