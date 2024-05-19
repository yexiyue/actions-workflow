use crate::{
    graphql::AuthGuard,
    jwt::Claims,
    redis_keys::RedisKeys,
    service::favorites::{FavoritesInput, FavoritesService},
};
use async_graphql::{Context, Object, Result};
use redis::{aio::MultiplexedConnection, AsyncCommands};

#[derive(Debug, Default)]
pub struct FavoritesMutation;

#[Object]
impl FavoritesMutation {
    #[graphql(guard = "AuthGuard")]
    async fn favorite(&self, ctx: &Context<'_>, template_id: i32) -> Result<&str> {
        let db = ctx.data()?;
        let claims = ctx.data::<Claims>()?;
        FavoritesService::create(
            db,
            FavoritesInput {
                user_id: claims.user_id,
                template_id,
            },
        )
        .await?;

        let coon = ctx.data::<MultiplexedConnection>()?;
        let mut redis = coon.clone();
        redis
            .hincr(RedisKeys::TemplateFavorites, template_id, 1)
            .await?;

        Ok("success")
    }

    #[graphql(guard = "AuthGuard")]
    async fn dis_favorite(&self, ctx: &Context<'_>, template_id: i32) -> Result<&str> {
        let db = ctx.data()?;
        let claims = ctx.data::<Claims>()?;
        FavoritesService::delete_by_id(
            db,
            FavoritesInput {
                user_id: claims.user_id,
                template_id,
            },
        )
        .await?;

        let coon = ctx.data::<MultiplexedConnection>()?;
        let mut redis = coon.clone();
        redis::cmd("hincrby")
            .arg(RedisKeys::TemplateFavorites)
            .arg(template_id)
            .arg(-1)
            .query_async(&mut redis)
            .await?;

        Ok("success")
    }
}
