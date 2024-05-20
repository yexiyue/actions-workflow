use crate::entity::prelude::Favorites;
use crate::entity::prelude::{Category, Template};
use crate::entity::template::{ActiveModel, Column, Model};
use crate::entity::{category, user};
use crate::service::user::UserService;
use anyhow::Result;
use async_graphql::InputObject;
use sea_orm::*;
use serde::{Deserialize, Serialize};

pub struct TemplateService;

#[derive(Debug, Serialize, Deserialize, InputObject)]
pub struct TemplateCreateInput {
    pub name: String,
    pub config: serde_json::Value,
    pub template: String,
    pub user_id: i32,
    pub category_id: Option<i32>,
    pub readme: Option<String>,
    pub source_code_url: Option<String>,
}

impl IntoActiveModel<ActiveModel> for TemplateCreateInput {
    fn into_active_model(self) -> ActiveModel {
        ActiveModel {
            name: Set(self.name),
            config: Set(self.config.to_string()),
            template: Set(self.template),
            user_id: Set(self.user_id),
            category_id: Set(self.category_id.unwrap_or(1)),
            readme: Set(self.readme),
            source_code_url: Set(self.source_code_url),
            is_public: Set(false),
            ..Default::default()
        }
    }
}

#[derive(Debug, Serialize, InputObject, Deserialize)]
pub struct Pagination {
    page_size: u64,
    page: u64,
}

#[derive(Debug, Serialize, Deserialize, InputObject)]
pub struct TemplateUpdateInput {
    pub name: String,
    pub config: serde_json::Value,
    pub template: String,
    pub category_id: i32,
    pub readme: Option<String>,
    pub source_code_url: Option<String>,
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
    ) -> Result<(Vec<Model>, u64)> {
        let mut select = Template::find();
        if let Some(category_id) = category_id {
            select = select.filter(Column::CategoryId.eq(category_id));
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
        is_public: Option<bool>,
    ) -> Result<Vec<Model>> {
        let mut select = Template::find().filter(Column::UserId.eq(user_id));
        if is_public.is_some() {
            select = select.filter(Column::IsPublic.eq(is_public.unwrap()));
        }
        let res = select.all(db).await?;
        Ok(res)
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

        active_model.name = Set(model.name);
        active_model.config = Set(model.config.to_string());
        active_model.template = Set(model.template);
        active_model.category_id = Set(model.category_id);
        active_model.readme = Set(model.readme);
        active_model.source_code_url = Set(model.source_code_url);

        let res = active_model.update(db).await?;

        Ok(res)
    }

    pub async fn find_user_favorites_template(
        db: &DbConn,
        user_id: i32,
    ) -> Result<Vec<Option<Model>>> {
        if let Some(user) = UserService::find_by_id(db, user_id).await? {
            let favorites = user.find_related(Favorites).all(db).await?;
            let res = favorites.load_one(Template, db).await?;
            Ok(res)
        } else {
            Err(DbErr::RecordNotFound("user not found".into()).into())
        }
    }
}
