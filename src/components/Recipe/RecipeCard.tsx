import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import type { Recipe } from "../../types"
import styles from "./RecipeCard.module.css"

import { truncateString } from "../../utils"

interface Props {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <Stack
      className={styles.recipeCard}
      w={{ sm: '100%', md: '45%' }}
      height={{ sm: '31em', md: '18em' }}
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('white', 'gray.900')}
      >
      <Flex flex={1}>
        <Image
          objectFit="cover"
          boxSize="100%"
          src={ recipe.photo_url }
        />
      </Flex>
      <Stack
        flex={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        >
        <Heading fontSize={'xl'} textAlign="center">
          { recipe.title }
        </Heading>
        <Text fontWeight={600} color={'gray.500'} size="sm">
          { recipe.external_author }
        </Text>
        <Text 
          textAlign={'center'} 
          color={useColorModeValue('gray.700', 'gray.400')}
        >
          { truncateString(recipe.description, 100) }
        </Text>
        
        <Stack
          className={styles.recipeCardButtons}
          direction={'row'}
          >
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
          >
            Delete
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Open Recipe
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RecipeCard