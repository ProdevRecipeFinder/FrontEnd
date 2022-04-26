import { Box, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import RecipeCard from '../components/Recipe/RecipeCard'
import { initializeApollo } from '../utils/apollo'

const Home: NextPage = () => {

  return (
    <React.Fragment>
      <Box fontSize={["sm", "md", "lg", "xl"]}>Font Size</Box>

      <Flex>
        <Flex flexDirection={'column'}>
          <Box mt={5}>
            Recipe 1
          </Box>
          <Box mt={5}>
            Recipe 2
          </Box>
        </Flex>
        <Box ml={10} mt={5}>
          Recipe 3
        </Box>
      </Flex>

    </React.Fragment>
  )
}


export async function getServerSideProps(context: any) { // Get recipe from url id parameter
  const apolloClient = initializeApollo();
  const recipeId = context.query.id;

  // const recipeData = await apolloClient.query({
  //   query: GetOneRecipeDocument,
  //   variables: {
  //     id: parseInt(recipeId)
  //   }
  // })

  return {
    props: {
      // recipe: recipeData.data.getOneRecipe,
    }
  }
}

export default Home
