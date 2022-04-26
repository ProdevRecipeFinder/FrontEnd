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
  ingredient_name?: Maybe<Scalars['String']>;
  ingredient_qty: Scalars['String'];
  ingredient_unit?: Maybe<Scalars['String']>;
};

export type LoginInfo = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeForgotPassword: UserResponse;
  changePassword: UserResponse;
  changeUsername: UserResponse;
  deleteAccount: UserResponse;
  deleteSavedRecipe: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  requestDeleteAccount: Scalars['Boolean'];
  saveRecipeToUser: Scalars['Boolean'];
};


export type MutationChangeForgotPasswordArgs = {
  newPass: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPass: Scalars['String'];
  oldPass: Scalars['String'];
};


export type MutationChangeUsernameArgs = {
  user_name: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  token: Scalars['String'];
};


export type MutationDeleteSavedRecipeArgs = {
  recipe_id: Scalars['Float'];
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
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Float']>;
  hasNextPage: Scalars['Boolean'];
};

export type PaginatedRecipe = {
  __typename?: 'PaginatedRecipe';
  pageInfo: PageInfo;
  recipes: Array<Recipe>;
};

export type Query = {
  __typename?: 'Query';
  getAllRecipes?: Maybe<Array<Recipe>>;
  getHomePage: PaginatedRecipe;
  getMostPopular: Array<Recipe>;
  getOneRecipe?: Maybe<Recipe>;
  getSavedRecipes?: Maybe<PaginatedRecipe>;
  getSavedStatus: Array<Scalars['Boolean']>;
  searchRecipes: PaginatedRecipe;
  whoami?: Maybe<User>;
};


export type QueryGetHomePageArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryGetMostPopularArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryGetOneRecipeArgs = {
  id: Scalars['Float'];
};


export type QueryGetSavedRecipesArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryGetSavedStatusArgs = {
  recipe_ids: Array<Scalars['Float']>;
};


export type QuerySearchRecipesArgs = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
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
  recipeAuthors: Array<User>;
  recipeIngredients?: Maybe<Array<Ingredient>>;
  recipeSteps?: Maybe<Array<Step>>;
  recipeTags?: Maybe<Array<Tag>>;
  recipe_desc: Scalars['String'];
  recipe_title: Scalars['String'];
  review_count: Scalars['String'];
  total_time_minutes: Scalars['Float'];
  updated_at: Scalars['DateTime'];
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

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float'];
  tag_desc: Scalars['String'];
  tag_name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  user_name: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type DisplayRecipeFragment = { __typename?: 'Recipe', id: number, recipe_title: string, recipe_desc: string, prep_time_minutes: number, cook_time_minutes: number, total_time_minutes: number, footnotes: Array<string>, original_url: string, photo_url: string, rating_stars: string, review_count: string, recipeAuthors: Array<{ __typename?: 'User', user_name: string }>, recipeIngredients?: Array<{ __typename?: 'Ingredient', ingredient_qty: string, ingredient_unit?: string | null, ingredient_name?: string | null }> | null, recipeSteps?: Array<{ __typename?: 'Step', step_desc: string }> | null };

export type StdUserFragment = { __typename?: 'User', id: number, user_name: string, email: string };

export type ChangeForgotPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newpass: Scalars['String'];
}>;


export type ChangeForgotPasswordMutation = { __typename?: 'Mutation', changeForgotPassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, user_name: string, email: string } | null } };

export type ChangePasswordMutationVariables = Exact<{
  oldpass: Scalars['String'];
  newpass: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, user_name: string, email: string } | null } };

