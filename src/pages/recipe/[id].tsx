import {
  useBreakpointValue,
  AlertIcon,
  useToast,
  Divider,
  Checkbox,
  Center,
  Alert,
  Stack,
  Box,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  useDeleteSavedRecipeMutation,
  useDeleteRecipeMutation,
  useSaveRecipeToUserMutation,
  GetSavedStatusDocument,
  GetOneRecipeDocument,
  useWhoAmIQuery,
  Recipe,
} from '../../generated/graphql'
import React, { useEffect, useState } from "react"
import { initializeApollo } from '../../utils/apollo'
import { HeartSwitch } from '@anatoliygatt/heart-switch'
import { NextPage } from 'next'
import styles from "./Recipe.module.css"
import StarRatingComponent from "react-star-rating-component"
import { useRouter } from 'next/router'

interface Props {
  recipe: Recipe,
  savedStatus: boolean
}

const Recipe: NextPage<Props> = ({ recipe }) => {
  // Hooks
  const apolloClient = initializeApollo();
  const toast = useToast()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Queries and Mutations
  const { data: whoAmI } = useWhoAmIQuery()
  const [saveRecipe] = useSaveRecipeToUserMutation();
  const [unsaveRecipe] = useDeleteSavedRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  // State
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(parseInt(recipe.rating_stars));

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

  const deleteRecipeFunction = async () => {
    await deleteRecipe({
      variables: {
        id: recipe.id
      }
    })
    toast({
      title: "Recipe Deleted",
      description: "Your recipe has been deleted.",
      status: "success",
      duration: 5000,
      isClosable: true
    })
    apolloClient.cache.evict({id: "ROOT_QUERY", fieldName: "getSavedRecipes"})
    apolloClient.cache.evict({id: "ROOT_QUERY", fieldName: "getSavedStatus"})
    router.push("/my-cookbook")
  }

  async function updateSaveStatus() {
    if (isSaved) {
      if (whoAmI?.whoami?.user_name === recipe.recipeAuthors[0].user_name) {
        onOpen()
        return
      }

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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Unsaving this recipe has the affect of deleting it, because you created it. Are you sure?
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" colorScheme="red" style={{background: "transparent"}} onClick={deleteRecipeFunction}>Yes, delete recipe</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      { /* Page Title */}
      <Center>
        <Stack direction={"column"} textAlign="center">
          <h1 className="title" style={{ fontWeight: "bolder", textAlign: "center" }}>{recipe!.recipe_title}</h1>
          <p style={{ color: "grey", textAlign: "center" }}>By {recipe.recipeAuthors![0].user_name}</p>
          <Center>
            <Box marginRight="0.5em" fontSize="1.2em">
              <StarRatingComponent name="rate1" starCount={5} value={rating} editing={whoAmI?.whoami ? true : false} onStarClick={(nextValue, prevValue) => {
                setRating(nextValue)
              }} />
            </Box>
            {recipe.review_count} ratings
          </Center>
        </Stack >
      </Center >

      {
        whoAmI?.whoami ? null :
          <Box>
            <br />
            <Alert status='warning' variant='left-accent'>
              <AlertIcon />
              You are not logged in! You will not be able to save or review this recipe
            </Alert>
          </Box>
      }

      <br />

      <Stack direction={useBreakpointValue({ sm: "column", md: "row" })}>

        { /* Recipe Image and information summary */}
        <Box width={useBreakpointValue({ sm: "100%", md: "50%" })} position="relative">
          <img
            className={styles.recipeImage}
            src={recipe.photo_url}
            alt={recipe.recipe_title}
          />
          {
            !(whoAmI?.whoami) ? null :
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
                  onChange={() => {
                    updateSaveStatus();
                  }}
                />
              </Box>
          }
        </Box>
        <Box width={useBreakpointValue({ sm: "100%", md: "50%" })}>
          <Stack className={styles.summaryBox} direction={"column"}>
            <p>{recipe.recipe_desc}</p>
            <br />
            <p><b>Cook time: </b> {recipe.cook_time_minutes} mins</p>
            <p><b>Prep time: </b> {recipe.prep_time_minutes} mins</p>
            <p><b>Total time: </b> {recipe.total_time_minutes} mins</p>
            <p><b>Steps: </b> {recipe.recipeSteps?.length} step(s)</p>
            <p><b>Rating: </b> {recipe.rating_stars}/5</p>
          </Stack>
        </Box>
      </Stack>

      <br />

      <Stack direction={useBreakpointValue({ sm: "column", md: "row" })}>
        { /* Recipe Ingredients */}
        <Stack width={useBreakpointValue({ sm: "100%", md: "50%" })}>
          <h2 className="title">Ingredients</h2>
          <Divider width={useBreakpointValue({ sm: "100%", md: "80%" })} />

          <ul>
            {recipe.recipeIngredients!.map((ingredient, index) => (
              <Box key={index} style={{ marginBottom: "1em" }}>
                <Checkbox size={useBreakpointValue({ base: "sm", md: "md", lg: "lg" })}> {ingredient.ingredient_qty} {ingredient.ingredient_unit} {ingredient.ingredient_name} </Checkbox>
              </Box>
            ))}
          </ul>
        </Stack>

        { /* Recipe Steps */}
        <Stack width={useBreakpointValue({ sm: "100%", md: "50%" })}>
          <h2 className="title">Instructions</h2>
          <Divider width={useBreakpointValue({ sm: "100%", md: "80%" })} />
          {
            recipe.recipeSteps!.map((instruction, index) => (
              <Box key={index} style={{ marginBottom: "1em" }}>
                <b><p>Step {index + 1}</p></b>
                <p>{instruction.step_desc}</p>
              </Box>
            ))
          }
        </Stack>
      </Stack>

      <br />

      { /* Recipe Notes */}
      {
        recipe.footnotes?.length ?
          <Stack>
            <h2 className="title">Footnotes</h2>
            <Divider />
            <ul>
              {
                recipe.footnotes?.map((footnote, index) => (
                  <li key={index}>
                    <Box>
                      <p>{footnote}</p>
                    </Box>
                  </li>
                ))
              }
            </ul>
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

  // redirect if recipeId is not a number
  if (isNaN(Number(recipeId))) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  const recipeData = await apolloClient.query({
    query: GetOneRecipeDocument,
    variables: {
      id: parseInt(recipeId)
    }
  })

  if (!recipeData.data.getOneRecipe) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  return {
    props: {
      recipe: recipeData.data.getOneRecipe,
    }
  }
}

export default Recipe