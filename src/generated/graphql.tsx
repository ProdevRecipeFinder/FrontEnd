import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Float'];
  ingredient_name: Scalars['String'];
  ingredient_qty: Scalars['String'];
  ingredient_unit: Scalars['String'];
};

export type IngredientsInput = {
  ingredient_id: Array<Scalars['Float']>;
};

export type LoginInfo = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewRecipe: Recipe;
  changePassword: UserResponse;
  createIngredient: Ingredient;
  createStep: Step;
  createTag: Tag;
  deleteIngredient: Scalars['Boolean'];
  deleteOwnedRecipe: Recipe;
  deleteSavedRecipe: Recipe;
  deleteStep: Scalars['Boolean'];
  deleteTag: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  saveRecipeToUser: Scalars['Boolean'];
  updateRecipe: Recipe;
};


export type MutationAddNewRecipeArgs = {
  ingredients: IngredientsInput;
  input: RecipeInput;
  steps: StepsInput;
  tags: TagsInput;
};


export type MutationChangePasswordArgs = {
  newPass: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateIngredientArgs = {
  ingredient_name: Scalars['String'];
  ingredient_qty: Scalars['String'];
};


export type MutationCreateStepArgs = {
  step_desc: Scalars['String'];
};


export type MutationCreateTagArgs = {
  tag_desc: Scalars['String'];
  tag_name: Scalars['String'];
};


export type MutationDeleteIngredientArgs = {
  ingredient_id: Scalars['Float'];
};


export type MutationDeleteOwnedRecipeArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteSavedRecipeArgs = {
  recipe_id: Scalars['Float'];
  user_id: Scalars['Float'];
};


export type MutationDeleteStepArgs = {
  step_id: Scalars['Float'];
};


export type MutationDeleteTagArgs = {
  tag_id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  user_info: LoginInfo;
};


export type MutationRegisterArgs = {
  user_info: RegInfo;
};


export type MutationSaveRecipeToUserArgs = {
  recipe_id: Scalars['Float'];
  user_id: Scalars['Float'];
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['Float'];
  input: RecipeInput;
};

export type Query = {
  __typename?: 'Query';
  getAllIngredients: Array<Ingredient>;
  getAllRecipes?: Maybe<Array<Recipe>>;
  getAllSteps: Array<Step>;
  getAllTags: Array<Tag>;
  getOneIngredient: Ingredient;
  getOneRecipe?: Maybe<Recipe>;
  getOneStep: Step;
  getOneTag: Tag;
  getSavedRecipes?: Maybe<User>;
  searchRecipes: Array<Recipe>;
  whoami?: Maybe<User>;
};


export type QueryGetOneIngredientArgs = {
  ingredient_id: Scalars['Float'];
};


export type QueryGetOneRecipeArgs = {
  id: Scalars['Float'];
};


export type QueryGetOneStepArgs = {
  step_id: Scalars['Float'];
};


export type QueryGetOneTagArgs = {
  tag_id: Scalars['Float'];
};


export type QuerySearchRecipesArgs = {
  search: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  cook_time_minutes: Scalars['Float'];
  created_at: Scalars['DateTime'];
  footnotes: Array<Scalars['String']>;
  id: Scalars['Float'];
  original_url: Scalars['String'];
  photo_url: Scalars['String'];
  prep_time_minutes: Scalars['Float'];
  rating_stars: Scalars['String'];
  recipeAuthors?: Maybe<Array<User>>;
  recipeIngredients?: Maybe<Array<Ingredient>>;
  recipeSteps?: Maybe<Array<Step>>;
  recipeTags?: Maybe<Array<Tag>>;
  recipe_desc: Scalars['String'];
  recipe_title: Scalars['String'];
  review_count: Scalars['String'];
  total_time_minutes: Scalars['Float'];
  updated_at: Scalars['DateTime'];
};

export type RecipeInput = {
  recipe_desc: Scalars['String'];
  recipe_img?: InputMaybe<Scalars['String']>;
  recipe_name: Scalars['String'];
};

export type RegInfo = {
  email: Scalars['String'];
  password: Scalars['String'];
  user_name: Scalars['String'];
};

export type Step = {
  __typename?: 'Step';
  id: Scalars['Float'];
  step_desc: Scalars['String'];
};

export type StepsInput = {
  step_id: Array<Scalars['Float']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float'];
  tag_desc: Scalars['String'];
  tag_name: Scalars['String'];
};

export type TagsInput = {
  tag_id: Array<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  savedRecipes?: Maybe<Array<Recipe>>;
  updated_at: Scalars['DateTime'];
  user_name: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type StdUserFragment = { __typename?: 'User', id: number, user_name: string, email: string };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, user_name: string, email: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, user_name: string, email: string } | null } };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoami?: { __typename?: 'User', id: number, user_name: string, email: string } | null };

export const StdUserFragmentDoc = gql`
    fragment StdUser on User {
  id
  user_name
  email
}
    `;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(user_info: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...StdUser
    }
  }
}
    ${StdUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(user_info: {user_name: $username, email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      ...StdUser
    }
  }
}
    ${StdUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const WhoAmIDocument = gql`
    query WhoAmI {
  whoami {
    ...StdUser
  }
}
    ${StdUserFragmentDoc}`;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(baseOptions?: Apollo.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
      }
export function useWhoAmILazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
        }
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = Apollo.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;