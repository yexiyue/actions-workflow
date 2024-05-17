use sea_orm_migration::prelude::*;

use crate::{m20220101_000001_create_table::User, m20240321_123642_template::Template};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Favorites::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Favorites::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Favorites::UserId).integer().not_null())
                    .col(ColumnDef::new(Favorites::TemplateId).integer().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .from(Favorites::Table, Favorites::Id)
                            .to(Template::Table, Template::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Favorites::Table, Favorites::Id)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .col(
                        ColumnDef::new(Favorites::CreateAt)
                            .timestamp_with_time_zone()
                            .default(Expr::current_timestamp()),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Favorites::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Favorites {
    Table,
    Id,
    UserId,
    TemplateId,
    CreateAt,
}
