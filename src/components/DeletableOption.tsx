import { Flex, Box, Input, Button, Stack } from "@chakra-ui/react"
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen, faCheck, faArrowsSpin } from '@fortawesome/free-solid-svg-icons'
import { IngredientInputType } from "../generated/graphql"

interface Props {
  data: IngredientInputType | string
  index: number
  onDelete: (input: any) => void
  onEdit: (input: any) => void
  generateSubstitute?: (ingredient: string) => Promise<string[]>
}

const isIngredientInputType = (data: any): data is IngredientInputType => {
  return (data as IngredientInputType).unit !== undefined
}

const DeletableOption = ({ data, onDelete, onEdit, index, generateSubstitute }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

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
      } else {
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
            !isEditing && generateSubstitute && <FontAwesomeIcon icon={faArrowsSpin} style={{cursor: "pointer", marginRight: "0.5", padding: "0.25em"}} onClick={() => {
              generateSubstitute((`${(data as IngredientInputType).quantity} ${(data as IngredientInputType).unit} ${(data as IngredientInputType).ingredient}`))
              
            }} />
          }
          <FontAwesomeIcon icon={isEditing ? faCheck : faPen} style={{ cursor: "pointer", color: isEditing ? "green" : "dodgerblue", marginRight: "0.5em", padding: "0.25em" }} onClick={() => setIsEditing(!isEditing)} />
          {
            !isEditing && <FontAwesomeIcon icon={faXmark} style={{ cursor: "pointer", color: "red", marginRight: "0.5em", padding: "0.25em" }} onClick={() => onDelete(data)} />
          }
        </Stack>
      </Flex>
    </React.Fragment>
  )
}

export default DeletableOption