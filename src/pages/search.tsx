import React, { useState } from "react";
import { SimpleGrid, Center, Box, Input } from "@chakra-ui/react";
import fakeData from "../fakeData.json"
import type { Recipe } from "../types";
import RecipeCard from "../components/Recipe/RecipeCard"

const Login = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Recipe[]>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { // This function will change during the front-end and back-end merge
    setSearchQuery(e.target.value)

    if (e.target.value.trim() === "") {
      setSearchResults([])
      return
    }

    const filteredData = fakeData["data"].filter((recipe: Recipe) => {
      const toSearch = [recipe.title, recipe.description, recipe.external_author, ...recipe.instructions]
      const subStrings = searchQuery.split(" ")

      // check if all of the subStrings are in the toSearch
      return subStrings.every(subString => {
        return toSearch.some(str => str.toLowerCase().includes(subString.toLowerCase().trim()))
      })
    })
    setSearchResults(filteredData)
  }

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
      <Input type="search" variant="flushed" placeholder="Search" value={searchQuery} onChange={handleSearch}/>

      <br /> <br />

      <Center>
        {/* Grid of recipies */}
        { displaySearchResults(searchResults) }
      </Center>
    </React.Fragment>
  );
};

export default Login;
