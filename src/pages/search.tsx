import { Center, SimpleGrid } from "@chakra-ui/react";
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

  console.log(searchResults);

  const displaySearchResults = (searchResults: Recipe[]) => {
    const router = useRouter()
    const queryString = urlencode.decode(router.query.q as string);

    const plainResult = Object.values(searchResults);

    if (plainResult.length) {
      return (
        <SimpleGrid columns={2}>
          {plainResult.map((recipe: Recipe) => (
            <RecipeCard key={recipe.recipe_title} recipe={recipe} />
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
        {/* {Grid of recipies} */}
        {displaySearchResults(searchResults)}
      </Center>
    </React.Fragment>
  );
};

export async function getServerSideProps(context: any) {

  const searchQuery = context.query.q;
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SearchRecipesDocument,
    variables: {
      query: searchQuery
    }
  })
  return {
    props: {
      searchResults: apolloClient.cache.extract()
    }
  }
}


export default Search;
