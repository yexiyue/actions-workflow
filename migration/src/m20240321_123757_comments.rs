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
                    .table(Comment::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Comment::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Comment::UserId).integer().not_null())
                    .col(ColumnDef::new(Comment::TemplateId).integer().not_null())
                    .col(ColumnDef::new(Comment::ParentCommentId).integer())
                    .col(ColumnDef::new(Comment::Content).string().not_null())
                    .col(
                        ColumnDef::new(Comment::CreateAt)
                            .timestamp()
                            .default(Expr::current_timestamp()),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Comment::Table, Comment::Id)
                            .to(Template::Table, Template::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Comment::Table, Comment::Id)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Comment::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
pub enum Comment {
    Table,
    Id,
    UserId,
    TemplateId,
    Content,
    ParentCommentId,
    CreateAt,
}
