use crate::entity::user::{ActiveModel, Entity as User, Model};
use anyhow::Result;
use sea_orm::{DbConn, EntityTrait, Set};


pub struct UserService;

impl UserService {
    pub async fn create_user(db: &DbConn, model: Model) -> Result<Model> {
        let active_model = ActiveModel {
            id: Set(model.id),
            username: Set(model.username.clone()),
            avatar_url: Set(model.avatar_url.clone()),
            ..Default::default()
        };
        let res = User::insert(active_model).exec(db).await?;
        Ok(Model {
            id: res.last_insert_id,
            ..model
        })
    }

    pub async fn find_by_id(db: &DbConn, id: i32) -> Result<Option<Model>> {
        Ok(User::find_by_id(id).one(db).await?)
    }

    pub async fn create_or_find(db: &DbConn, model: Model) -> Result<Model> {
        if let Some(user) = Self::find_by_id(db, model.id).await? {
            Ok(user)
        } else {
            Self::create_user(db, model).await
        }
    }
}
