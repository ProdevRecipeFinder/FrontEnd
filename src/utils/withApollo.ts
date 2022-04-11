import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';


export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'same-origin',
        }),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.extract()

        const data = merge(existingCache, initialState, {
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        })

        _apolloClient.cache.restore(data)
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }

    return pageProps
}


export function useApollo(pageProps: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME]
    const store = useMemo(() => initializeApollo(state), [state])
    return store
}