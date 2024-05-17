use async_graphql::MergedObject;

mod category;
mod tag;
mod template;
mod user;

use category::CategoryQuery;
use template::TemplateQuery;
use user::UserQuery;

#[derive(Debug, MergedObject, Default)]
pub struct Query(UserQuery, CategoryQuery, TemplateQuery);
