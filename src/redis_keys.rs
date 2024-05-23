use std::fmt::Display;

use redis::ToRedisArgs;

#[derive(Debug)]
pub enum RedisKeys {
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
            RedisKeys::TemplateDownloads => write!(f, "template_downloads"),
        }
    }
}

#[allow(unused)]
pub fn gen_key<P: Display>(key: RedisKeys, id: P) -> String {
    format!("{}:{}", key, id)
}
