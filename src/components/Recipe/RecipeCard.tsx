import {
  Center,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Recipe } from '../../generated/graphql'
import Card from '../Card/Card'
import { useRouter } from 'next/router'

interface Props {
  recipe: Recipe
  showHeart?: boolean
}

const RecipeCard = ({ recipe, showHeart }: Props) => {
  const router = useRouter()

  return (
    <Center>
      <NextLink href={`/recipe/${recipe.id}`}>
        <a>
          <Card
            title={recipe.recipe_title}
            desc={recipe.recipe_desc}
            img={recipe.photo_url}
            showHeart={showHeart ? true : false}
          />
        </a>
      </NextLink>
    </Center>
  )
}

export default RecipeCard