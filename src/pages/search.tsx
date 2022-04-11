import { Center, SimpleGrid } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import RecipeCard from "../components/Recipe/RecipeCard";
import { Recipe, SearchRecipesDocument } from "../generated/graphql";
import { initializeApollo } from '../utils/apollo';

interface SearchProps {
    searchResults: any
}

const Search: NextPage<SearchProps> = ({ searchResults }) => {

    const displaySearchResults = (searchResults: Recipe[]) => {
        const plainResults = Object.values(searchResults);

        if (plainResults.length) {
            return (
                <SimpleGrid columns={2}>
                    {plainResults.map((recipe: Recipe) => (
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
