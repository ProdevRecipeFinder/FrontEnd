import { 
  Center, 
  SimpleGrid, 
  Button 
} from "@chakra-ui/react"
import { 
  GetSavedStatusDocument, 
  useSearchRecipesQuery, 
  Recipe
} from "../generated/graphql"
import React, { 
  useEffect, 
  useState 
} from "react"
import { initializeApollo } from '../utils/apollo'
import { useRouter }        from "next/router"
import { NextPage }         from "next"
import RecipeCard           from "../components/Recipe/RecipeCard"

interface SearchProps {
  searchResults: any
}

const Search: NextPage<SearchProps> = () => {
  // Hooks
  const apolloClient = initializeApollo()
  const router = useRouter()

  // Queries 
  const searchQuery = typeof router.query.q === "string" ? router.query.q : "empty"
  const { data: searchResultsData, loading, fetchMore } = useSearchRecipesQuery({
    variables: {
      query: searchQuery,
    },
    skip: searchQuery === "empty"
  })
  const searchResults = searchResultsData?.searchRecipes.recipes as Recipe[]
  
  // State 
  const [savedRecipes, setSavedRecipes] = useState<Boolean[]>([])
  
  // Handlers
  const displaySearchResults = (searchResults: Recipe[]) => {
    const plainResult = Object.values(searchResults)
    if (plainResult.length) {
      return (
        <SimpleGrid columns={2}>
          {
            plainResult.map((recipe: Recipe, index: number) => <RecipeCard recipe={recipe} key={recipe.id} showHeart={!!savedRecipes[index]} />)
          }
        </SimpleGrid>
      )
    } else {
      return (
        <Center>
          <p>No search results</p>
        </Center>
      )
    }
  }

  // Effects
  useEffect(() => {
    if (searchQuery === "empty" || searchResults === undefined) // if the search query is empty, or the search results are undefined, don't do anything
        return

    apolloClient.cache.evict({id: "ROOT_QUERY", fieldName: "getSavedStatus"}) // clear the cache so we can get the new saved status

    const getSaveStatus = async () => { // get the saved status of each recipe, so we can display the heart icon on the recipe card
      const { data: savedRecipes } = await apolloClient.query({
        query: GetSavedStatusDocument,
        variables: {
          recipe_ids: searchResults?.map((recipe: Recipe) => recipe.id)
        }
      })

      if (savedRecipes.getSavedStatus.length) {
        setSavedRecipes(savedRecipes.getSavedStatus)
        apolloClient.cache.modify({
          id: "ROOT_QUERY",
          fields: {
            getSavedStatus() {
              return savedRecipes.getSavedStatus
            }
          }
        })
      }
    }

    getSaveStatus()
  }, [router.query.q, searchResults]) // run this effect only when the search query or search results change

  // Render
  if (loading) 
    return <Center>Loading...</Center> // if the query is loading, display a loading message
  return (
    <React.Fragment>
      {/* Grid of recipies */}
      {
        searchResults ? displaySearchResults(searchResults) : null
      }
      <Center>
        <Button disabled={!searchResultsData?.searchRecipes.pageInfo.hasNextPage} onClick={() => {
          fetchMore({ // fetch more results
            variables: {
              cursor: searchResultsData?.searchRecipes.pageInfo.endCursor
            }
          })
        }}>Load more</Button>
      </Center>
    </React.Fragment>
  )
}

export default Search
