use crate::entity::prelude::Tag;
use crate::entity::tag::{ActiveModel, Model};
use anyhow::Result;
use sea_orm::*;

pub struct TagService;

impl TagService {
    pub async fn create(db: &DbConn, model: Model) -> Result<Model> {
        let active_model = ActiveModel {
            name: Set(model.name.to_owned()),
            description: Set(model.description.to_owned()),
            ..Default::default()
        };

        let res = Tag::insert(active_model).exec(db).await?;
        Ok(Model {
            id: res.last_insert_id,
            ..model
        })
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

    pub async fn find_all(db: &DbConn) -> Result<Vec<Model>> {
        let res = Tag::find().all(db).await?;
        Ok(res)
    }

    pub async fn update_by_id(db: &DbConn, id: i32, model: Model) -> Result<Model> {
        let mut active_model = Tag::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Tag not found".to_string()))?
            .into_active_model();

        active_model.name = Set(model.name);
        active_model.description = Set(model.description);

        let res = active_model.update(db).await?;
        Ok(res)
    }
}
