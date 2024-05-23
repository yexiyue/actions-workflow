use crate::entity::prelude::Favorites;
use crate::entity::prelude::{Category, Template};
use crate::entity::template::{ActiveModel, Column, Model};
use crate::entity::{category, user};
use crate::service::user::UserService;
use anyhow::Result;
use async_graphql::InputObject;

use sea_orm::*;
use serde::{Deserialize, Serialize};

use super::Pagination;

pub struct TemplateService;

#[derive(Debug, Serialize, Deserialize, InputObject)]
pub struct TemplateCreateInput {
    pub name: String,
    pub config: serde_json::Value,
    pub template: String,
    pub user_id: i32,
    pub category_id: i32,
    pub readme: Option<String>,
    pub source_code_url: Option<String>,
    pub is_public: bool,
}

impl IntoActiveModel<ActiveModel> for TemplateCreateInput {
    fn into_active_model(self) -> ActiveModel {
        ActiveModel {
            name: Set(self.name),
            config: Set(self.config.to_string()),
            template: Set(self.template),
            user_id: Set(self.user_id),
            category_id: Set(self.category_id),
            readme: Set(self.readme),
            source_code_url: Set(self.source_code_url),
            is_public: Set(self.is_public),
            ..Default::default()
        }
    }
}

#[derive(Debug, Serialize, Deserialize, InputObject)]
pub struct TemplateUpdateInput {
    pub name: Option<String>,
    pub config: Option<serde_json::Value>,
    pub template: Option<String>,
    pub category_id: Option<i32>,
    pub readme: Option<String>,
    pub source_code_url: Option<String>,
    pub is_public: Option<bool>,
}

impl TemplateService {
    pub async fn create(db: &DbConn, model: TemplateCreateInput) -> Result<i32> {
        let active_model = model.into_active_model();

        let res = Template::insert(active_model).exec(db).await?;
        Ok(res.last_insert_id)
    }

    pub async fn delete_by_id(db: &DbConn, id: i32, user_id: i32) -> Result<()> {
        let template = Template::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Template not found".to_string()))?;
        if template.user_id != user_id {
            return Err(DbErr::RecordNotFound("Permission denied".to_string()).into());
        }

        let active_model = template.into_active_model();
        active_model.delete(db).await?;
        Ok(())
    }

    pub async fn find_all(
        db: &DbConn,
        category_id: Option<i32>,
        pagination: Option<Pagination>,
        search: Option<String>,
        is_public: Option<bool>,
    ) -> Result<(Vec<Model>, u64)> {
        let mut select = Template::find().order_by_desc(Column::CreateAt);

        if let Some(category_id) = category_id {
            select = select.filter(Column::CategoryId.eq(category_id));
        }

        if let Some(search) = search {
            select = select.filter(Column::Name.like(format!("%{}%", search)));
        }

        if let Some(is_public) = is_public {
            select = select.filter(Column::IsPublic.eq(is_public));
        }

        let count = select.clone().count(db).await?;
        let res = if let Some(Pagination { page_size, page }) = pagination {
            select.paginate(db, page_size).fetch_page(page).await?
        } else {
            select.all(db).await?
        };

        Ok((res, count))
    }

    pub async fn find_all_by_user_id(
        db: &DbConn,
        user_id: i32,
        pagination: Option<Pagination>,
        search: Option<String>,
        is_public: Option<bool>,
    ) -> Result<(u64, u64, Vec<Model>)> {
        let mut select = Template::find()
            .filter(Column::UserId.eq(user_id))
            .order_by_desc(Column::CreateAt);

        if let Some(is_public) = is_public {
            select = select.filter(Column::IsPublic.eq(is_public));
        }

        let all_count = select.clone().count(db).await?;

        if let Some(search) = search {
            select = select.filter(Column::Name.like(format!("%{}%", search)));
        }

        let count = select.clone().count(db).await?;
        let res = if let Some(Pagination { page_size, page }) = pagination {
            select.paginate(db, page_size).fetch_page(page).await?
        } else {
            select.all(db).await?
        };

        Ok((all_count, count, res))
    }

    pub async fn find_by_id(db: &DbConn, id: i32) -> Result<Model> {
        let res = Template::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Template not found".into()))?;
        Ok(res)
    }

    pub async fn find_by_id_with_user(
        db: &DbConn,
        id: i32,
    ) -> Result<(Model, user::Model, category::Model)> {
        let res = Template::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Template not found".into()))?;
        let user = UserService::find_by_id(db, res.user_id).await?.unwrap();
        let category = res
            .find_related(Category)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Template not found".into()))?;
        Ok((res, user, category))
    }

    pub async fn update_by_id(db: &DbConn, id: i32, model: TemplateUpdateInput) -> Result<Model> {
        let mut active_model = Template::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Template not found".to_string()))?
            .into_active_model();
        if let Some(name) = model.name {
            active_model.name = Set(name);
        }
        if let Some(config) = model.config {
            active_model.config = Set(config.to_string());
        }
        if let Some(template) = model.template {
            active_model.template = Set(template);
        }
        if let Some(is_public) = model.is_public {
            active_model.is_public = Set(is_public);
        }
        if let Some(category_id) = model.category_id {
            active_model.category_id = Set(category_id);
        }
        if let Some(readme) = model.readme {
            active_model.readme = Set(Some(readme));
        }

        active_model.source_code_url = Set(model.source_code_url);
        let time = chrono::Utc::now();
        active_model.update_at = Set(Some(time.into()));
        let res = active_model.update(db).await?;

        Ok(res)
    }

    pub async fn find_user_favorites_template(
        db: &DbConn,
        user_id: i32,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<(u64, u64, Vec<Model>)> {
        if let Some(user) = UserService::find_by_id(db, user_id).await? {
            let mut select = user.find_related(Favorites).find_also_related(Template);
            let all_count = select.clone().count(db).await?;

            if let Some(search) = search {
                select = select.filter(Column::Name.like(format!("%{}%", search)));
            }

            let count = select.clone().count(db).await?;

            let favorites = if let Some(Pagination { page_size, page }) = pagination {
                select.paginate(db, page_size).fetch_page(page).await?
            } else {
                select.all(db).await?
            };

            let res = favorites
                .into_iter()
                .filter_map(|(_, template)| template)
                .collect();

            Ok((all_count, count, res))
        } else {
            Err(DbErr::RecordNotFound("user not found".into()).into())
        }
    }
}
