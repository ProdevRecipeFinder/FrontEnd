import { 
  Center,
  Input
} from "@chakra-ui/react"
import React, { useState } from "react"
import RecipeCard from "../../components/Recipe/RecipeCard"
import type { Recipe } from "../../types"
import { SimpleGrid } from '@chakra-ui/react'

import fakeData from "../../fakeData.json"


function first20(arr: Array<Recipe>): Array<Recipe> {
  return arr.slice(0, 20)
}

let data = first20(fakeData["data"]) as Recipe[]

const myCookBookAll = () => {

  const [search, setSearch] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    if (e.target.value === "") {
      data = first20(fakeData["data"]) as Recipe[]
      return
    }

    const filteredData = data.filter(recipe => {
      const toSearch = [recipe.title, recipe.description, recipe.external_author, ...recipe.instructions]
      return toSearch.some(str => str.toLowerCase().includes(e.target.value.toLowerCase().trim()))
    })
    data = filteredData
  }

  return (
    <React.Fragment>

      {/* An input search bar */}
      <Input type="search" variant="flushed" placeholder="Search" value={search} onChange={handleSearch}/>

      <br/> <br/>

      {/* Grid of recipies */}
      {
        data.length ? 
        <SimpleGrid columns={2}>
          {data.map((recipe: Recipe) => (
            <RecipeCard key={recipe.title} recipe={recipe}/>
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

export default myCookBookAll