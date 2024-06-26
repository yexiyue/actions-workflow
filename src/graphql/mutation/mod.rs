use async_graphql::MergedObject;
mod category;
use category::CategoryMutation;
mod tag;
use tag::TagMutation;
mod template;
use template::TemplateMutation;
mod favorites;
use favorites::FavoritesMutation;
mod comments;
use comments::CommentsMutation;

#[derive(Debug, Default, MergedObject)]
pub struct Mutation(
    CategoryMutation,
    TagMutation,
    TemplateMutation,
    FavoritesMutation,
    CommentsMutation,
);
