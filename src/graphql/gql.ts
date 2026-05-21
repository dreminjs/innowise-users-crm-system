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
    "\n  mutation CreateCv($cv: CreateCvInput!) {\n    createCv(cv: $cv) {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n": typeof types.CreateCvDocument,
    "\n  mutation UpdateCv($cv: UpdateCvInput!) {\n    updateCv(cv: $cv) {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n": typeof types.UpdateCvDocument,
    "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n": typeof types.DeleteCvDocument,
    "\n  mutation AddCvSkill($skill: AddCvSkillInput!) {\n    addCvSkill(skill: $skill) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n": typeof types.AddCvSkillDocument,
    "\n  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {\n    updateCvSkill(skill: $skill) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n": typeof types.UpdateCvSkillDocument,
    "\n  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {\n    deleteCvSkill(skill: $skill) {\n      id\n\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n": typeof types.DeleteCvSkillDocument,
    "\n  query GetCvs {\n    cvs {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n": typeof types.GetCvsDocument,
    "\n  query GetCvSkills($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n": typeof types.GetCvSkillsDocument,
    "\n  query GetCV($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      name\n      education\n      description\n      created_at\n      user {\n        id\n        email\n        role\n        position {\n          name\n        }\n        profile {\n          full_name\n        }\n      }\n      skills {\n        name\n        mastery\n        categoryId\n      }\n      languages {\n        name\n        proficiency\n      }\n      projects {\n        id\n        start_date\n        end_date\n        responsibilities\n        roles\n        project {\n          id\n          name\n          internal_name\n          domain\n          description\n          environment\n        }\n      }\n    }\n  }\n": typeof types.GetCvDocument,
    "\n  mutation ExportPdf($pdf: ExportPdfInput!) {\n    exportPdf(pdf: $pdf)\n  }\n": typeof types.ExportPdfDocument,
    "\n  mutation CreateDepartment($department: CreateDepartmentInput!) {\n    createDepartment(department: $department) {\n      id\n      name\n    }\n  }\n": typeof types.CreateDepartmentDocument,
    "\n  mutation UpdateDepartment($department: UpdateDepartmentInput!) {\n    updateDepartment(department: $department) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateDepartmentDocument,
    "\n  mutation DeleteDepartment($department: DeleteDepartmentInput!) {\n    deleteDepartment(department: $department) {\n      affected\n    }\n  }\n": typeof types.DeleteDepartmentDocument,
    "\n  query GetDepartments {\n    departments {\n      id\n      name\n    }\n  }\n": typeof types.GetDepartmentsDocument,
    "\n  mutation addProfileLanguage($dto: AddProfileLanguageInput!) {\n    addProfileLanguage(language: $dto) {\n      id\n    }\n  }\n": typeof types.AddProfileLanguageDocument,
    "\n  mutation deleteProfileLanguage($dto: DeleteProfileLanguageInput!) {\n    deleteProfileLanguage(language: $dto) {\n      id\n    }\n  }\n": typeof types.DeleteProfileLanguageDocument,
    "\n  mutation updateProfileLanguage($dto: UpdateProfileLanguageInput!) {\n    updateProfileLanguage(language: $dto) {\n      id\n    }\n  }\n": typeof types.UpdateProfileLanguageDocument,
    "\n  mutation CreateLanguage($language: CreateLanguageInput!) {\n    createLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": typeof types.CreateLanguageDocument,
    "\n  mutation UpdateLanguage($language: UpdateLanguageInput!) {\n    updateLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": typeof types.UpdateLanguageDocument,
    "\n  mutation DeleteLanguage($language: DeleteLanguageInput!) {\n    deleteLanguage(language: $language) {\n      affected\n    }\n  }\n": typeof types.DeleteLanguageDocument,
    "\n  query getProfileLanguages($userId: ID!) {\n    profile(userId: $userId) {\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": typeof types.GetProfileLanguagesDocument,
    "\n  query GetLanguages {\n    languages {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": typeof types.GetLanguagesDocument,
    "\n  mutation CreatePosition($position: CreatePositionInput!) {\n    createPosition(position: $position) {\n      id\n      name\n    }\n  }\n": typeof types.CreatePositionDocument,
    "\n  mutation UpdatePosition($position: UpdatePositionInput!) {\n    updatePosition(position: $position) {\n      id\n      name\n    }\n  }\n": typeof types.UpdatePositionDocument,
    "\n  mutation DeletePosition($position: DeletePositionInput!) {\n    deletePosition(position: $position) {\n      affected\n    }\n  }\n": typeof types.DeletePositionDocument,
    "\n  query GetPositions {\n    positions {\n      id\n      name\n    }\n  }\n": typeof types.GetPositionsDocument,
    "\n  mutation AddCvProject($project: AddCvProjectInput!) {\n    addCvProject(project: $project) {\n      id\n    }\n  }\n": typeof types.AddCvProjectDocument,
    "\n  mutation UpdateCvProject($project: UpdateCvProjectInput!) {\n    updateCvProject(project: $project) {\n      id\n    }\n  }\n": typeof types.UpdateCvProjectDocument,
    "\n  mutation RemoveCvProject($project: RemoveCvProjectInput!) {\n    removeCvProject(project: $project) {\n      id\n    }\n  }\n": typeof types.RemoveCvProjectDocument,
    "\n  mutation CreateProject($project: CreateProjectInput!) {\n    createProject(project: $project) {\n      id\n      name\n    }\n  }\n": typeof types.CreateProjectDocument,
    "\n  mutation UpdateProject($project: UpdateProjectInput!) {\n    updateProject(project: $project) {\n      id\n      name\n    }\n  }\n": typeof types.UpdateProjectDocument,
    "\n  mutation DeleteProject($project: DeleteProjectInput!) {\n    deleteProject(project: $project) {\n      affected\n    }\n  }\n": typeof types.DeleteProjectDocument,
    "\n  query GetCvProjects($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      projects {\n        id\n        start_date\n        end_date\n        responsibilities\n        roles\n\n        project {\n          id\n          name\n          internal_name\n          domain\n          description\n          environment\n        }\n      }\n    }\n  }\n": typeof types.GetCvProjectsDocument,
    "\n  query GetProjects {\n    projects {\n      id\n      name\n      domain\n      description\n      environment\n      start_date\n      end_date\n    }\n  }\n": typeof types.GetProjectsDocument,
    "\n  query GetProjectOptions {\n    projects {\n      id\n      name\n      internal_name\n      domain\n      description\n      environment\n    }\n  }\n": typeof types.GetProjectOptionsDocument,
    "\n  mutation addProfileSkill($dto: AddProfileSkillInput!) {\n    addProfileSkill(skill: $dto) {\n      id\n    }\n  }\n": typeof types.AddProfileSkillDocument,
    "\n  mutation deleteProfileSkill($dto: DeleteProfileSkillInput!) {\n    deleteProfileSkill(skill: $dto) {\n      id\n    }\n  }\n": typeof types.DeleteProfileSkillDocument,
    "\n  mutation updateProfileSkill($dto: UpdateProfileSkillInput!) {\n    updateProfileSkill(skill: $dto) {\n      id\n    }\n  }\n": typeof types.UpdateProfileSkillDocument,
    "\n  mutation CreateSkill($skill: CreateSkillInput!) {\n    createSkill(skill: $skill) {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.CreateSkillDocument,
    "\n  mutation UpdateSkill($skill: UpdateSkillInput!) {\n    updateSkill(skill: $skill) {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UpdateSkillDocument,
    "\n  mutation DeleteSkill($skill: DeleteSkillInput!) {\n    deleteSkill(skill: $skill) {\n      affected\n    }\n  }\n": typeof types.DeleteSkillDocument,
    "\n  query getSkills {\n    skills {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetSkillsDocument,
    "\n  query getProfileSkills($userId: ID!) {\n    profile(userId: $userId) {\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n": typeof types.GetProfileSkillsDocument,
    "\n  query getSkillCategories {\n    skillCategories {\n      id\n      name\n      parent {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetSkillCategoriesDocument,
    "\n  mutation uploadAvatarFile($dto: UploadAvatarInput!) {\n    uploadAvatar(avatar: $dto)\n  }\n": typeof types.UploadAvatarFileDocument,
    "\n  mutation updateProfile($dto: UpdateProfileInput!) {\n    updateProfile(profile: $dto) {\n      id\n    }\n  }\n": typeof types.UpdateProfileDocument,
    "\n  mutation updateUser($dto: UpdateUserInput!) {\n    updateUser(user: $dto) {\n      id\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation deleteAvatar($dto: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $dto)\n  }\n": typeof types.DeleteAvatarDocument,
    "\n  mutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId) {\n      affected\n    }\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      id\n      email\n      role\n      department_name\n      position_name\n      profile {\n        first_name\n        last_name\n      }\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation UpdateUserData($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      role\n      department_name\n      position_name\n      profile {\n        first_name\n        last_name\n      }\n    }\n  }\n": typeof types.UpdateUserDataDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      department {\n        id\n      }\n      position {\n        id\n      }\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n": typeof types.GetUsersDocument,
    "\n  query getUserProfile($userId: ID!) {\n    user(userId: $userId) {\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n\n      department {\n        id\n        name\n      }\n      position {\n        id\n        name\n      }\n      role\n      email\n      created_at\n    }\n  }\n": typeof types.GetUserProfileDocument,
    "\n  query GetUsersCriteries {\n    positions {\n      id\n      name\n    }\n    departments {\n      id\n      name\n    }\n  }\n": typeof types.GetUsersCriteriesDocument,
};
const documents: Documents = {
    "\n  mutation UpdateToken {\n    updateToken {\n      access_token\n      refresh_token\n    }\n  }\n": types.UpdateTokenDocument,
    "\n  mutation signup($dto: AuthInput!) {\n    signup(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n": types.SignupDocument,
    "\n  mutation forgotPassword($dto: ForgotPasswordInput!) {\n    forgotPassword(auth: $dto)\n  }\n": types.ForgotPasswordDocument,
    "\n  query login($dto: AuthInput!) {\n    login(auth: $dto) {\n      access_token\n      refresh_token\n      user {\n        role\n        id\n        email\n        position_name\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateCv($cv: CreateCvInput!) {\n    createCv(cv: $cv) {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.CreateCvDocument,
    "\n  mutation UpdateCv($cv: UpdateCvInput!) {\n    updateCv(cv: $cv) {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.UpdateCvDocument,
    "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n": types.DeleteCvDocument,
    "\n  mutation AddCvSkill($skill: AddCvSkillInput!) {\n    addCvSkill(skill: $skill) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n": types.AddCvSkillDocument,
    "\n  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {\n    updateCvSkill(skill: $skill) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n": types.UpdateCvSkillDocument,
    "\n  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {\n    deleteCvSkill(skill: $skill) {\n      id\n\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n": types.DeleteCvSkillDocument,
    "\n  query GetCvs {\n    cvs {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.GetCvsDocument,
    "\n  query GetCvSkills($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n": types.GetCvSkillsDocument,
    "\n  query GetCV($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      name\n      education\n      description\n      created_at\n      user {\n        id\n        email\n        role\n        position {\n          name\n        }\n        profile {\n          full_name\n        }\n      }\n      skills {\n        name\n        mastery\n        categoryId\n      }\n      languages {\n        name\n        proficiency\n      }\n      projects {\n        id\n        start_date\n        end_date\n        responsibilities\n        roles\n        project {\n          id\n          name\n          internal_name\n          domain\n          description\n          environment\n        }\n      }\n    }\n  }\n": types.GetCvDocument,
    "\n  mutation ExportPdf($pdf: ExportPdfInput!) {\n    exportPdf(pdf: $pdf)\n  }\n": types.ExportPdfDocument,
    "\n  mutation CreateDepartment($department: CreateDepartmentInput!) {\n    createDepartment(department: $department) {\n      id\n      name\n    }\n  }\n": types.CreateDepartmentDocument,
    "\n  mutation UpdateDepartment($department: UpdateDepartmentInput!) {\n    updateDepartment(department: $department) {\n      id\n      name\n    }\n  }\n": types.UpdateDepartmentDocument,
    "\n  mutation DeleteDepartment($department: DeleteDepartmentInput!) {\n    deleteDepartment(department: $department) {\n      affected\n    }\n  }\n": types.DeleteDepartmentDocument,
    "\n  query GetDepartments {\n    departments {\n      id\n      name\n    }\n  }\n": types.GetDepartmentsDocument,
    "\n  mutation addProfileLanguage($dto: AddProfileLanguageInput!) {\n    addProfileLanguage(language: $dto) {\n      id\n    }\n  }\n": types.AddProfileLanguageDocument,
    "\n  mutation deleteProfileLanguage($dto: DeleteProfileLanguageInput!) {\n    deleteProfileLanguage(language: $dto) {\n      id\n    }\n  }\n": types.DeleteProfileLanguageDocument,
    "\n  mutation updateProfileLanguage($dto: UpdateProfileLanguageInput!) {\n    updateProfileLanguage(language: $dto) {\n      id\n    }\n  }\n": types.UpdateProfileLanguageDocument,
    "\n  mutation CreateLanguage($language: CreateLanguageInput!) {\n    createLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": types.CreateLanguageDocument,
    "\n  mutation UpdateLanguage($language: UpdateLanguageInput!) {\n    updateLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": types.UpdateLanguageDocument,
    "\n  mutation DeleteLanguage($language: DeleteLanguageInput!) {\n    deleteLanguage(language: $language) {\n      affected\n    }\n  }\n": types.DeleteLanguageDocument,
    "\n  query getProfileLanguages($userId: ID!) {\n    profile(userId: $userId) {\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n": types.GetProfileLanguagesDocument,
    "\n  query GetLanguages {\n    languages {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n": types.GetLanguagesDocument,
    "\n  mutation CreatePosition($position: CreatePositionInput!) {\n    createPosition(position: $position) {\n      id\n      name\n    }\n  }\n": types.CreatePositionDocument,
    "\n  mutation UpdatePosition($position: UpdatePositionInput!) {\n    updatePosition(position: $position) {\n      id\n      name\n    }\n  }\n": types.UpdatePositionDocument,
    "\n  mutation DeletePosition($position: DeletePositionInput!) {\n    deletePosition(position: $position) {\n      affected\n    }\n  }\n": types.DeletePositionDocument,
    "\n  query GetPositions {\n    positions {\n      id\n      name\n    }\n  }\n": types.GetPositionsDocument,
    "\n  mutation AddCvProject($project: AddCvProjectInput!) {\n    addCvProject(project: $project) {\n      id\n    }\n  }\n": types.AddCvProjectDocument,
    "\n  mutation UpdateCvProject($project: UpdateCvProjectInput!) {\n    updateCvProject(project: $project) {\n      id\n    }\n  }\n": types.UpdateCvProjectDocument,
    "\n  mutation RemoveCvProject($project: RemoveCvProjectInput!) {\n    removeCvProject(project: $project) {\n      id\n    }\n  }\n": types.RemoveCvProjectDocument,
    "\n  mutation CreateProject($project: CreateProjectInput!) {\n    createProject(project: $project) {\n      id\n      name\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation UpdateProject($project: UpdateProjectInput!) {\n    updateProject(project: $project) {\n      id\n      name\n    }\n  }\n": types.UpdateProjectDocument,
    "\n  mutation DeleteProject($project: DeleteProjectInput!) {\n    deleteProject(project: $project) {\n      affected\n    }\n  }\n": types.DeleteProjectDocument,
    "\n  query GetCvProjects($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      projects {\n        id\n        start_date\n        end_date\n        responsibilities\n        roles\n\n        project {\n          id\n          name\n          internal_name\n          domain\n          description\n          environment\n        }\n      }\n    }\n  }\n": types.GetCvProjectsDocument,
    "\n  query GetProjects {\n    projects {\n      id\n      name\n      domain\n      description\n      environment\n      start_date\n      end_date\n    }\n  }\n": types.GetProjectsDocument,
    "\n  query GetProjectOptions {\n    projects {\n      id\n      name\n      internal_name\n      domain\n      description\n      environment\n    }\n  }\n": types.GetProjectOptionsDocument,
    "\n  mutation addProfileSkill($dto: AddProfileSkillInput!) {\n    addProfileSkill(skill: $dto) {\n      id\n    }\n  }\n": types.AddProfileSkillDocument,
    "\n  mutation deleteProfileSkill($dto: DeleteProfileSkillInput!) {\n    deleteProfileSkill(skill: $dto) {\n      id\n    }\n  }\n": types.DeleteProfileSkillDocument,
    "\n  mutation updateProfileSkill($dto: UpdateProfileSkillInput!) {\n    updateProfileSkill(skill: $dto) {\n      id\n    }\n  }\n": types.UpdateProfileSkillDocument,
    "\n  mutation CreateSkill($skill: CreateSkillInput!) {\n    createSkill(skill: $skill) {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.CreateSkillDocument,
    "\n  mutation UpdateSkill($skill: UpdateSkillInput!) {\n    updateSkill(skill: $skill) {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.UpdateSkillDocument,
    "\n  mutation DeleteSkill($skill: DeleteSkillInput!) {\n    deleteSkill(skill: $skill) {\n      affected\n    }\n  }\n": types.DeleteSkillDocument,
    "\n  query getSkills {\n    skills {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetSkillsDocument,
    "\n  query getProfileSkills($userId: ID!) {\n    profile(userId: $userId) {\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n": types.GetProfileSkillsDocument,
    "\n  query getSkillCategories {\n    skillCategories {\n      id\n      name\n      parent {\n        id\n        name\n      }\n    }\n  }\n": types.GetSkillCategoriesDocument,
    "\n  mutation uploadAvatarFile($dto: UploadAvatarInput!) {\n    uploadAvatar(avatar: $dto)\n  }\n": types.UploadAvatarFileDocument,
    "\n  mutation updateProfile($dto: UpdateProfileInput!) {\n    updateProfile(profile: $dto) {\n      id\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  mutation updateUser($dto: UpdateUserInput!) {\n    updateUser(user: $dto) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation deleteAvatar($dto: DeleteAvatarInput!) {\n    deleteAvatar(avatar: $dto)\n  }\n": types.DeleteAvatarDocument,
    "\n  mutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId) {\n      affected\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      id\n      email\n      role\n      department_name\n      position_name\n      profile {\n        first_name\n        last_name\n      }\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUserData($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      role\n      department_name\n      position_name\n      profile {\n        first_name\n        last_name\n      }\n    }\n  }\n": types.UpdateUserDataDocument,
    "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      department {\n        id\n      }\n      position {\n        id\n      }\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n": types.GetUsersDocument,
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
export function graphql(source: "\n  mutation CreateCv($cv: CreateCvInput!) {\n    createCv(cv: $cv) {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCv($cv: CreateCvInput!) {\n    createCv(cv: $cv) {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCv($cv: UpdateCvInput!) {\n    updateCv(cv: $cv) {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCv($cv: UpdateCvInput!) {\n    updateCv(cv: $cv) {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCv($cv: DeleteCvInput!) {\n    deleteCv(cv: $cv) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddCvSkill($skill: AddCvSkillInput!) {\n    addCvSkill(skill: $skill) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddCvSkill($skill: AddCvSkillInput!) {\n    addCvSkill(skill: $skill) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {\n    updateCvSkill(skill: $skill) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {\n    updateCvSkill(skill: $skill) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {\n    deleteCvSkill(skill: $skill) {\n      id\n\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {\n    deleteCvSkill(skill: $skill) {\n      id\n\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCvs {\n    cvs {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCvs {\n    cvs {\n      id\n      name\n      education\n      description\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCvSkills($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCvSkills($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      skills {\n        name\n        mastery\n        categoryId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCV($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      name\n      education\n      description\n      created_at\n      user {\n        id\n        email\n        role\n        position {\n          name\n        }\n        profile {\n          full_name\n        }\n      }\n      skills {\n        name\n        mastery\n        categoryId\n      }\n      languages {\n        name\n        proficiency\n      }\n      projects {\n        id\n        start_date\n        end_date\n        responsibilities\n        roles\n        project {\n          id\n          name\n          internal_name\n          domain\n          description\n          environment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCV($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      name\n      education\n      description\n      created_at\n      user {\n        id\n        email\n        role\n        position {\n          name\n        }\n        profile {\n          full_name\n        }\n      }\n      skills {\n        name\n        mastery\n        categoryId\n      }\n      languages {\n        name\n        proficiency\n      }\n      projects {\n        id\n        start_date\n        end_date\n        responsibilities\n        roles\n        project {\n          id\n          name\n          internal_name\n          domain\n          description\n          environment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ExportPdf($pdf: ExportPdfInput!) {\n    exportPdf(pdf: $pdf)\n  }\n"): (typeof documents)["\n  mutation ExportPdf($pdf: ExportPdfInput!) {\n    exportPdf(pdf: $pdf)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDepartment($department: CreateDepartmentInput!) {\n    createDepartment(department: $department) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDepartment($department: CreateDepartmentInput!) {\n    createDepartment(department: $department) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDepartment($department: UpdateDepartmentInput!) {\n    updateDepartment(department: $department) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDepartment($department: UpdateDepartmentInput!) {\n    updateDepartment(department: $department) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteDepartment($department: DeleteDepartmentInput!) {\n    deleteDepartment(department: $department) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteDepartment($department: DeleteDepartmentInput!) {\n    deleteDepartment(department: $department) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDepartments {\n    departments {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetDepartments {\n    departments {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addProfileLanguage($dto: AddProfileLanguageInput!) {\n    addProfileLanguage(language: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addProfileLanguage($dto: AddProfileLanguageInput!) {\n    addProfileLanguage(language: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteProfileLanguage($dto: DeleteProfileLanguageInput!) {\n    deleteProfileLanguage(language: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteProfileLanguage($dto: DeleteProfileLanguageInput!) {\n    deleteProfileLanguage(language: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProfileLanguage($dto: UpdateProfileLanguageInput!) {\n    updateProfileLanguage(language: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateProfileLanguage($dto: UpdateProfileLanguageInput!) {\n    updateProfileLanguage(language: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLanguage($language: CreateLanguageInput!) {\n    createLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLanguage($language: CreateLanguageInput!) {\n    createLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLanguage($language: UpdateLanguageInput!) {\n    updateLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateLanguage($language: UpdateLanguageInput!) {\n    updateLanguage(language: $language) {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteLanguage($language: DeleteLanguageInput!) {\n    deleteLanguage(language: $language) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLanguage($language: DeleteLanguageInput!) {\n    deleteLanguage(language: $language) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProfileLanguages($userId: ID!) {\n    profile(userId: $userId) {\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProfileLanguages($userId: ID!) {\n    profile(userId: $userId) {\n      languages {\n        name\n        proficiency\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLanguages {\n    languages {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"): (typeof documents)["\n  query GetLanguages {\n    languages {\n      id\n      name\n      native_name\n      iso2\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePosition($position: CreatePositionInput!) {\n    createPosition(position: $position) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePosition($position: CreatePositionInput!) {\n    createPosition(position: $position) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePosition($position: UpdatePositionInput!) {\n    updatePosition(position: $position) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePosition($position: UpdatePositionInput!) {\n    updatePosition(position: $position) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePosition($position: DeletePositionInput!) {\n    deletePosition(position: $position) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePosition($position: DeletePositionInput!) {\n    deletePosition(position: $position) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPositions {\n    positions {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetPositions {\n    positions {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddCvProject($project: AddCvProjectInput!) {\n    addCvProject(project: $project) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddCvProject($project: AddCvProjectInput!) {\n    addCvProject(project: $project) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCvProject($project: UpdateCvProjectInput!) {\n    updateCvProject(project: $project) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCvProject($project: UpdateCvProjectInput!) {\n    updateCvProject(project: $project) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCvProject($project: RemoveCvProjectInput!) {\n    removeCvProject(project: $project) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCvProject($project: RemoveCvProjectInput!) {\n    removeCvProject(project: $project) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProject($project: CreateProjectInput!) {\n    createProject(project: $project) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($project: CreateProjectInput!) {\n    createProject(project: $project) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProject($project: UpdateProjectInput!) {\n    updateProject(project: $project) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProject($project: UpdateProjectInput!) {\n    updateProject(project: $project) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProject($project: DeleteProjectInput!) {\n    deleteProject(project: $project) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProject($project: DeleteProjectInput!) {\n    deleteProject(project: $project) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCvProjects($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      projects {\n        id\n        start_date\n        end_date\n        responsibilities\n        roles\n\n        project {\n          id\n          name\n          internal_name\n          domain\n          description\n          environment\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCvProjects($cvId: ID!) {\n    cv(cvId: $cvId) {\n      id\n      projects {\n        id\n        start_date\n        end_date\n        responsibilities\n        roles\n\n        project {\n          id\n          name\n          internal_name\n          domain\n          description\n          environment\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProjects {\n    projects {\n      id\n      name\n      domain\n      description\n      environment\n      start_date\n      end_date\n    }\n  }\n"): (typeof documents)["\n  query GetProjects {\n    projects {\n      id\n      name\n      domain\n      description\n      environment\n      start_date\n      end_date\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProjectOptions {\n    projects {\n      id\n      name\n      internal_name\n      domain\n      description\n      environment\n    }\n  }\n"): (typeof documents)["\n  query GetProjectOptions {\n    projects {\n      id\n      name\n      internal_name\n      domain\n      description\n      environment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addProfileSkill($dto: AddProfileSkillInput!) {\n    addProfileSkill(skill: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addProfileSkill($dto: AddProfileSkillInput!) {\n    addProfileSkill(skill: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteProfileSkill($dto: DeleteProfileSkillInput!) {\n    deleteProfileSkill(skill: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteProfileSkill($dto: DeleteProfileSkillInput!) {\n    deleteProfileSkill(skill: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateProfileSkill($dto: UpdateProfileSkillInput!) {\n    updateProfileSkill(skill: $dto) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateProfileSkill($dto: UpdateProfileSkillInput!) {\n    updateProfileSkill(skill: $dto) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSkill($skill: CreateSkillInput!) {\n    createSkill(skill: $skill) {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSkill($skill: CreateSkillInput!) {\n    createSkill(skill: $skill) {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSkill($skill: UpdateSkillInput!) {\n    updateSkill(skill: $skill) {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSkill($skill: UpdateSkillInput!) {\n    updateSkill(skill: $skill) {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSkill($skill: DeleteSkillInput!) {\n    deleteSkill(skill: $skill) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSkill($skill: DeleteSkillInput!) {\n    deleteSkill(skill: $skill) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSkills {\n    skills {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getSkills {\n    skills {\n      id\n      name\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProfileSkills($userId: ID!) {\n    profile(userId: $userId) {\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProfileSkills($userId: ID!) {\n    profile(userId: $userId) {\n      skills {\n        name\n        categoryId\n        mastery\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSkillCategories {\n    skillCategories {\n      id\n      name\n      parent {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getSkillCategories {\n    skillCategories {\n      id\n      name\n      parent {\n        id\n        name\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId) {\n      affected\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($userId: ID!) {\n    deleteUser(userId: $userId) {\n      affected\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      id\n      email\n      role\n      department_name\n      position_name\n      profile {\n        first_name\n        last_name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($user: CreateUserInput!) {\n    createUser(user: $user) {\n      id\n      email\n      role\n      department_name\n      position_name\n      profile {\n        first_name\n        last_name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserData($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      role\n      department_name\n      position_name\n      profile {\n        first_name\n        last_name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserData($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      role\n      department_name\n      position_name\n      profile {\n        first_name\n        last_name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      department {\n        id\n      }\n      position {\n        id\n      }\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    users {\n      id\n      email\n      role\n      department_name\n      position_name\n\n      department {\n        id\n      }\n      position {\n        id\n      }\n      profile {\n        id\n        first_name\n        last_name\n        avatar\n      }\n    }\n  }\n"];
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