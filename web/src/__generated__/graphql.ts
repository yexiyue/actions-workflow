/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<FixedOffset> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
  /** A scalar that can represent any JSON value. */
  JSON: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  createAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CategoryWithPagination = {
  __typename?: 'CategoryWithPagination';
  allCount: Scalars['Int']['output'];
  categories: Array<Category>;
  total: Scalars['Int']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  parentCommentId?: Maybe<Scalars['Int']['output']>;
  templateId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type CommentInput = {
  content: Scalars['String']['input'];
  parentCommentId?: InputMaybe<Scalars['Int']['input']>;
  templateId: Scalars['Int']['input'];
};

export type CommentWithUser = {
  __typename?: 'CommentWithUser';
  comment: Comment;
  user: User;
};

export type Favorites = {
  __typename?: 'Favorites';
  createAt?: Maybe<Scalars['DateTime']['output']>;
  templateId: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 添加评论 */
  addComment: Scalars['Int']['output'];
  createCategory: Scalars['Int']['output'];
  createTag: Scalars['Int']['output'];
  createTemplate: Scalars['Int']['output'];
  deleteCategory: Scalars['String']['output'];
  /** 删除评论 */
  deleteComment: Scalars['String']['output'];
  deleteTag: Scalars['String']['output'];
  deleteTemplate: Scalars['String']['output'];
  disFavorite: Scalars['String']['output'];
  favorite: Scalars['String']['output'];
  increaseDownloadCount: Scalars['String']['output'];
  updateCategory: Category;
  updateTag: Tag;
  /** 添加标签 */
  updateTags: Scalars['String']['output'];
  updateTemplate: Template;
};


export type MutationAddCommentArgs = {
  input: CommentInput;
};


export type MutationCreateCategoryArgs = {
  category: CategoryInput;
};


export type MutationCreateTagArgs = {
  tag: TagInput;
};


export type MutationCreateTemplateArgs = {
  input: TemplateCreateInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTemplateArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDisFavoriteArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationFavoriteArgs = {
  templateId: Scalars['Int']['input'];
};


export type MutationIncreaseDownloadCountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  category: CategoryInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateTagArgs = {
  id: Scalars['Int']['input'];
  tag: TagInput;
};


export type MutationUpdateTagsArgs = {
  input: TemplateTagInput;
};


export type MutationUpdateTemplateArgs = {
  id: Scalars['Int']['input'];
  input: TemplateUpdateInput;
};

export type Pagination = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  categories: CategoryWithPagination;
  comments: Array<CommentWithUser>;
  favoriteTemplates: UserTemplates;
  /** 查找关联这个标签的模版 */
  tagByIdWithTemplates: TagTemplates;
  tags: TagWithPagination;
  /** 通过ID获取模版详情 */
  templateById: Template;
  /** 获取模版评论次数 */
  templateCommentCount: Scalars['Int']['output'];
  /** 获取模版下载次数 */
  templateDownloadCount: Scalars['Int']['output'];
  /** 获取模版收藏次数 */
  templateFavoriteCount: Scalars['Int']['output'];
  templateWithUser: TemplateWithUser;
  /** 需要权限 */
  templatesByUser: UserTemplates;
  /** 获取用户模版列表，不需要权限，但只能看到未公开的 */
  templatesByUserId: UserTemplates;
  /** 分页查找模版 */
  templatesWithPagination: TemplatesWithPagination;
  user: User;
  userById?: Maybe<User>;
};


export type QueryCategoriesArgs = {
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommentsArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFavoriteTemplatesArgs = {
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTagByIdWithTemplatesArgs = {
  id: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTagsArgs = {
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTemplateByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTemplateCommentCountArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTemplateDownloadCountArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTemplateFavoriteCountArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTemplateWithUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTemplatesByUserArgs = {
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTemplatesByUserIdArgs = {
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};


export type QueryTemplatesWithPaginationArgs = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  createAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TagInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type TagTemplates = {
  __typename?: 'TagTemplates';
  allCount: Scalars['Int']['output'];
  tag: Tag;
  templates: Array<Template>;
  total: Scalars['Int']['output'];
};

export type TagWithPagination = {
  __typename?: 'TagWithPagination';
  allCount: Scalars['Int']['output'];
  tags: Array<Tag>;
  total: Scalars['Int']['output'];
};

export type Template = {
  __typename?: 'Template';
  categoryId: Scalars['Int']['output'];
  config: Scalars['String']['output'];
  createAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  readme?: Maybe<Scalars['String']['output']>;
  sourceCodeUrl?: Maybe<Scalars['String']['output']>;
  template: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['Int']['output'];
};

export type TemplateCreateInput = {
  categoryId: Scalars['Int']['input'];
  config: Scalars['JSON']['input'];
  isPublic: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  readme?: InputMaybe<Scalars['String']['input']>;
  sourceCodeUrl?: InputMaybe<Scalars['String']['input']>;
  template: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type TemplateTagInput = {
  tagId: Array<Scalars['Int']['input']>;
  templateId: Scalars['Int']['input'];
};

export type TemplateUpdateInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  config?: InputMaybe<Scalars['JSON']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  readme?: InputMaybe<Scalars['String']['input']>;
  sourceCodeUrl?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
};

export type TemplateWithUser = {
  __typename?: 'TemplateWithUser';
  avatarUrl: Scalars['String']['output'];
  category: Category;
  categoryId: Scalars['Int']['output'];
  config: Scalars['String']['output'];
  createAt?: Maybe<Scalars['DateTime']['output']>;
  favorites: Array<Favorites>;
  id: Scalars['Int']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  readme?: Maybe<Scalars['String']['output']>;
  sourceCodeUrl?: Maybe<Scalars['String']['output']>;
  tags: Array<Tag>;
  template: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type TemplatesWithPagination = {
  __typename?: 'TemplatesWithPagination';
  templates: Array<Template>;
  total: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String']['output'];
  createAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type UserTemplates = {
  __typename?: 'UserTemplates';
  allCount: Scalars['Int']['output'];
  templates: Array<Template>;
  total: Scalars['Int']['output'];
};

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: string };

export type AddCommentMutationVariables = Exact<{
  input: CommentInput;
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment: number };

export type QueryCommentsQueryVariables = Exact<{
  templateId: Scalars['Int']['input'];
}>;


export type QueryCommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'CommentWithUser', user: { __typename?: 'User', id: number, avatarUrl: string, username: string }, comment: { __typename?: 'Comment', id: number, content: string, parentCommentId?: number | null, createAt?: any | null, templateId: number, userId: number } }> };

export type TemplateQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type TemplateQuery = { __typename?: 'Query', templateDownloadCount: number, templateFavoriteCount: number, templateCommentCount: number, templateWithUser: { __typename?: 'TemplateWithUser', userId: number, name: string, config: string, username: string, avatarUrl: string, category: { __typename?: 'Category', name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string }> } };

export type GetTemplateInfoQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetTemplateInfoQuery = { __typename?: 'Query', templateWithUser: { __typename?: 'TemplateWithUser', categoryId: number, sourceCodeUrl?: string | null, tags: Array<{ __typename?: 'Tag', id: number }> } };

export type DatesQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type DatesQuery = { __typename?: 'Query', templatesWithPagination: { __typename?: 'TemplatesWithPagination', total: number, templates: Array<{ __typename?: 'Template', id: number }> } };

export type TagsAndCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsAndCategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategoryWithPagination', categories: Array<{ __typename?: 'Category', id: number, name: string }> }, tags: { __typename?: 'TagWithPagination', tags: Array<{ __typename?: 'Tag', id: number, name: string }> } };

export type MyFavoriteQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type MyFavoriteQuery = { __typename?: 'Query', favoriteTemplates: { __typename?: 'UserTemplates', total: number, allCount: number, templates: Array<{ __typename?: 'Template', id: number }> } };

export type MyTemplatesQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type MyTemplatesQuery = { __typename?: 'Query', templatesByUser: { __typename?: 'UserTemplates', total: number, allCount: number, templates: Array<{ __typename?: 'Template', id: number, isPublic: boolean, name: string, createAt?: any | null, updateAt?: any | null, sourceCodeUrl?: string | null }> } };

export type DeleteTemplateMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTemplateMutation = { __typename?: 'Mutation', deleteTemplate: string };

export type UpdateTemplateMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: TemplateUpdateInput;
}>;


export type UpdateTemplateMutation = { __typename?: 'Mutation', updateTemplate: { __typename?: 'Template', id: number } };

export type UpdateTemplateTagsMutationVariables = Exact<{
  input: TemplateTagInput;
}>;


export type UpdateTemplateTagsMutation = { __typename?: 'Mutation', updateTags: string };

export type CategoriesQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type CategoriesQuery = { __typename?: 'Query', categories: { __typename?: 'CategoryWithPagination', total: number, categories: Array<{ __typename?: 'Category', id: number, name: string, description: string, updateAt?: any | null, createAt?: any | null }> } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: string };

export type AddCategoryMutationVariables = Exact<{
  input: CategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', createCategory: number };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: CategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', name: string } };

export type TagsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TagsQuery = { __typename?: 'Query', tags: { __typename?: 'TagWithPagination', total: number, tags: Array<{ __typename?: 'Tag', id: number, name: string, description: string, updateAt?: any | null, createAt?: any | null }> } };

export type DeleteTagMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: string };

export type AddTagMutationVariables = Exact<{
  input: TagInput;
}>;


export type AddTagMutation = { __typename?: 'Mutation', createTag: number };

export type UpdateTagMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: TagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', name: string } };

export type TagTemplatesQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type TagTemplatesQuery = { __typename?: 'Query', tagByIdWithTemplates: { __typename?: 'TagTemplates', total: number, allCount: number, templates: Array<{ __typename?: 'Template', id: number }>, tag: { __typename?: 'Tag', name: string, description: string } } };

export type TemplateAndReadmeQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type TemplateAndReadmeQuery = { __typename?: 'Query', templateDownloadCount: number, templateFavoriteCount: number, templateCommentCount: number, templateWithUser: { __typename?: 'TemplateWithUser', name: string, config: string, readme?: string | null, template: string, username: string, avatarUrl: string, userId: number, createAt?: any | null, updateAt?: any | null, sourceCodeUrl?: string | null, favorites: Array<{ __typename?: 'Favorites', userId: number }>, category: { __typename?: 'Category', name: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string }> } };

export type AddFavoriteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AddFavoriteMutation = { __typename?: 'Mutation', favorite: string };

export type DisFavoriteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DisFavoriteMutation = { __typename?: 'Mutation', disFavorite: string };

export type UserTemplatesQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserTemplatesQuery = { __typename?: 'Query', userById?: { __typename?: 'User', id: number, username: string, avatarUrl: string, createAt?: any | null } | null, templatesByUserId: { __typename?: 'UserTemplates', total: number, allCount: number, templates: Array<{ __typename?: 'Template', id: number }> } };


export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const AddCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>;
export const QueryCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"parentCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]}}]} as unknown as DocumentNode<QueryCommentsQuery, QueryCommentsQueryVariables>;
export const TemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Template"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateWithUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"config"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"templateDownloadCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]},{"kind":"Field","name":{"kind":"Name","value":"templateFavoriteCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]},{"kind":"Field","name":{"kind":"Name","value":"templateCommentCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<TemplateQuery, TemplateQueryVariables>;
export const GetTemplateInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTemplateInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateWithUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceCodeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetTemplateInfoQuery, GetTemplateInfoQueryVariables>;
export const DatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Dates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templatesWithPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<DatesQuery, DatesQueryVariables>;
export const TagsAndCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TagsAndCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<TagsAndCategoriesQuery, TagsAndCategoriesQueryVariables>;
export const MyFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favoriteTemplates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"allCount"}}]}}]}}]} as unknown as DocumentNode<MyFavoriteQuery, MyFavoriteQueryVariables>;
export const MyTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templatesByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"templates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"sourceCodeUrl"}}]}}]}}]}}]} as unknown as DocumentNode<MyTemplatesQuery, MyTemplatesQueryVariables>;
export const DeleteTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTemplateMutation, DeleteTemplateMutationVariables>;
export const UpdateTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTemplateMutation, UpdateTemplateMutationVariables>;
export const UpdateTemplateTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTemplateTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateTemplateTagsMutation, UpdateTemplateTagsMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const AddCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddCategoryMutation, AddCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const TagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}}]}}]}}]}}]} as unknown as DocumentNode<TagsQuery, TagsQueryVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const AddTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<AddTagMutation, AddTagMutationVariables>;
export const UpdateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateTagMutation, UpdateTagMutationVariables>;
export const TagTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TagTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagByIdWithTemplates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"templates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"allCount"}}]}}]}}]} as unknown as DocumentNode<TagTemplatesQuery, TagTemplatesQueryVariables>;
export const TemplateAndReadmeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TemplateAndReadme"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateWithUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"config"}},{"kind":"Field","name":{"kind":"Name","value":"readme"}},{"kind":"Field","name":{"kind":"Name","value":"template"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"favorites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"sourceCodeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"templateDownloadCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]},{"kind":"Field","name":{"kind":"Name","value":"templateFavoriteCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]},{"kind":"Field","name":{"kind":"Name","value":"templateCommentCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<TemplateAndReadmeQuery, TemplateAndReadmeQueryVariables>;
export const AddFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"templateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const DisFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"disFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"templateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DisFavoriteMutation, DisFavoriteMutationVariables>;
export const UserTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"templatesByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"allCount"}}]}}]}}]} as unknown as DocumentNode<UserTemplatesQuery, UserTemplatesQueryVariables>;