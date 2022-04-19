import {
  Center,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Recipe } from '../../generated/graphql'
import Card from '../Card/Card'

interface Props {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Center>
      <NextLink href={`/recipe/${recipe.id}`}>
        <Card 
          title={recipe.recipe_title}
          desc={recipe.recipe_desc}
          img={recipe.photo_url} 
        />
      </NextLink>
    </Center>
  )
}

export default RecipeCard