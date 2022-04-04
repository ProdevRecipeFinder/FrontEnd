
import { data } from "../../../fakeData.json"
import { Recipe } from "../../../types"
import type { NextPageContext } from 'next'
import { Stack, Image, Button, Center, Box, Divider, Checkbox } from '@chakra-ui/react'
import React from "react"
import styles from "./recipe.module.css"

export async function getServerSideProps({ query }: NextPageContext) {
  const recipeId = parseInt(query.id as string)
  const recipe = data.find(recipe => recipe.id === recipeId)

  return {
    props: {
      recipe,
    }
  }
}

interface Props {
  recipe: Recipe
}

const Recipe = ({ recipe }: Props) => {

  return (
    <React.Fragment>
      <Center>
        <Stack direction={"column"} >
          <h1 className="title" style={{fontWeight: "bold", textAlign: "center"}}>{recipe.title}</h1>
          <p style={{color: "grey", textAlign: "center"}}>By {recipe.external_author}</p>
          <p>{recipe.description}</p>
        </Stack>
      </Center>

      <br />

      <Stack direction={"row"}>
        <Stack direction={"column"} width="50%">
          <Box>
            <img 
              className={styles.recipeImage}
              src={recipe.photo_url} 
              alt={recipe.title} 
            />
          </Box>
          <Box>
            <Stack className={styles.summaryBox} direction={"column"}>
              <p><b>Cook: </b> {recipe.cook_time_minutes} mins</p>
              <p><b>Prep: </b> {recipe.prep_time_minutes} mins</p>
              <p><b>Total: </b> {recipe.total_time_minutes} mins</p>
              <p><b>Steps: </b> {recipe.instructions.length} step(s)</p>
            </Stack>
          </Box>
        </Stack>

        <Stack className={styles.ingredientsBox} direction={"column"} width="50%">
          <Box>
            <h2 className="title">Ingredients</h2>
            <Divider />
            <br />
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <Box key={index} style={{marginBottom: "1em"}}>
                  <Checkbox size="lg"> {ingredient.quantity} {ingredient.unit} {ingredient.ingredient} </Checkbox>
                </Box>
              ))}
            </ul>
          </Box>
        </Stack>
      </Stack>

      <br />

      <Stack>
        <h2 className="title">Instructions</h2>
        <Divider />
        {
          recipe.instructions.map((instruction, index) => (
            <Box key={index} style={{marginBottom: "1em"}}>
              <b><p>Step {index + 1}</p></b>
              <p>{instruction}</p>
            </Box>
          ))
        }
      </Stack>

    </React.Fragment>
  )
}

export default Recipe