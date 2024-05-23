use anyhow::Result;
use auth::{auth_router, OAuth};
use axum::{routing::post, Router};
use graphql::{graphiql, graphql_handler};
use sea_orm::DbConn;
use shuttle_runtime::SecretStore;
use std::time::Duration;
mod app_state;
mod auth;
mod entity;
mod error;
mod graphql;
mod jwt;
mod service;
use app_state::AppState;
use tower_http::{
    compression::CompressionLayer,
    cors::CorsLayer,
    request_id::{MakeRequestUuid, PropagateRequestIdLayer, SetRequestIdLayer},
    timeout::TimeoutLayer,
};
mod redis_keys;

pub async fn build_root_router(coon: DbConn, secret_store: SecretStore) -> Result<Router> {
    let client_id = secret_store.get("OAUTH_CLIENT_ID").unwrap();
    let client_secret = secret_store.get("OAUTH_CLIENT_SECRET").unwrap();
    let auth = OAuth::new(&client_id, &client_secret, "http://localhost:5173/auth")?;
    let redis_url = secret_store.get("REDIS_URL").unwrap();
    let client = redis::Client::open(redis_url).unwrap();
    let con: redis::aio::MultiplexedConnection =
        client.get_multiplexed_async_connection().await.unwrap();
    let app_state = AppState::new(coon, auth, secret_store, con);

    let router = Router::new()
        .route("/api/graphql", post(graphql_handler).get(graphiql))
        .nest("/api", auth_router())
        .with_state(app_state.clone())
        .layer(CompressionLayer::new().gzip(true))
        .layer(PropagateRequestIdLayer::x_request_id())
        .layer(SetRequestIdLayer::x_request_id(MakeRequestUuid))
        .layer(TimeoutLayer::new(Duration::from_secs(10)))
        .layer(CorsLayer::permissive());
    Ok(router)
}
