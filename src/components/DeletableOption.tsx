import { Flex } from "@chakra-ui/react"
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface Props {
  text: string 
  onDelete: (text: string) => void
}

const DeletableOption = ({text, onDelete}: Props) => {
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
        {text}
        <FontAwesomeIcon icon={faXmark} style={{cursor: "pointer", float: "right", color: "red", marginRight: "0.5em", padding:"0.25em" }} onClick={() => onDelete(text)}/>
      </Flex>
    </React.Fragment>
  )
}

export default DeletableOption