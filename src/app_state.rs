use axum::extract::FromRef;
use axum_extra::extract::cookie::Key;
use graphql::{build_schema, AppSchema};
use reqwest::Client;
use sea_orm::DbConn;
use shuttle_runtime::SecretStore;
use std::sync::Arc;

use crate::{auth, graphql};

#[derive(Clone)]
pub(crate) struct AppState {
    pub coon: DbConn,
    pub auth: auth::OAuth,
    pub req: Client,
    pub secret_store: Arc<SecretStore>,
    pub key: Key,
    pub schema: AppSchema,
    pub redis: redis::aio::MultiplexedConnection,
}

impl FromRef<AppState> for Key {
    fn from_ref(state: &AppState) -> Self {
        state.key.clone()
    }
}
impl FromRef<AppState> for Client {
    fn from_ref(state: &AppState) -> Self {
        state.req.clone()
    }
}

impl FromRef<AppState> for DbConn {
    fn from_ref(state: &AppState) -> Self {
        state.coon.clone()
    }
}

impl AppState {
    pub fn new(
        coon: DbConn,
        auth: auth::OAuth,
        secret_store: SecretStore,
        redis: redis::aio::MultiplexedConnection,
    ) -> Self {
        Self {
            coon,
            auth,
            req: Client::new(),
            secret_store: Arc::new(secret_store),
            key: Key::generate(),
            schema: build_schema(),
            redis,
        }
    }
}
