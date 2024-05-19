use crate::{
    redis_keys::RedisKeys,
    service::comment::{CommentService, CommentWithUser},
};
use async_graphql::{Context, Object, Result};
use redis::{aio::MultiplexedConnection, AsyncCommands};
use sea_orm::DbConn;

#[derive(Debug, Default)]
pub struct CommentQuery;

#[Object]
impl CommentQuery {
    async fn comments(&self, ctx: &Context<'_>, id: i32) -> Result<Vec<CommentWithUser>> {
        let db = ctx.data::<DbConn>()?;
        let res = CommentService::find_all_by_template_id(db, id).await?;
        Ok(res)
    }

    /// 获取模版评论次数
    async fn template_comment_count(&self, ctx: &Context<'_>, id: i32) -> Result<i32> {
        let coon = ctx.data::<MultiplexedConnection>()?;
        let mut redis = coon.clone();
        let res = redis
            .hget(RedisKeys::TemplateComments, id)
            .await
            .unwrap_or(0);
        Ok(res)
    }
}