export type ChangeUsernameMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type ChangeUsernameMutation = { __typename?: 'Mutation', changeUsername: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', id: number, user_name: string, email: string } | null } };

export type DeleteAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type DeleteSavedRecipeMutationVariables = Exact<{
  recipe_id: Scalars['Float'];
}>;


export type DeleteSavedRecipeMutation = { __typename?: 'Mutation', deleteSavedRecipe: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

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

export type RequestDeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestDeleteAccountMutation = { __typename?: 'Mutation', requestDeleteAccount: boolean };

export type SaveRecipeToUserMutationVariables = Exact<{
  recipe_id: Scalars['Float'];
}>;


export type SaveRecipeToUserMutation = { __typename?: 'Mutation', saveRecipeToUser: boolean };

export type GetHomePageQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetHomePageQuery = { __typename?: 'Query', getHomePage: { __typename?: 'PaginatedRecipe', recipes: Array<{ __typename?: 'Recipe', id: number, recipe_title: string, recipe_desc: string, photo_url: string, rating_stars: string, review_count: string }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: number | null } } };

export type GetMostPopularQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetMostPopularQuery = { __typename?: 'Query', getMostPopular: Array<{ __typename?: 'Recipe', id: number, recipe_title: string, recipe_desc: string, photo_url: string, rating_stars: string, review_count: string }> };

export type GetOneRecipeQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetOneRecipeQuery = { __typename?: 'Query', getOneRecipe?: { __typename?: 'Recipe', id: number, recipe_title: string, recipe_desc: string, prep_time_minutes: number, cook_time_minutes: number, total_time_minutes: number, footnotes: Array<string>, original_url: string, photo_url: string, rating_stars: string, review_count: string, recipeAuthors: Array<{ __typename?: 'User', user_name: string }>, recipeIngredients?: Array<{ __typename?: 'Ingredient', ingredient_qty: string, ingredient_unit?: string | null, ingredient_name?: string | null }> | null, recipeSteps?: Array<{ __typename?: 'Step', step_desc: string }> | null } | null };

export type GetSavedStatusQueryVariables = Exact<{
  recipe_ids: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type GetSavedStatusQuery = { __typename?: 'Query', getSavedStatus: Array<boolean> };

export type SavedRecipesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  cursor?: InputMaybe<Scalars['Float']>;
}>;


export type SavedRecipesQuery = { __typename?: 'Query', getSavedRecipes?: { __typename?: 'PaginatedRecipe', recipes: Array<{ __typename?: 'Recipe', id: number, recipe_title: string, recipe_desc: string, photo_url: string, rating_stars: string, review_count: string }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: number | null } } | null };

export type SearchRecipesQueryVariables = Exact<{
  query: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  cursor?: InputMaybe<Scalars['Float']>;
}>;


export type SearchRecipesQuery = { __typename?: 'Query', searchRecipes: { __typename?: 'PaginatedRecipe', recipes: Array<{ __typename?: 'Recipe', id: number, recipe_title: string, recipe_desc: string, photo_url: string, rating_stars: string, review_count: string }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: number | null } } };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoami?: { __typename?: 'User', id: number, user_name: string, email: string } | null };

export const DisplayRecipeFragmentDoc = gql`
    fragment displayRecipe on Recipe {
  id
  recipe_title
  recipe_desc
  prep_time_minutes
  cook_time_minutes
  total_time_minutes
  footnotes
  original_url
  photo_url
  rating_stars
  review_count
  recipeAuthors {
    user_name
  }
  recipeIngredients {
    ingredient_qty
    ingredient_unit
    ingredient_name
  }
  recipeSteps {
    step_desc
  }
}
    `;
export const StdUserFragmentDoc = gql`
    fragment StdUser on User {
  id
  user_name
  email
}
    `;
export const ChangeForgotPasswordDocument = gql`
    mutation ChangeForgotPassword($token: String!, $newpass: String!) {
  changeForgotPassword(token: $token, newPass: $newpass) {
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
export type ChangeForgotPasswordMutationFn = Apollo.MutationFunction<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>;

/**
 * __useChangeForgotPasswordMutation__
 *
 * To run a mutation, you first call `useChangeForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeForgotPasswordMutation, { data, loading, error }] = useChangeForgotPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newpass: // value for 'newpass'
 *   },
 * });
 */
export function useChangeForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>(ChangeForgotPasswordDocument, options);
      }
