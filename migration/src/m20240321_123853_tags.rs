use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Tag::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Tag::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Tag::Name).string().not_null())
                    .col(ColumnDef::new(Tag::Description).string().not_null())
                    .to_owned(),
            )
            .await?;
        let data: serde_json::Value = serde_json::from_str(include_str!("../tag.json")).unwrap();

        let data = data.as_array().unwrap();
        for i in data {
            let name = i.get("name").unwrap().as_str().unwrap();
            let insert = Query::insert()
                .into_table(Tag::Table)
                .columns([Tag::Name, Tag::Description])
                .values_panic([name.into(), name.into()])
                .to_owned();
            manager.exec_stmt(insert).await?;
        }
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Tag::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
pub enum Tag {
    Table,
    Id,
    Name,
    Description,
}
