import { useRouter } from "next/router";
import React, { useState } from "react";
import urlencode from "urlencode";
import SearchComponent from "../components/pageHandlers/searchHandler";
import { SearchRecipesDocument } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../utils/withApollo";

let queryString = "";

const SearchRender = () => {

    const router = useRouter()
    queryString = urlencode.decode(router.query.q as string);
    return (
        <React.Fragment>
            <SearchComponent searchQuery={queryString} />
        </React.Fragment>
    )
}

export async function getServerSideProps() {
    const apolloClient = initializeApollo();
    await apolloClient.query({
        query: SearchRecipesDocument,
        variables: {
            query: queryString
        },
    })
    return addApolloState(apolloClient, {
        props: apolloClient.cache.extract()
    })
}


export default SearchRender;
