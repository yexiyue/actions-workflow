use crate::entity::comment::{ActiveModel, Column, Model};
use crate::entity::prelude::Comment;
use anyhow::Result;
use async_graphql::{Description, InputObject};
use sea_orm::*;
use serde::Serialize;

pub struct CommentService;

#[derive(Debug, Serialize, Description, InputObject)]
pub struct CommentInput {
    pub content: String,
    pub template_id: i32,
    pub parent_comment_id: Option<i32>,
}

impl IntoActiveModel<ActiveModel> for CommentInput {
    fn into_active_model(self) -> ActiveModel {
        ActiveModel {
            template_id: Set(self.template_id),
            content: Set(self.content),
            parent_comment_id: Set(self.parent_comment_id),
            ..Default::default()
        }
    }
}

impl CommentService {
    pub async fn create(db: &DbConn, user_id: i32, model: CommentInput) -> Result<i32> {
        let mut active_model = model.into_active_model();
        active_model.user_id = Set(user_id);
        let res = Comment::insert(active_model).exec(db).await?;
        Ok(res.last_insert_id)
    }

    pub async fn update(db: &DbConn, user_id: i32, model: CommentInput) -> Result<()> {
        let comment = Comment::find_by_id(model.template_id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Template not found".to_string()))?;

        if comment.user_id != user_id {
            return Err(DbErr::RecordNotFound("Permission denied".to_string()).into());
        }

        let mut active_model = comment.into_active_model();
        active_model.content = Set(model.content);
        active_model.update(db).await?;
        Ok(())
    }

    pub async fn delete_by_id(db: &DbConn, user_id: i32, id: i32) -> Result<Model> {
        let comment = Comment::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("Comment not found".to_string()))?;

        if comment.user_id != user_id {
            return Err(DbErr::RecordNotFound("Permission denied".to_string()).into());
        }
        let res = comment.clone();
        let active_model = comment.into_active_model();
        active_model.delete(db).await?;
        Ok(res)
    }

    pub async fn find_all_by_template_id(db: &DbConn, template_id: i32) -> Result<Vec<Model>> {
        let comments = Comment::find()
            .filter(Column::TemplateId.eq(template_id))
            .all(db)
            .await?;
        Ok(comments)
    }
}
