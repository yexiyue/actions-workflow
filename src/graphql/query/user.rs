use crate::entity::user::Model;
use crate::{graphql::AuthGuard, jwt::Claims, service::user::UserService};
use async_graphql::{Context, Object, Result};
use sea_orm::DbConn;

#[derive(Debug, Default)]
pub struct UserQuery;

#[Object]
impl UserQuery {
    #[graphql(guard = "AuthGuard")]
    async fn user(&self, ctx: &Context<'_>) -> Result<Model> {
        let db = ctx.data::<DbConn>()?;
        let claims = ctx.data::<Claims>()?;
        let res = UserService::find_by_id(db, claims.user_id)
            .await?
            .ok_or("Unauthorized and user don't exist")?;
        Ok(res)
    }

    async fn user_by_id(&self, ctx: &Context<'_>, id: i32) -> Result<Option<Model>> {
        let db = ctx.data::<DbConn>()?;
        let res = UserService::find_by_id(db, id).await?;
        Ok(res)
    }
}
