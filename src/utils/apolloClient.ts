import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import getConfig from 'next/config';
import { relayStylePagination  } from '@apollo/client/utilities';

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'include',
        }),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        searchRecipes: relayStylePagination()
                    }
                }
            }
        }),
    });
}

export default createApolloClient;