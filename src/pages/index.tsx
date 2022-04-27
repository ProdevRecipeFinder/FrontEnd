import { Box, Center, Divider, Flex, SimpleGrid, Stack, useBreakpointValue } from '@chakra-ui/react'
import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import RecipeCard from '../components/Recipe/RecipeCard'
import { GetHomePageDocument, GetMostPopularDocument, PaginatedRecipe, Recipe } from '../generated/graphql'
import { initializeApollo } from '../utils/apollo'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation, Autoplay } from 'swiper'

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
        <Swiper
          slidesPerView={useBreakpointValue({ base: 1, lg: 2, xl: 3 })}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          style={{ padding: "1em" }}
        >
          {
            plainResult.map((recipe: Recipe, index: number) => (
              <SwiperSlide style={{ padding: "1em" }}>
                <RecipeCard recipe={recipe} key={recipe.id} showHeart={false} height={250} maxWidth={400} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      )
    }
  }

  const displayMostPopualrRecipes = (mostPopular: Recipe[]) => {
    if (mostPopular.length > 6)
      return null

    return (
      <React.Fragment>
        <Swiper
          slidesPerView={useBreakpointValue({ base: 1, xl: 2, })}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          style={{ padding: "0em 1em 1em 1em" }}
        >
          {
            mostPopular.map((recipe: Recipe, index: number) => (
              <SwiperSlide>
                <RecipeCard recipe={recipe} key={recipe.id} showHeart={false} height={250} maxWidth={400} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </React.Fragment>
    )
  }


  return (
    <React.Fragment>
      <Head>
        <title>Home- Recipe Finder</title>
        <meta name="description" content="Recipe Finder Home Page" />
      </Head>

      <Stack direction={useBreakpointValue({ sm: "column", md: "row" })}>
        <Box w={useBreakpointValue({ sm: "100%", md: "40%" })}>
          <Center>
            <h1 className="title">Recipe of the Day</h1>
          </Center>
          <br />
          <RecipeCard recipe={mostPopular[0]} key={mostPopular[0].id} showHeart={false} height={250} maxWidth={600} />
        </Box>
        <Box w={useBreakpointValue({ sm: "100%", md: "60%" })}>
          <Center>
            <h1 className="title">Most Popular Recipes</h1>
          </Center>
          <br />
          {
            displayMostPopualrRecipes(mostPopular)
          }
        </Box>
      </Stack>

      <br />

      <Center>
        <h1 className="title">Our Reccommended Recipes</h1>
        </Center>
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
