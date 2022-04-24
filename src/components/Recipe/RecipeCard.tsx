import { InputHTMLAttributes }  from 'react'
import { Center }               from '@chakra-ui/react'
import { Recipe }               from '../../generated/graphql'
import NextLink                 from 'next/link'
import Card                     from '../Card/Card'

interface Props extends InputHTMLAttributes<HTMLDivElement>{
  showHeart?: boolean
  recipe: Recipe
}

const RecipeCard = ({ recipe, showHeart }: Props) => {
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