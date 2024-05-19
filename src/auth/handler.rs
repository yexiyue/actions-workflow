use super::OAuth;
use crate::{
    error::AppError,
    jwt::Claims,
    redis_keys::{gen_key, RedisKeys},
    service::user::UserService,
    AppState,
};
use anyhow::{Context, Result};
use axum::{
    extract::State,
    http::{header, HeaderMap},
    response::IntoResponse,
    Json,
};
use axum_extra::extract::cookie::{Cookie, PrivateCookieJar, SameSite};
use oauth2::TokenResponse;
use redis::AsyncCommands;
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
        ref mut redis,
        ..
    }): State<AppState>,
    header: HeaderMap,
    oauth: OAuth,
    Json(AuthorizedParams { code, .. }): Json<AuthorizedParams>,
) -> Result<impl IntoResponse, AppError> {
    // let csrf = jar
    //     .get("csrf_token")
    //     .ok_or(AppError::format_err_code(StatusCode::BAD_REQUEST)(anyhow!(
    //         "csrf token not found"
    //     )))?;

    // if state != csrf.value() {
    //     return Err(AppError(
    //         StatusCode::BAD_REQUEST,
    //         anyhow!("state does not match"),
    //     ));
    // }
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

    redis
        .hset_multiple(
            gen_key(RedisKeys::UserToken, user_id),
            &[
                ("access_token", access_token),
                ("refresh_token", refresh_token),
            ],
        )
        .await?;
    // 生成jwt token
    let token = Claims::new(user_id as i32).encode(&jwt_secret)?;

    Ok(Json(json!({
        "token":token,
        "user":user,
        "access_token":access_token,
    })))
}

pub async fn refresh(
    claims: Claims,
    State(AppState {
        secret_store,
        ref mut redis,
        ..
    }): State<AppState>,
    oauth: OAuth,
) -> Result<impl IntoResponse, AppError> {
    let r_token: String = redis
        .hget(
            gen_key(RedisKeys::UserToken, claims.user_id),
            "refresh_token",
        )
        .await?;

    let res = oauth.refresh_token(r_token).await?;
    let access_token = res.access_token().secret();
    let refresh_token = res
        .refresh_token()
        .expect("refresh token not found")
        .secret();

    // 获取jwt密钥
    let jwt_secret = secret_store
        .get("JWT_SECRET")
        .with_context(|| "get jwt secret error")?;

    redis
        .hset_multiple(
            gen_key(RedisKeys::UserToken, claims.user_id),
            &[
                ("access_token", access_token),
                ("refresh_token", refresh_token),
            ],
        )
        .await?;

    let token = Claims::new(claims.user_id).encode(&jwt_secret)?;

    Ok(Json(json!({
        "token":token,
    })))
}
