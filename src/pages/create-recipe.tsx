import { Center, Stack, Input, Box, useBreakpointValue, Textarea, Divider, Button, Flex } from "@chakra-ui/react"
import Head from "next/head"
import React, { useState } from "react"
import styles from "../styles/create-recipe.module.css"
import DeletableOption from "../components/DeletableOption"

type Ingredient = {
  name: string,
  unit: string,
  quantity: string,
}

const CreateRecipe = () => {
  const [recipeName, setRecipeName] = useState("")
  const [recipeAuthor, setRecipeAuthor] = useState("")
  const [recipeDescription, setRecipeDescription] = useState("")
  const [cookTime, setCookTime] = useState("")
  const [prepTime, setPrepTime] = useState("")


  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [quantity, setQuantity] = useState("")
  const [ingredientName, setIngredientName] = useState("")
  const [unit, setUnit] = useState("")
  const addIngredient = (event: any) => {
    event.preventDefault()
    if (ingredientName === "" || quantity === "" || unit === "") {
      return
    }
    if (ingredients.find(ingredient => ingredient.name === ingredientName)) {
      return
    }
    setIngredients([...ingredients, { name: ingredientName, unit, quantity }])
    setQuantity("")
    setIngredientName("")
    setUnit("")
  }
  const deleteIngredient = (text: string) => {
    setIngredients(ingredients.filter(ingredient => `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}` !== text))
  }

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

  const addRecipe = () => {

  }

  const clearInputs = () => {
    setRecipeName("")
    setRecipeAuthor("")
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

  return (
    <React.Fragment>
      <Head>
        <title>Account - Recipe Finder</title>
        <meta name="description" content="Recipe Finder Home Page" />
      </Head>

      <Center>
        <h1 className="title">Create Recipe</h1>
      </Center>

      <br />

      { /* Page Title */}
      <Stack direction={"column"} textAlign="center" w="100%">
        <Center>
          <Input placeholder="Recipe Name" w="30em" value={recipeName} onChange={(e) => setRecipeName(e.target.value)}/>
        </Center>
        <Center>
          <Stack direction="row" align="center" w="10em">
            <p style={{ color: "grey", textAlign: "center" }}>By</p>
            <Input placeholder="Author Name" value={recipeAuthor} onChange={(e) => setRecipeAuthor(e.target.value)}/>
          </Stack>
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
            <Textarea placeholder="Recipe description" h="15em" value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)}/>
            <br />
            <Stack direction="row" align="center" w="100%"> 
              <p><b>Cook time: </b></p>
              <Input w="4em" float="right" type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)}/>
              <p>mins</p>
            </Stack>
            <Stack direction="row" align="center">
              <p><b>Prep time: </b></p>
              <Input w="4em" float="right" type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)}/>
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
                    <DeletableOption text={`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`} onDelete={deleteIngredient}/>
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
        </Stack>

        { /* Recipe Steps */}
        <Stack width={useBreakpointValue({ sm: "100%", md: "50%" })}>
          <h2 className="title">Instructions</h2>
          <Divider width={useBreakpointValue({ sm: "100%", md: "80%" })} />
          {
            instructions.map((step, index) => (
              <Box key={index} style={{ marginBottom: "1em" }}>
                <b><p>Step {index + 1}</p></b>
                <DeletableOption text={step} onDelete={deleteStep}/>
              </Box>
            ))
          }

          <Stack direction="row" align="center" w="100%">
            <form style={{width: "100%"}}>
              <Flex justify="space-around">
                <Input placeholder="Step" value={step} onChange={(e) => setStep(e.target.value)} w="75%" />
                <Button w="20%" onClick={addStep} type="submit">Add</Button>
              </Flex>
            </form>
          </Stack>

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
          <form style={{width: "100%"}}>
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