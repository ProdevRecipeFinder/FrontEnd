import React, { useState } from "react";
import { SimpleGrid, Center, Box, Input } from "@chakra-ui/react";
import RecipeCard from "../components/Recipe/RecipeCard"
import { useRouter } from "next/router";
import urlencode from "urlencode";

import { useSearchRecipesQuery, Recipe } from "../generated/graphql";

const Login = () => {
  
  const router = useRouter()
  const searchQuery = urlencode.decode(router.query.q as string)
  
  const { data: searchResults } = useSearchRecipesQuery({
    variables: {
      query: searchQuery
    }
  })

  const displaySearchResults = (searchResults: Recipe[]) => {
    if (!searchQuery.trim().length) {
      return null
    }

    if (searchResults.length) {
      return (
        <SimpleGrid columns={2}>
          {searchResults.map((recipe: Recipe) => (
            <RecipeCard key={recipe.recipe_title} recipe={recipe} isPreview={true}/>
          ))}
        </SimpleGrid>
      )
    } else {
      return (
        <Center>
          <p>No search results</p>
        </Center>
      )
    }
  }

  return (
    <React.Fragment>
      <Center>
        {/* Grid of recipies */}
        { displaySearchResults(searchResults as unknown as Recipe[]) }
      </Center>
    </React.Fragment>
  );
};

export default Login;
