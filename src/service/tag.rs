use crate::entity::prelude::Tag;
use crate::entity::tag::{ActiveModel, Column, Model};
use anyhow::Result;
use async_graphql::{Description, InputObject};
use sea_orm::*;
use serde::Serialize;

use super::Pagination;

pub struct TagService;

#[derive(Debug, Serialize, Description, InputObject)]
pub struct TagInput {
    name: String,
    description: String,
}

impl IntoActiveModel<ActiveModel> for TagInput {
    fn into_active_model(self) -> ActiveModel {
        ActiveModel {
            name: Set(self.name),
            description: Set(self.description),
            ..Default::default()
        }
    }
}

impl TagService {
    pub async fn create(db: &DbConn, model: TagInput) -> Result<i32> {
        let res = Tag::insert(model.into_active_model()).exec(db).await?;
        Ok(res.last_insert_id)
    }

    pub async fn find_by_id(db: &DbConn, id: i32) -> Result<Model> {
        let res = Tag::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("tag not found".into()))?;
        Ok(res)
    }

    pub async fn delete_by_id(db: &DbConn, id: i32) -> Result<()> {
        let active_model = Tag::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Tag not found".to_string()))?
            .into_active_model();
        active_model.delete(db).await?;
        Ok(())
    }

    pub async fn find_all(
        db: &DbConn,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<(u64, u64, Vec<Model>)> {
        let mut select = Tag::find().order_by_desc(Column::CreateAt);
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

    pub async fn update_by_id(db: &DbConn, id: i32, model: TagInput) -> Result<Model> {
        let mut active_model = Tag::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Tag not found".to_string()))?
            .into_active_model();

        active_model.name = Set(model.name);
        active_model.description = Set(model.description);
        let now = chrono::Utc::now();
        active_model.update_at = Set(Some(now.into()));
        let res = active_model.update(db).await?;
        Ok(res)
    }
}
