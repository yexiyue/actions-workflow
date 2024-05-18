use crate::{
    entity::template::Model,
    graphql::AuthGuard,
    jwt::Claims,
    redis_keys::gen_key,
    service::template::{TemplateCreateInput, TemplateService, TemplateUpdateInput},
};
use async_graphql::{Context, Object, Result};
use redis::{aio::MultiplexedConnection, AsyncCommands};
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

    #[graphql(guard = "AuthGuard")]
    async fn delete_template(&self, ctx: &Context<'_>, id: i32) -> Result<&'static str> {
        let db = ctx.data::<DbConn>()?;
        let claims = ctx.data::<Claims>()?;
        TemplateService::delete_by_id(db, id, claims.user_id).await?;
        Ok("success")
    }

    async fn increase_download_count(&self, ctx: &Context<'_>, id: i32) -> Result<&'static str> {
        let redis = ctx.data::<MultiplexedConnection>()?;
        let mut redis = redis.clone();
        redis
            .incr(
                gen_key(crate::redis_keys::RedisKeys::TemplateDownloads, id),
                1,
            )
            .await?;
        Ok("ok")
    }
}
