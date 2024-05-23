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
 */
const documents = {
    "\n  mutation DeleteComment($id: Int!) {\n    deleteComment(id: $id)\n  }\n": types.DeleteCommentDocument,
    "\n  mutation addComment($input: CommentInput!) {\n    addComment(input: $input)\n  }\n": types.AddCommentDocument,
    "\n  query QueryComments($templateId: Int!){\n    comments(id: $templateId){\n      user{\n        id\n        avatarUrl\n        username\n      }\n      comment{\n        id\n        content\n        parentCommentId\n        createAt\n        templateId\n        userId\n      }\n    }\n  }\n": types.QueryCommentsDocument,
    "\n  query Template($id:Int!){\n      templateWithUser(id: $id){\n        userId\n        name\n        config\n        username,\n        avatarUrl,\n        category{\n          name\n        }\n        tags{\n          id\n          name\n        }\n      }\n      templateDownloadCount(id: $id)\n      templateFavoriteCount(id: $id)\n      templateCommentCount(id: $id)\n  }\n": types.TemplateDocument,
    "\n  query GetTemplateInfo($id:Int!){\n    templateWithUser(id: $id){\n      categoryId\n      sourceCodeUrl\n      tags{\n        id\n      }\n    }\n  }\n": types.GetTemplateInfoDocument,
    "\n  query Dates($categoryId: Int, $pagination:Pagination,$search:String) {\n    templatesWithPagination(categoryId: $categoryId, pagination: $pagination,search: $search) {\n      templates{\n        id\n      }\n      total\n    }\n  }\n": types.DatesDocument,
    "\n  query TagsAndCategories{\n    categories{\n      categories{\n        id\n        name\n      }\n    }\n    tags{\n      tags{\n        id\n        name\n      }\n    }\n  }\n": types.TagsAndCategoriesDocument,
    "\nquery MyFavorite($pagination:Pagination,$search:String){\n    favoriteTemplates(pagination: $pagination,search: $search){\n      templates{\n        id\n      }\n      total\n      allCount\n    }\n}\n": types.MyFavoriteDocument,
    "\n  query MyTemplates($pagination:Pagination,$search:String){\n    templatesByUser(pagination: $pagination,search: $search){\n      total\n      allCount\n      templates{\n        id\n        isPublic\n        name\n        createAt\n        updateAt\n        sourceCodeUrl\n      }\n    }\n  }\n": types.MyTemplatesDocument,
    "\n  mutation DeleteTemplate($id:Int!){\n    deleteTemplate(id:$id)\n  }\n": types.DeleteTemplateDocument,
    "\n  mutation UpdateTemplate($id:Int!,$input:TemplateUpdateInput!){\n    updateTemplate(id: $id,input: $input){\n      id\n    }\n  }\n": types.UpdateTemplateDocument,
    "\n  mutation UpdateTemplateTags($input:TemplateTagInput!){\n    updateTags(input: $input)\n  }\n": types.UpdateTemplateTagsDocument,
    "\n  query Categories($pagination:Pagination,$search:String){\n    categories(pagination:$pagination,search:$search){\n      total\n      categories{\n        id\n        name\n        description\n        updateAt\n        createAt\n      }\n    }\n  }\n": types.CategoriesDocument,
    "\n  mutation DeleteCategory($id:Int!){\n    deleteCategory(id:$id)\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation AddCategory($input:CategoryInput!){\n    createCategory(category: $input)\n  }\n": types.AddCategoryDocument,
    "\n  mutation UpdateCategory($id:Int!,$input:CategoryInput!){\n    updateCategory(category: $input,id: $id){\n      name\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  query Tags($pagination:Pagination,$search:String){\n    tags(pagination:$pagination,search:$search){\n      total\n      tags{\n        id\n        name\n        description\n        updateAt\n        createAt\n      }\n    }\n  }\n": types.TagsDocument,
    "\n  mutation DeleteTag($id:Int!){\n    deleteTag(id:$id)\n  }\n": types.DeleteTagDocument,
    "\n  mutation AddTag($input:TagInput!){\n    createTag(tag:$input)\n  }\n": types.AddTagDocument,
    "\n  mutation UpdateTag($id:Int!,$input:TagInput!){\n    updateTag(tag: $input,id: $id){\n      name\n    }\n  }\n": types.UpdateTagDocument,
    "\n  query TagTemplates($id:Int!,$pagination:Pagination,$search:String){\n    tagByIdWithTemplates(id: $id,pagination: $pagination,search: $search){\n      total\n      templates{\n        id\n      }\n      tag{\n        name\n        description\n      }\n      allCount\n    }\n  }\n": types.TagTemplatesDocument,
    "\nquery TemplateAndReadme($id:Int!){\n  templateWithUser(id: $id){\n    name\n    config\n    readme\n    template,\n    username,\n    avatarUrl,\n    userId,\n    favorites{\n      userId\n    }\n    createAt\n    updateAt\n    sourceCodeUrl\n    category{\n      name\n    }\n    tags{\n      id\n      name\n    }\n  }\n  templateDownloadCount(id: $id)\n  templateFavoriteCount(id: $id)\n  templateCommentCount(id: $id)\n}\n": types.TemplateAndReadmeDocument,
    "\n  mutation addFavorite($id: Int!) {\n    favorite(templateId: $id)\n  }\n": types.AddFavoriteDocument,
    "\n  mutation disFavorite($id: Int!) {\n    disFavorite(templateId: $id)\n  }\n": types.DisFavoriteDocument,
    "\n  query UserTemplates($id:Int!,$pagination:Pagination,$search:String){\n    userById(id:$id) {\n      id\n      username\n      avatarUrl\n      createAt\n    }\n    templatesByUserId(userId:$id,pagination: $pagination,search: $search) {\n      templates{\n        id\n      }\n      total\n      allCount\n    }\n  }\n": types.UserTemplatesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteComment($id: Int!) {\n    deleteComment(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteComment($id: Int!) {\n    deleteComment(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addComment($input: CommentInput!) {\n    addComment(input: $input)\n  }\n"): (typeof documents)["\n  mutation addComment($input: CommentInput!) {\n    addComment(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryComments($templateId: Int!){\n    comments(id: $templateId){\n      user{\n        id\n        avatarUrl\n        username\n      }\n      comment{\n        id\n        content\n        parentCommentId\n        createAt\n        templateId\n        userId\n      }\n    }\n  }\n"): (typeof documents)["\n  query QueryComments($templateId: Int!){\n    comments(id: $templateId){\n      user{\n        id\n        avatarUrl\n        username\n      }\n      comment{\n        id\n        content\n        parentCommentId\n        createAt\n        templateId\n        userId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Template($id:Int!){\n      templateWithUser(id: $id){\n        userId\n        name\n        config\n        username,\n        avatarUrl,\n        category{\n          name\n        }\n        tags{\n          id\n          name\n        }\n      }\n      templateDownloadCount(id: $id)\n      templateFavoriteCount(id: $id)\n      templateCommentCount(id: $id)\n  }\n"): (typeof documents)["\n  query Template($id:Int!){\n      templateWithUser(id: $id){\n        userId\n        name\n        config\n        username,\n        avatarUrl,\n        category{\n          name\n        }\n        tags{\n          id\n          name\n        }\n      }\n      templateDownloadCount(id: $id)\n      templateFavoriteCount(id: $id)\n      templateCommentCount(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTemplateInfo($id:Int!){\n    templateWithUser(id: $id){\n      categoryId\n      sourceCodeUrl\n      tags{\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTemplateInfo($id:Int!){\n    templateWithUser(id: $id){\n      categoryId\n      sourceCodeUrl\n      tags{\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Dates($categoryId: Int, $pagination:Pagination,$search:String) {\n    templatesWithPagination(categoryId: $categoryId, pagination: $pagination,search: $search) {\n      templates{\n        id\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Dates($categoryId: Int, $pagination:Pagination,$search:String) {\n    templatesWithPagination(categoryId: $categoryId, pagination: $pagination,search: $search) {\n      templates{\n        id\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TagsAndCategories{\n    categories{\n      categories{\n        id\n        name\n      }\n    }\n    tags{\n      tags{\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query TagsAndCategories{\n    categories{\n      categories{\n        id\n        name\n      }\n    }\n    tags{\n      tags{\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery MyFavorite($pagination:Pagination,$search:String){\n    favoriteTemplates(pagination: $pagination,search: $search){\n      templates{\n        id\n      }\n      total\n      allCount\n    }\n}\n"): (typeof documents)["\nquery MyFavorite($pagination:Pagination,$search:String){\n    favoriteTemplates(pagination: $pagination,search: $search){\n      templates{\n        id\n      }\n      total\n      allCount\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyTemplates($pagination:Pagination,$search:String){\n    templatesByUser(pagination: $pagination,search: $search){\n      total\n      allCount\n      templates{\n        id\n        isPublic\n        name\n        createAt\n        updateAt\n        sourceCodeUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyTemplates($pagination:Pagination,$search:String){\n    templatesByUser(pagination: $pagination,search: $search){\n      total\n      allCount\n      templates{\n        id\n        isPublic\n        name\n        createAt\n        updateAt\n        sourceCodeUrl\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTemplate($id:Int!){\n    deleteTemplate(id:$id)\n  }\n"): (typeof documents)["\n  mutation DeleteTemplate($id:Int!){\n    deleteTemplate(id:$id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTemplate($id:Int!,$input:TemplateUpdateInput!){\n    updateTemplate(id: $id,input: $input){\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTemplate($id:Int!,$input:TemplateUpdateInput!){\n    updateTemplate(id: $id,input: $input){\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTemplateTags($input:TemplateTagInput!){\n    updateTags(input: $input)\n  }\n"): (typeof documents)["\n  mutation UpdateTemplateTags($input:TemplateTagInput!){\n    updateTags(input: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories($pagination:Pagination,$search:String){\n    categories(pagination:$pagination,search:$search){\n      total\n      categories{\n        id\n        name\n        description\n        updateAt\n        createAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query Categories($pagination:Pagination,$search:String){\n    categories(pagination:$pagination,search:$search){\n      total\n      categories{\n        id\n        name\n        description\n        updateAt\n        createAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteCategory($id:Int!){\n    deleteCategory(id:$id)\n  }\n"): (typeof documents)["\n  mutation DeleteCategory($id:Int!){\n    deleteCategory(id:$id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddCategory($input:CategoryInput!){\n    createCategory(category: $input)\n  }\n"): (typeof documents)["\n  mutation AddCategory($input:CategoryInput!){\n    createCategory(category: $input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateCategory($id:Int!,$input:CategoryInput!){\n    updateCategory(category: $input,id: $id){\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCategory($id:Int!,$input:CategoryInput!){\n    updateCategory(category: $input,id: $id){\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Tags($pagination:Pagination,$search:String){\n    tags(pagination:$pagination,search:$search){\n      total\n      tags{\n        id\n        name\n        description\n        updateAt\n        createAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query Tags($pagination:Pagination,$search:String){\n    tags(pagination:$pagination,search:$search){\n      total\n      tags{\n        id\n        name\n        description\n        updateAt\n        createAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTag($id:Int!){\n    deleteTag(id:$id)\n  }\n"): (typeof documents)["\n  mutation DeleteTag($id:Int!){\n    deleteTag(id:$id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddTag($input:TagInput!){\n    createTag(tag:$input)\n  }\n"): (typeof documents)["\n  mutation AddTag($input:TagInput!){\n    createTag(tag:$input)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTag($id:Int!,$input:TagInput!){\n    updateTag(tag: $input,id: $id){\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTag($id:Int!,$input:TagInput!){\n    updateTag(tag: $input,id: $id){\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TagTemplates($id:Int!,$pagination:Pagination,$search:String){\n    tagByIdWithTemplates(id: $id,pagination: $pagination,search: $search){\n      total\n      templates{\n        id\n      }\n      tag{\n        name\n        description\n      }\n      allCount\n    }\n  }\n"): (typeof documents)["\n  query TagTemplates($id:Int!,$pagination:Pagination,$search:String){\n    tagByIdWithTemplates(id: $id,pagination: $pagination,search: $search){\n      total\n      templates{\n        id\n      }\n      tag{\n        name\n        description\n      }\n      allCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery TemplateAndReadme($id:Int!){\n  templateWithUser(id: $id){\n    name\n    config\n    readme\n    template,\n    username,\n    avatarUrl,\n    userId,\n    favorites{\n      userId\n    }\n    createAt\n    updateAt\n    sourceCodeUrl\n    category{\n      name\n    }\n    tags{\n      id\n      name\n    }\n  }\n  templateDownloadCount(id: $id)\n  templateFavoriteCount(id: $id)\n  templateCommentCount(id: $id)\n}\n"): (typeof documents)["\nquery TemplateAndReadme($id:Int!){\n  templateWithUser(id: $id){\n    name\n    config\n    readme\n    template,\n    username,\n    avatarUrl,\n    userId,\n    favorites{\n      userId\n    }\n    createAt\n    updateAt\n    sourceCodeUrl\n    category{\n      name\n    }\n    tags{\n      id\n      name\n    }\n  }\n  templateDownloadCount(id: $id)\n  templateFavoriteCount(id: $id)\n  templateCommentCount(id: $id)\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addFavorite($id: Int!) {\n    favorite(templateId: $id)\n  }\n"): (typeof documents)["\n  mutation addFavorite($id: Int!) {\n    favorite(templateId: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation disFavorite($id: Int!) {\n    disFavorite(templateId: $id)\n  }\n"): (typeof documents)["\n  mutation disFavorite($id: Int!) {\n    disFavorite(templateId: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query UserTemplates($id:Int!,$pagination:Pagination,$search:String){\n    userById(id:$id) {\n      id\n      username\n      avatarUrl\n      createAt\n    }\n    templatesByUserId(userId:$id,pagination: $pagination,search: $search) {\n      templates{\n        id\n      }\n      total\n      allCount\n    }\n  }\n"): (typeof documents)["\n  query UserTemplates($id:Int!,$pagination:Pagination,$search:String){\n    userById(id:$id) {\n      id\n      username\n      avatarUrl\n      createAt\n    }\n    templatesByUserId(userId:$id,pagination: $pagination,search: $search) {\n      templates{\n        id\n      }\n      total\n      allCount\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;