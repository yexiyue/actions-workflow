use crate::{
    entity::{tag::Model, template},
    service::{template_tag::TemplateTagService, Pagination},
};
use async_graphql::{Context, Object, Result, SimpleObject};
use sea_orm::DbConn;

use crate::service::tag::TagService;

#[derive(Debug, Default)]
pub struct TagQuery;

#[derive(Debug, SimpleObject)]
pub struct TagTemplates {
    tag: Model,
    templates: Vec<template::Model>,
    total: u64,
    all_count: u64,
}

#[derive(Debug, SimpleObject)]
pub struct TagWithPagination {
    tags: Vec<Model>,
    total: u64,
    all_count: u64,
}

#[Object]
impl TagQuery {
    async fn tags(
        &self,
        ctx: &Context<'_>,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<TagWithPagination> {
        let db = ctx.data::<DbConn>()?;
        let (all_count, total, tags) = TagService::find_all(db, pagination, search).await?;
        Ok(TagWithPagination {
            tags,
            total,
            all_count,
        })
    }

    /// 查找关联这个标签的模版
    async fn tag_by_id_with_templates(
        &self,
        ctx: &Context<'_>,
        id: i32,
        pagination: Option<Pagination>,
        search: Option<String>,
    ) -> Result<TagTemplates> {
        let db = ctx.data::<DbConn>()?;
        let tag = TagService::find_by_id(db, id).await?;
        let (all_count, count, templates) =
            TemplateTagService::find_tag_templates(db, id, pagination, search).await?;

        Ok(TagTemplates {
            tag,
            templates,
            total: count,
            all_count,
        })
    }
}
