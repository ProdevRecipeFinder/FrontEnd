import { 
  ApolloClient, 
  HttpLink, 
  InMemoryCache 
} from "@apollo/client"
import { PaginatedRecipe } from "../generated/graphql"

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            searchRecipes: {
              keyArgs: [],
              merge(
                existing: PaginatedRecipe | undefined,
                incoming: PaginatedRecipe
              ): PaginatedRecipe {
                return {
                  ...incoming,
                  recipes: [...(existing?.recipes || []), ...incoming.recipes],
                }
              },
            },
            getSavedRecipes: {
              keyArgs: [],
              merge(
                existing: PaginatedRecipe | undefined,
                incoming: PaginatedRecipe
              ): PaginatedRecipe {
                return {
                  ...incoming,
                  recipes: [...(existing?.recipes || []), ...incoming.recipes],
                }
              }
            }
          }
        }
      }
    })
  })
}

export default createApolloClient
