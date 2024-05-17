use crate::entity::category::{ActiveModel, Model};
use crate::entity::prelude::Category;
use anyhow::Result;
use async_graphql::{Description, InputObject};
use sea_orm::*;
use serde::Serialize;

pub struct CategoryService;

#[derive(Debug, Serialize, Description, InputObject)]
pub struct CategoryInput {
    name: String,
    description: String,
}

impl IntoActiveModel<ActiveModel> for CategoryInput {
    fn into_active_model(self) -> ActiveModel {
        ActiveModel {
            name: Set(self.name),
            description: Set(self.description),
            ..Default::default()
        }
    }
}

impl CategoryService {
    pub async fn create(db: &DbConn, model: CategoryInput) -> Result<i32> {
        let res = Category::insert(model.into_active_model()).exec(db).await?;
        Ok(res.last_insert_id)
    }

    pub async fn delete_by_id(db: &DbConn, id: i32) -> Result<()> {
        let active_model = Category::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Category not found".to_string()))?
            .into_active_model();
        active_model.delete(db).await?;
        Ok(())
    }

    pub async fn find_all(db: &DbConn) -> Result<Vec<Model>> {
        let res = Category::find().all(db).await?;
        Ok(res)
    }

    pub async fn update_by_id(db: &DbConn, id: i32, model: CategoryInput) -> Result<Model> {
        let mut active_model = Category::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Category not found".to_string()))?
            .into_active_model();

        active_model.name = Set(model.name);
        active_model.description = Set(model.description);

        let res = active_model.update(db).await?;
        Ok(res)
    }
}
