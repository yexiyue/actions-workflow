use crate::entity::comment::{ActiveModel, Column, Model};
use crate::entity::prelude::{Comment, User};
use crate::entity::user;
use anyhow::Result;
use async_graphql::{Description, InputObject, SimpleObject};
use sea_orm::*;
use serde::Serialize;
pub struct CommentService;

#[derive(Debug, Serialize, Description, InputObject)]
pub struct CommentInput {
    pub content: String,
    pub template_id: i32,
    pub parent_comment_id: Option<i32>,
}

#[derive(Debug, SimpleObject, Serialize)]
pub struct CommentWithUser {
    comment: Model,
    user: user::Model,
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

    pub async fn find_all_by_template_id(
        db: &DbConn,
        template_id: i32,
    ) -> Result<Vec<CommentWithUser>> {
        let comments = Comment::find()
            .filter(Column::TemplateId.eq(template_id))
            .find_also_related(User)
            .all(db)
            .await?;

        let res = comments
            .into_iter()
            .rev()
            .map(|(comment, user)| CommentWithUser {
                comment,
                user: user.unwrap(),
            })
            .collect::<Vec<_>>();
        Ok(res)
    }

    pub async fn find_template_id_count(db: &DbConn, template_id: i32) -> Result<u64> {
        let count = Comment::find()
            .filter(Column::TemplateId.eq(template_id))
            .count(db)
            .await?;

        Ok(count)
    }
}
