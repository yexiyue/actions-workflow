use anyhow::{anyhow, Context, Result};
use axum::{
    async_trait,
    extract::FromRequestParts,
    http::{request::Parts, StatusCode},
    RequestPartsExt,
};

use axum_extra::{
    headers::{authorization::Bearer, Authorization},
    TypedHeader,
};
use jsonwebtoken::{Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

use crate::{error::AppError, AppState};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub exp: i64,
    pub user_id: i32,
}

impl Claims {
    pub fn new(user_id: i32) -> Self {
        // 8小时过期时间
        let exp = chrono::Utc::now().timestamp() + 28800;
        Self { exp, user_id }
    }

    pub fn encode(&self, secret: &str) -> Result<String> {
        let res = jsonwebtoken::encode(
            &Header::default(),
            &self,
            &EncodingKey::from_secret(secret.as_ref()),
        )
        .with_context(|| "encode jwt error")?;
        Ok(res)
    }

    pub fn decode(token: &str, secret: &str) -> Result<Self, jsonwebtoken::errors::Error> {
        let res = jsonwebtoken::decode(
            token,
            &DecodingKey::from_secret(secret.as_ref()),
            &Validation::new(Algorithm::HS256),
        )?;
        Ok(res.claims)
    }
}

#[async_trait]
impl FromRequestParts<AppState> for Claims {
    type Rejection = AppError;
    async fn from_request_parts(
        parts: &mut Parts,
        state: &AppState,
    ) -> Result<Self, Self::Rejection> {
        let token = parts
            .extract::<TypedHeader<Authorization<Bearer>>>()
            .await?;

        let secret = state
            .secret_store
            .get("JWT_SECRET")
            .ok_or(anyhow!("JWT_SECRET not found"))?;

        let res = Claims::decode(token.token(), secret.as_ref()).map_err(|e| match e.kind() {
            jsonwebtoken::errors::ErrorKind::ExpiredSignature => {
                AppError::format_err_code(StatusCode::UNAUTHORIZED)(anyhow!("token expired"))
            }
            _ => AppError::format_err_code(StatusCode::UNAUTHORIZED)(anyhow!("invalid token")),
        })?;

        Ok(res)
    }
}
