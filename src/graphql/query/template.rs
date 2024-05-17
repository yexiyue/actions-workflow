use async_graphql::{Context, Object, Result};
use sea_orm::DbConn;

use crate::{
    entity::template::Model, graphql::AuthGuard, jwt::Claims, service::template::TemplateService,
};

#[derive(Debug, Default)]
pub struct TemplateQuery;

#[Object]
impl TemplateQuery {
    async fn templates(&self, ctx: &Context<'_>) -> Result<Vec<Model>> {
        let db = ctx.data::<DbConn>()?;
        let res = TemplateService::find_all(db).await?;
        Ok(res)
    }

    /// 通过ID获取模版详情
    async fn template_by_id(&self, ctx: &Context<'_>, id: i32) -> Result<Option<Model>> {
        let db = ctx.data::<DbConn>()?;
        Ok(TemplateService::find_by_id(db, id).await?)
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
}
