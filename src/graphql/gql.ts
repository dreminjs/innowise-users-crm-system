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
    "\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n": typeof types.UpdateTokenDocument,
    "\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n": typeof types.SignupDocument,
    "\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n": typeof types.ForgotPasswordDocument,
    "\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation uploadAvatarFile($dto: UploadAvatarInput!) {\n    uploadAvatar(avatar: $dto)\n  }\n": typeof types.UploadAvatarFileDocument,
    "\n  mutation updateProfile($dto: UpdateProfileInput!) {\n    updateProfile(profile: $dto) {\n      id\n    }\n  }\n": typeof types.UpdateProfileDocument,
    "\n  mutation updateUser($dto: UpdateUserInput!) {\n    updateUser(user: $dto) {\n      id\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation deleteAvatar($dto: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $dto)\n  }\n": typeof types.DeleteAvatarDocument,
    "\n  query getCurrentProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        full_name\n      }\n    }\n  }\n": typeof types.GetCurrentProfileDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n": typeof types.GetUsersDocument,
    "\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n      created_at\n    }\n  }\n": typeof types.GetUserProfileDocument,
    "\n  query GetUsersCriteries {\n    positions {\n      id\n      name\n    }\n    departments {\n      id\n      name\n    }\n  }\n": typeof types.GetUsersCriteriesDocument,
};
const documents: Documents = {
    "\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n": types.UpdateTokenDocument,
    "\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n": types.SignupDocument,
    "\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n": types.ForgotPasswordDocument,
    "\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation uploadAvatarFile($dto: UploadAvatarInput!) {\n    uploadAvatar(avatar: $dto)\n  }\n": types.UploadAvatarFileDocument,
    "\n  mutation updateProfile($dto: UpdateProfileInput!) {\n    updateProfile(profile: $dto) {\n      id\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  mutation updateUser($dto: UpdateUserInput!) {\n    updateUser(user: $dto) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation deleteAvatar($dto: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $dto)\n  }\n": types.DeleteAvatarDocument,
    "\n  query getCurrentProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        full_name\n      }\n    }\n  }\n": types.GetCurrentProfileDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n": types.GetUsersDocument,
    "\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n      created_at\n    }\n  }\n": types.GetUserProfileDocument,
    "\n  query GetUsersCriteries {\n    positions {\n      id\n      name\n    }\n    departments {\n      id\n      name\n    }\n  }\n": types.GetUsersCriteriesDocument,
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
export function graphql(source: "\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n"): (typeof documents)["\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n"): (typeof documents)["\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadAvatarFile($dto: UploadAvatarInput!) {\n    uploadAvatar(avatar: $dto)\n  }\n"): (typeof documents)["\n  mutation uploadAvatarFile($dto: UploadAvatarInput!) {\n    uploadAvatar(avatar: $dto)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProfile($dto: UpdateProfileInput!) {\n    updateProfile(profile: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateProfile($dto: UpdateProfileInput!) {\n    updateProfile(profile: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($dto: UpdateUserInput!) {\n    updateUser(user: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser($dto: UpdateUserInput!) {\n    updateUser(user: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteAvatar($dto: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $dto)\n  }\n"): (typeof documents)["\n  mutation deleteAvatar($dto: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $dto)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCurrentProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        full_name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCurrentProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        full_name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n      created_at\n    }\n  }\n"): (typeof documents)["\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n      created_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsersCriteries {\n    positions {\n      id\n      name\n    }\n    departments {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetUsersCriteries {\n    positions {\n      id\n      name\n    }\n    departments {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;