use anyhow::anyhow;
use async_graphql::{ErrorExtensions, Guard, Result};
use axum::http::StatusCode;

use crate::{error::AppError, jwt::Claims};

// 验证用户是否登录
pub struct AuthGuard;

impl Guard for AuthGuard {
    async fn check(&self, ctx: &async_graphql::Context<'_>) -> Result<()> {
        let claims = ctx.data_opt::<Claims>();
        if claims.is_none() {
            return Err(AppError(StatusCode::FORBIDDEN, anyhow!("Unauthorized")).extend());
        }
        Ok(())
    }
}
