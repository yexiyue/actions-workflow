use crate::{
    graphql::AuthGuard,
    jwt::Claims,
    service::comment::{CommentInput, CommentService},
};
use async_graphql::{Context, Object, Result};
use sea_orm::DbConn;

#[derive(Debug, Default)]
pub struct CommentsMutation;

#[Object]
impl CommentsMutation {
    /// 添加评论
    #[graphql(guard = "AuthGuard")]
    async fn add_comment(&self, ctx: &Context<'_>, input: CommentInput) -> Result<i32> {
        let db = ctx.data::<DbConn>()?;
        let claims = ctx.data::<Claims>()?;
        let template_id = input.template_id;
        let res: i32 = CommentService::create(db, claims.user_id, input).await?;
        Ok(res)
    }

    /// 删除评论
    #[graphql(guard = "AuthGuard")]
    async fn delete_comment(&self, ctx: &Context<'_>, id: i32) -> Result<&str> {
        let db = ctx.data()?;
        let claims = ctx.data::<Claims>()?;
        CommentService::delete_by_id(db, claims.user_id, id).await?;
        Ok("success")
    }
}
