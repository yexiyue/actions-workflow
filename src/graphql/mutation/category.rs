use crate::{entity::category::Model, service::category::CategoryInput};
use async_graphql::{Context, Object, Result};
use sea_orm::DbConn;

use crate::{graphql::AdminGuard, service::category::CategoryService};

#[derive(Debug, Default)]
pub struct CategoryMutation;

#[Object]
impl CategoryMutation {
    #[graphql(guard = "AdminGuard")]
    async fn create_category(&self, ctx: &Context<'_>, category: CategoryInput) -> Result<i32> {
        let db = ctx.data::<DbConn>()?;
        let res = CategoryService::create(db, category).await?;
        Ok(res)
    }

    #[graphql(guard = "AdminGuard")]
    async fn update_category(
        &self,
        ctx: &Context<'_>,
        id: i32,
        category: CategoryInput,
    ) -> Result<Model> {
        let db = ctx.data::<DbConn>()?;
        let res = CategoryService::update_by_id(db, id, category.into()).await?;
        Ok(res)
    }

    #[graphql(guard = "AdminGuard")]
    async fn delete_category(&self, ctx: &Context<'_>, id: i32) -> Result<String> {
        let db = ctx.data::<DbConn>()?;
        CategoryService::delete_by_id(db, id).await?;
        Ok("Delete Success".into())
    }
}
