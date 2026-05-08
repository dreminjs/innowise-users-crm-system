/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n    }\n  }\n": typeof types.SignupDocument,
    "\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n": typeof types.ForgotPasswordDocument,
<<<<<<< Updated upstream
    "\n  query getCurrentProfile($userId: ID!) {\n    profile(userId: $userId) {\n      id\n    }\n  }\n": typeof types.GetCurrentProfileDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      profile {\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n": typeof types.GetUsersDocument,
=======
    "\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n": typeof types.UpdateTokenDocument,
    "\n  query getCurrentProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        full_name\n      }\n    }\n  }\n": typeof types.GetCurrentProfileDocument,
    "\n  query getUsers {\n    users {\n      id\n    }\n  }\n": typeof types.GetUsersDocument,
    "\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n    }\n  }\n": typeof types.GetUserProfileDocument,
>>>>>>> Stashed changes
};
const documents: Documents = {
    "\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n    }\n  }\n": types.SignupDocument,
    "\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n": types.ForgotPasswordDocument,
<<<<<<< Updated upstream
    "\n  query getCurrentProfile($userId: ID!) {\n    profile(userId: $userId) {\n      id\n    }\n  }\n": types.GetCurrentProfileDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      profile {\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n": types.GetUsersDocument,
=======
    "\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n": types.UpdateTokenDocument,
    "\n  query getCurrentProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        full_name\n      }\n    }\n  }\n": types.GetCurrentProfileDocument,
    "\n  query getUsers {\n    users {\n      id\n    }\n  }\n": types.GetUsersDocument,
    "\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n    }\n  }\n": types.GetUserProfileDocument,
>>>>>>> Stashed changes
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n    }\n  }\n"): (typeof documents)["\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n    }\n  }\n"): (typeof documents)["\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n"): (typeof documents)["\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
<<<<<<< Updated upstream
export function graphql(source: "\n  query getCurrentProfile($userId: ID!) {\n    profile(userId: $userId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query getCurrentProfile($userId: ID!) {\n    profile(userId: $userId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      profile {\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      profile {\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n"];
=======
export function graphql(source: "\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCurrentProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        full_name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCurrentProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        full_name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUsers {\n    users {\n      id\n    }\n  }\n"): (typeof documents)["\n  query getUsers {\n    users {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n    }\n  }\n"): (typeof documents)["\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n    }\n  }\n"];
>>>>>>> Stashed changes

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;