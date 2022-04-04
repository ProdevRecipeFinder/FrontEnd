import { 
  Center, 
  VStack, 
  Button,
  Input
} from "@chakra-ui/react"
import React  from "react"
import RecipeCard from "../../components/Recipe/RecipeCard"
import type { Recipe } from "../../types"
import fakeData from "./fakeData.json"

const data = fakeData["data"]
const sample = data[0] as Recipe

const myCookBookAll = () => {
  return (
    <React.Fragment>

      {/* An input search bar */}
      <Input type="search" variant="flushed" placeholder="Search"/>

      <RecipeCard recipe={sample}/>

    </React.Fragment>
  )
}

export default myCookBookAll