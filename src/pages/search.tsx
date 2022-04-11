import { useRouter } from "next/router";
import React, { useState } from "react";
import urlencode from "urlencode";
import { SearchRecipesDocument } from "../generated/graphql";
import { initializeApollo } from '../utils/apollo';
import { useQuery } from "@apollo/client";
import { Center, SimpleGrid } from "@chakra-ui/react";
import { Recipe } from "../generated/graphql";
import RecipeCard from "../components/Recipe/RecipeCard";

interface SearchProps {
  searchQuery: string;
}

let queryString = "";

const SearchRender = ({ searchQuery }: SearchProps) => {
  
  const router = useRouter()
  queryString = urlencode.decode(router.query.q as string);

  const { loading, data: searchResponse } = useQuery(SearchRecipesDocument, {
    variables: {
      query: searchQuery
    }
  })

  if (loading) 
    return ( <>LOADING...</> );
  else if (!loading && searchResponse?.searchRecipes === undefined) 
    return ( <>NO SEARCH QUERY</> );
  else {
    const searchResults = searchResponse?.searchRecipes as Recipe[];

    const displaySearchResults = (searchResults: Recipe[]) => {
      if (!searchQuery.trim().length) {
        return null
      }

      if (searchResults.length) {
        return (
          <SimpleGrid columns={2}>
            {searchResults.map((recipe: Recipe) => (
              <RecipeCard key={recipe.recipe_title} recipe={recipe} isPreview={true} />
            ))}
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
        <Center>
          {/* Grid of recipies */}
          {displaySearchResults(searchResults)}
        </Center>
      </React.Fragment>
    );
  };
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SearchRecipesDocument,
    variables: {
      searchQuery: queryString
    }
  })
  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}


export default SearchRender;
