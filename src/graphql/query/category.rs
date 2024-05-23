use crate::service::category::CategoryService;
use crate::{entity::category::Model, service::Pagination};
use async_graphql::{Context, Object, Result, SimpleObject};
use sea_orm::DbConn;

#[derive(Debug, Default)]
pub struct CategoryQuery;

#[derive(Debug, SimpleObject)]
pub struct CategoryWithPagination {
    categories: Vec<Model>,
    total: u64,
    all_count: u64,
}

#[Object]
impl CategoryQuery {
    async fn categories(
        &self,
        ctx: &Context<'_>,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<CategoryWithPagination> {
        let db = ctx.data::<DbConn>()?;
        let (all_count, total, categories) =
            CategoryService::find_all(db, pagination, search).await?;

        Ok(CategoryWithPagination {
            categories,
            total,
            all_count,
        })
    }
}