export type ChangeForgotPasswordMutationHookResult = ReturnType<typeof useChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationResult = Apollo.MutationResult<ChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldpass: String!, $newpass: String!) {
  changePassword(oldPass: $oldpass, newPass: $newpass) {
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
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldpass: // value for 'oldpass'
 *      newpass: // value for 'newpass'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeUsernameDocument = gql`
    mutation ChangeUsername($username: String!) {
  changeUsername(user_name: $username) {
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
export type ChangeUsernameMutationFn = Apollo.MutationFunction<ChangeUsernameMutation, ChangeUsernameMutationVariables>;

/**
 * __useChangeUsernameMutation__
 *
 * To run a mutation, you first call `useChangeUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUsernameMutation, { data, loading, error }] = useChangeUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useChangeUsernameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUsernameMutation, ChangeUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUsernameMutation, ChangeUsernameMutationVariables>(ChangeUsernameDocument, options);
      }
export type ChangeUsernameMutationHookResult = ReturnType<typeof useChangeUsernameMutation>;
export type ChangeUsernameMutationResult = Apollo.MutationResult<ChangeUsernameMutation>;
export type ChangeUsernameMutationOptions = Apollo.BaseMutationOptions<ChangeUsernameMutation, ChangeUsernameMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($token: String!) {
  deleteAccount(token: $token) {
    errors {
      field
      message
    }
  }
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const DeleteSavedRecipeDocument = gql`
    mutation DeleteSavedRecipe($recipe_id: Float!) {
  deleteSavedRecipe(recipe_id: $recipe_id)
}
    `;
export type DeleteSavedRecipeMutationFn = Apollo.MutationFunction<DeleteSavedRecipeMutation, DeleteSavedRecipeMutationVariables>;

/**
 * __useDeleteSavedRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteSavedRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSavedRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSavedRecipeMutation, { data, loading, error }] = useDeleteSavedRecipeMutation({
 *   variables: {
 *      recipe_id: // value for 'recipe_id'
 *   },
 * });
 */
export function useDeleteSavedRecipeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSavedRecipeMutation, DeleteSavedRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSavedRecipeMutation, DeleteSavedRecipeMutationVariables>(DeleteSavedRecipeDocument, options);
      }
export type DeleteSavedRecipeMutationHookResult = ReturnType<typeof useDeleteSavedRecipeMutation>;
export type DeleteSavedRecipeMutationResult = Apollo.MutationResult<DeleteSavedRecipeMutation>;
export type DeleteSavedRecipeMutationOptions = Apollo.BaseMutationOptions<DeleteSavedRecipeMutation, DeleteSavedRecipeMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
export const RequestDeleteAccountDocument = gql`
    mutation RequestDeleteAccount {
  requestDeleteAccount
}
    `;
export type RequestDeleteAccountMutationFn = Apollo.MutationFunction<RequestDeleteAccountMutation, RequestDeleteAccountMutationVariables>;

/**
 * __useRequestDeleteAccountMutation__
 *
 * To run a mutation, you first call `useRequestDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestDeleteAccountMutation, { data, loading, error }] = useRequestDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<RequestDeleteAccountMutation, RequestDeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestDeleteAccountMutation, RequestDeleteAccountMutationVariables>(RequestDeleteAccountDocument, options);
      }
export type RequestDeleteAccountMutationHookResult = ReturnType<typeof useRequestDeleteAccountMutation>;
export type RequestDeleteAccountMutationResult = Apollo.MutationResult<RequestDeleteAccountMutation>;
export type RequestDeleteAccountMutationOptions = Apollo.BaseMutationOptions<RequestDeleteAccountMutation, RequestDeleteAccountMutationVariables>;
export const SaveRecipeToUserDocument = gql`
    mutation SaveRecipeToUser($recipe_id: Float!) {
  saveRecipeToUser(recipe_id: $recipe_id)
}
    `;
export type SaveRecipeToUserMutationFn = Apollo.MutationFunction<SaveRecipeToUserMutation, SaveRecipeToUserMutationVariables>;

/**
 * __useSaveRecipeToUserMutation__
 *
 * To run a mutation, you first call `useSaveRecipeToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveRecipeToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveRecipeToUserMutation, { data, loading, error }] = useSaveRecipeToUserMutation({
 *   variables: {
 *      recipe_id: // value for 'recipe_id'
 *   },
 * });
 */
export function useSaveRecipeToUserMutation(baseOptions?: Apollo.MutationHookOptions<SaveRecipeToUserMutation, SaveRecipeToUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveRecipeToUserMutation, SaveRecipeToUserMutationVariables>(SaveRecipeToUserDocument, options);
      }
export type SaveRecipeToUserMutationHookResult = ReturnType<typeof useSaveRecipeToUserMutation>;
export type SaveRecipeToUserMutationResult = Apollo.MutationResult<SaveRecipeToUserMutation>;
export type SaveRecipeToUserMutationOptions = Apollo.BaseMutationOptions<SaveRecipeToUserMutation, SaveRecipeToUserMutationVariables>;
export const GetHomePageDocument = gql`
    query GetHomePage($limit: Float) {
  getHomePage(limit: $limit) {
    recipes {
      id
      recipe_title
      recipe_desc
      photo_url
      rating_stars
      review_count
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useGetHomePageQuery__
 *
 * To run a query within a React component, call `useGetHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHomePageQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetHomePageQuery(baseOptions?: Apollo.QueryHookOptions<GetHomePageQuery, GetHomePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHomePageQuery, GetHomePageQueryVariables>(GetHomePageDocument, options);
      }
export function useGetHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHomePageQuery, GetHomePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHomePageQuery, GetHomePageQueryVariables>(GetHomePageDocument, options);
        }
export type GetHomePageQueryHookResult = ReturnType<typeof useGetHomePageQuery>;
export type GetHomePageLazyQueryHookResult = ReturnType<typeof useGetHomePageLazyQuery>;
export type GetHomePageQueryResult = Apollo.QueryResult<GetHomePageQuery, GetHomePageQueryVariables>;
export const GetMostPopularDocument = gql`
    query GetMostPopular($limit: Float) {
  getMostPopular(limit: $limit) {
    id
    recipe_title
    recipe_desc
    photo_url
    rating_stars
    review_count
  }
}
    `;

/**
 * __useGetMostPopularQuery__
 *
 * To run a query within a React component, call `useGetMostPopularQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMostPopularQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMostPopularQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMostPopularQuery(baseOptions?: Apollo.QueryHookOptions<GetMostPopularQuery, GetMostPopularQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMostPopularQuery, GetMostPopularQueryVariables>(GetMostPopularDocument, options);
      }
export function useGetMostPopularLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMostPopularQuery, GetMostPopularQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMostPopularQuery, GetMostPopularQueryVariables>(GetMostPopularDocument, options);
        }
export type GetMostPopularQueryHookResult = ReturnType<typeof useGetMostPopularQuery>;
export type GetMostPopularLazyQueryHookResult = ReturnType<typeof useGetMostPopularLazyQuery>;
export type GetMostPopularQueryResult = Apollo.QueryResult<GetMostPopularQuery, GetMostPopularQueryVariables>;
export const GetOneRecipeDocument = gql`
    query GetOneRecipe($id: Float!) {
  getOneRecipe(id: $id) {
    ...displayRecipe
  }
}
    ${DisplayRecipeFragmentDoc}`;

/**
 * __useGetOneRecipeQuery__
 *
 * To run a query within a React component, call `useGetOneRecipeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneRecipeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneRecipeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneRecipeQuery(baseOptions: Apollo.QueryHookOptions<GetOneRecipeQuery, GetOneRecipeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneRecipeQuery, GetOneRecipeQueryVariables>(GetOneRecipeDocument, options);
      }
export function useGetOneRecipeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneRecipeQuery, GetOneRecipeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneRecipeQuery, GetOneRecipeQueryVariables>(GetOneRecipeDocument, options);
        }
export type GetOneRecipeQueryHookResult = ReturnType<typeof useGetOneRecipeQuery>;
export type GetOneRecipeLazyQueryHookResult = ReturnType<typeof useGetOneRecipeLazyQuery>;
export type GetOneRecipeQueryResult = Apollo.QueryResult<GetOneRecipeQuery, GetOneRecipeQueryVariables>;
export const GetSavedStatusDocument = gql`
    query GetSavedStatus($recipe_ids: [Float!]!) {
  getSavedStatus(recipe_ids: $recipe_ids)
}
    `;

/**
 * __useGetSavedStatusQuery__
 *
 * To run a query within a React component, call `useGetSavedStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedStatusQuery({
 *   variables: {
 *      recipe_ids: // value for 'recipe_ids'
 *   },
 * });
 */
export function useGetSavedStatusQuery(baseOptions: Apollo.QueryHookOptions<GetSavedStatusQuery, GetSavedStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSavedStatusQuery, GetSavedStatusQueryVariables>(GetSavedStatusDocument, options);
      }
export function useGetSavedStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSavedStatusQuery, GetSavedStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSavedStatusQuery, GetSavedStatusQueryVariables>(GetSavedStatusDocument, options);
        }
export type GetSavedStatusQueryHookResult = ReturnType<typeof useGetSavedStatusQuery>;
export type GetSavedStatusLazyQueryHookResult = ReturnType<typeof useGetSavedStatusLazyQuery>;
export type GetSavedStatusQueryResult = Apollo.QueryResult<GetSavedStatusQuery, GetSavedStatusQueryVariables>;
export const SavedRecipesDocument = gql`
    query SavedRecipes($limit: Float, $cursor: Float) {
  getSavedRecipes(limit: $limit, cursor: $cursor) {
    recipes {
      id
      recipe_title
      recipe_desc
      photo_url
      rating_stars
      review_count
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useSavedRecipesQuery__
 *
 * To run a query within a React component, call `useSavedRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSavedRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSavedRecipesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSavedRecipesQuery(baseOptions?: Apollo.QueryHookOptions<SavedRecipesQuery, SavedRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SavedRecipesQuery, SavedRecipesQueryVariables>(SavedRecipesDocument, options);
      }
export function useSavedRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SavedRecipesQuery, SavedRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SavedRecipesQuery, SavedRecipesQueryVariables>(SavedRecipesDocument, options);
        }
