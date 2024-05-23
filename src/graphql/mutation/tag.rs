use crate::{entity::tag::Model, service::tag::TagInput};
use async_graphql::{Context, Object, Result};
use sea_orm::DbConn;

use crate::{graphql::AdminGuard, service::tag::TagService};

#[derive(Debug, Default)]
pub struct TagMutation;

#[Object]
impl TagMutation {
    #[graphql(guard = "AdminGuard")]
    async fn create_tag(&self, ctx: &Context<'_>, tag: TagInput) -> Result<i32> {
        let db = ctx.data::<DbConn>()?;
        let res = TagService::create(db, tag).await?;
        Ok(res)
    }

    #[graphql(guard = "AdminGuard")]
    async fn update_tag(&self, ctx: &Context<'_>, id: i32, tag: TagInput) -> Result<Model> {
        let db = ctx.data::<DbConn>()?;
        let res = TagService::update_by_id(db, id, tag).await?;
        Ok(res)
    }

    #[graphql(guard = "AdminGuard")]
    async fn delete_tag(&self, ctx: &Context<'_>, id: i32) -> Result<String> {
        let db = ctx.data::<DbConn>()?;
        TagService::delete_by_id(db, id).await?;
        Ok("Delete Success".into())
    }
}
