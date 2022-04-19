import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: 'http://[::1]:4000/graphql',
            credentials: 'include',
        }),
        cache: new InMemoryCache(),
    });
}

export default createApolloClient;