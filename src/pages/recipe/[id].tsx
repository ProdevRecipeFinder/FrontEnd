import type { NextPageContext } from 'next'
import { Stack, Button, Center, Box, Divider, Checkbox } from '@chakra-ui/react'
import React, { useState } from "react"
import styles from "./recipe.module.css"
import { HeartSwitch } from '@anatoliygatt/heart-switch'

import { GetOneRecipeQuery, GetOneRecipeDocument } from '../../generated/graphql'
import { initializeApollo } from '../../utils/apollo'

export async function getServerSideProps({ query }: NextPageContext) {
  const recipeId = parseInt(query.id as string)

  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: GetOneRecipeDocument,
    variables: {
      id: recipeId
    }
  })
  
  const recipe = apolloClient.cache.extract()

  // send to 404 if not found
  if (!recipe) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      recipe,
    }
  }
}

interface Props {
  recipe: any
}

const Recipe = ({ recipe }: Props) => {
  const [isSaved, setIsSaved] = useState(false)

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
              <p><b>Rating: </b> {recipe.rating_stars}/5</p>
            </Stack>
          </Box>
        </Stack>

        <Stack className={styles.ingredientsBox} direction={"column"} width="50%">
          <Center>
            <Box className={styles.heartSwitch}>
              <HeartSwitch
                size="md"
                inactiveTrackFillColor="#ffffff"
                inactiveTrackStrokeColor="#d1d1d1"
                activeTrackFillColor="#ff708f"
                activeTrackStrokeColor="#ff4e74"
                inactiveThumbColor="#ecfeff"
                activeThumbColor="#ecfeff"
                checked={isSaved}
                onChange={(event) => {
                  setIsSaved(event.target.checked);
                }}
              />
              {
                isSaved ?
                  <p>Saved</p>
                :
                  <p>Not Saved</p>
              }
            </Box>
          </Center>
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

      <br />

      {
        recipe.footnotes.length ? 
          <Stack>
            <h2 className="title">Footnotes</h2>
            <Divider />
            {
              recipe.footnotes.map((footnote, index) => (
                <Box key={index}>
                  <p>{footnote}</p>
                </Box>
              ))
            }
          </Stack>
        :
        null
      }

    </React.Fragment>
  )
}

export default Recipe