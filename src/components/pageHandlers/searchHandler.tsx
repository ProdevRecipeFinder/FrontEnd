import { useQuery } from "@apollo/client";
import { Center, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { Recipe, SearchRecipesDocument } from "../../generated/graphql";
import RecipeCard from "../Recipe/RecipeCard";
import { initializeApollo } from '../../utils/apollo';

interface SearchProps {
  searchQuery: string;
}

let queryString = "";

export const SearchComponent: React.FC<SearchProps> = ({ searchQuery }) => {

  const { loading, data: searchResponse } = useQuery(SearchRecipesDocument, {
    variables: {
      query: searchQuery
    }
  })

  if (loading) {
    return (
      <>LOADING...</>
    );

  }
  else if (!loading && searchResponse?.searchRecipes === undefined) {
    return (
      <>NO SEARCH QUERY</>
    );
  } else {

    console.log("We got here");

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

export default SearchComponent;
