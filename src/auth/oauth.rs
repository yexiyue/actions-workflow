use anyhow::{Context, Result};
use axum::{
    async_trait,
    extract::{FromRef, FromRequestParts},
};
use oauth2::{
    basic::{BasicClient, BasicTokenType},
    reqwest::async_http_client,
    AuthUrl, AuthorizationCode, ClientId, ClientSecret, CsrfToken, EmptyExtraTokenFields,
    RedirectUrl, RefreshToken, Scope, StandardTokenResponse, TokenUrl,
};
use reqwest::Url;
use std::sync::Arc;

use crate::AppState;

#[derive(Debug, Clone)]
pub struct OAuth {
    client: Arc<BasicClient>,
}

impl FromRef<AppState> for OAuth {
    fn from_ref(input: &AppState) -> Self {
        input.auth.clone()
    }
}

#[async_trait]
impl<S> FromRequestParts<S> for OAuth
where
    OAuth: FromRef<S>,
    S: Send + Sync,
{
    type Rejection = ();
    async fn from_request_parts(
        _parts: &mut axum::http::request::Parts,
        state: &S,
    ) -> Result<Self, Self::Rejection> {
        let auth = OAuth::from_ref(state);
        Ok(auth)
    }
}

impl OAuth {
    // 初始化
    pub fn new(client_id: &str, client_secret: &str, redirect_url: &str) -> Result<Self> {
        let redirect_url = RedirectUrl::new(redirect_url.to_string())?;
        let auth_url = AuthUrl::new("https://github.com/login/oauth/authorize".to_string())
            .context("Invalid authorization endpoint URL")?;
        let token_url = TokenUrl::new("https://github.com/login/oauth/access_token".to_string())
            .context("Invalid token endpoint URL")?;
        let client = BasicClient::new(
            ClientId::new(client_id.to_string()),
            Some(ClientSecret::new(client_secret.to_string())),
            auth_url,
            Some(token_url),
        )
        .set_redirect_uri(redirect_url);

        Ok(Self {
            client: Arc::new(client),
        })
    }

    // 生成授权链接
    pub fn generate_oauth_url(&self) -> (Url, CsrfToken) {
        self.client
            .authorize_url(CsrfToken::new_random)
            .add_scope(Scope::new("public_repo".to_string()))
            .add_scope(Scope::new("user:email".to_string()))
            .url()
    }

    // 使用授权码交换令牌
    pub async fn exchange_code(
        &self,
        code: String,
    ) -> Result<StandardTokenResponse<EmptyExtraTokenFields, BasicTokenType>> {
        Ok(self
            .client
            .exchange_code(AuthorizationCode::new(code.clone()))
            .request_async(async_http_client)
            .await?)
    }

    // 刷新令牌
    pub async fn refresh_token(
        &self,
        refresh_token: String,
    ) -> Result<StandardTokenResponse<EmptyExtraTokenFields, BasicTokenType>> {
        let refresh_token = RefreshToken::new(refresh_token);
        let res = self
            .client
            .exchange_refresh_token(&refresh_token)
            .request_async(async_http_client)
            .await?;
        Ok(res)
    }
}
