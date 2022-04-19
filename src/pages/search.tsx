import { Center, Box, SimpleGrid } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import urlencode from "urlencode";
import RecipeCard from "../components/Recipe/RecipeCard";
import { Recipe, SearchRecipesDocument } from "../generated/graphql";
import { initializeApollo } from '../utils/apollo';

interface SearchProps {
  searchResults: any
}

const Search: NextPage<SearchProps> = ({ searchResults }) => {

  const displaySearchResults = (searchResults: Recipe[]) => {
    const plainResult = Object.values(searchResults);
    plainResult.pop();

    if (plainResult.length) {
      return (
        <SimpleGrid columns={3} spacing={10}>
          {
            plainResult.map((recipe: Recipe) => <RecipeCard recipe={recipe} key={recipe.id} /> )
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
      {/* {Grid of recipies} */}
      {displaySearchResults(searchResults)}
    </React.Fragment>
  );
};

export async function getServerSideProps(context: any) {
  const searchQuery = context.query.q;
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: SearchRecipesDocument,
      variables: {
        query: searchQuery
      }
    })
  } catch(e) {
    console.log(e)
  }

  return {
    props: {
      searchResults: apolloClient.cache.extract()
    }
  }
}


export default Search;