export type SavedRecipesQueryHookResult = ReturnType<typeof useSavedRecipesQuery>;
export type SavedRecipesLazyQueryHookResult = ReturnType<typeof useSavedRecipesLazyQuery>;
export type SavedRecipesQueryResult = Apollo.QueryResult<SavedRecipesQuery, SavedRecipesQueryVariables>;
export const SearchRecipesDocument = gql`
    query SearchRecipes($query: String!, $limit: Float, $cursor: Float) {
  searchRecipes(search: $query, limit: $limit, cursor: $cursor) {
    recipes {
      id
      recipe_title
      recipe_desc
      photo_url
      rating_stars
      review_count
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useSearchRecipesQuery__
 *
 * To run a query within a React component, call `useSearchRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRecipesQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSearchRecipesQuery(baseOptions: Apollo.QueryHookOptions<SearchRecipesQuery, SearchRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRecipesQuery, SearchRecipesQueryVariables>(SearchRecipesDocument, options);
      }
export function useSearchRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRecipesQuery, SearchRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRecipesQuery, SearchRecipesQueryVariables>(SearchRecipesDocument, options);
        }
export type SearchRecipesQueryHookResult = ReturnType<typeof useSearchRecipesQuery>;
export type SearchRecipesLazyQueryHookResult = ReturnType<typeof useSearchRecipesLazyQuery>;
export type SearchRecipesQueryResult = Apollo.QueryResult<SearchRecipesQuery, SearchRecipesQueryVariables>;
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