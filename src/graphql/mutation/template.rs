use crate::{
    entity::template::Model,
    graphql::AuthGuard,
    jwt::Claims,
    redis_keys::{gen_key, RedisKeys},
    service::{
        template::{TemplateCreateInput, TemplateService, TemplateUpdateInput},
        template_tag::{TemplateTagInput, TemplateTagService},
    },
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
            .incr(gen_key(RedisKeys::TemplateDownloads, id), 1)
            .await?;
        Ok("ok")
    }

    /// 添加标签
    #[graphql(guard = "AuthGuard")]
    async fn update_tags(
        &self,
        ctx: &Context<'_>,
        input: TemplateTagInput,
    ) -> Result<&'static str> {
        let db = ctx.data::<DbConn>()?;
        let claims = ctx.data::<Claims>()?;
        let template = TemplateService::find_by_id(db, input.template_id).await?;
        if template.user_id != claims.user_id {
            return Err(async_graphql::Error::new("not your template"));
        }
        TemplateTagService::create(db, input).await?;
        Ok("ok")
    }
}
