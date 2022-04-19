import { HeartSwitch } from '@anatoliygatt/heart-switch'
import { Box, Center, Checkbox, Divider, Stack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react"
import { Recipe, useDeleteSavedRecipeMutation, GetOneRecipeDocument, GetSavedStatusDocument, useSaveRecipeToUserMutation } from '../../generated/graphql'
import { initializeApollo } from '../../utils/apollo'
import { useGetIntId } from '../../utils/getIdFromUrl'
import styles from "./Recipe.module.css"

interface Props {
  recipe: Recipe,
  savedStatus: boolean
}

const Recipe: NextPage<Props> = ({ recipe }) => {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const apolloClient = initializeApollo();
  
  useEffect(() => {
    const getStuff = async () => {
      const { data: savedStatus } = await apolloClient.query({
        query: GetSavedStatusDocument,
        variables: {
          recipe_ids: [recipe.id]
        }
      })
      setIsSaved(savedStatus.getSavedStatus[0])
     }

     getStuff()
  }, [])

  // GraphQL API
  const [saveRecipe] = useSaveRecipeToUserMutation();
  const [unsaveRecipe] = useDeleteSavedRecipeMutation();

  async function updateSaveStatus() {
    if (isSaved) {
      await unsaveRecipe({
        variables: {
          recipe_id: recipe.id
        }
      })
    }
    else {
      await saveRecipe({
        variables: {
          recipe_id: recipe.id
        }
      })
    }
    setIsSaved(!isSaved)
    console.log(apolloClient.cache.extract())
    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "getSavedStatus"})
    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "getSavedRecipes"})
    console.log(apolloClient.cache.extract())
  }

  return (

    <React.Fragment>
      <Center>
        <Stack direction={"column"} >
          <h1 className="title" style={{ fontWeight: "bold", textAlign: "center" }}>{recipe!.recipe_title}</h1>
          <p style={{ color: "grey", textAlign: "center" }}>By {recipe.recipeAuthors![0].user_name}</p>
          <p>{recipe!.recipe_desc}</p>
        </Stack >
      </Center >

      {/* {
        JSON.stringify(savedStatus, null, 2)
      } */}

      <br />

      <Stack direction={"row"}>
        <Stack direction={"column"} width="50%">
          <Box>
            <img
              className={styles.recipeImage}
              src={recipe.photo_url}
              alt={recipe.recipe_title}
            />
          </Box>
          <Box>
            <Stack className={styles.summaryBox} direction={"column"}>
              <p><b>Cook: </b> {recipe.cook_time_minutes} mins</p>
              <p><b>Prep: </b> {recipe.prep_time_minutes} mins</p>
              <p><b>Total: </b> {recipe.total_time_minutes} mins</p>
              <p><b>Steps: </b> {recipe.recipeSteps?.length} step(s)</p>
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
                  updateSaveStatus();
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
              {recipe.recipeIngredients!.map((ingredient, index) => (
                <Box key={index} style={{ marginBottom: "1em" }}>
                  <Checkbox size="lg"> {ingredient.ingredient_qty} {ingredient.ingredient_unit} {ingredient.ingredient_name} </Checkbox>
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
          recipe.recipeSteps!.map((instruction, index) => (
            <Box key={index} style={{ marginBottom: "1em" }}>
              <b><p>Step {index + 1}</p></b>
              <p>{instruction.step_desc}</p>
            </Box>
          ))
        }
      </Stack>

      <br />

      {
        recipe.footnotes?.length ?
          <Stack>
            <h2 className="title">Footnotes</h2>
            <Divider />
            {
              recipe.footnotes?.map((footnote, index) => (
                <Box key={index}>
                  <p>{footnote}</p>
                </Box>
              ))
            }
          </Stack>
          :
          null
      }
    </React.Fragment >
  )
}

export async function getServerSideProps(context: any) {
  const apolloClient = initializeApollo();
  const recipeId = context.query.id;

  const recipeData = await apolloClient.query({
    query: GetOneRecipeDocument,
    variables: {
      id: parseInt(recipeId)
    }
  })

  return {
    props: {
      recipe: recipeData.data.getOneRecipe,
    }
  }
}

export default Recipe