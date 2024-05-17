use crate::entity::tag::Model;
use async_graphql::{Context, Object, Result};
use sea_orm::DbConn;

use crate::service::tag::TagService;

#[derive(Debug, Default)]
pub struct TagQuery;

#[Object]
impl TagQuery {
    async fn tags(&self, ctx: &Context<'_>) -> Result<Vec<Model>> {
        let db = ctx.data::<DbConn>()?;
        let res = TagService::find_all(db).await?;
        Ok(res)
    }
}
