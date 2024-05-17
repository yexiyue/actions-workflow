pub use sea_orm_migration::prelude::*;

mod m20220101_000001_create_table;
mod m20240321_123520_category;
mod m20240321_123642_template;
mod m20240321_123757_comments;
mod m20240321_123845_favortes;
mod m20240321_123853_tags;
mod m20240321_123905_template_tags;
pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_create_table::Migration),
            Box::new(m20240321_123520_category::Migration),
            Box::new(m20240321_123642_template::Migration),
            Box::new(m20240321_123757_comments::Migration),
            Box::new(m20240321_123845_favortes::Migration),
            Box::new(m20240321_123853_tags::Migration),
            Box::new(m20240321_123905_template_tags::Migration),
        ]
    }
}
