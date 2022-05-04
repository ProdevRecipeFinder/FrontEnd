import { Flex, Box, Input, Button, Stack, Select, Center } from "@chakra-ui/react"
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen, faCheck, faArrowsSpin } from '@fortawesome/free-solid-svg-icons'
import { IngredientInputType } from "../generated/graphql"

interface Props {
  data: IngredientInputType | string
  index: number
  onDelete: (input: any) => void
  onEdit: (input: any) => void
  generateSubstitute?: (ingredient: string) => Promise<IngredientInputType[]>
}

const isIngredientInputType = (data: any): data is IngredientInputType => {
  return (data as IngredientInputType).unit !== undefined
}

const DeletableOption = ({ data, onDelete, onEdit, index, generateSubstitute }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSubstituting, setIsSubstituting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [substitutions, setSubstitutions] = useState<IngredientInputType[]>([])
  const [substitution, setSubstitution] = useState<string | undefined>(undefined)

  const handleSubstitution = async () => {
    if (generateSubstitute === undefined)
      return

    setIsLoading(true)
    const sub = (await generateSubstitute((`${(data as IngredientInputType).quantity} ${(data as IngredientInputType).unit} ${(data as IngredientInputType).ingredient}`)))
    console.log(sub)
    setSubstitutions(sub)
    setIsLoading(false)
    setIsSubstituting(true)
  }

  const display = () => {
    // if statement to check if the data is an ingredient or an instruction
    if (isIngredientInputType(data)) {
      if (isEditing) {
        return (
          <Stack direction="row" align="center" w="100%">
            <form>
              <Flex justify="space-around">
                <Input placeholder="Quantity" value={(data as IngredientInputType).quantity} onChange={(e) => onEdit({ index, property: "quantity", value: e.target.value })} w="30%" />
                <Input placeholder="Unit" value={(data as IngredientInputType).unit} onChange={(e) => onEdit({ index, property: "unit", value: e.target.value })} w="30%" />
                <Input placeholder="Ingredient" value={(data as IngredientInputType).ingredient} onChange={(e) => onEdit({ index, property: "ingredient", value: e.target.value })} w="30%" />
              </Flex>
            </form>
          </Stack>
        )
      }
      else if (isSubstituting) {
        return (
          <Select placeholder="Substitutions..." w="70%" size="sm" value={substitution} onChange={e => setSubstitution(e.target.value)}>
            {
              substitutions.length ? 
                substitutions.map((substitution, i) =>
                  <option style={{width:"70%"}} key={i} value={JSON.stringify({index, substitution})}>{substitution.quantity} {substitution.unit} {substitution.ingredient}</option>
                )
              :
                <option>No substitutions found</option>
            }
          </Select>
        )
      }
      else if (isLoading) {
        return (
          <Center>
            <p>Loading...</p>
          </Center>
        )
      }
      else {
        return (
          <Box>
            {`${(data as IngredientInputType).quantity} ${(data as IngredientInputType).unit} ${(data as IngredientInputType).ingredient}`}
          </Box>
        )
      }
    }
    else {
      if (isEditing) {
        return (
          <Input
            width="80%"
            value={data as string}
            onChange={(e) => { onEdit({ index, value: e.target.value }) }}
          />
        )
      }
      else {
        return (
          <Box>
            {data}
          </Box>
        )
      }
    }
  }

  return (
    <React.Fragment>
      <Flex
        align="center"
        justify="space-between"
        borderRadius="0.25em"
        padding="0.25em"
        _hover={{
          border: "1px solid #ccc"
        }}
      >
        {
          display()
        }
        <Stack direction="row" float="right">
          {
            !isEditing && !isSubstituting && generateSubstitute && <FontAwesomeIcon icon={faArrowsSpin} style={{ cursor: "pointer", marginRight: "0.5", padding: "0.25em" }} onClick={handleSubstitution} />
          }
          {
            !isEditing && !isSubstituting && <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "dodgerblue", marginRight: "0.5em", padding: "0.25em" }} onClick={() => setIsEditing(!isEditing)} />
          }
          {
            (isEditing || isSubstituting) && <FontAwesomeIcon icon={faCheck} style={{ cursor: "pointer", color: "green", marginRight: "0.5em", padding: "0.25em" }} onClick={() => {
              if (isEditing) 
                setIsEditing(!isEditing)
              if (isSubstituting) {
                setIsSubstituting(!isSubstituting)
                if (substitution !== "No substitutions found")
                  onEdit(substitution)
              }
            }}/>
          }
          {
            !isEditing && <FontAwesomeIcon icon={faXmark} style={{ cursor: "pointer", color: "red", marginRight: "0.5em", padding: "0.25em" }} onClick={() => {
              if (isSubstituting) {
                setIsSubstituting(false)
                return 
              }
              onDelete(data)
            }} />
          }
        </Stack>
      </Flex>
    </React.Fragment>
  )
}

export default DeletableOption