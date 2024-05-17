use crate::{
    entity::template::Model,
    graphql::AuthGuard,
    service::template::{TemplateCreateInput, TemplateService, TemplateUpdateInput},
};
use async_graphql::{Context, Object, Result};
use sea_orm::DbConn;

#[derive(Debug, Default)]
pub struct TemplateMutation;

#[Object]
impl TemplateMutation {
    #[graphql(guard = "AuthGuard")]
    async fn create_template(&self, ctx: &Context<'_>, input: TemplateCreateInput) -> Result<i32> {
        let db = ctx.data::<DbConn>()?;
        Ok(TemplateService::create(db, input).await?)
    }

    #[graphql(guard = "AuthGuard")]
    async fn update_template(
        &self,
        ctx: &Context<'_>,
        id: i32,
        input: TemplateUpdateInput,
    ) -> Result<Model> {
        let db = ctx.data::<DbConn>()?;
        Ok(TemplateService::update_by_id(db, id, input).await?)
    }
}
