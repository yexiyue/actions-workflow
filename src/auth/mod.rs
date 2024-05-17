mod oauth;
use axum::{
    routing::{get, post},
    Router,
};
pub use oauth::OAuth;

use crate::AppState;
mod handler;

pub fn auth_router() -> Router<AppState> {
    Router::new()
        .route("/login", get(handler::login))
        .route("/authorized", post(handler::authorized))
        .route("/refresh", post(handler::refresh))
}
