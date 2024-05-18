use migration::{Migrator, MigratorTrait};
use sea_orm::SqlxPostgresConnector;
use shuttle_runtime::SecretStore;

use sqlx::PgPool;

#[shuttle_runtime::main]
async fn main(
    #[shuttle_shared_db::Postgres] pool: PgPool,
    #[shuttle_runtime::Secrets] secret_store: SecretStore,
) -> shuttle_axum::ShuttleAxum {
    let coon = SqlxPostgresConnector::from_sqlx_postgres_pool(pool);
    Migrator::up(&coon, None).await.unwrap();
    let router = actions_workflow::build_root_router(coon, secret_store).await?;

    Ok(router.into())
}
