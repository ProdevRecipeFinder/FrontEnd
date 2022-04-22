import {
  Button,
  Center,
  Input
} from "@chakra-ui/react"
import { Recipe, useSavedRecipesQuery } from "../generated/graphql"
import React, { useState }              from "react"
import { SimpleGrid }                   from '@chakra-ui/react'
import { NextPage }                     from "next"
import RecipeCard                       from "../components/Recipe/RecipeCard"

const MyCookBook: NextPage = () => {
  // Hooks and Queries
  const { data: recipeResponse, loading, fetchMore } = useSavedRecipesQuery();
  const [search, setSearch] = useState("")

  if (loading)
    return ( <Center>Loading...</Center> )
  if (!loading && !recipeResponse?.getSavedRecipes)
    return ( <Center>No recipes added to Cookbook</Center> )
  
  let recipeData = recipeResponse!.getSavedRecipes?.recipes as Recipe[];

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    const filteredData = recipeData.filter(recipe => { // Return only the recipes that match the search
      const toSearch = [recipe.recipe_title, recipe.recipe_desc, recipe.recipeAuthors![0].user_name]
      return toSearch.some(str => str.toLowerCase().includes(e.target.value.toLowerCase().trim()))
    })
    recipeData = filteredData
  }

  // Render
  return (
    <React.Fragment>

      {/* An input search bar */}
      <Input type="search" variant="flushed" placeholder="Search" value={search} onChange={handleSearch} />

      <br /> <br />

      {/* Grid of recipies */}
      {
        recipeData && recipeData.length ?
          <React.Fragment>
            <SimpleGrid columns={2}>
              {recipeData.map((recipe: Recipe) => (
                <RecipeCard key={recipe.recipe_title} recipe={recipe} />
              ))}
            </SimpleGrid>
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