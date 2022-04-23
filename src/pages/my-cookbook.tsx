import {
  Button,
  Center,
  Input
} from "@chakra-ui/react"
import { Recipe, useSavedRecipesQuery } from "../generated/graphql"
import React, { useState }              from "react"
import { checkUserAuth }                from "../utils/checkUserAuth"
import { SimpleGrid }                   from '@chakra-ui/react'
import { NextPage }                     from "next"
import RecipeCard                       from "../components/Recipe/RecipeCard"
import { readyException } from "cypress/types/jquery"

const MyCookBook: NextPage = () => {
  // Check authentication
  checkUserAuth()

  // Hooks and Queries
  const { data: recipeResponse, loading, fetchMore } = useSavedRecipesQuery();
  const [search, setSearch] = useState("")

  if (loading)
    return ( <Center>Loading...</Center> )
  if (!loading && !recipeResponse?.getSavedRecipes)
    return ( <Center>No recipes added to Cookbook</Center> )
  
  
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

      {/* An input search bar */}
      <Input type="search" variant="flushed" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

      <br /> <br />

      {/* Grid of recipies */}
      {
        recipeData && recipeData.length ?
          <React.Fragment>
            <SimpleGrid minChildWidth='300px' spacing="1em">
              {localSearch().map((recipe: Recipe) => (
                <RecipeCard key={recipe.recipe_title} recipe={recipe} />
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