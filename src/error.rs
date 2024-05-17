use async_graphql::ErrorExtensions;
use axum::{http::StatusCode, response::IntoResponse, Json};
use serde_json::json;

pub struct AppError(pub StatusCode, pub anyhow::Error);

impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        let value = json!({
            "code": self.0.as_u16(),
            "error": self.1.to_string(),
        });
        (self.0, Json(value)).into_response()
    }
}

impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(StatusCode::INTERNAL_SERVER_ERROR, err.into())
    }
}

impl AppError {
    pub fn format_err_code<T>(code: StatusCode) -> impl Fn(T) -> AppError
    where
        T: Into<anyhow::Error>,
    {
        let map_fn = move |err: T| -> AppError { AppError(code, err.into()) };
        map_fn
    }
}

impl ErrorExtensions for AppError {
    fn extend(&self) -> async_graphql::Error {
        self.1.extend_with(|_, e| e.set("code", self.0.as_u16()))
    }
}
