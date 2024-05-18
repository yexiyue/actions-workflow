use crate::entity::category::Model;
use crate::service::category::CategoryService;
use async_graphql::{Context, Object, Result};
use sea_orm::DbConn;

#[derive(Debug, Default)]
pub struct CategoryQuery;

#[Object]
impl CategoryQuery {
    async fn categories(&self, ctx: &Context<'_>) -> Result<Vec<Model>> {
        let db = ctx.data::<DbConn>()?;
        let res = CategoryService::find_all(db).await?;
        Ok(res)
    }
}
