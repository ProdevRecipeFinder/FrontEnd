import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Link } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeleteRecipeMutation, useWhoAmIQuery } from "../../generated/graphql";

interface EditDeletePostBtnsProps {
  recipe_id: number;
  recipeAuthorId: number;
}

export const EditDeletePostBtns: React.FC<EditDeletePostBtnsProps> = ({
  recipe_id,
  recipeAuthorId
}) => {
  const [deleteRecipe] = useDeleteRecipeMutation();
  const { data: whoami } = useWhoAmIQuery();
  if (whoami?.whoami?.id !== recipeAuthorId) {
    return null;
  }
  return (
    <Box>
      <NextLink href="/recipe/edit/[id]" as={`/recipe/edit/${recipe_id}`}>
        <IconButton
          as={Link}
          _hover={{ bgColor: "#38B2AC" }}
          icon={<EditIcon />}
          aria-label="edit-recipe"
        ></IconButton>
      </NextLink>
      <IconButton
        _hover={{ bgColor: "red" }}
        icon={<DeleteIcon />}
        aria-label="delete-recipe"
        onClick={() => {
          deleteRecipe({
            variables: {
              id: recipe_id
            }
          });
        }}
      ></IconButton>
    </Box>
  );
};