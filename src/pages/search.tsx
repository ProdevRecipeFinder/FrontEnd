import { Center, SimpleGrid, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/Recipe/RecipeCard";
import { GetSavedStatusDocument, Recipe, SearchRecipesDocument, useSearchRecipesQuery } from "../generated/graphql";
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


  // useEffect(() => {
  //   apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "searchRecipes" })
  // }, [router.query.q])

  const searchResults = searchResultsData?.searchRecipes.recipes as Recipe[];

  const [savedRecipes, setSavedRecipes] = useState<Boolean[]>([]);

  useEffect(() => {
    if (searchQuery === "empty" || searchResults === undefined) {
      return
    }

    apolloClient.cache.evict({ id: "ROOT_QUERY", fieldName: "searchRecipes" })
    const getStuff = async () => {
      const { data: savedRecipes } = await apolloClient.query({
        query: GetSavedStatusDocument,
        variables: {
          recipe_ids: searchResults?.map((recipe: Recipe) => recipe.id)
        }
      })

      if (savedRecipes.getSavedStatus.length)
        setSavedRecipes(savedRecipes.getSavedStatus)
    }

    getStuff()
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
