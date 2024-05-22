use crate::entity::prelude::{Tag, Template, TemplateTag};
use crate::entity::{
    tag, template,
    template_tag::{ActiveModel, Column},
};
use anyhow::Result;
use async_graphql::InputObject;
use sea_orm::*;
use serde::Serialize;

use super::Pagination;

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
        let res = template_tags
            .into_iter()
            .filter_map(|(_, tag)| tag)
            .collect();
        Ok(res)
    }

    pub async fn find_tag_templates(
        db: &DbConn,
        tag_id: i32,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<(u64, u64, Vec<template::Model>)> {
        let mut select = TemplateTag::find()
            .filter(Column::TagId.eq(tag_id))
            .find_also_related(Template)
            .filter(template::Column::IsPublic.eq(true));
        let all_count = select.clone().count(db).await?;
        if let Some(search) = search {
            select = select.filter(template::Column::Name.like(format!("%{}%", search)))
        }

        let count = select.clone().count(db).await?;
        let tag_templates = if let Some(Pagination { page_size, page }) = pagination {
            select.paginate(db, page_size).fetch_page(page).await?
        } else {
            select.all(db).await?
        };

        let res = tag_templates
            .into_iter()
            .filter_map(|(_, template)| template)
            .collect();

        Ok((all_count, count, res))
    }
}
