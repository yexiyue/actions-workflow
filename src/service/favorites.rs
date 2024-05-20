use crate::entity::favorites::{ActiveModel, Model};
use crate::entity::prelude::Favorites;
use anyhow::Result;
use async_graphql::{Description, InputObject};
use sea_orm::*;
use serde::Serialize;

use super::template::TemplateService;

pub struct FavoritesService;

#[derive(Debug, Serialize, Description, InputObject)]
pub struct FavoritesInput {
    pub user_id: i32,
    pub template_id: i32,
}

impl IntoActiveModel<ActiveModel> for FavoritesInput {
    fn into_active_model(self) -> ActiveModel {
        ActiveModel {
            user_id: Set(self.user_id),
            template_id: Set(self.template_id),
            ..Default::default()
        }
    }
}

impl FavoritesService {
    pub async fn create(db: &DbConn, model: FavoritesInput) -> Result<(i32, i32)> {
        let res = Favorites::insert(model.into_active_model())
            .exec(db)
            .await?;
        Ok(res.last_insert_id)
    }

    pub async fn delete_by_id(db: &DbConn, model: FavoritesInput) -> Result<()> {
        let active_model = Favorites::find_by_id((model.user_id, model.template_id))
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Favorites not found".to_string()))?
            .into_active_model();
        active_model.delete(db).await?;
        Ok(())
    }

    pub async fn find_template_favorite_users(db: &DbConn, template_id: i32) -> Result<Vec<Model>> {
        let template = TemplateService::find_by_id(db, template_id).await?;
        Ok(template.find_related(Favorites).all(db).await?)
    }

    pub async fn find_template_favorite_users_count(db: &DbConn, template_id: i32) -> Result<u64> {
        let template = TemplateService::find_by_id(db, template_id).await?;
        Ok(template.find_related(Favorites).count(db).await?)
    }
}
