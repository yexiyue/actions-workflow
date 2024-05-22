use async_graphql::InputObject;
use serde::{Deserialize, Serialize};

pub mod category;
pub mod comment;
pub mod favorites;
pub mod tag;
pub mod template;
pub mod template_tag;
pub mod user;

#[derive(Debug, Serialize, InputObject, Deserialize)]
pub struct Pagination {
    pub page_size: u64,
    pub page: u64,
}
