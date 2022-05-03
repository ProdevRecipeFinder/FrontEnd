import {
  Button,
  Center,
  Input, SimpleGrid
} from "@chakra-ui/react"
import { NextPage } from "next"
import Head from 'next/head'
import React, { useState } from "react"
import RecipeCard from "../components/Recipe/RecipeCard"
import { Recipe, useSavedRecipesQuery } from "../generated/graphql"

const MyCookBook: NextPage = () => {
  // Check authentication
  // checkUserAuth()

  // Hooks and Queries
  const { data: recipeResponse, loading, fetchMore } = useSavedRecipesQuery();
  const [search, setSearch] = useState("")

  if (loading)
    return (<Center>Loading...</Center>)
  if (!loading && !recipeResponse?.getSavedRecipes)
    return (<Center>No recipes added to Your Cookbook</Center>)


  let recipeData = recipeResponse!.getSavedRecipes?.recipes as Recipe[];

  // Functions
  const localSearch = () => {
    if (search === "")
      return recipeData
    const filteredData = recipeData.filter(recipe => { // Return only the recipes that match the search
      const toSearch = [recipe.recipe_title, recipe.recipe_desc]
      return toSearch.some(str => str.toLowerCase().includes(search.toLowerCase().trim()))
    })
    return filteredData
  }

  // Render
  return (
    <React.Fragment>
      <Head>
        <title>My Cookbook - Recipe Finder</title>
        <meta name="description" content="Recipe Finder My Cookbook" />
      </Head>

      <Center>
        <h1>You have {recipeData.length} {recipeData.length === 1 ? "Recipe" : "Recipes"} saved to Your Cookbook</h1>
      </Center>

      {/* An input search bar */}
      <Input type="search" variant="flushed" placeholder="Search saved recipes" value={search} onChange={(e) => setSearch(e.target.value)} />

      <br /> <br />

      {/* Grid of recipies */}
      {
        recipeData && recipeData.length ?
          <React.Fragment>
            <SimpleGrid minChildWidth='250px' spacing="1em">
              {localSearch().map((recipe: Recipe) => (
                <RecipeCard key={recipe.recipe_title} recipe={recipe} maxWidth={400} height={225} />
              ))}
            </SimpleGrid>

            <br />

            <Center>
              <Button disabled={!recipeResponse?.getSavedRecipes?.pageInfo.hasNextPage} onClick={() => {
                fetchMore({
                  variables: {
                    cursor: recipeResponse?.getSavedRecipes?.pageInfo.endCursor
                  }
                })
              }}>Load more</Button>
            </Center>
          </React.Fragment>
          :
          <Center>
            <p>No search results</p>
          </Center>

      }


    </React.Fragment>
  )
}


export default MyCookBook;