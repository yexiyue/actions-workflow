use anyhow::anyhow;
use async_graphql::{ErrorExtensions, Guard, Result, ResultExt};
use axum::http::StatusCode;
use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};
use shuttle_runtime::SecretStore;
use std::sync::Arc;

use crate::{error::AppError, jwt::Claims};

// 验证用户是否登录
pub struct AuthGuard;

impl Guard for AuthGuard {
    async fn check(&self, ctx: &async_graphql::Context<'_>) -> Result<()> {
        let header_token = ctx.data_opt::<TypedHeader<Authorization<Bearer>>>();
        let secret_store = ctx.data::<Arc<SecretStore>>()?;
        let secret = secret_store
            .get("JWT_SECRET")
            .ok_or(anyhow!("JWT_SECRET not found"))?;

        if let Some(token) = header_token {
            Claims::decode(token.token(), secret.as_ref())
                .map_err(|e| match e.kind() {
                    jsonwebtoken::errors::ErrorKind::ExpiredSignature => {
                        AppError(StatusCode::UNAUTHORIZED, anyhow!("token expired"))
                    }
                    _ => AppError(StatusCode::UNAUTHORIZED, anyhow!("invalid token")),
                })
                .extend()?;
        } else {
            return Err(AppError(StatusCode::UNAUTHORIZED, anyhow!("Unauthorized")).extend());
        }
        Ok(())
    }
}
