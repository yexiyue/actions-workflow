use std::fmt::Display;

use redis::ToRedisArgs;

#[derive(Debug)]
pub enum RedisKeys {
    UserToken,
    TemplateDownloads,
}

impl ToRedisArgs for RedisKeys {
    fn write_redis_args<W>(&self, out: &mut W)
    where
        W: ?Sized + redis::RedisWrite,
    {
        out.write_arg_fmt(self)
    }
}

impl Display for RedisKeys {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            RedisKeys::UserToken => write!(f, "user_token"),
            RedisKeys::TemplateDownloads => write!(f, "template_downloads"),
        }
    }
}

pub fn gen_key<P: Display>(key: RedisKeys, id: P) -> String {
    format!("{}:{}", key, id)
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
