use crate::entity::prelude::{Tag, TemplateTag};
use crate::entity::{
    tag,
    template_tag::{ActiveModel, Column},
};
use anyhow::Result;
use async_graphql::InputObject;
use sea_orm::*;
use serde::Serialize;

pub struct TemplateTagService;

#[derive(Debug, Serialize, InputObject)]
pub struct TemplateTagInput {
    pub tag_id: i32,
    pub template_id: i32,
}

impl IntoActiveModel<ActiveModel> for TemplateTagInput {
    fn into_active_model(self) -> ActiveModel {
        ActiveModel {
            tag_id: Set(self.tag_id),
            template_id: Set(self.template_id),
            ..Default::default()
        }
    }
}

impl TemplateTagService {
    pub async fn create(db: &DbConn, input: TemplateTagInput) -> Result<i32> {
        let res = TemplateTag::insert(input.into_active_model())
            .exec(db)
            .await?;
        Ok(res.last_insert_id)
    }

    pub async fn delete_by_id(db: &DbConn, id: i32) -> Result<()> {
        let active_model = TemplateTag::find_by_id(id)
            .one(db)
            .await?
            .ok_or(DbErr::RecordNotFound("TemplateTag not found".to_string()))?
            .into_active_model();
        active_model.delete(db).await?;
        Ok(())
    }

    pub async fn find_tags_for_template(db: &DbConn, template_id: i32) -> Result<Vec<tag::Model>> {
        let template_tags = TemplateTag::find()
            .filter(Column::TemplateId.eq(template_id))
            .find_also_related(Tag)
            .all(db)
            .await?;
        let mut res = vec![];
        for i in template_tags {
            if let Some(tag) = i.1 {
                res.push(tag);
            }
        }
        Ok(res)
    }
}
