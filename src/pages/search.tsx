import { Center, SimpleGrid } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/Recipe/RecipeCard";
import { GetSavedStatusDocument, Recipe, SearchRecipesDocument } from "../generated/graphql";
import { initializeApollo } from '../utils/apollo';


interface SearchProps {
  searchResults: any
}

const Search: NextPage<SearchProps> = ({ searchResults }) => {
  const apolloClient = initializeApollo();
  const router = useRouter();

  const [savedRecipes, setSavedRecipes] = useState<Boolean[]>([]);

  useEffect(() => {
    const getStuff = async () => {
      const { data: savedRecipes } = await apolloClient.query({
        query: GetSavedStatusDocument,
        variables: {
          recipe_ids: searchResults.map((recipe: Recipe) => recipe.id)
        }
      })


      if (savedRecipes.getSavedStatus.length)
        setSavedRecipes(savedRecipes.getSavedStatus)
    }

    getStuff()
  }, [router.query.q])

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

  return (
    <React.Fragment>
      {/* Grid of recipies */}
      {displaySearchResults(searchResults)}
    </React.Fragment>
  );
};

export async function getServerSideProps(context: any) {
  const searchQuery = context.query.q;
  const apolloClient = initializeApollo();

  const searchResults = await apolloClient.query({
    query: SearchRecipesDocument,
    variables: {
      query: searchQuery
    }
  })

  return {
    props: {
      searchResults: searchResults.data.searchRecipes
    }
  }
}


export default Search;
