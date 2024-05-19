use crate::{
    entity::{favorites, template::Model, user},
    graphql::AuthGuard,
    jwt::Claims,
    redis_keys::{gen_key, RedisKeys},
    service::{favorites::FavoritesService, template::TemplateService},
};
use async_graphql::{Context, MergedObject, Object, Result, SimpleObject};
use redis::{aio::MultiplexedConnection, AsyncCommands};
use sea_orm::DbConn;
use serde::Serialize;

#[derive(Debug, Default)]
pub struct TemplateQuery;

#[derive(Debug, Serialize, MergedObject)]
pub struct TemplateWithUser(user::Model, Model, TemplateFavorites);

#[derive(Debug, SimpleObject, Serialize)]
pub struct TemplateFavorites {
    pub favorites: Vec<favorites::Model>,
}

#[Object]
impl TemplateQuery {
    async fn templates(&self, ctx: &Context<'_>) -> Result<Vec<Model>> {
        let db = ctx.data::<DbConn>()?;
        let res = TemplateService::find_all(db).await?;
        Ok(res)
    }

    #[graphql(guard = "AuthGuard")]
    async fn favorite_templates(&self, ctx: &Context<'_>) -> Result<Vec<Option<Model>>> {
        let db = ctx.data::<DbConn>()?;
        let claims = ctx.data::<Claims>()?;
        Ok(TemplateService::find_user_favorites_template(db, claims.user_id).await?)
    }

    /// 通过ID获取模版详情
    async fn template_by_id(&self, ctx: &Context<'_>, id: i32) -> Result<Model> {
        let db = ctx.data::<DbConn>()?;
        Ok(TemplateService::find_by_id(db, id).await?)
    }

    async fn template_with_user(&self, ctx: &Context<'_>, id: i32) -> Result<TemplateWithUser> {
        let db = ctx.data::<DbConn>()?;
        let (template, user) = TemplateService::find_by_id_with_user(db, id).await?;
        let favorite = FavoritesService::find_template_favorite_users(db, template.id).await?;
        Ok(TemplateWithUser(
            user,
            template,
            TemplateFavorites {
                favorites: favorite,
            },
        ))
    }

    /// 需要权限
    #[graphql(guard = "AuthGuard")]
    async fn templates_by_user(&self, ctx: &Context<'_>) -> Result<Vec<Model>> {
        let db = ctx.data::<DbConn>()?;
        let claims = ctx.data::<Claims>()?;
        Ok(TemplateService::find_all_by_user_id(db, claims.user_id, None).await?)
    }

    /// 获取用户模版列表，不需要权限，但只能看到未公开的
    async fn templates_by_user_id(&self, ctx: &Context<'_>, user_id: i32) -> Result<Vec<Model>> {
        let db = ctx.data::<DbConn>()?;
        Ok(TemplateService::find_all_by_user_id(db, user_id, Some(true)).await?)
    }

    /// 获取模版下载次数
    async fn template_download_count(&self, ctx: &Context<'_>, id: i32) -> Result<i32> {
        let coon = ctx.data::<MultiplexedConnection>()?;
        let mut redis = coon.clone();
        let res = redis
            .hget(RedisKeys::TemplateDownloads, id)
            .await
            .unwrap_or(0);
        Ok(res)
    }

    /// 获取模版收藏次数
    async fn template_favorite_count(&self, ctx: &Context<'_>, id: i32) -> Result<i32> {
        let coon = ctx.data::<MultiplexedConnection>()?;
        let mut redis = coon.clone();
        let res: i32 = redis
            .hget(RedisKeys::TemplateFavorites, id)
            .await
            .unwrap_or(0);
        Ok(res)
    }
}
