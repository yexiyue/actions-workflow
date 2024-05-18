use crate::{entity::comment::Model, redis_keys::gen_key, service::comment::CommentService};
use async_graphql::{Context, Object, Result};
use redis::{aio::MultiplexedConnection, AsyncCommands};
use sea_orm::DbConn;

#[derive(Debug, Default)]
pub struct CommentQuery;

#[Object]
impl CommentQuery {
    async fn comments(&self, ctx: &Context<'_>, id: i32) -> Result<Vec<Model>> {
        let db = ctx.data::<DbConn>()?;
        Ok(CommentService::find_all_by_template_id(db, id).await?)
    }

    /// 获取模版评论次数
    async fn template_comment_count(&self, ctx: &Context<'_>, id: i32) -> Result<i32> {
        let coon = ctx.data::<MultiplexedConnection>()?;
        let mut redis = coon.clone();
        let res: i32 = redis
            .get(gen_key(crate::redis_keys::RedisKeys::TemplateComments, id))
            .await
            .unwrap_or(0);
        Ok(res)
    }
}
