import { 
  useToast, 
  Divider, 
  Checkbox, 
  Center, 
  Stack, 
  Box, 
} from '@chakra-ui/react'
import { 
  useDeleteSavedRecipeMutation, 
  useSaveRecipeToUserMutation, 
  GetSavedStatusDocument, 
  GetOneRecipeDocument, 
  useWhoAmIQuery, 
  Recipe, 
} from '../../generated/graphql'
import React, { useEffect, useState } from "react"
import { initializeApollo }           from '../../utils/apollo'
import { HeartSwitch }                from '@anatoliygatt/heart-switch'
import { NextPage }                   from 'next'
import styles                         from "./Recipe.module.css"

interface Props {
  recipe: Recipe,
  savedStatus: boolean
}

const Recipe: NextPage<Props> = ({ recipe }) => {
  // Hooks
  const apolloClient = initializeApollo();
  const toast = useToast()

  // Queries and Mutations
  const { data: whoAmI } = useWhoAmIQuery()
  const [saveRecipe] = useSaveRecipeToUserMutation();
  const [unsaveRecipe] = useDeleteSavedRecipeMutation();

  // State
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Effects
  useEffect(() => { // Get saved status of this recipe
    const getIsSaved = async () => {
      const { data: savedStatus } = await apolloClient.query({
        query: GetSavedStatusDocument,
        variables: {
          recipe_ids: [recipe.id]
        }
      })
      setIsSaved(savedStatus.getSavedStatus[0])
    }

    if (whoAmI?.whoami) // Only run if user is logged in
      getIsSaved()
  }, [])

  async function updateSaveStatus() {
    if (isSaved) {
      await unsaveRecipe({
        variables: {
          recipe_id: recipe.id
        }
      })
      toast({
        title: "Unsaved",
        description: "Recipe unsaved",
        status: "info",
        duration: 5000,
        isClosable: true
      })
    }
    else {
      await saveRecipe({
        variables: {
          recipe_id: recipe.id
        }
      })
      toast({
        title: "Saved",
        description: "Recipe saved",
        status: "info",
        duration: 5000,
        isClosable: true
      })
    }
    setIsSaved(!isSaved) // Toggle saved status
    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "getSavedStatus" })
    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "getSavedRecipes" })
  }

  // Render
  return (
    <React.Fragment>
      { /* Page Title */}
      <Center>
        <Stack direction={"column"} >
          <h1 className="title" style={{ fontWeight: "bold", textAlign: "center" }}>{recipe!.recipe_title}</h1>
          <p style={{ color: "grey", textAlign: "center" }}>By {recipe.recipeAuthors![0].user_name}</p>
          <p>{recipe!.recipe_desc}</p>
        </Stack >
      </Center >

      <br />

      <Stack direction={"row"}>

        { /* Recipe Image and information summary */}
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
        
        { /* Recipe Ingredients and switch to save */}
        <Stack className={styles.ingredientsBox} direction={"column"} width="50%">
          {
            !(whoAmI?.whoami) ? null :
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
                    isSaved ? <p>Saved</p> : <p>Not Saved</p>
                  }
                </Box>
              </Center>
          }
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

      { /* Recipe Steps */}
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

      { /* Recipe Notes */}
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
    </React.Fragment>
  )
}

export async function getServerSideProps(context: any) { // Get recipe from url id parameter
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