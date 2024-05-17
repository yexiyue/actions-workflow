use sea_orm_migration::prelude::*;

use crate::{m20240321_123642_template::Template, m20240321_123853_tags::Tag};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(TemplateTag::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(TemplateTag::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(TemplateTag::TemplateId).integer().not_null())
                    .col(ColumnDef::new(TemplateTag::TagId).integer().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .from(TemplateTag::Table, TemplateTag::Id)
                            .to(Template::Table, Template::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(TemplateTag::Table, TemplateTag::Id)
                            .to(Tag::Table, Tag::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Session::Table).to_owned())
            .await?;
        manager
            .drop_table(Table::drop().table(TemplateTag::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum TemplateTag {
    Table,
    Id,
    TemplateId,
    TagId,
}
#[derive(DeriveIden)]
enum Session {
    Table,
}
