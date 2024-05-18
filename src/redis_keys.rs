use std::fmt::Display;

#[derive(Debug)]
pub enum RedisKeys {
    UserToken,
    TemplateDownloads,
    TemplateFavorites,
    TemplateComments,
}

impl ToString for RedisKeys {
    fn to_string(&self) -> String {
        match self {
            RedisKeys::UserToken => "user_token".to_string(),
            RedisKeys::TemplateDownloads => "template_downloads".to_string(),
            RedisKeys::TemplateFavorites => "template_favorites".to_string(),
            RedisKeys::TemplateComments => "template_comments".to_string(),
        }
    }
}

pub fn gen_key<P: Display>(key: RedisKeys, id: P) -> String {
    format!("{}:{}", key.to_string(), id)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_redis_keys() {
        let user_token = RedisKeys::UserToken;
        assert_eq!(user_token.to_string(), "user_token");
    }

    #[test]
    fn test_gen_key() {
        let key = gen_key(RedisKeys::UserToken, "1");
        assert_eq!(key, "user_token:1");
    }
}
