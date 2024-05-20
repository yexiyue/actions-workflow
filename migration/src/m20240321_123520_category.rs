use sea_orm_migration::prelude::*;
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Category::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Category::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Category::Name).string().not_null())
                    .col(ColumnDef::new(Category::Description).string().not_null())
                    .to_owned(),
            )
            .await?;
        let data: serde_json::Value =
            serde_json::from_str(include_str!("../category.json")).unwrap();

        let data = data.as_array().unwrap();
        for i in data {
            let name = i.get("name").unwrap().as_str().unwrap();
            let insert = Query::insert()
                .into_table(Category::Table)
                .columns([Category::Name, Category::Description])
                .values_panic([name.into(), name.into()])
                .to_owned();
            manager.exec_stmt(insert).await?;
        }

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Category::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
pub enum Category {
    Table,
    Id,
    Name,
    Description,
}
