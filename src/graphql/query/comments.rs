use crate::service::comment::{CommentService, CommentWithUser};
use async_graphql::{Context, Object, Result};
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
    async fn template_comment_count(&self, ctx: &Context<'_>, id: i32) -> Result<u64> {
        let db = ctx.data::<DbConn>()?;
        let res = CommentService::find_template_id_count(db, id).await?;
        Ok(res)
    }
}
