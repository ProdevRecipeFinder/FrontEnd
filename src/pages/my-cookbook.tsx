import {
  Center,
  Input
} from "@chakra-ui/react"
import React, { useState } from "react"
import RecipeCard from "../components/Recipe/RecipeCard"
import { SimpleGrid } from '@chakra-ui/react'
import { Recipe, User, useSavedRecipesQuery } from "../generated/graphql"
import { NextPage } from "next"
import Head from 'next/head'

const getAuthor = (authors: [User]) => {
  if (!authors[0].id) {
    return authors[0].user_name
  } else {
    return authors[0].user_name
  }
}

const myCookBook: NextPage = () => {

  const [search, setSearch] = useState("")


  const { data: recipe_response, loading } = useSavedRecipesQuery();
        <Head>
        <title>My Cookbook- Recipe Finder</title>
        <meta name="description" content="Recipe Finder Cookbook Page" />
        </Head>
  if (loading) {
    return (
      <>LOADING</>
    )

  } else if (!loading && !recipe_response?.getSavedRecipes) {
    return (
      <>Error</>
    )
  } else {

    let recipe_data = recipe_response!.getSavedRecipes?.savedRecipes as Recipe[];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      //Fix this and add debounce
      setSearch(e.target.value)

      const filteredData = recipe_data.filter(recipe => {
        const toSearch = [recipe.recipe_title, recipe.recipe_desc, recipe.recipeAuthors![0].user_name]
        return toSearch.some(str => str.toLowerCase().includes(e.target.value.toLowerCase().trim()))
      })
      recipe_data = filteredData
    }

    console.log(recipe_data);



    return (
      <React.Fragment>

        {/* An input search bar */}
        <Input type="search" variant="flushed" placeholder="Search" value={search} onChange={handleSearch} />

        <br /> <br />

        <>HELLO</>

        {/* Grid of recipies */}
        {
          recipe_data.length ?
            <SimpleGrid columns={2}>
              {recipe_data.map((recipe: Recipe) => (
                <RecipeCard key={recipe.recipe_title} recipe={recipe} />
              ))}
            </SimpleGrid>
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