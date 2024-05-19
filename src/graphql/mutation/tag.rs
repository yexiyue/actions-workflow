use crate::entity::tag::Model;
use async_graphql::{Context, Description, InputObject, Object, Result};
use sea_orm::DbConn;
use serde::Serialize;

use crate::{graphql::AdminGuard, service::tag::TagService};

#[derive(Debug, Default)]
pub struct TagMutation;

#[derive(Debug, Serialize, Description, InputObject)]
pub struct TagInput {
    name: String,
    description: String,
}

#[allow(clippy::all)]
impl Into<Model> for TagInput {
    fn into(self) -> Model {
        Model {
            id: 0,
            name: self.name,
            description: self.description,
        }
    }
}

#[Object]
impl TagMutation {
    #[graphql(guard = "AdminGuard")]
    async fn create_tag(&self, ctx: &Context<'_>, tag: TagInput) -> Result<Model> {
        let db = ctx.data::<DbConn>()?;
        let res = TagService::create(db, tag.into()).await?;
        Ok(res)
    }

    #[graphql(guard = "AdminGuard")]
    async fn update_tag(&self, ctx: &Context<'_>, id: i32, tag: TagInput) -> Result<Model> {
        let db = ctx.data::<DbConn>()?;
        let res = TagService::update_by_id(db, id, tag.into()).await?;
        Ok(res)
    }

    #[graphql(guard = "AdminGuard")]
    async fn delete_tag(&self, ctx: &Context<'_>, id: i32) -> Result<String> {
        let db = ctx.data::<DbConn>()?;
        TagService::delete_by_id(db, id).await?;
        Ok("Delete Success".into())
    }
}
