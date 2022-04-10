import React, { useState } from "react";
import { SimpleGrid, Center, Box, Input } from "@chakra-ui/react";
import RecipeCard from "../components/Recipe/RecipeCard"
import { useRouter } from "next/router";
import urlencode from "urlencode";

import { useSearchRecipesQuery, Recipe } from "../generated/graphql";
import { ssrWithApollo } from "../utils/withApollo";

const Search = () => {

    const router = useRouter()
    const searchQuery = urlencode.decode(router.query.q as string)

    const { loading, data: searchResponse } = useSearchRecipesQuery({
        variables: {
            query: searchQuery
        }
    })

    if (!loading && searchResponse?.searchRecipes === undefined) {
        return (
            <>NO SEARCH QUERY</>
        );
    } else if (!loading) {

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
    }
};

export default ssrWithApollo({ ssr: true })(Search);
