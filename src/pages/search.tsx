import { 
  Center, 
  SimpleGrid, 
  Button 
} from "@chakra-ui/react";
import { 
  GetSavedStatusDocument, 
  useSearchRecipesQuery, 
  Recipe
} from "../generated/graphql";
import React, { 
  useEffect, 
  useState } from "react";
  import { useRouter } from "next/router";
import { NextPage } from "next";
import RecipeCard from "../components/Recipe/RecipeCard";
import { initializeApollo } from '../utils/apollo'

interface SearchProps {
  searchResults: any
}

const Search: NextPage<SearchProps> = () => {
  const apolloClient = initializeApollo();
  const router = useRouter();
  const searchQuery = typeof router.query.q === "string" ? router.query.q : "empty";

  
  const { data: searchResultsData, loading, fetchMore } = useSearchRecipesQuery({
    variables: {
      query: searchQuery,
    },
    skip: searchQuery === "empty"
  })
  
  const searchResults = searchResultsData?.searchRecipes.recipes as Recipe[];
  
  const [savedRecipes, setSavedRecipes] = useState<Boolean[]>([]);
  
  useEffect(() => {
    console.log("searchQuery: " + searchQuery + ", searchResults.length: " + searchResults);
    if (searchQuery === "empty" || searchResults === undefined) {
        return
    }

    // apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "searchRecipes" })
    apolloClient.cache.evict({id: "ROOT_QUERY", fieldName: "getSavedStatus"})
    const getSaveStatus = async () => {
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
  }, [router.query.q, searchResults])

  const displaySearchResults = (searchResults: Recipe[]) => {
    const plainResult = Object.values(searchResults);

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

  if (loading)
    return <Center>Loading...</Center>

  return (
    <React.Fragment>
      {/* Grid of recipies */}
      {
        searchResults ? displaySearchResults(searchResults) : null
      }
      <Center>
        <Button disabled={!searchResultsData?.searchRecipes.pageInfo.hasNextPage} onClick={() => {
          fetchMore({
            variables: {
              cursor: searchResultsData?.searchRecipes.pageInfo.endCursor
            }
          })
        }}>Load more</Button>
      </Center>
    </React.Fragment>
  );
};

export default Search;
