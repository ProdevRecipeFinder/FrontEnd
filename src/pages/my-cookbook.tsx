import {
  Button,
  Center,
  Input
} from "@chakra-ui/react"
import React, { useState } from "react"
import RecipeCard from "../components/Recipe/RecipeCard"
import { SimpleGrid } from '@chakra-ui/react'
import { Recipe, User, useSavedRecipesQuery } from "../generated/graphql"
import { NextPage } from "next"

const myCookBook: NextPage = () => {

  const [search, setSearch] = useState("")


  const { data: recipe_response, loading, fetchMore } = useSavedRecipesQuery();

  if (loading) {
    return (
      <>LOADING</>
    )

  } else if (!loading && !recipe_response?.getSavedRecipes) {
    return (
      <>Error</>
    )
  } else {

    let recipe_data = recipe_response!.getSavedRecipes?.recipes as Recipe[];
    console.log(recipe_response);



    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      //Fix this and add debounce
      setSearch(e.target.value)

      const filteredData = recipe_data.filter(recipe => {
        const toSearch = [recipe.recipe_title, recipe.recipe_desc, recipe.recipeAuthors![0].user_name]
        return toSearch.some(str => str.toLowerCase().includes(e.target.value.toLowerCase().trim()))
      })
      recipe_data = filteredData
    }

    return (
      <React.Fragment>

        {/* An input search bar */}
        <Input type="search" variant="flushed" placeholder="Search" value={search} onChange={handleSearch} />

        <br /> <br />

        {/* Grid of recipies */}
        {
          recipe_data && recipe_data.length ?
            <React.Fragment>
              <SimpleGrid columns={2}>
                {recipe_data.map((recipe: Recipe) => (
                  <RecipeCard key={recipe.recipe_title} recipe={recipe} />
                ))}
              </SimpleGrid>
              <Center>
                <Button disabled={!recipe_response?.getSavedRecipes?.pageInfo.hasNextPage} onClick={() => {
                  fetchMore({
                    variables: {
                      cursor: recipe_response?.getSavedRecipes?.pageInfo.endCursor
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
}


export default myCookBook;