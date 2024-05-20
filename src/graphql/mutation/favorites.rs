use crate::{
    graphql::AuthGuard,
    jwt::Claims,
    service::favorites::{FavoritesInput, FavoritesService},
};
use async_graphql::{Context, Object, Result};

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

        Ok("success")
    }
}
