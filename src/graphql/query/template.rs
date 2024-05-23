use crate::{
    entity::{category, favorites, tag, template::Model, user},
    graphql::AuthGuard,
    jwt::Claims,
    redis_keys::RedisKeys,
    service::{
        favorites::FavoritesService, template::TemplateService, template_tag::TemplateTagService,
        Pagination,
    },
};
use async_graphql::{Context, MergedObject, Object, Result, SimpleObject};
use redis::{aio::MultiplexedConnection, AsyncCommands};
use sea_orm::DbConn;
use serde::Serialize;

#[derive(Debug, Default)]
pub struct TemplateQuery;

#[derive(Debug, Serialize, MergedObject)]
pub struct TemplateWithUser(
    user::Model,
    Model,
    TemplateFavorites,
    TemplateCategory,
    TemplateTags,
);

#[derive(Debug, SimpleObject, Serialize)]
pub struct TemplateFavorites {
    pub favorites: Vec<favorites::Model>,
}

#[derive(Debug, SimpleObject, Serialize)]
pub struct TemplateCategory {
    pub category: category::Model,
}

#[derive(Debug, SimpleObject, Serialize)]
pub struct TemplateTags {
    pub tags: Vec<tag::Model>,
}

#[derive(Debug, SimpleObject, Serialize)]
pub struct TemplatesWithPagination {
    templates: Vec<Model>,
    total: u64,
}

#[derive(Debug, SimpleObject, Serialize)]
pub struct UserTemplatesAllCount {
    all_count: u64,
}

#[derive(Debug, Serialize, MergedObject)]
pub struct UserTemplates(TemplatesWithPagination, UserTemplatesAllCount);
#[Object]
impl TemplateQuery {
    /// 分页查找模版
    async fn templates_with_pagination(
        &self,
        ctx: &Context<'_>,
        category_id: Option<i32>,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<TemplatesWithPagination> {
        let db = ctx.data::<DbConn>()?;
        let (templates, total) =
            TemplateService::find_all(db, category_id, pagination, search, Some(true)).await?;
        Ok(TemplatesWithPagination { templates, total })
    }

    #[graphql(guard = "AuthGuard")]
    async fn favorite_templates(
        &self,
        ctx: &Context<'_>,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<UserTemplates> {
        let db = ctx.data::<DbConn>()?;

        let claims = ctx.data::<Claims>()?;

        let (all_count, total, templates) =
            TemplateService::find_user_favorites_template(db, claims.user_id, pagination, search)
                .await?;

        Ok(UserTemplates(
            TemplatesWithPagination { templates, total },
            UserTemplatesAllCount { all_count },
        ))
    }

    /// 通过ID获取模版详情
    async fn template_by_id(&self, ctx: &Context<'_>, id: i32) -> Result<Model> {
        let db = ctx.data::<DbConn>()?;
        Ok(TemplateService::find_by_id(db, id).await?)
    }

    async fn template_with_user(&self, ctx: &Context<'_>, id: i32) -> Result<TemplateWithUser> {
        let db = ctx.data::<DbConn>()?;
        let (template, user, category) = TemplateService::find_by_id_with_user(db, id).await?;
        let favorites = FavoritesService::find_template_favorite_users(db, template.id).await?;
        let tags = TemplateTagService::find_tags_for_template(db, template.id).await?;
        Ok(TemplateWithUser(
            user,
            template,
            TemplateFavorites { favorites },
            TemplateCategory { category },
            TemplateTags { tags },
        ))
    }

    async fn template_tags(&self, ctx: &Context<'_>, id: i32) -> Result<Vec<tag::Model>> {
        let db = ctx.data::<DbConn>()?;
        Ok(TemplateTagService::find_tags_for_template(db, id).await?)
    }

    /// 需要权限
    #[graphql(guard = "AuthGuard")]
    async fn templates_by_user(
        &self,
        ctx: &Context<'_>,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<UserTemplates> {
        let db = ctx.data::<DbConn>()?;
        let claims = ctx.data::<Claims>()?;
        let (all_count, total, templates) =
            TemplateService::find_all_by_user_id(db, claims.user_id, pagination, search, None)
                .await?;
        Ok(UserTemplates(
            TemplatesWithPagination { templates, total },
            UserTemplatesAllCount { all_count },
        ))
    }

    /// 获取用户模版列表，不需要权限，但只能看到未公开的
    async fn templates_by_user_id(
        &self,
        ctx: &Context<'_>,
        user_id: i32,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<UserTemplates> {
        let db = ctx.data::<DbConn>()?;
        let (all_count, total, templates) =
            TemplateService::find_all_by_user_id(db, user_id, pagination, search, Some(true))
                .await?;
        Ok(UserTemplates(
            TemplatesWithPagination { templates, total },
            UserTemplatesAllCount { all_count },
        ))
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
    async fn template_favorite_count(&self, ctx: &Context<'_>, id: i32) -> Result<u64> {
        let db = ctx.data::<DbConn>()?;
        Ok(FavoritesService::find_template_favorite_users_count(db, id).await?)
    }
}
