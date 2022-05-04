import { InputHTMLAttributes }  from 'react'
import { Center }               from '@chakra-ui/react'
import { Recipe }               from '../../generated/graphql'
import NextLink                 from 'next/link'
import Card                     from '../Card/Card'

interface Props extends InputHTMLAttributes<HTMLDivElement>{
  showHeart?: boolean
  recipe: Recipe,
  maxWidth: number
  height: number
}

const RecipeCard = ({ recipe, showHeart, maxWidth, height }: Props) => {
  return (
    <Center>
      <NextLink href={`/recipe/${recipe.id}`}>
        <a>
          <Card
            title={recipe.recipe_title}
            rating={recipe.rating_stars !== "0" ? `${parseFloat(recipe.rating_stars).toFixed(2)}/5` : "No rating"}
            showStars={recipe.rating_stars !== "0"}
            img={recipe.photo_url}
            showHeart={showHeart ? true : false}
            maxWidth={maxWidth}
            height={height}
          />
        </a>
      </NextLink>
    </Center>
  )
}

export default RecipeCard