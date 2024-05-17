use anyhow::anyhow;
use async_graphql::{ErrorExtensions, Guard, Result};
use axum::http::StatusCode;

use crate::{error::AppError, jwt::Claims};

// 验证用户是否登录
pub struct AdminGuard;

impl Guard for AdminGuard {
    async fn check(&self, ctx: &async_graphql::Context<'_>) -> Result<()> {
        let claims = ctx.data_opt::<Claims>();
        // tracing::info!("claims: {:?}", claims);
        if claims.is_none() {
            return Err(AppError(StatusCode::UNAUTHORIZED, anyhow!("Unauthorized")).extend());
        } else if claims.unwrap().user_id != 72074435 {
            return Err(AppError(StatusCode::FORBIDDEN, anyhow!("Forbidden")).extend());
        }
        Ok(())
    }
}
