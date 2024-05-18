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
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Scalars['Int']['output'];
  createTag: Tag;
  createTemplate: Scalars['Int']['output'];
  deleteCategory: Scalars['String']['output'];
  deleteTag: Scalars['String']['output'];
  updateCategory: Category;
  updateTag: Tag;
  updateTemplate: Template;
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


export type MutationDeleteTagArgs = {
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


export type MutationUpdateTemplateArgs = {
  id: Scalars['Int']['input'];
  input: TemplateUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  /** 通过ID获取模版详情 */
  templateById?: Maybe<Template>;
  templates: Array<Template>;
  /** 需要权限 */
  templatesByUser: Array<Template>;
  /** 获取用户模版列表，不需要权限，但只能看到未公开的 */
  templatesByUserId: Array<Template>;
  user: User;
  userById?: Maybe<User>;
};


export type QueryTemplateByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTemplatesByUserIdArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TagInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
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
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  config: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  readme?: InputMaybe<Scalars['String']['input']>;
  sourceCodeUrl?: InputMaybe<Scalars['String']['input']>;
  template: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type TemplateUpdateInput = {
  categoryId: Scalars['Int']['input'];
  config: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  readme?: InputMaybe<Scalars['String']['input']>;
  sourceCodeUrl?: InputMaybe<Scalars['String']['input']>;
  template: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String']['output'];
  createAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type TemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type TemplatesQuery = { __typename?: 'Query', templates: Array<{ __typename?: 'Template', id: number, name: string, categoryId: number, createAt?: any | null, sourceCodeUrl?: string | null }> };


export const TemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Templates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"sourceCodeUrl"}}]}}]}}]} as unknown as DocumentNode<TemplatesQuery, TemplatesQueryVariables>;