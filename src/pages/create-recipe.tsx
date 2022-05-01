import { Center, Stack, Input, Box, useBreakpointValue, Textarea, Divider, Button, Flex } from "@chakra-ui/react"
import Head from "next/head"
import React, { useState } from "react"
import styles from "../styles/create-recipe.module.css"
import DeletableOption from "../components/DeletableOption"
import { useWhoAmIQuery, useAddNewRecipeMutation, IngredientInputType, InstructionInputType } from "../generated/graphql"
import { Configuration, OpenAIApi } from "openai";
import getIngredientsData from "../utils/getIngredientsData"

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

const openai = new OpenAIApi(config)

const CreateRecipe = () => {
  const { data: whoami } = useWhoAmIQuery()
  const [addNewRecipe] = useAddNewRecipeMutation()

  const [recipeName, setRecipeName] = useState("")
  const [recipeDescription, setRecipeDescription] = useState("")
  const [cookTime, setCookTime] = useState("")
  const [prepTime, setPrepTime] = useState("")


  const [ingredients, setIngredients] = useState<IngredientInputType[]>([])
  const [quantity, setQuantity] = useState("")
  const [ingredientName, setIngredientName] = useState("")
  const [unit, setUnit] = useState("")
  const addIngredient = (event: any) => {
    event.preventDefault()
    if (ingredientName === "" || quantity === "" || unit === "") {
      return
    }
    if (ingredients.find(ingredient => ingredient.ingredient === ingredientName)) {
      return
    }
    setIngredients([...ingredients, { ingredient: ingredientName, unit, quantity }])
    setQuantity("")
    setIngredientName("")
    setUnit("")
  }
  const deleteIngredient = (text: string) => {
    setIngredients(ingredients.filter(ingredient => `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}` !== text))
  }
  const [autoIngredienstLoading, setAutoIngredienstLoading] = useState(false)

  const [instructions, setInstructions] = useState<string[]>([])
  const [step, setStep] = useState("")
  const addStep = (event: any) => {
    event.preventDefault()
    if (step === "") {
      return
    }
    if (instructions.find(instruction => instruction === step)) {
      return
    }
    setInstructions([...instructions, step])
    setStep("")
  }
  const deleteStep = (text: string) => {
    setInstructions(instructions.filter(i => i !== text))
  }
  const [autoInstructionsLoading, setAutoInstructionsLoading] = useState(false)

  const [footnotes, setFootnotes] = useState<string[]>([])
  const [footnote, setFootnote] = useState("")
  const addFootnote = (event: any) => {
    event.preventDefault()
    if (footnote === "") {
      return
    }
    if (footnotes.find(footnote => footnote === footnote)) {
      return
    }
    setFootnotes([...footnotes, footnote])
    setFootnote("")
  }
  const deleteFootnote = (text: string) => {
    setFootnotes(footnotes.filter(footnote => footnote !== text))
  }

  const input = {
    recipe_title: recipeName,
    recipe_desc: recipeDescription,
    prep_time_minutes: parseFloat(prepTime),
    cook_time_minutes: parseFloat(cookTime),
    ingredients: ingredients.map(ingredient => ({
      ingredient: ingredient.ingredient,
      unit: ingredient.unit,
      quantity: ingredient.quantity
    })),
    instructions: [], //not working here. For some reason instructions.map keeps returning void
    footnotes,
    original_url: "balls",
    photo_url: "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg",
  }

  const addRecipe = async () => {
    await addNewRecipe({
      variables: {
        input
      }
    })
  }

  const clearInputs = () => {
    setRecipeName("")
    setRecipeDescription("")
    setCookTime("")
    setPrepTime("")
    setIngredients([])
    setQuantity("")
    setIngredientName("")
    setUnit("")
    setInstructions([])
    setStep("")
    setFootnotes([])
    setFootnote("")
  }

  const generateIngredients = async () => {
    const prompt = `Generate ingredients for the following recipe, in the following format:\n
      quantity unit(grams, ounces, lbs, etc.) ingredientName
      ${recipeName}\n
      ${recipeDescription}\n
      ${instructions.length ? instructions.map(i => i + "\n") : ""} \n
      ${ingredients.length ? ingredients.map(i => `${i.quantity} ${i.unit} ${i.ingredient}`).join("\n") : ""} \n

      Output: 
      `

    setAutoIngredienstLoading(true)
    const response = await openai.createCompletion("text-davinci-002", {
      prompt,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    setAutoIngredienstLoading(false)

    //@ts-ignore
    const output = response.data.choices[0].text.trim().split("\n")
    const tempIngredients: IngredientInputType[] = getIngredientsData(output)
    
    setIngredients([...ingredients, ...tempIngredients])
  }

  const generateInstructions = async () => {
    const prompt = `Generate instructions for the following recipe:
    ${recipeName}\n
    ${recipeDescription}\n
    ${instructions.length ? instructions.map(i => i + "\n") : ""} \n
    ${ingredients.length ? ingredients.map(i => `${i.quantity} ${i.unit} ${i.ingredient}`).join("\n") : ""} \n

    Output: 
    `

    setAutoInstructionsLoading(true)
    const response = await openai.createCompletion("text-davinci-002", {
      prompt,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    setAutoInstructionsLoading(false)

    //@ts-ignore
    const output = response.data.choices[0].text.trim().split("\n").filter(i => i !== "")

    setInstructions([...instructions, ...output.map(i => {
      const instruction = i.split(" ")
      instruction.shift()
      return instruction.join(" ")
    })])
  }

  return (
    <React.Fragment>
      <Head>
        <title>Create Recipe - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Create Recipe" />
      </Head>

      <Center>
        <h1 className="title">Create Recipe</h1>
      </Center>

      <br />

      { /* Page Title */}
      <Stack direction={"column"} textAlign="center" w="100%">
        <Center>
          <Input placeholder="Recipe Name" w="30em" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
        </Center>
        <Center>
          <p style={{ color: "grey", textAlign: "center" }}>By {whoami?.whoami?.user_name}</p>
        </Center>
      </Stack>

      <br />

      <Stack direction={useBreakpointValue({ sm: "column", md: "row" })}>

        { /* Recipe Image and information summary */}
        <Box width={useBreakpointValue({ sm: "100%", md: "50%" })} position="relative">
          <img
            className={styles.recipeImage}
            src={"https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"}
          />
        </Box>
        <Box width={useBreakpointValue({ sm: "100%", md: "50%" })}>
          <Stack className={styles.summaryBox} direction={"column"}>
            <Textarea placeholder="Recipe description" h="15em" value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)} />
            <br />
            <Stack direction="row" align="center" w="100%">
              <p><b>Cook time: </b></p>
              <Input w="4em" float="right" type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} />
              <p>mins</p>
            </Stack>
            <Stack direction="row" align="center">
              <p><b>Prep time: </b></p>
              <Input w="4em" float="right" type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} />
              <p>mins</p>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      <br />

      <Stack direction={useBreakpointValue({ sm: "column", md: "row" })}>
        { /* Recipe Ingredients */}
        <Stack width={useBreakpointValue({ sm: "100%", md: "50%" })}>
          <h2 className="title">Ingredients</h2>
          <Divider width={useBreakpointValue({ sm: "100%", md: "80%" })} />

          {
            !ingredients.length ? null :
              <ul>
                {
                  ingredients.map((ingredient, index) => (
                    <Box key={index} style={{ marginBottom: "1em" }}>
                      <DeletableOption text={`${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient}`} onDelete={deleteIngredient} />
                    </Box>
                  ))}
              </ul>
          }

          <Stack direction="row" align="center" w="100%">
            <form>
              <Flex justify="space-around">
                <Input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} w="20%" />
                <Input placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} w="15%" />
                <Input placeholder="Ingredient" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} w="35%" />
                <Button w="20%" onClick={addIngredient} type="submit">Add</Button>
              </Flex>
            </form>
          </Stack>
          <Center>
            <Button isLoading={autoIngredienstLoading} disabled={!recipeName.length || !recipeDescription.length} onClick={generateIngredients}>Auto Generate Ingredients</Button>
          </Center>
        </Stack>

        { /* Recipe Steps */}
        <Stack width={useBreakpointValue({ sm: "100%", md: "50%" })}>
          <h2 className="title">Instructions</h2>
          <Divider width={useBreakpointValue({ sm: "100%", md: "80%" })} />
          {
            instructions.map((step, index) => (
              <Box key={index} style={{ marginBottom: "1em" }}>
                <b><p>Step {index + 1}</p></b>
                <DeletableOption text={step} onDelete={deleteStep} />
              </Box>
            ))
          }

          <Stack direction="row" align="center" w="100%">
            <form style={{ width: "100%" }}>
              <Flex justify="space-around">
                <Input placeholder="Step" value={step} onChange={(e) => setStep(e.target.value)} w="75%" />
                <Button w="20%" onClick={addStep} type="submit">Add</Button>
              </Flex>
            </form>
          </Stack>
          <Center>
            <Button isLoading={autoInstructionsLoading} disabled={!recipeName.length || !recipeDescription.length} onClick={generateInstructions}>Auto Generate Instructions</Button>
          </Center>
        </Stack>
      </Stack>

      <br />

      <Stack>
        <h2 className="title">Footnotes</h2>
        <Divider />
        {
          footnotes?.map((footnote, index) => (
            <Box key={index}>
              <DeletableOption text={footnote} onDelete={deleteFootnote} />
            </Box>
          ))
        }
        <Stack direction="row" align="center" w="100%">
          <form style={{ width: "100%" }}>
            <Flex justify="space-around">
              <Input placeholder="Footnote" value={footnote} onChange={(e) => setFootnote(e.target.value)} w="75%" />
              <Button w="20%" onClick={addFootnote} type="submit">Add</Button>
            </Flex>
          </form>
        </Stack>
      </Stack>

      <br />

      <Center>
        <Stack direction="row">
          <Button size="lg" variant="outline" colorScheme="red" background="transparent" onClick={clearInputs}>Clear</Button>
          <Button size="lg" onClick={addRecipe}>Create Recipe</Button>
        </Stack>
      </Center>

    </React.Fragment>
  )
}

export default CreateRecipe