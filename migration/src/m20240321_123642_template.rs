use sea_orm_migration::prelude::*;

use crate::{m20220101_000001_create_table::User, m20240321_123520_category::Category};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Template::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Template::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Template::Name).string().not_null())
                    .col(ColumnDef::new(Template::Config).string().not_null())
                    .col(ColumnDef::new(Template::Template).string().not_null())
                    .col(ColumnDef::new(Template::UserId).integer().not_null())
                    .col(ColumnDef::new(Template::CategoryId).integer().not_null())
                    .col(ColumnDef::new(Template::Readme).string())
                    .col(ColumnDef::new(Template::SourceCodeUrl).string())
                    .col(ColumnDef::new(Template::IsPublic).boolean().not_null())
                    .col(
                        ColumnDef::new(Template::CreateAt)
                            .timestamp_with_time_zone()
                            .default(Expr::current_timestamp()),
                    )
                    .col(
                        ColumnDef::new(Template::UpdateAt)
                            .timestamp_with_time_zone()
                            .default(Expr::current_timestamp()),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Template::Table, Template::UserId)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Template::Table, Template::CategoryId)
                            .to(Category::Table, Category::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Template::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
pub enum Template {
    Table,
    Id,
    Name,
    UserId,
    CategoryId,
    Readme,
    Config,
    Template,
    SourceCodeUrl,
    IsPublic,
    CreateAt,
    UpdateAt,
}
