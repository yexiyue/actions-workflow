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
    pub tag_id: Vec<i32>,
    pub template_id: i32,
}

impl TemplateTagService {
    pub async fn create(db: &DbConn, input: TemplateTagInput) -> Result<i32> {
        Self::delete_by_template_id(db, input.template_id).await?;
        let models: Vec<ActiveModel> = input
            .tag_id
            .iter()
            .map(|tag_id| ActiveModel {
                tag_id: Set(*tag_id),
                template_id: Set(input.template_id),
                ..Default::default()
            })
            .collect();
        let res = TemplateTag::insert_many(models).exec(db).await?;
        Ok(res.last_insert_id)
    }

    pub async fn delete_by_template_id(db: &DbConn, template_id: i32) -> Result<()> {
        TemplateTag::delete_many()
            .filter(Column::TemplateId.eq(template_id))
            .exec(db)
            .await?;
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
