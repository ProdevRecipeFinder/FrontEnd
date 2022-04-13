import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { truncateString } from "../../utils"
import NextLink from 'next/link'
import styles from './RecipeCard.module.css'
import { Recipe } from '../../generated/graphql'

interface Props {
  recipe: Recipe
  isPreview?: boolean
}

const RecipeCard = ({ recipe, isPreview }: Props) => {
  return (
    <Center>
      <Stack
        className={styles.recipeCard}
        w={{ sm: '100%', md: '90%' }}
        height={{ sm: '31em', md: '18em' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
      >
        <Flex flex={1}>
          <Image
            objectFit="cover"
            boxSize="100%"
            borderRadius="0.3em"
            src={recipe.photo_url}
            transition="all ease 0.2s"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading fontSize={'xl'} textAlign="center">
            {recipe.recipe_title}
          </Heading>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
          >
            {truncateString(recipe.recipe_desc, 100)}
          </Text>

          <Stack
            className={styles.recipeCardButtons}
            direction={'row'}
          >
            {
              isPreview ? (
                null
              )
                : (
                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                  >
                    Delete
                  </Button>
                )
            }
            <NextLink href={`/recipe/${recipe.id}`}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                _hover={{ bg: 'blue.500' }}
                _focus={{ bg: 'blue.500' }}>
                Open
              </Button>
            </NextLink>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  )
}

export default RecipeCard