import React, { useState } from "react";
import { SimpleGrid, Center, Box, Input } from "@chakra-ui/react";
import fakeData from "../fakeData.json"
import type { Recipe } from "../types";
import RecipeCard from "../components/Recipe/RecipeCard"
import { useRouter } from "next/router";
import urlencode from "urlencode";

const Login = () => {
  const [searchResults, setSearchResults] = useState<Recipe[]>([])

  const router = useRouter()
  const searchQuery = urlencode.decode(router.query.q as string)

  const displaySearchResults = (searchResults: Recipe[]) => {
    if (!searchQuery.trim().length) {
      return null
    }

    if (searchResults.length) {
      return (
        <SimpleGrid columns={2}>
          {searchResults.map((recipe: Recipe) => (
            <RecipeCard key={recipe.title} recipe={recipe} isPreview={true}/>
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
        { displaySearchResults(searchResults) }
      </Center>
    </React.Fragment>
  );
};

export default Login;
