use super::OAuth;
use crate::{error::AppError, jwt::Claims, service::user::UserService, AppState};
use anyhow::{Context, Result};
use axum::{
    extract::State,
    http::{header, HeaderMap},
    response::IntoResponse,
    Json,
};
use axum_extra::extract::cookie::{Cookie, PrivateCookieJar, SameSite};
use oauth2::TokenResponse;
use serde::{Deserialize, Serialize};
use serde_json::json;

pub async fn login(oauth: OAuth, jar: PrivateCookieJar) -> impl IntoResponse {
    let (url, csrf_token) = oauth.generate_oauth_url();
    let cookie = Cookie::build(("csrf_token", csrf_token.secret().to_string()))
        .same_site(SameSite::Lax)
        .secure(true)
        .http_only(true)
        .build();
    (jar.add(cookie), Json(json!({"url": url})))
}

#[derive(Deserialize, Serialize)]
pub struct AuthorizedParams {
    code: String,
    state: String,
}

pub async fn authorized(
    State(AppState {
        req,
        coon,
        secret_store,
        ..
    }): State<AppState>,
    header: HeaderMap,
    oauth: OAuth,
    Json(AuthorizedParams { code, .. }): Json<AuthorizedParams>,
) -> Result<impl IntoResponse, AppError> {
    let user_agent = header.get(header::USER_AGENT).unwrap();
    // 交换获取access_token
    let res = oauth.exchange_code(code).await?;
    let access_token = res.access_token().secret();
    let refresh_token = res
        .refresh_token()
        .expect("refresh token not found")
        .secret();

    // 使用获取的access_token获取用户信息
    let user: serde_json::Value = req
        .get("https://api.github.com/user")
        .bearer_auth(access_token)
        .header(reqwest::header::USER_AGENT, user_agent.to_str().unwrap())
        .send()
        .await?
        .json()
        .await?;
    let user_id = user["id"].as_i64().unwrap();
    let username = user["login"].as_str().unwrap();
    let avatar_url = user["avatar_url"].as_str().unwrap();

    // 如果用户不存在就创建
    let user = UserService::create_or_find(
        &coon,
        crate::entity::user::Model {
            id: user_id as i32,
            username: username.to_owned(),
            avatar_url: avatar_url.to_owned(),
            create_at: None,
        },
    )
    .await?;

    // 获取jwt密钥
    let jwt_secret = secret_store
        .get("JWT_SECRET")
        .with_context(|| "get jwt secret error")?;

    // 生成jwt token
    let token = Claims::new(user_id as i32).encode(&jwt_secret)?;

    Ok(Json(json!({
        "token":token,
        "user":user,
        "access_token":access_token,
        "refresh_token":refresh_token,
    })))
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RefreshArgs {
    pub id: i32,
    pub refresh_token: String,
}

pub async fn refresh(
    State(AppState { secret_store, .. }): State<AppState>,
    oauth: OAuth,
    Json(RefreshArgs {
        refresh_token: token,
        id,
    }): Json<RefreshArgs>,
) -> Result<impl IntoResponse, AppError> {
    let res = oauth.refresh_token(token).await?;
    let access_token = res.access_token().secret();
    let refresh_token = res
        .refresh_token()
        .expect("refresh token not found")
        .secret();

    // 获取jwt密钥
    let jwt_secret = secret_store
        .get("JWT_SECRET")
        .with_context(|| "get jwt secret error")?;

    let token = Claims::new(id).encode(&jwt_secret)?;

    Ok(Json(json!({
        "token":token,
        "access_token":access_token,
        "refresh_token":refresh_token,
    })))
}
