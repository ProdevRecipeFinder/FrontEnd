import { Box, Center, Divider, Flex, SimpleGrid } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import RecipeCard from '../components/Recipe/RecipeCard'
import { GetHomePageDocument, GetMostPopularDocument, PaginatedRecipe, Recipe } from '../generated/graphql'
import { initializeApollo } from '../utils/apollo'

interface Props {
  mostPopular: Recipe[];
  homepageData: PaginatedRecipe
}


const Home: NextPage<Props> = ({ mostPopular, homepageData }) => {

  const homepageRecipes: Recipe[] = homepageData.recipes


  const displayHomepageSelection = (homepageRecipes: Recipe[]) => {
    if (!homepageRecipes || !homepageRecipes.length)
      return (<Center> <p>No search results</p> </Center>)

    const plainResult = Object.values(homepageRecipes)
    if (plainResult.length) {
      return (
        <SimpleGrid minChildWidth='300px' spacing="1em">
          {
            plainResult.map((recipe: Recipe, index: number) => <RecipeCard recipe={recipe} key={recipe.id} showHeart={false} />)
          }
        </SimpleGrid>
      )
    }
  }

  return (
    <React.Fragment>
      {mostPopular.length < 6 ?
        <Center> <p>No Recommended results</p> </Center>
        :
        <>
          <Center>Recommended</Center>
          <Flex>
            <Flex>
              <Flex flexDirection={'column'}>
                <Box mt={5}>
                  <RecipeCard key={mostPopular[2].id} recipe={mostPopular[2]} />
                </Box>
                <Box mt={5}>
                  <RecipeCard key={mostPopular[3].id} recipe={mostPopular[3]} />
                </Box>
              </Flex>
              <Box ml={10} mt={5}>
                <Center m={2}>Recipe of the Day</Center>
                <RecipeCard key={mostPopular[1].id} recipe={mostPopular[1]} />
              </Box>
            </Flex>
            <Flex flexDirection={'column'}>
              <Box>
                <RecipeCard key={mostPopular[4].id} recipe={mostPopular[4]} />
                <RecipeCard key={mostPopular[5].id} recipe={mostPopular[5]} />
                <RecipeCard key={mostPopular[6].id} recipe={mostPopular[6]} />
              </Box>
            </Flex>
          </Flex>
        </>}

      <Divider orientation='horizontal' mt={10} mb={10} />

      {
        displayHomepageSelection(homepageRecipes)
      }




    </React.Fragment>
  )
}


export async function getServerSideProps(context: any) { // Get recipe from url id parameter
  const apolloClient = initializeApollo();

  const mostPopularData = await apolloClient.query({
    query: GetMostPopularDocument,
    variables: {
      limit: 7
    }
  })

  console.log(mostPopularData);



  const homepageRecipeData = await apolloClient.query({
    query: GetHomePageDocument,
    variables: {
      limit: 10
    }
  })

  return {
    props: {
      mostPopular: mostPopularData.data.getMostPopular,
      homepageData: homepageRecipeData.data.getHomePage,
    }
  }
}

export default Home
