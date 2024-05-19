use crate::{
    graphql::AuthGuard,
    jwt::Claims,
    redis_keys::RedisKeys,
    service::comment::{CommentInput, CommentService},
};
use async_graphql::{Context, Object, Result};
use redis::{aio::MultiplexedConnection, AsyncCommands};
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

        let coon = ctx.data::<MultiplexedConnection>()?;
        let mut redis = coon.clone();
        redis
            .hincr(RedisKeys::TemplateComments, template_id, 1)
            .await?;

        Ok(res)
    }

    /// 更新评论
    #[graphql(guard = "AuthGuard")]
    async fn update_comment(&self, ctx: &Context<'_>, input: CommentInput) -> Result<&str> {
        let db = ctx.data()?;
        let claims = ctx.data::<Claims>()?;
        CommentService::update(db, claims.user_id, input).await?;
        Ok("success")
    }

    /// 删除评论
    #[graphql(guard = "AuthGuard")]
    async fn delete_comment(&self, ctx: &Context<'_>, id: i32) -> Result<&str> {
        let db = ctx.data()?;
        let claims = ctx.data::<Claims>()?;
        let comment = CommentService::delete_by_id(db, claims.user_id, id).await?;
        let coon = ctx.data::<MultiplexedConnection>()?;
        let mut redis = coon.clone();
        redis::cmd("hincrby")
            .arg(RedisKeys::TemplateComments)
            .arg(comment.template_id)
            .arg(-1)
            .query_async(&mut redis)
            .await?;
        Ok("success")
    }
}
