//! `SeaORM` Entity. Generated by sea-orm-codegen 0.12.15

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(
    Clone,
    Debug,
    PartialEq,
    DeriveEntityModel,
    Eq,
    Serialize,
    Deserialize,
    async_graphql :: SimpleObject,
)]
#[sea_orm(table_name = "tag")]
#[graphql(concrete(name = "Tag", params()))]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub name: String,
    pub description: String,
    pub create_at: Option<DateTimeWithTimeZone>,
    pub update_at: Option<DateTimeWithTimeZone>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::template_tag::Entity")]
    TemplateTag,
}

impl Related<super::template_tag::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::TemplateTag.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
